import React, { useState } from 'react';
import { Shield, AlertTriangle, Lock, User, Wifi, Database, Target } from 'lucide-react';

const ModuleI: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState('');
  const [authMethod, setAuthMethod] = useState('');
  const [firewallRule, setFirewallRule] = useState('');
  const [threatClassification, setThreatClassification] = useState('');
  const [simulationResults, setSimulationResults] = useState<string[]>([]);

  const definitions = [
    {
      term: 'Cyber Threats',
      definition: 'Malicious attempts to damage, disrupt, or gain unauthorized access to computer systems, networks, or data.',
      icon: AlertTriangle,
      color: 'text-red-500'
    },
    {
      term: 'Vulnerabilities',
      definition: 'Weaknesses in system security procedures, design, implementation, or controls that could be exploited.',
      icon: Shield,
      color: 'text-orange-500'
    },
    {
      term: 'Safeguards',
      definition: 'Security measures and controls implemented to protect against threats and reduce vulnerabilities.',
      icon: Lock,
      color: 'text-green-500'
    },
    {
      term: 'Authentication',
      definition: 'The process of verifying the identity of a user, device, or system before granting access.',
      icon: User,
      color: 'text-blue-500'
    }
  ];

  const threats = [
    { name: 'Phishing Email', type: 'Social Engineering', severity: 'High' },
    { name: 'SQL Injection', type: 'Web Application Attack', severity: 'Critical' },
    { name: 'Ransomware', type: 'Malware', severity: 'Critical' },
    { name: 'Weak Password', type: 'Authentication Weakness', severity: 'Medium' },
    { name: 'Unsecured WiFi', type: 'Network Vulnerability', severity: 'Medium' }
  ];

  const handleThreatClassification = () => {
    if (!selectedThreat) return;
    
    const threat = threats.find(t => t.name === selectedThreat);
    if (threat) {
      const result = `Threat: ${threat.name} | Type: ${threat.type} | Severity: ${threat.severity}`;
      setSimulationResults(prev => [...prev, result]);
    }
  };

  const handleAuthTest = () => {
    if (!authMethod) return;
    
    const authResults = {
      'password': 'Basic security - Vulnerable to brute force attacks',
      'two-factor': 'Enhanced security - Recommended for sensitive systems',
      'biometric': 'High security - Difficult to compromise',
      'multi-factor': 'Maximum security - Industry best practice'
    };
    
    const result = `Authentication Method: ${authMethod} | Security Level: ${authResults[authMethod as keyof typeof authResults]}`;
    setSimulationResults(prev => [...prev, result]);
  };

  const handleFirewallConfig = () => {
    if (!firewallRule) return;
    
    const ruleResults = {
      'allow-all': 'INSECURE: All traffic allowed - High risk configuration',
      'deny-all': 'SECURE: All traffic blocked - Very restrictive but safe',
      'selective': 'BALANCED: Only essential services allowed - Recommended approach',
      'port-specific': 'MODERATE: Specific ports open - Good for targeted services'
    };
    
    const result = `Firewall Rule: ${firewallRule} | Assessment: ${ruleResults[firewallRule as keyof typeof ruleResults]}`;
    setSimulationResults(prev => [...prev, result]);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center">
          <Shield className="w-10 h-10 text-blue-600 mr-4" />
          Module I: Introduction to Cyber Security
        </h1>
        <p className="text-lg text-slate-600">Learn the fundamentals of cyber security, identify vulnerabilities, and implement safeguards.</p>
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
          <Target className="w-6 h-6 text-orange-600 mr-3" />
          Interactive Security Simulator
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Threat Classification */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              Threat Classification
            </h3>
            <select
              value={selectedThreat}
              onChange={(e) => setSelectedThreat(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a threat to analyze</option>
              {threats.map((threat) => (
                <option key={threat.name} value={threat.name}>{threat.name}</option>
              ))}
            </select>
            <button
              onClick={handleThreatClassification}
              disabled={!selectedThreat}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Classify Threat
            </button>
          </div>

          {/* Authentication Testing */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <User className="w-5 h-5 text-blue-500 mr-2" />
              Authentication Testing
            </h3>
            <select
              value={authMethod}
              onChange={(e) => setAuthMethod(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose authentication method</option>
              <option value="password">Password Only</option>
              <option value="two-factor">Two-Factor Authentication</option>
              <option value="biometric">Biometric Authentication</option>
              <option value="multi-factor">Multi-Factor Authentication</option>
            </select>
            <button
              onClick={handleAuthTest}
              disabled={!authMethod}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Test Security Level
            </button>
          </div>

          {/* Firewall Configuration */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Wifi className="w-5 h-5 text-green-500 mr-2" />
              Firewall Setup
            </h3>
            <select
              value={firewallRule}
              onChange={(e) => setFirewallRule(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select firewall configuration</option>
              <option value="allow-all">Allow All Traffic</option>
              <option value="deny-all">Deny All Traffic</option>
              <option value="selective">Allow Essential Services Only</option>
              <option value="port-specific">Allow Specific Ports</option>
            </select>
            <button
              onClick={handleFirewallConfig}
              disabled={!firewallRule}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Configure Firewall
            </button>
          </div>
        </div>

        {/* Results Display */}
        {simulationResults.length > 0 && (
          <div className="mt-8 bg-slate-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Database className="w-5 h-5 text-purple-500 mr-2" />
              Simulation Results
            </h3>
            <div className="space-y-2">
              {simulationResults.map((result, index) => (
                <div key={index} className="bg-white p-3 rounded border-l-4 border-blue-500 text-slate-700 text-sm">
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

export default ModuleI;