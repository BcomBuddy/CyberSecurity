import React from 'react';
import { Home, Shield, Globe, Eye, Lock, Scale } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'module1', label: 'Module I: Introduction to Cyber Security', icon: Shield },
    { id: 'module2', label: 'Module II: Securing Web Applications', icon: Globe },
    { id: 'module3', label: 'Module III: Intrusion Detection & Prevention', icon: Eye },
    { id: 'module4', label: 'Module IV: Cryptography & Network Security', icon: Lock },
    { id: 'module5', label: 'Module V: Cyberspace Law & Forensics', icon: Scale },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-80 bg-slate-900 text-white overflow-hidden">
      {/* Header - Fixed at top left */}
      <div className="p-6 border-b border-slate-700 bg-slate-900">
        <h1 className="text-2xl font-bold text-blue-400 mb-2 leading-tight">
          Cyber Security Simulator
        </h1>
        <p className="text-sm text-slate-300 font-medium">
          3rd Year - 6th Semester
        </p>
      </div>

      {/* Navigation */}
      <nav className="p-4 overflow-y-auto h-full pb-24">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-slate-800 group ${
                    currentPage === item.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 transition-colors ${
                    currentPage === item.id ? 'text-blue-200' : 'text-slate-400 group-hover:text-blue-400'
                  }`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;