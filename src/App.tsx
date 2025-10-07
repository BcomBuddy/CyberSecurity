import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Homepage from './components/Homepage';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ModuleI from './components/modules/ModuleI';
import ModuleII from './components/modules/ModuleII';
import ModuleIII from './components/modules/ModuleIII';
import ModuleIV from './components/modules/ModuleIV';
import ModuleV from './components/modules/ModuleV';
import { useAuth } from './hooks/useAuth';
import { logoutUser } from './services/authService';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, loading, isAuthenticated, authType, logout } = useAuth();

  const handleLogin = () => {
    // This will be called after successful authentication
    // The auth state change will handle setting isAuthenticated
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentPage('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage />;
      case 'module1':
        return <ModuleI />;
      case 'module2':
        return <ModuleII />;
      case 'module3':
        return <ModuleIII />;
      case 'module4':
        return <ModuleIV />;
      case 'module5':
        return <ModuleV />;
      default:
        return <Homepage />;
    }
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated (only for Firebase auth)
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />
        <main className="flex-1 ml-80">
          {renderPage()}
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default App;