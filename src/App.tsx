import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Homepage from './components/Homepage';
import ModuleI from './components/modules/ModuleI';
import ModuleII from './components/modules/ModuleII';
import ModuleIII from './components/modules/ModuleIII';
import ModuleIV from './components/modules/ModuleIV';
import ModuleV from './components/modules/ModuleV';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 ml-80">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;