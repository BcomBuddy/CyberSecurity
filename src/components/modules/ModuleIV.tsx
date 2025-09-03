import React, { useState } from 'react';
import { Lock, Key, Shield, Wifi, FileText, Hash } from 'lucide-react';

const ModuleIV: React.FC = () => {
  const [plainText, setPlainText] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptionType, setEncryptionType] = useState('');
  const [digitalMessage, setDigitalMessage] = useState('');
  const [vpnConfig, setVpnConfig] = useState('');
  const [simulationResults, setSimulationResults] = useState<string[]>([]);

  const definitions = [
    {
      term: 'Symmetric Cryptography',
      definition: 'Encryption method where the same key is used for both encryption and decryption of data.',
      icon: Key,
      color: 'text-blue-500'
    },
    {
      term: 'Asymmetric Cryptography',
      definition: 'Encryption system using a pair of keys - public key for encryption and private key for decryption.',
      icon: Lock,
      color: 'text-green-500'
    },
    {
      term: 'Digital Signatures',
      definition: 'Cryptographic mechanism that validates the authenticity and integrity of digital messages or documents.',
      icon: FileText,
      color: 'text-purple-500'
    },
    {
      term: 'SSL/TLS Security',
      definition: 'Cryptographic protocols that provide secure communication over networks through encryption and authentication.',
      icon: Shield,
      color: 'text-orange-500'
    }
  ];

  // Simple Caesar cipher for demonstration
  const caesarCipher = (text: string, shift: number, encrypt: boolean = true) => {
    const direction = encrypt ? shift : -shift;
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + direction + 26) % 26) + start);
    });
  };

  const handleEncryption = () => {
    if (!plainText || !encryptionKey) return;
    
    const shift = parseInt(encryptionKey) || 3;
    let result = '';
    
    if (encryptionType === 'symmetric') {
      const encrypted = caesarCipher(plainText, shift, true);
      const decrypted = caesarCipher(encrypted, shift, false);
      result = `Symmetric Encryption | Original: "${plainText}" | Encrypted: "${encrypted}" | Decrypted: "${decrypted}" | Key: ${shift}`;
    } else if (encryptionType === 'asymmetric') {
      const encrypted = caesarCipher(plainText, shift, true);
      result = `Asymmetric Encryption | Original: "${plainText}" | Encrypted: "${encrypted}" | Public Key Used: ${shift} | Private Key Required for Decryption`;
    } else {
      result = `Please select an encryption type first`;
    }
    
    setSimulationResults(prev => [...prev, result]);
  };

  const handleDigitalSignature = () => {
    if (!digitalMessage) return;
    
    const hash = digitalMessage.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const signature = Math.abs(hash).toString(16).toUpperCase();
    const verificationCost = '₹100';
    
    const result = `Digital Signature | Message: "${digitalMessage}" | Hash: ${signature} | Status: VERIFIED | Verification Cost: ${verificationCost}`;
    setSimulationResults(prev => [...prev, result]);
  };

  const handleVPNSecurity = () => {
    if (!vpnConfig) return;
    
    const vpnConfigs = {
      'pptp': 'PPTP Protocol - Basic encryption, legacy support (Setup Cost: ₹1,000)',
      'l2tp': 'L2TP/IPSec - Good security with IPSec encryption (Setup Cost: ₹3,000)',
      'openvpn': 'OpenVPN - High security, open source solution (Setup Cost: ₹5,000)',
      'wireguard': 'WireGuard - Modern, fast, and secure protocol (Setup Cost: ₹4,000)'
    };
    
    const result = `VPN Configuration: ${vpnConfigs[vpnConfig as keyof typeof vpnConfigs]}`;
    setSimulationResults(prev => [...prev, result]);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center">
          <Lock className="w-10 h-10 text-orange-600 mr-4" />
          Module IV: Cryptography and Network Security
        </h1>
        <p className="text-lg text-slate-600">Master encryption, decryption, digital signatures, and network security protocols.</p>
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
          <Hash className="w-6 h-6 text-orange-600 mr-3" />
          Cryptography Simulator
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Encryption/Decryption */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Key className="w-5 h-5 text-blue-500 mr-2" />
              Encryption Practice
            </h3>
            <input
              type="text"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              placeholder="Enter text to encrypt"
              className="w-full p-3 border border-slate-300 rounded-lg mb-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <input
              type="number"
              value={encryptionKey}
              onChange={(e) => setEncryptionKey(e.target.value)}
              placeholder="Enter encryption key (number)"
              className="w-full p-3 border border-slate-300 rounded-lg mb-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <select
              value={encryptionType}
              onChange={(e) => setEncryptionType(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select encryption type</option>
              <option value="symmetric">Symmetric Encryption</option>
              <option value="asymmetric">Asymmetric Encryption</option>
            </select>
            <button
              onClick={handleEncryption}
              disabled={!plainText || !encryptionKey || !encryptionType}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Encrypt/Decrypt Text
            </button>
          </div>

          {/* Digital Signatures */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 text-purple-500 mr-2" />
              Digital Signatures
            </h3>
            <textarea
              value={digitalMessage}
              onChange={(e) => setDigitalMessage(e.target.value)}
              placeholder="Enter message to sign digitally"
              rows={4}
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
            />
            <button
              onClick={handleDigitalSignature}
              disabled={!digitalMessage}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Generate Digital Signature
            </button>
          </div>

          {/* VPN Security */}
          <div className="bg-slate-50 p-6 rounded-lg lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Wifi className="w-5 h-5 text-green-500 mr-2" />
              VPN Security Configuration
            </h3>
            <select
              value={vpnConfig}
              onChange={(e) => setVpnConfig(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Choose VPN protocol</option>
              <option value="pptp">PPTP (Point-to-Point Tunneling)</option>
              <option value="l2tp">L2TP/IPSec (Layer 2 Tunneling)</option>
              <option value="openvpn">OpenVPN (SSL/TLS based)</option>
              <option value="wireguard">WireGuard (Modern Protocol)</option>
            </select>
            <button
              onClick={handleVPNSecurity}
              disabled={!vpnConfig}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Analyze VPN Security
            </button>
          </div>
        </div>

        {/* Results Display */}
        {simulationResults.length > 0 && (
          <div className="mt-8 bg-slate-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Hash className="w-5 h-5 text-orange-500 mr-2" />
              Cryptography Results
            </h3>
            <div className="space-y-2">
              {simulationResults.map((result, index) => (
                <div key={index} className="bg-white p-3 rounded border-l-4 border-orange-500 text-slate-700 text-sm font-mono">
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

export default ModuleIV;