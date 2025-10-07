// Environment Configuration for SSO
export const SSO_CONFIG = {
  SHELL_DOMAIN: process.env.REACT_APP_SHELL_DOMAIN || 'https://bcombuddy.netlify.app',
  APP_TYPE: process.env.REACT_APP_APP_TYPE || 'simulator',
  DEFAULT_SHELL_URL: 'https://bcombuddy.netlify.app'
};

// SSO Token Validation Configuration
export const SSO_TOKEN_CONFIG = {
  REQUIRED_FIELDS: ['uid', 'email'],
  OPTIONAL_FIELDS: ['name', 'yearOfStudy', 'role', 'isAdmin', 'shellDomain', 'microAppDomain', 'firebaseToken'],
  EXPIRATION_CHECK: true
};

// Storage Keys
export const STORAGE_KEYS = {
  SSO_USER_DATA: 'sso_user_data',
  FIREBASE_USER_DATA: 'firebase_user_data'
};
