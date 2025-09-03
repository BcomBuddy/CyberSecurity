import React, { useState } from 'react';
import { Shield, Target, Lock, Eye, Scale, Globe, ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';

const Homepage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const videoOptions = {
    english: {
      label: 'English',
      url: 'https://www.youtube.com/embed/KsuQPurJHRc?rel=0&modestbranding=1'
    },
    hindi: {
      label: 'Hindi/Urdu',
      url: 'https://www.youtube.com/embed/bP6ufAUR3xU?rel=0&modestbranding=1'
    },
    telugu: {
      label: 'Telugu',
      url: 'https://www.youtube.com/embed/mNg14QeZZnk?rel=0&modestbranding=1'
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Comprehensive Security Training',
      description: 'Learn fundamental concepts of cyber security, vulnerabilities, and safeguards through interactive simulations.'
    },
    {
      icon: Globe,
      title: 'Web Application Security',
      description: 'Master securing web applications, services, and servers with hands-on practice scenarios.'
    },
    {
      icon: Eye,
      title: 'Intrusion Detection',
      description: 'Practice detecting and preventing intrusions with real-world simulation exercises.'
    },
    {
      icon: Lock,
      title: 'Cryptography & Network Security',
      description: 'Explore encryption, decryption, digital signatures, and network security protocols.'
    },
    {
      icon: Scale,
      title: 'Cyber Law & Forensics',
      description: 'Understand cyber laws, digital forensics, and investigate cyber crimes through practical scenarios.'
    }
  ];

  const modules = [
    {
      number: 'I',
      title: 'Introduction to Cyber Security',
      topics: ['Cyber Threats', 'Vulnerabilities', 'Safeguards', 'Authentication Methods'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: 'II',
      title: 'Securing Web Applications',
      topics: ['HTTP Security', 'SOAP', 'Identity Management', 'Authorization'],
      color: 'from-teal-500 to-teal-600'
    },
    {
      number: 'III',
      title: 'Intrusion Detection & Prevention',
      topics: ['IDS/IPS', 'Malware Analysis', 'Network Monitoring', 'Incident Response'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      number: 'IV',
      title: 'Cryptography & Network Security',
      topics: ['Symmetric Encryption', 'Asymmetric Encryption', 'SSL/TLS', 'VPN Security'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      number: 'V',
      title: 'Cyberspace Law & Forensics',
      topics: ['Cyber Law', 'Digital Forensics', 'Evidence Analysis', 'Memory Analysis'],
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="overflow-y-auto h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 gradient-text">
            Cyber Security Simulator
          </h1>
          <p className="text-xl mb-8 text-slate-300">
            Master cyber security concepts through interactive simulations and hands-on practice
          </p>
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-slate-300">Interactive Learning</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-slate-300">Real-world Scenarios</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-slate-300">Practical Simulations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-slate-800">🎥 Learn about this simulator</h2>
          
          {/* Language Dropdown */}
          <div className="mb-8">
            <label htmlFor="language-select" className="block text-lg font-semibold text-slate-700 mb-3">
              Select Video Language
            </label>
            <div className="relative inline-block w-full max-w-xs">
              <select
                id="language-select"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="appearance-none w-full bg-white border-2 border-slate-300 rounded-lg px-4 py-3 pr-10 text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <option value="english">English</option>
                <option value="hindi">Hindi/Urdu</option>
                <option value="telugu">Telugu</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Video Player */}
          <div className="relative w-full rounded-xl shadow-lg overflow-hidden">
            <iframe
              src={videoOptions[selectedLanguage as keyof typeof videoOptions].url}
              title={`Cyber Security Simulator Introduction - ${videoOptions[selectedLanguage as keyof typeof videoOptions].label}`}
              className="w-full h-[400px] md:h-[450px] lg:h-[500px]"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Why Choose Our Simulator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.slice(0, 3).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-slate-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modules Overview */}
      <section className="py-16 px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Course Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                <div className={`bg-gradient-to-r ${module.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold">Module {module.number}</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-semibold">{module.title}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.slice(3).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-slate-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-slate-800">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-8 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Choose any module from the sidebar to begin your interactive cyber security journey
          </p>
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <p className="text-blue-100 text-sm">Navigate using the sidebar to access:</p>
              <p className="text-white font-semibold mt-2">Definitions • Interactive Simulations • Practical Exercises</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;