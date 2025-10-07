import React from 'react';
import { useAuth } from '../hooks/useAuth';

const SSOTestComponent: React.FC = () => {
  const { user, loading, isAuthenticated, authType, logout } = useAuth();

  if (loading) {
    return (
      <div className="p-6 bg-blue-50 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-center text-blue-600">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-6 bg-red-50 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Not Authenticated</h3>
        <p className="text-red-600">Please log in to access this content.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-green-50 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-4">Authentication Status</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Name:</span>
          <span className="text-gray-900">{user?.name}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-900">{user?.email}</span>
        </div>
        
        {user?.role && (
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Role:</span>
            <span className="text-gray-900">{user.role}</span>
          </div>
        )}
        
        {user?.yearOfStudy && (
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Year of Study:</span>
            <span className="text-gray-900">{user.yearOfStudy}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Auth Type:</span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            authType === 'sso' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-purple-100 text-purple-800'
          }`}>
            {authType === 'sso' ? 'SSO Login' : 'Direct Login'}
          </span>
        </div>
        
        {user?.isAdmin && (
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Admin:</span>
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
              Yes
            </span>
          </div>
        )}
        
        {user?.shellDomain && (
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Shell Domain:</span>
            <span className="text-gray-900 text-sm">{user.shellDomain}</span>
          </div>
        )}
        
        {user?.microAppDomain && (
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">App Domain:</span>
            <span className="text-gray-900 text-sm">{user.microAppDomain}</span>
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-green-200">
        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SSOTestComponent;
