import { useState, useEffect } from 'react';
import { 
  validateSSOTokenFromShell, 
  getSSOUserData, 
  getCurrentUserData,
  isUserAuthenticated,
  logoutUser,
  onAuthStateChanged,
  UserData 
} from '../services/authService';
import { User } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authType, setAuthType] = useState<'firebase' | 'sso' | null>(null);

  useEffect(() => {
    // First, try to validate SSO token from URL
    const ssoUser = validateSSOTokenFromShell();
    
    if (ssoUser) {
      // SSO authentication successful
      setUser({
        ...ssoUser,
        authType: 'sso'
      });
      setAuthType('sso');
      setLoading(false);
      console.log('✅ SSO authentication successful');
      return;
    }

    // If no SSO token, check for stored SSO user data
    const storedSSOUser = getSSOUserData();
    if (storedSSOUser) {
      setUser({
        ...storedSSOUser,
        authType: 'sso'
      });
      setAuthType('sso');
      setLoading(false);
      console.log('✅ Using stored SSO user data');
      return;
    }

    // If no SSO authentication, listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged((firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email || 'User',
          authType: 'firebase'
        });
        setAuthType('firebase');
        console.log('✅ Firebase authentication successful');
      } else {
        setUser(null);
        setAuthType(null);
        console.log('❌ No authentication found');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setFirebaseUser(null);
      setAuthType(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const isAuthenticated = (): boolean => {
    return isUserAuthenticated();
  };

  const refreshUserData = () => {
    const currentUserData = getCurrentUserData();
    if (currentUserData) {
      setUser(currentUserData);
      setAuthType(currentUserData.authType);
    } else {
      setUser(null);
      setAuthType(null);
    }
  };

  return {
    user,
    firebaseUser,
    loading,
    authType,
    isAuthenticated: isAuthenticated(),
    logout,
    refreshUserData
  };
};
