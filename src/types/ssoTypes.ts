// SSO Authentication Types
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

// SSO Token Structure (as received from shell)
export interface SSOTokenData {
  uid: string;
  email: string;
  name: string;
  yearOfStudy: string;
  role: string;
  isAdmin: boolean;
  shellDomain: string;
  microAppDomain: string;
  iat: number;
  exp: number;
  firebaseToken?: string;
}

// Authentication Hook Return Type
export interface AuthHookReturn {
  user: UserData | null;
  firebaseUser: any | null; // Firebase User type
  loading: boolean;
  authType: 'firebase' | 'sso' | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshUserData: () => void;
}

// SSO URL Parameters
export interface SSOUrlParams {
  token: string;
  sso: string;
  shell?: string;
}

// Authentication State
export interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  loading: boolean;
  error: string | null;
  authType: 'firebase' | 'sso' | null;
}

// SSO Configuration
export interface SSOConfig {
  shellDomain: string;
  appType: string;
  defaultShellUrl: string;
}

// Token Validation Result
export interface TokenValidationResult {
  isValid: boolean;
  userData: SSOUserData | null;
  error?: string;
}

// Logout Options
export interface LogoutOptions {
  redirectToShell?: boolean;
  clearStorage?: boolean;
  customRedirectUrl?: string;
}
