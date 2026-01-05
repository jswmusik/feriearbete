'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Building2, ArrowRight, Lock } from 'lucide-react';

export default function EmployerLoginPage() {
  const t = useTranslations('employer');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/${locale}/employer/dashboard`);
    }, 1500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      
      {/* Brand Section - Dark Professional Theme */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 text-white p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-tiffany blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-slate-600 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-tiffany" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Feriearbete.se <span className="text-slate-400 font-normal">/ Partner</span>
            </span>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold font-heading mb-6 leading-tight">
            {t('brandTagline').split(' ').slice(0, 2).join(' ')} <br />
            <span className="text-tiffany">{t('brandTagline').split(' ').slice(2).join(' ')}</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-md">
            {t('brandDescription')}
          </p>
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          © 2026 Feriearbete Partner
        </div>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md space-y-8">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
            <div className="h-10 w-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-tiffany" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Feriearbete <span className="text-slate-400 font-normal">/ Partner</span>
            </span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold font-heading text-slate-900">{t('loginTitle')}</h2>
            <p className="text-slate-500 mt-2">{t('loginSubtitle')}</p>
          </div>

          <Card className="p-8 border-2 border-slate-200 shadow-lg">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label>{t('companyName')}</Label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <Input className="pl-12 h-12" placeholder="T.ex. ICA Supermarket" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>{tCommon('login')}</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <Input className="pl-12 h-12" type="password" placeholder="••••••••" />
                </div>
              </div>

              <Button 
                className="w-full h-12 text-lg font-bold bg-slate-900 hover:bg-slate-800" 
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? t('loggingIn') : t('loginAsCompany')} 
                {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </div>
          </Card>

          <div className="text-center text-sm">
            <Link href={`/${locale}`} className="text-slate-500 hover:text-slate-900 flex items-center justify-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" /> {t('backToHome')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

