'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowRight, User, Shield, Mail } from 'lucide-react';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      // In a real app, you would create the user here
      // Then redirect to the verification page
      router.push(`/${locale}/profile`); 
    }, 1500);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
      
      <div className="mb-8 space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-heading text-slate-900">{t('registerTitle')}</h1>
          <p className="text-slate-500 mt-2">{t('registerSubtitle')}</p>
        </div>
        
        {/* Simple Progress Indicator */}
        <div className="flex gap-2">
          <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-slate-200'}`} />
          <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-slate-200'}`} />
        </div>
      </div>

      <Card className="p-8 border-2 border-slate-200 bg-white shadow-lg">
        
        {/* STEP 1: ACCOUNT */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-primary font-bold mb-2">
              <User className="h-5 w-5" /> {t('yourAccount')}
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('firstName')}</Label>
                  <Input placeholder={t('firstNamePlaceholder')} />
                </div>
                <div className="space-y-2">
                  <Label>{t('lastName')}</Label>
                  <Input placeholder={t('lastNamePlaceholder')} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t('email')}</Label>
                <Input type="email" placeholder={t('emailPlaceholder')} />
              </div>
              <div className="space-y-2">
                <Label>{t('choosePassword')}</Label>
                <Input type="password" />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: GUARDIAN */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-primary font-bold mb-2">
              <Shield className="h-5 w-5" /> {t('connectGuardian')}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 mb-4 border border-blue-100">
              <p>{t('guardianHelp')}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t('guardianPnr')}</Label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <Input className="pl-12 font-mono" placeholder={t('guardianPnrPlaceholder')} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t('guardianEmail')}</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <Input className="pl-12" placeholder={t('guardianEmailPlaceholder')} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-8 flex justify-end">
          <Button 
            onClick={handleNext} 
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90 text-lg h-14"
            disabled={isLoading}
          >
            {isLoading ? t('creatingAccount') : (step === 2 ? t('completeRegistration') : t('nextStep'))} 
            {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        </div>

      </Card>

      <div className="text-center text-sm mt-8">
        <span className="text-slate-500">{t('hasAccount')} </span>
        <Link href={`/${locale}/auth/login`} className="font-bold text-primary hover:underline">
          {t('loginLink')}
        </Link>
      </div>

    </div>
  );
}

