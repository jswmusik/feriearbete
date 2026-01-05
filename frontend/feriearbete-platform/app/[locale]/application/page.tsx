'use client';

import { useTranslations } from 'next-intl';
import { useApplicationStore } from '@/store/application-store';
import { WizardStepper } from '@/components/wizard/wizard-stepper';
import { StepPersonalInfo } from '@/components/wizard/step-personal-info';
import { StepJobSelection } from '@/components/wizard/step-job-selection';
import { StepConfirmation } from '@/components/wizard/step-confirmation';

export default function ApplicationPage() {
  const t = useTranslations('application');
  const { currentStep } = useApplicationStore();

  return (
    <div className="min-h-screen bg-slate-50 pb-32 pt-12 font-sans">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-900 mb-4 tracking-tight">
            {t('title')} <span className="text-primary">2026</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-xl mx-auto">
            {t('pageDescription')}
          </p>
        </div>

        {/* The Stepper */}
        {currentStep <= 3 && <WizardStepper />}

        {/* The Active Step */}
        <div className="mt-8">
          {currentStep === 1 && (
            <div className="max-w-3xl mx-auto">
              <StepPersonalInfo />
            </div>
          )}
          {currentStep === 2 && <StepJobSelection />}
          {currentStep === 3 && (
            <div className="max-w-4xl mx-auto">
              <StepConfirmation />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
