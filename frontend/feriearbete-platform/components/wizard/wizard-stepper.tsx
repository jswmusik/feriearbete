'use client';

import { useTranslations } from 'next-intl';
import { useApplicationStore } from '@/store/application-store';
import { cn } from '@/lib/utils';
import { Check, Sparkles, Rocket, PartyPopper } from 'lucide-react';

export function WizardStepper() {
  const t = useTranslations('application');
  const { currentStep } = useApplicationStore();

  const steps = [
    { id: 1, label: t('step1'), icon: Sparkles }, // Information
    { id: 2, label: t('step2'), icon: Rocket }, // Choices
    { id: 3, label: t('step3'), icon: PartyPopper }, // Confirm
  ];

  // Progress: Step 1 = 33%, Step 2 = 66%, Step 3 = 100%
  const progressPercent = (currentStep / steps.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      {/* Motivational Progress Card */}
      <div className="bg-gradient-to-r from-primary/5 via-tiffany/5 to-primary/5 rounded-xl p-6 mb-8 border border-primary/10">
        {/* Progress Bar */}
        <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden mb-4">
          {/* Animated gradient progress */}
          <div 
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
            style={{ 
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, var(--primary) 0%, var(--tiffany) 50%, var(--primary) 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s linear infinite',
            }}
          />
          {/* Glow effect at the end */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-tiffany blur-sm transition-all duration-700 ease-out"
            style={{ left: `calc(${progressPercent}% - 8px)` }}
          />
        </div>

        {/* Progress Text */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-600">
              {t('stepProgress', { current: currentStep, total: steps.length })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {currentStep === 1 && (
              <span className="text-sm text-primary font-medium animate-pulse">
                {t('letsGetStarted')} ✨
              </span>
            )}
            {currentStep === 2 && (
              <span className="text-sm text-tiffany font-medium animate-pulse">
                {t('almostThere')} 🚀
              </span>
            )}
            {currentStep === 3 && (
              <span className="text-sm text-green-600 font-medium animate-pulse">
                {t('finalStep')} 🎉
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="relative flex justify-between">
        {/* Connecting Line Background */}
        <div className="absolute top-6 left-[10%] right-[10%] h-1 bg-slate-200 -z-10 rounded-full" />
        
        {/* Animated Progress Line */}
        <div 
          className="absolute top-6 left-[10%] h-1 -z-10 rounded-full transition-all duration-700 ease-out"
          style={{ 
            width: `${progressPercent * 0.8}%`,
            background: 'linear-gradient(90deg, var(--primary) 0%, var(--tiffany) 100%)',
          }}
        />

        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const Icon = step.icon;

          return (
            <div 
              key={step.id} 
              className={cn(
                "flex flex-col items-center transition-all duration-500",
                isActive && "scale-105"
              )}
              style={{ 
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "relative flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all duration-500 font-bold shadow-sm",
                  isActive && "border-primary bg-primary text-white shadow-lg shadow-primary/30 animate-bounce",
                  isCompleted && "border-tiffany bg-tiffany text-white",
                  !isActive && !isCompleted && "border-slate-300 bg-white text-slate-400"
                )}
                style={{
                  animationDuration: isActive ? '1s' : '0s',
                  animationIterationCount: isActive ? '3' : '0',
                }}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6" strokeWidth={3} />
                ) : isActive ? (
                  <Icon className="h-5 w-5" />
                ) : (
                  <span className="text-lg">{step.id}</span>
                )}
                
                {/* Pulse ring for active step */}
                {isActive && (
                  <span className="absolute inset-0 rounded-xl border-2 border-primary animate-ping opacity-30" />
                )}
                
                {/* Checkmark badge for completed */}
                {isCompleted && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white shadow-sm">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                )}
              </div>

              {/* Step Label */}
              <span 
                className={cn(
                  "mt-3 text-xs font-bold uppercase tracking-wider transition-all duration-300",
                  isActive && "text-primary",
                  isCompleted && "text-tiffany",
                  !isActive && !isCompleted && "text-slate-400"
                )}
              >
                {step.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Add keyframes for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
