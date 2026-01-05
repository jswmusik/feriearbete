'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useApplicationStore } from '@/store/application-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, User, MapPin, Phone, Mail } from 'lucide-react';

export function StepPersonalInfo() {
  const t = useTranslations('application');
  const tCommon = useTranslations('common');
  const { personalInfo, updatePersonalInfo, nextStep } = useApplicationStore();
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validate = () => {
    // Simple validation "mock" - in real app use Zod
    const newErrors: Record<string, boolean> = {};
    if (!personalInfo.firstName) newErrors.firstName = true;
    if (!personalInfo.lastName) newErrors.lastName = true;
    if (!personalInfo.personnummer || personalInfo.personnummer.length < 10) newErrors.personnummer = true;
    if (!personalInfo.phone) newErrors.phone = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-2">
        <h2 className="text-3xl font-bold font-heading text-slate-900">{t('personalInfo')}</h2>
        <p className="text-slate-500">{t('personalInfoDescription')}</p>
      </div>

      <Card className="p-6 md:p-8 space-y-8 border-2 border-slate-200 shadow-sm">
        {/* IDENTITY */}
        <div className="space-y-4">
          <Label className="text-xs font-bold uppercase text-slate-400 tracking-wider">{t('identity')}</Label>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pnr">{t('personnummer')}</Label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-100 border-r-2 border-slate-200 flex items-center justify-center rounded-l-md">
                  <User className="text-slate-400 h-5 w-5" />
                </div>
                <Input 
                  id="pnr"
                  placeholder="YYMMDD-XXXX" 
                  className={cn(
                    "pl-14 font-mono text-lg",
                    errors.personnummer && "border-red-500 bg-red-50"
                  )}
                  value={personalInfo.personnummer}
                  onChange={(e) => updatePersonalInfo({ personnummer: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>{t('firstName')}</Label>
              <Input 
                placeholder={t('firstNamePlaceholder')}
                className={cn(errors.firstName && "border-red-500")}
                value={personalInfo.firstName}
                onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('lastName')}</Label>
              <Input 
                placeholder={t('lastNamePlaceholder')}
                className={cn(errors.lastName && "border-red-500")}
                value={personalInfo.lastName}
                onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div className="space-y-4">
          <Label className="text-xs font-bold uppercase text-slate-400 tracking-wider">{t('contactDetails')}</Label>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>{t('email')}</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <Input 
                  className="pl-12" 
                  placeholder="namn@example.com"
                  value={personalInfo.email}
                  onChange={(e) => updatePersonalInfo({ email: e.target.value })} 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('phone')}</Label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <Input 
                  className={cn("pl-12", errors.phone && "border-red-500")}
                  placeholder="070-123 45 67"
                  value={personalInfo.phone}
                  onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* EDUCATION */}
        <div className="space-y-4">
          <Label className="text-xs font-bold uppercase text-slate-400 tracking-wider">{t('schoolAndArea')}</Label>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>{t('school')}</Label>
              <Select onValueChange={(val) => updatePersonalInfo({ school: val })} value={personalInfo.school}>
                <SelectTrigger className="h-12 w-full rounded-md border-2 border-slate-200 bg-white px-3 text-base">
                  <SelectValue placeholder={t('selectSchool')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gymnasiet">Ådalsskolan (Gymnasiet)</SelectItem>
                  <SelectItem value="gudmundra">Gudmundråskolan</SelectItem>
                  <SelectItem value="other">{t('otherSchool')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t('livingArea')}</Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <Input 
                  className="pl-12" 
                  placeholder={t('livingAreaPlaceholder')}
                  value={personalInfo.city}
                  onChange={(e) => updatePersonalInfo({ city: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* DRIVER LICENSE (Radio Cards) */}
        <div className="space-y-4">
          <Label className="text-sm font-bold">{t('driversLicense')}</Label>
          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => updatePersonalInfo({ hasDriverLicense: true })}
              className={cn(
                "cursor-pointer h-16 rounded-md border-2 flex items-center justify-center font-bold transition-all",
                personalInfo.hasDriverLicense === true 
                  ? "border-primary bg-primary/5 text-primary" 
                  : "border-slate-200 bg-white hover:border-slate-300 text-slate-600"
              )}
            >
              {tCommon('yes')}
            </div>
            <div 
              onClick={() => updatePersonalInfo({ hasDriverLicense: false })}
              className={cn(
                "cursor-pointer h-16 rounded-md border-2 flex items-center justify-center font-bold transition-all",
                personalInfo.hasDriverLicense === false 
                  ? "border-primary bg-primary/5 text-primary" 
                  : "border-slate-200 bg-white hover:border-slate-300 text-slate-600"
              )}
            >
              {tCommon('no')}
            </div>
          </div>
        </div>

      </Card>

      <div className="flex justify-end pt-4">
        <Button variant="action" size="lg" onClick={handleNext} className="w-full md:w-auto px-12">
          {tCommon('next')} <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

