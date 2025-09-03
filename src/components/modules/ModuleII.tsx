import React, { useState } from 'react';
import { Globe, Server, Key, Shield, CheckCircle, Settings } from 'lucide-react';

const ModuleII: React.FC = () => {
  const [securityLevel, setSecurityLevel] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const [resource, setResource] = useState('');
  const [simulationResults, setSimulationResults] = useState<string[]>([]);

  const definitions = [
    {
      term: 'HTTP Security',
      definition: 'Security measures implemented to protect HTTP communications, including HTTPS, headers, and secure cookies.',
      icon: Globe,
      color: 'text-blue-500'
    },
    {
      term: 'SOAP Security',
      definition: 'Security mechanisms for Simple Object Access Protocol including WS-Security, authentication, and encryption.',
      icon: Server,
      color: 'text-green-500'
    },
    {
      term: 'Identity Management',
      definition: 'Framework for managing digital identities, including user provisioning, authentication, and access control.',
      icon: Key,
      color: 'text-purple-500'
    },
    {
      term: 'Authorization Patterns',
      definition: 'Methods to control access to resources based on user roles, permissions, and business rules.',
      icon: Shield,
      color: 'text-orange-500'
    }
  ];

  const handleWebSecurityConfig = () => {
    if (!securityLevel) return;
    
    const securityConfigs = {
      'basic': 'HTTP only - No encryption, vulnerable to interception (Cost: ₹0)',
      'ssl': 'HTTPS with SSL - Basic encryption enabled (Cost: ₹2,500/year)',
      'advanced': 'HTTPS + Security Headers - Enhanced protection (Cost: ₹5,000/year)',
      'enterprise': 'Full security suite - Maximum protection (Cost: ₹15,000/year)'
    };
    
    const result = `Web Security Configuration: ${securityConfigs[securityLevel as keyof typeof securityConfigs]}`;
    setSimulationResults(prev => [...prev, result]);
  };

  const handleLoginFlow = () => {
    if (!username || !password) return;
    
    const passwordStrength = password.length < 6 ? 'Weak' : password.length < 10 ? 'Medium' : 'Strong';
    const loginResult = passwordStrength === 'Weak' ? 'FAILED - Password too weak' : 'SUCCESS - Login accepted';
    const securityAdvice = passwordStrength === 'Weak' ? 'Implement stronger password policy' : 'Good password strength';
    
    const result = `Login Test: ${loginResult} | Username: ${username} | Password Strength: ${passwordStrength} | Advice: ${securityAdvice}`;
    setSimulationResults(prev => [...prev, result]);
  };

  const handleAuthorizationRule = () => {
    if (!userRole || !resource) return;
    
    const accessMatrix: Record<string, string[]> = {
      'admin': ['user-management', 'system-config', 'reports', 'billing'],
      'manager': ['reports', 'team-data', 'billing'],
      'employee': ['personal-data', 'team-data'],
      'guest': ['public-info']
    };
    
    const allowedResources = accessMatrix[userRole] || [];
    const hasAccess = allowedResources.includes(resource);
    const accessResult = hasAccess ? 'ACCESS GRANTED' : 'ACCESS DENIED';
    
    const result = `Authorization Test: ${accessResult} | Role: ${userRole} | Resource: ${resource} | Allowed Resources: ${allowedResources.join(', ')}`;
    setSimulationResults(prev => [...prev, result]);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center">
          <Globe className="w-10 h-10 text-teal-600 mr-4" />
          Module II: Securing Web Applications, Services, and Servers
        </h1>
        <p className="text-lg text-slate-600">Master web application security, identity management, and authorization patterns.</p>
      </div>

      {/* Definitions Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Key Definitions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {definitions.map((def, index) => {
            const Icon = def.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <Icon className={`w-5 h-5 ${def.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{def.term}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{def.definition}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
          <Settings className="w-6 h-6 text-teal-600 mr-3" />
          Web Security Simulator
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Web Security Configuration */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Globe className="w-5 h-5 text-blue-500 mr-2" />
              Web Security Config
            </h3>
            <select
              value={securityLevel}
              onChange={(e) => setSecurityLevel(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Choose security level</option>
              <option value="basic">Basic HTTP</option>
              <option value="ssl">HTTPS with SSL</option>
              <option value="advanced">Advanced HTTPS + Headers</option>
              <option value="enterprise">Enterprise Security Suite</option>
            </select>
            <button
              onClick={handleWebSecurityConfig}
              disabled={!securityLevel}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Configure Security
            </button>
          </div>

          {/* Login Flow Testing */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Key className="w-5 h-5 text-green-500 mr-2" />
              Login Flow Testing
            </h3>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full p-3 border border-slate-300 rounded-lg mb-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            <button
              onClick={handleLoginFlow}
              disabled={!username || !password}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Test Login Security
            </button>
          </div>

          {/* Authorization Rules */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Shield className="w-5 h-5 text-purple-500 mr-2" />
              Authorization Rules
            </h3>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg mb-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Select user role</option>
              <option value="admin">Administrator</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
              <option value="guest">Guest</option>
            </select>
            <select
              value={resource}
              onChange={(e) => setResource(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Select resource to access</option>
              <option value="user-management">User Management</option>
              <option value="system-config">System Configuration</option>
              <option value="reports">Reports</option>
              <option value="billing">Billing Information</option>
              <option value="team-data">Team Data</option>
              <option value="personal-data">Personal Data</option>
              <option value="public-info">Public Information</option>
            </select>
            <button
              onClick={handleAuthorizationRule}
              disabled={!userRole || !resource}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Check Access Rights
            </button>
          </div>
        </div>

        {/* Results Display */}
        {simulationResults.length > 0 && (
          <div className="mt-8 bg-slate-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              Security Analysis Results
            </h3>
            <div className="space-y-2">
              {simulationResults.map((result, index) => (
                <div key={index} className="bg-white p-3 rounded border-l-4 border-teal-500 text-slate-700 text-sm">
                  {result}
                </div>
              ))}
            </div>
            <button
              onClick={() => setSimulationResults([])}
              className="mt-4 text-slate-600 hover:text-slate-800 text-sm underline"
            >
              Clear Results
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ModuleII;