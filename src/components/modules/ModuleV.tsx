import React, { useState } from 'react';
import { Scale, Mail, Search, HardDrive, FileSearch, Gavel } from 'lucide-react';

const ModuleV: React.FC = () => {
  const [emailHeader, setEmailHeader] = useState('');
  const [evidenceFile, setEvidenceFile] = useState('');
  const [hiddenDataPath, setHiddenDataPath] = useState('');
  const [memoryDump, setMemoryDump] = useState('');
  const [simulationResults, setSimulationResults] = useState<string[]>([]);

  const definitions = [
    {
      term: 'Cyber Law',
      definition: 'Legal framework governing cyberspace activities, including data protection, privacy rights, and cybercrime prosecution.',
      icon: Gavel,
      color: 'text-blue-500'
    },
    {
      term: 'Indian IT Policy 2013',
      definition: 'National policy framework for IT governance, cyber security, and digital infrastructure in India.',
      icon: Scale,
      color: 'text-green-500'
    },
    {
      term: 'Digital Forensics',
      definition: 'Scientific process of identifying, preserving, analyzing, and presenting digital evidence in legal proceedings.',
      icon: Search,
      color: 'text-purple-500'
    },
    {
      term: 'Memory Analysis',
      definition: 'Examination of volatile memory (RAM) to extract information about running processes, network connections, and malware.',
      icon: HardDrive,
      color: 'text-orange-500'
    }
  ];

  const handleEmailTracing = () => {
    if (!emailHeader) return;
    
    const mockAnalysis = {
      originIP: '203.192.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255),
      route: ['smtp.gmail.com', 'mx1.company.com', 'final.destination.com'],
      timestamp: new Date().toLocaleString(),
      authenticity: Math.random() > 0.3 ? 'Legitimate' : 'Potentially Spoofed'
    };
    
    const result = `Email Trace Analysis | Header: "${emailHeader}" | Origin IP: ${mockAnalysis.originIP} | Route: ${mockAnalysis.route.join(' → ')} | Status: ${mockAnalysis.authenticity} | Analysis Cost: ₹200`;
    setSimulationResults(prev => [...prev, result]);
  };

  const handleEvidenceAnalysis = () => {
    if (!evidenceFile) return;
    
    const fileExtension = evidenceFile.split('.').pop()?.toLowerCase() || 'unknown';
    const analysisResults = {
      'jpg': 'Image metadata extracted - GPS coordinates and device info found',
      'pdf': 'Document analysis complete - Author, creation date, and edit history recovered',
      'exe': 'Binary analysis - Malware signatures and behavioral patterns identified',
      'doc': 'Office document forensics - Track changes and hidden content discovered',
      'zip': 'Archive analysis - Compressed files and encryption status examined'
    };
    
    const genericResult = 'File signature analysis - Basic metadata and timestamps extracted';
    const analysis = analysisResults[fileExtension as keyof typeof analysisResults] || genericResult;
    const forensicCost = fileExtension === 'exe' ? '₹1,500' : '₹500';
    
    const result = `Digital Evidence Analysis | File: ${evidenceFile} | Type: ${fileExtension.toUpperCase()} | Findings: ${analysis} | Forensic Cost: ${forensicCost}`;
    setSimulationResults(prev => [...prev, result]);
  };

  const handleHiddenDataInvestigation = () => {
    if (!hiddenDataPath) return;
    
    const investigationTypes = {
      'steganography': 'Hidden message found in image metadata',
      'deleted-files': 'Recovered deleted files from unallocated disk space',
      'encrypted-partition': 'Encrypted partition detected - requires key recovery',
      'browser-cache': 'Browsing history and cached data recovered',
      'registry-analysis': 'Windows registry entries reveal software installation history'
    };
    
    const randomType = Object.keys(investigationTypes)[Math.floor(Math.random() * Object.keys(investigationTypes).length)];
    const finding = investigationTypes[randomType as keyof typeof investigationTypes];
    const investigationCost = '₹2,000';
    
    const result = `Hidden Data Investigation | Path: "${hiddenDataPath}" | Method: ${randomType} | Finding: ${finding} | Investigation Cost: ${investigationCost}`;
    setSimulationResults(prev => [...prev, result]);
  };

  const handleMemoryAnalysis = () => {
    if (!memoryDump) return;
    
    const memoryFindings = [
      'Active malware process detected in memory',
      'Network connections to suspicious IP addresses found',
      'Encrypted credentials discovered in process memory',
      'System artifacts indicate data exfiltration activity',
      'Memory injection techniques identified'
    ];
    
    const randomFinding = memoryFindings[Math.floor(Math.random() * memoryFindings.length)];
    const analysisTime = (Math.random() * 30 + 10).toFixed(1);
    const analysisCost = '₹3,500';
    
    const result = `Live Memory Analysis | Dump: "${memoryDump}" | Finding: ${randomFinding} | Analysis Time: ${analysisTime} minutes | Cost: ${analysisCost}`;
    setSimulationResults(prev => [...prev, result]);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center">
          <Scale className="w-10 h-10 text-red-600 mr-4" />
          Module V: Cyberspace and Law, Cyber Forensics
        </h1>
        <p className="text-lg text-slate-600">Understand cyber laws, digital forensics techniques, and legal frameworks for cybercrime investigation.</p>
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
          <FileSearch className="w-6 h-6 text-red-600 mr-3" />
          Digital Forensics Simulator
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Email Header Tracing */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Mail className="w-5 h-5 text-blue-500 mr-2" />
              Email Header Tracing
            </h3>
            <textarea
              value={emailHeader}
              onChange={(e) => setEmailHeader(e.target.value)}
              placeholder="Paste email header for analysis"
              rows={3}
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
            />
            <button
              onClick={handleEmailTracing}
              disabled={!emailHeader}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Trace Email Origin
            </button>
          </div>

          {/* Digital Evidence Analysis */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <FileSearch className="w-5 h-5 text-green-500 mr-2" />
              Evidence Analysis
            </h3>
            <input
              type="text"
              value={evidenceFile}
              onChange={(e) => setEvidenceFile(e.target.value)}
              placeholder="Enter evidence filename (e.g., document.pdf)"
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button
              onClick={handleEvidenceAnalysis}
              disabled={!evidenceFile}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Analyze Digital Evidence
            </button>
          </div>

          {/* Hidden Data Investigation */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Search className="w-5 h-5 text-purple-500 mr-2" />
              Hidden Data Investigation
            </h3>
            <input
              type="text"
              value={hiddenDataPath}
              onChange={(e) => setHiddenDataPath(e.target.value)}
              placeholder="Enter file/directory path to investigate"
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button
              onClick={handleHiddenDataInvestigation}
              disabled={!hiddenDataPath}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Investigate Hidden Data
            </button>
          </div>

          {/* Memory Analysis */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <HardDrive className="w-5 h-5 text-orange-500 mr-2" />
              Live Memory Analysis
            </h3>
            <input
              type="text"
              value={memoryDump}
              onChange={(e) => setMemoryDump(e.target.value)}
              placeholder="Enter memory dump filename"
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button
              onClick={handleMemoryAnalysis}
              disabled={!memoryDump}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Analyze Memory Dump
            </button>
          </div>
        </div>

        {/* Results Display */}
        {simulationResults.length > 0 && (
          <div className="mt-8 bg-slate-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <FileSearch className="w-5 h-5 text-red-500 mr-2" />
              Forensic Investigation Results
            </h3>
            <div className="space-y-2">
              {simulationResults.map((result, index) => (
                <div key={index} className="bg-white p-3 rounded border-l-4 border-red-500 text-slate-700 text-sm">
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

export default ModuleV;