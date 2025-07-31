import React, { useState } from 'react';
import { PortfolioForm } from './components/PortfolioForm';
import { PortfolioPreview } from './components/PortfolioPreview';
import { Header } from './components/Header';
import { PortfolioData } from './types/Portfolio';

const initialData: PortfolioData = {
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    bio: ''
  },
  skills: [],
  projects: [],
  experience: [],
  education: [],
  template: 'modern'
};

function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialData);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const updatePortfolioData = (section: keyof PortfolioData, data: any) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
            <PortfolioForm
              portfolioData={portfolioData}
              updatePortfolioData={updatePortfolioData}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              onShowPreview={() => setShowPreview(true)}
            />
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Live Preview</h2>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>
            
            {showPreview && (
              <PortfolioPreview portfolioData={portfolioData} />
            )}
            
            {!showPreview && (
              <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎨</div>
                  <p className="text-gray-600">Click "Show Preview" to see your portfolio</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;