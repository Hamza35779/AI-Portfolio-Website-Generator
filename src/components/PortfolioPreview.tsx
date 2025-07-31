import React from 'react';
import { Download, ExternalLink, Mail, Phone, MapPin, Github, Linkedin, Globe } from 'lucide-react';
import { PortfolioData } from '../types/Portfolio';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';

interface PortfolioPreviewProps {
  portfolioData: PortfolioData;
}

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ portfolioData }) => {
  const renderTemplate = () => {
    switch (portfolioData.template) {
      case 'modern':
        return <ModernTemplate data={portfolioData} />;
      case 'classic':
        return <ClassicTemplate data={portfolioData} />;
      case 'creative':
        return <CreativeTemplate data={portfolioData} />;
      default:
        return <ModernTemplate data={portfolioData} />;
    }
  };

  const exportPortfolio = () => {
    // Create a new window with the portfolio content
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${portfolioData.personalInfo.name} - Portfolio</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
            body { font-family: 'Inter', sans-serif; }
          </style>
        </head>
        <body>
          ${document.querySelector('.portfolio-template')?.innerHTML || ''}
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div className="space-y-4">
      {/* Export Controls */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="font-semibold text-gray-800">Portfolio Preview</h3>
          <p className="text-sm text-gray-600">Template: {portfolioData.template}</p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={exportPortfolio}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Full View</span>
          </button>
          
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
        <div className="portfolio-template">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};