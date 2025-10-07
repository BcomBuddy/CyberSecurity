# JWT-based Single Sign-On (SSO) Implementation

This implementation provides JWT-based Single Sign-On integration for your micro-app that works alongside your existing Firebase authentication system.

## Features

- **Dual Authentication Support**: Works with both Firebase authentication and JWT SSO
- **Automatic Token Validation**: Validates JWT tokens from URL parameters
- **Protected Routes**: Route protection with loading states
- **Clean URL Management**: Removes sensitive token data from URL after validation
- **Fallback Handling**: Graceful fallback to Firebase auth when SSO is not available
- **TypeScript Support**: Full TypeScript interfaces and type safety

## How It Works

### SSO Flow
1. User accesses the app via shell application with SSO parameters
2. App validates JWT token from URL parameters
3. User data is extracted and stored in localStorage
4. URL parameters are cleaned for security
5. User is automatically logged in

### Firebase Flow (Fallback)
1. If no SSO token is present, app falls back to Firebase authentication
2. User can sign in directly using email/password or Google
3. Firebase auth state is managed normally

## URL Format

When users access this app from the shell, the URL will be:
```
https://my-app.netlify.app?token=ENCODED_JWT_TOKEN&sso=true&shell=https://bcombuddy.netlify.app
```

## JWT Token Structure

The token contains this user data:
```json
{
  "uid": "user_id",
  "email": "user@example.com", 
  "name": "User Name",
  "yearOfStudy": "1st Year",
  "role": "student",
  "isAdmin": false,
  "shellDomain": "https://bcombuddy.netlify.app",
  "microAppDomain": "https://my-app.netlify.app",
  "iat": 1234567890,
  "exp": 1234654290,
  "firebaseToken": "firebase_jwt_token"
}
```

## File Structure

```
src/
├── services/
│   └── authService.ts          # Enhanced auth service with SSO + Firebase
├── hooks/
│   └── useAuth.ts              # Authentication hook for state management
├── components/
│   ├── ProtectedRoute.tsx      # Route protection component
│   └── Login.tsx               # Existing Firebase login (preserved)
├── types/
│   └── ssoTypes.ts             # TypeScript interfaces
├── config/
│   └── ssoConfig.ts            # SSO configuration
└── App.tsx                     # Updated main app component
```

## Key Components

### AuthService (`src/services/authService.ts`)
- `validateSSOTokenFromShell()`: Validates JWT from URL parameters
- `getSSOUserData()`: Retrieves stored SSO user data
- `isSSOAuthenticated()`: Checks SSO authentication status
- `logoutSSO()`: Handles SSO logout with redirect to shell
- `getCurrentUserData()`: Gets user data from either SSO or Firebase
- `isUserAuthenticated()`: Checks authentication from either source

### useAuth Hook (`src/hooks/useAuth.ts`)
- Manages authentication state
- Handles automatic token validation on app load
- Provides loading states during authentication
- Supports both SSO and Firebase authentication

### ProtectedRoute (`src/components/ProtectedRoute.tsx`)
- Protects routes that require authentication
- Shows loading spinner during authentication
- Provides fallback UI for unauthenticated users
- Handles redirects appropriately

## Environment Variables

Create a `.env` file with:
```env
REACT_APP_SHELL_DOMAIN=https://bcombuddy.netlify.app
REACT_APP_APP_TYPE=simulator
```

## Usage Examples

### Using the Authentication Hook
```tsx
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { user, loading, isAuthenticated, logout, authType } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  if (!isAuthenticated) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Logged in via: {authType}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Using Protected Routes
```tsx
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <ProtectedRoute>
      <YourProtectedContent />
    </ProtectedRoute>
  );
}
```

## Security Features

- **Token Expiration Check**: Validates token expiration before use
- **URL Cleaning**: Removes sensitive data from URL after validation
- **Secure Storage**: Uses localStorage for user data persistence
- **HTTPS Enforcement**: Works with HTTPS in production
- **Error Handling**: Graceful error handling for invalid tokens

## Error Handling

The implementation handles various error scenarios:
- Invalid or malformed JWT tokens
- Expired tokens
- Missing required fields
- Network errors during authentication
- Fallback to Firebase authentication

## Logout Behavior

- **SSO Users**: Redirected to shell application (BcomBuddy)
- **Firebase Users**: Standard Firebase logout
- **Storage Cleanup**: All user data is cleared from localStorage

## Development Notes

- The implementation preserves your existing Firebase authentication
- SSO takes precedence over Firebase when both are available
- All existing components continue to work without modification
- TypeScript interfaces provide full type safety
- Console logging is included for debugging

## Testing

To test the SSO implementation:

1. **Direct Access**: Visit the app directly to test Firebase authentication
2. **SSO Access**: Use the shell application to test SSO flow
3. **Token Testing**: Create test JWT tokens with the expected structure
4. **Error Scenarios**: Test with invalid/expired tokens

## Production Deployment

1. Set environment variables in your deployment platform
2. Ensure HTTPS is enabled
3. Update the `microAppDomain` in JWT tokens to match your production URL
4. Test the complete SSO flow from the shell application

This implementation provides a robust, production-ready SSO solution that seamlessly integrates with your existing Firebase authentication system.
