import React, { useState } from 'react';
import { Eye, Bug, Network, AlertCircle, Activity, Zap } from 'lucide-react';

const ModuleIII: React.FC = () => {
  const [networkTraffic, setNetworkTraffic] = useState('');
  const [suspiciousIP, setSuspiciousIP] = useState('');
  const [malwareFile, setMalwareFile] = useState('');
  const [idsThreshold, setIdsThreshold] = useState('');
  const [simulationResults, setSimulationResults] = useState<string[]>([]);

  const definitions = [
    {
      term: 'Intrusion Detection System (IDS)',
      definition: 'Security system that monitors network traffic and system activities for malicious activity or policy violations.',
      icon: Eye,
      color: 'text-blue-500'
    },
    {
      term: 'Intrusion Prevention System (IPS)',
      definition: 'Network security technology that examines network traffic flows to detect and prevent vulnerability exploits.',
      icon: Zap,
      color: 'text-red-500'
    },
    {
      term: 'Malware Detection',
      definition: 'Process of identifying malicious software through signature analysis, behavior monitoring, and heuristic scanning.',
      icon: Bug,
      color: 'text-orange-500'
    },
    {
      term: 'Network Monitoring',
      definition: 'Continuous observation of network components and traffic to ensure optimal performance and security.',
      icon: Network,
      color: 'text-green-500'
    }
  ];

  const networkPatterns = [
    { pattern: 'Port Scanning', description: 'Multiple connection attempts to different ports', threat: 'High' },
    { pattern: 'DDoS Attack', description: 'Massive traffic from multiple sources', threat: 'Critical' },
    { pattern: 'SQL Injection', description: 'Malicious SQL queries in web requests', threat: 'High' },
    { pattern: 'Normal Traffic', description: 'Regular user browsing and application usage', threat: 'Low' }
  ];

  const handleIntrusionDetection = () => {
    if (!networkTraffic) return;
    
    const pattern = networkPatterns.find(p => p.pattern.toLowerCase().includes(networkTraffic.toLowerCase()));
    const result = pattern 
      ? `DETECTION: ${pattern.pattern} detected | Threat Level: ${pattern.threat} | Description: ${pattern.description}`
      : `ANALYSIS: Unknown pattern detected | Requires manual investigation`;
    
    setSimulationResults(prev => [...prev, result]);
  };

  const handleIPAnalysis = () => {
    if (!suspiciousIP) return;
    
    const ipAnalysis = {
      reputation: Math.random() > 0.5 ? 'Blacklisted' : 'Clean',
      location: ['Russia', 'China', 'USA', 'Germany', 'India'][Math.floor(Math.random() * 5)],
      riskScore: Math.floor(Math.random() * 100)
    };
    
    const result = `IP Analysis: ${suspiciousIP} | Reputation: ${ipAnalysis.reputation} | Location: ${ipAnalysis.location} | Risk Score: ${ipAnalysis.riskScore}/100`;
    setSimulationResults(prev => [...prev, result]);
  };

  const handleMalwareAnalysis = () => {
    if (!malwareFile) return;
    
    const fileTypes = ['exe', 'pdf', 'doc', 'zip', 'js'];
    const detectionResult = Math.random() > 0.3 ? 'MALWARE DETECTED' : 'FILE CLEAN';
    const scanTime = (Math.random() * 5 + 1).toFixed(1);
    const cost = detectionResult === 'MALWARE DETECTED' ? '₹500' : '₹50';
    
    const result = `Malware Scan: ${malwareFile} | Result: ${detectionResult} | Scan Time: ${scanTime}s | Analysis Cost: ${cost}`;
    setSimulationResults(prev => [...prev, result]);
  };

  const handleIDSConfiguration = () => {
    if (!idsThreshold) return;
    
    const thresholdAnalysis = {
      'low': 'High sensitivity - More false positives but catches subtle attacks',
      'medium': 'Balanced detection - Recommended for most environments',
      'high': 'Low sensitivity - Fewer alerts but may miss sophisticated attacks'
    };
    
    const result = `IDS Configuration: Threshold set to ${idsThreshold} | Impact: ${thresholdAnalysis[idsThreshold as keyof typeof thresholdAnalysis]}`;
    setSimulationResults(prev => [...prev, result]);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center">
          <Eye className="w-10 h-10 text-purple-600 mr-4" />
          Module III: Intrusion Detection and Prevention
        </h1>
        <p className="text-lg text-slate-600">Learn to detect, analyze, and prevent intrusions through advanced monitoring and response techniques.</p>
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
          <Activity className="w-6 h-6 text-purple-600 mr-3" />
          Intrusion Detection Simulator
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Network Traffic Analysis */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Network className="w-5 h-5 text-blue-500 mr-2" />
              Network Traffic Analysis
            </h3>
            <input
              type="text"
              value={networkTraffic}
              onChange={(e) => setNetworkTraffic(e.target.value)}
              placeholder="Enter traffic pattern (e.g., port scanning, ddos)"
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              onClick={handleIntrusionDetection}
              disabled={!networkTraffic}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Analyze Traffic Pattern
            </button>
          </div>

          {/* IP Reputation Check */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
              IP Reputation Analysis
            </h3>
            <input
              type="text"
              value={suspiciousIP}
              onChange={(e) => setSuspiciousIP(e.target.value)}
              placeholder="Enter IP address (e.g., 192.168.1.100)"
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              onClick={handleIPAnalysis}
              disabled={!suspiciousIP}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Check IP Reputation
            </button>
          </div>

          {/* Malware Detection */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Bug className="w-5 h-5 text-red-500 mr-2" />
              Malware Analysis
            </h3>
            <input
              type="text"
              value={malwareFile}
              onChange={(e) => setMalwareFile(e.target.value)}
              placeholder="Enter filename (e.g., suspicious.exe)"
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              onClick={handleMalwareAnalysis}
              disabled={!malwareFile}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Scan for Malware
            </button>
          </div>

          {/* IDS Configuration */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Eye className="w-5 h-5 text-green-500 mr-2" />
              IDS Configuration
            </h3>
            <select
              value={idsThreshold}
              onChange={(e) => setIdsThreshold(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Set detection threshold</option>
              <option value="low">Low Threshold (High Sensitivity)</option>
              <option value="medium">Medium Threshold (Balanced)</option>
              <option value="high">High Threshold (Low Sensitivity)</option>
            </select>
            <button
              onClick={handleIDSConfiguration}
              disabled={!idsThreshold}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Configure IDS
            </button>
          </div>
        </div>

        {/* Results Display */}
        {simulationResults.length > 0 && (
          <div className="mt-8 bg-slate-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Activity className="w-5 h-5 text-purple-500 mr-2" />
              Detection & Analysis Results
            </h3>
            <div className="space-y-2">
              {simulationResults.map((result, index) => (
                <div key={index} className="bg-white p-3 rounded border-l-4 border-purple-500 text-slate-700 text-sm">
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

export default ModuleIII;