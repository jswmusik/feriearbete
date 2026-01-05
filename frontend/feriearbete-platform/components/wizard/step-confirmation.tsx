'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useApplicationStore } from '@/store/application-store';
import { MOCK_JOBS } from '@/lib/mock-jobs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CheckCircle2, Loader2, User, Phone, Mail, MapPin, GraduationCap, Car, Edit2, ArrowLeft, PartyPopper, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function StepConfirmation() {
  const t = useTranslations('application');
  const tBankId = useTranslations('bankid');
  const tCommon = useTranslations('common');
  const { personalInfo, selectedJobIds, setStep } = useApplicationStore();
  
  // BankID Simulation State
  const [isSigning, setIsSigning] = useState(false);
  const [signStep, setSignStep] = useState<'idle' | 'opening' | 'waiting' | 'success'>('idle');

  const handleSign = () => {
    setIsSigning(true);
    setSignStep('opening');

    // Simulate flow: Open App -> Waiting -> Success
    setTimeout(() => setSignStep('waiting'), 1500);
    setTimeout(() => {
      setSignStep('success');
      setIsSigning(false);
    }, 4500);
  };

  // If successfully signed, show the Success View
  if (signStep === 'success') {
    return (
      <div className="text-center space-y-8 py-12 animate-in zoom-in-95 duration-500">
        {/* Confetti-like decorations */}
        <div className="relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-8">
            <Sparkles className="h-8 w-8 text-warning animate-bounce" style={{ animationDelay: '0ms' }} />
            <PartyPopper className="h-8 w-8 text-tiffany animate-bounce" style={{ animationDelay: '200ms' }} />
            <Sparkles className="h-8 w-8 text-primary animate-bounce" style={{ animationDelay: '400ms' }} />
          </div>
          <div className="h-28 w-28 bg-gradient-to-br from-tiffany to-tiffany/80 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-tiffany/30">
            <CheckCircle2 className="h-14 w-14" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-900">
            {t('submitted')}
          </h2>
          <p className="text-xl text-slate-500 max-w-md mx-auto">
            {t('submittedMessage')}
          </p>
        </div>

        {/* Summary Card */}
        <Card className="max-w-md mx-auto p-6 border-2 border-tiffany/20 bg-tiffany/5 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {personalInfo.firstName?.charAt(0)}{personalInfo.lastName?.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-900">{personalInfo.firstName} {personalInfo.lastName}</p>
                <p className="text-sm text-slate-500">{selectedJobIds.length} {t('jobsSelected')}</p>
              </div>
            </div>
            <div className="border-t border-tiffany/20 pt-4">
              <p className="text-sm text-slate-600">
                {t('confirmationEmailSent')} <span className="font-medium text-slate-900">{personalInfo.email}</span>
              </p>
            </div>
          </div>
        </Card>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="outline" size="lg" className="min-w-[200px]">
              {t('backToHome')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-2">
        <h2 className="text-3xl font-bold font-heading text-slate-900">{t('confirmApplication')}</h2>
        <p className="text-slate-500">{t('reviewBeforeSigning')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* SECTION 1: PERSONAL INFO */}
        <Card className="p-6 border-2 border-slate-200 space-y-6">
          <div className="flex justify-between items-center border-b-2 border-slate-100 pb-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> {t('personalInfo')}
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-primary hover:text-primary/80">
              <Edit2 className="h-4 w-4 mr-1" /> {t('edit')}
            </Button>
          </div>
          
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">{t('name')}</p>
                <p className="font-medium text-slate-900">{personalInfo.firstName} {personalInfo.lastName}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">{t('personnummer')}</p>
                <p className="font-medium text-slate-900 font-mono">{personalInfo.personnummer || '—'}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="h-8 w-8 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-slate-500" />
                </div>
                <span className="truncate">{personalInfo.email || '—'}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="h-8 w-8 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-slate-500" />
                </div>
                {personalInfo.phone || '—'}
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="h-8 w-8 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-slate-500" />
                </div>
                {personalInfo.city || '—'}
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="h-8 w-8 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                  <GraduationCap className="h-4 w-4 text-slate-500" />
                </div>
                {personalInfo.school === 'gymnasiet' ? 'Ådalsskolan (Gymnasiet)' : 
                 personalInfo.school === 'gudmundra' ? 'Gudmundråskolan' : 
                 personalInfo.school || '—'}
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="h-8 w-8 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                  <Car className="h-4 w-4 text-slate-500" />
                </div>
                {t('driversLicenseShort')}: {personalInfo.hasDriverLicense === true ? tCommon('yes') : personalInfo.hasDriverLicense === false ? tCommon('no') : '—'}
              </div>
            </div>
          </div>
        </Card>

        {/* SECTION 2: PRIORITY LIST */}
        <Card className="p-6 border-2 border-slate-200 space-y-6 h-full">
          <div className="flex justify-between items-center border-b-2 border-slate-100 pb-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Badge className="bg-primary text-white border-0">{selectedJobIds.length}</Badge> {t('selectedJobs')}
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setStep(2)} className="text-primary hover:text-primary/80">
              <Edit2 className="h-4 w-4 mr-1" /> {t('edit')}
            </Button>
          </div>

          <div className="space-y-3">
            {selectedJobIds.map((id, index) => {
              const job = MOCK_JOBS.find(j => j.id === id);
              if (!job) return null;
              return (
                <div key={id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    index === 0 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-slate-900 truncate">{job.title}</p>
                    <p className="text-xs text-slate-500 truncate">{job.department}</p>
                  </div>
                </div>
              );
            })}
            {selectedJobIds.length === 0 && (
              <p className="text-slate-400 italic text-center py-4">{t('noJobsSelected')}</p>
            )}
          </div>
        </Card>

      </div>

      {/* LEGAL NOTICE */}
      <Card className="p-4 border-2 border-warning/30 bg-warning/5">
        <p className="text-sm text-slate-600">
          <span className="font-bold text-warning">⚠️ {t('importantNotice')}:</span> {t('legalNotice')}
        </p>
      </Card>

      {/* FOOTER ACTIONS */}
      <div className="flex flex-col md:flex-row gap-4 pt-4 justify-between items-center">
        <Button variant="ghost" onClick={() => setStep(2)} className="text-slate-400 hover:text-slate-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> {tCommon('back')}
        </Button>
        <Button 
          variant="action" 
          size="lg" 
          onClick={handleSign} 
          className="w-full md:w-auto px-12 text-lg"
          disabled={selectedJobIds.length === 0}
        >
          {t('signWithBankID')}
        </Button>
      </div>

      {/* BANKID MODAL */}
      <Dialog open={isSigning} onOpenChange={() => { /* Prevent closing during signing */ }}>
        <DialogContent className="sm:max-w-md text-center p-8 md:p-12" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold font-heading text-slate-900">
              {tBankId('title')}
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              {signStep === 'opening' && tBankId('openApp')}
              {signStep === 'waiting' && tBankId('waiting')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center py-8">
            <div className="relative">
              {/* BankID Logo Simulation */}
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-[#1B4D5C] to-[#0D2F3A] flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <span className="text-3xl font-black text-white tracking-tight">Bank</span>
                  <span className="text-3xl font-black text-[#7BC144] tracking-tight">ID</span>
                </div>
              </div>
              {signStep === 'waiting' && (
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-lg">
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                </div>
              )}
              {signStep === 'opening' && (
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-lg animate-pulse">
                  <div className="h-6 w-6 rounded-full bg-warning" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-900 font-mono">
              {personalInfo.personnummer || 'YYMMDD-XXXX'}
            </p>
            <p className="text-xs text-slate-500">
              Feriearbete.se — Kramfors Kommun
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center gap-2 pt-4">
            <div className={`h-2 w-2 rounded-full transition-colors ${signStep === 'opening' || signStep === 'waiting' ? 'bg-primary' : 'bg-slate-200'}`} />
            <div className={`h-2 w-2 rounded-full transition-colors ${signStep === 'waiting' ? 'bg-primary' : 'bg-slate-200'}`} />
            <div className={`h-2 w-2 rounded-full transition-colors ${signStep === 'success' ? 'bg-primary' : 'bg-slate-200'}`} />
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

