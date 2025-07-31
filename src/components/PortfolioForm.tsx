import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { TemplateForm } from './forms/TemplateForm';
import { PortfolioData } from '../types/Portfolio';

interface PortfolioFormProps {
  portfolioData: PortfolioData;
  updatePortfolioData: (section: keyof PortfolioData, data: any) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onShowPreview: () => void;
}

const steps = [
  { id: 0, title: 'Personal Info', component: PersonalInfoForm },
  { id: 1, title: 'Skills', component: SkillsForm },
  { id: 2, title: 'Projects', component: ProjectsForm },
  { id: 3, title: 'Experience', component: ExperienceForm },
  { id: 4, title: 'Education', component: EducationForm },
  { id: 5, title: 'Template', component: TemplateForm },
];

export const PortfolioForm: React.FC<PortfolioFormProps> = ({
  portfolioData,
  updatePortfolioData,
  currentStep,
  setCurrentStep,
  onShowPreview
}) => {
  const CurrentComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onShowPreview();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </h2>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                index <= currentStep 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-400'
              }`}
            >
              {step.title}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="mb-8">
        <CurrentComponent
          data={portfolioData}
          updateData={updatePortfolioData}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
            currentStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span>{currentStep === steps.length - 1 ? 'Generate Portfolio' : 'Next'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};