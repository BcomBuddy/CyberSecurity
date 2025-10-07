import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  User,
  AuthError,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/config';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// SSO User Data Interface
export interface SSOUserData {
  uid: string;
  email: string;
  name: string;
  yearOfStudy: string;
  role: string;
  isAdmin: boolean;
  shellDomain?: string;
  microAppDomain?: string;
  firebaseToken?: string;
}

// Combined User Data Interface
export interface UserData {
  uid: string;
  email: string;
  name: string;
  yearOfStudy?: string;
  role?: string;
  isAdmin?: boolean;
  shellDomain?: string;
  microAppDomain?: string;
  firebaseToken?: string;
  authType: 'firebase' | 'sso';
}

// Custom error messages for better UX
const getErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled. Please try again.';
    default:
      return 'An error occurred. Please try again.';
  }
};

// Email/Password Authentication
export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(getErrorMessage(authError));
  }
};

// Google Sign-In Authentication
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(getErrorMessage(authError));
  }
};

// Sign Out
export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(getErrorMessage(authError));
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback);
};

// Password Reset
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: window.location.origin,
      handleCodeInApp: false,
    });
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(getErrorMessage(authError));
  }
};

// ===== SSO Authentication Methods =====

// SSO Token Validation
export const validateSSOTokenFromShell = (): SSOUserData | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const isSSO = urlParams.get('sso') === 'true';

  if (!token || !isSSO) {
    return null;
  }

  try {
    const tokenData = JSON.parse(decodeURIComponent(token));
    
    // Validate required fields
    if (!tokenData.uid || !tokenData.email) {
      console.error('SSO Token missing required fields');
      return null;
    }

    // Check token expiration
    if (tokenData.exp && tokenData.exp < Math.floor(Date.now() / 1000)) {
      console.error('SSO Token has expired');
      return null;
    }

    const userData: SSOUserData = {
      uid: tokenData.uid,
      email: tokenData.email,
      name: tokenData.name || 'User',
      yearOfStudy: tokenData.yearOfStudy || '',
      role: tokenData.role || 'student',
      isAdmin: tokenData.isAdmin || false,
      shellDomain: tokenData.shellDomain,
      microAppDomain: tokenData.microAppDomain,
      firebaseToken: tokenData.firebaseToken
    };

    // Store user data in localStorage
    localStorage.setItem('sso_user_data', JSON.stringify(userData));
    
    // Clean URL parameters
    cleanSSOUrl();
    
    console.log('✅ SSO Login successful:', userData);
    return userData;
  } catch (error) {
    console.error('Error validating SSO token:', error);
    return null;
  }
};

// Get stored SSO user data
export const getSSOUserData = (): SSOUserData | null => {
  const userData = localStorage.getItem('sso_user_data');
  if (!userData) return null;

  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
};

// Check if user is authenticated via SSO
export const isSSOAuthenticated = (): boolean => {
  return getSSOUserData() !== null;
};

// SSO Logout
export const logoutSSO = (): void => {
  localStorage.removeItem('sso_user_data');
  
  const userData = getSSOUserData();
  const shellDomain = userData?.shellDomain || 
                     new URLSearchParams(window.location.search).get('shell') || 
                     process.env.REACT_APP_SHELL_DOMAIN || 
                     'https://bcombuddy.netlify.app';
  
  window.location.href = shellDomain;
};

// Clean SSO URL parameters
const cleanSSOUrl = (): void => {
  const url = new URL(window.location.href);
  url.searchParams.delete('token');
  url.searchParams.delete('sso');
  url.searchParams.delete('shell');
  window.history.replaceState({}, document.title, url.toString());
};

// ===== Combined Authentication Methods =====

// Get current user data (Firebase or SSO)
export const getCurrentUserData = (): UserData | null => {
  // First check for SSO authentication
  const ssoUser = getSSOUserData();
  if (ssoUser) {
    return {
      ...ssoUser,
      authType: 'sso'
    };
  }

  // Fallback to Firebase authentication
  const firebaseUser = getCurrentUser();
  if (firebaseUser) {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || firebaseUser.email || 'User',
      authType: 'firebase'
    };
  }

  return null;
};

// Check if user is authenticated (Firebase or SSO)
export const isUserAuthenticated = (): boolean => {
  return isSSOAuthenticated() || !!getCurrentUser();
};

// Combined logout function
export const logoutUser = async (): Promise<void> => {
  const userData = getCurrentUserData();
  
  if (userData?.authType === 'sso') {
    logoutSSO();
  } else {
    await signOut();
  }
};
