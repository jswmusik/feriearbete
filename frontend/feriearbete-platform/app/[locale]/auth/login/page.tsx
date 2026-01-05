'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const handleBankIDLogin = () => {
    setIsLoading(true);
    
    // Simulate API call & BankID delay
    setTimeout(() => {
      // 1. Create a dummy user
      const mockUser = {
        id: 'user_123',
        name: 'Anna Svensson', // Different name to prove it works!
        email: 'anna.svensson@example.com',
        role: 'youth' as const,
        personnummer: '20080101-1234',
        savedJobIds: ['2', '5'] // Simulating pre-saved jobs
      };

      // 2. Save to store
      login(mockUser);

      // 3. Redirect
      setIsLoading(false);
      router.push(`/${locale}/profile`);
    }, 2000);
  };

  const handleEmailLogin = () => {
    // For demo, also login with mock user
    const mockUser = {
      id: 'user_456',
      name: 'Erik Johansson',
      email: 'erik.johansson@example.com',
      role: 'youth' as const,
      personnummer: '20070515-5678',
      savedJobIds: ['1', '3', '7']
    };

    login(mockUser);
    router.push(`/${locale}/profile`);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-heading text-slate-900">{t('loginTitle')}</h1>
        <p className="text-slate-500 mt-2">{t('loginSubtitle')}</p>
      </div>

      <div className="space-y-6">
        
        {/* Primary Method: BankID */}
        <Button 
          variant="action" 
          size="lg" 
          className="w-full h-16 text-lg bg-[#183E4E] hover:bg-[#112b36] border-b-4 border-[#0d222b] active:border-b-0 active:translate-y-1 transition-all"
          onClick={handleBankIDLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            <svg className="mr-3 h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          )}
          {isLoading ? t('openingBankID') : t('loginWithBankID')}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-50 px-2 text-slate-500">{t('orWithEmail')}</span>
          </div>
        </div>

        {/* Legacy Method: Email */}
        <Card className="p-6 border-2 border-slate-200 bg-white">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input id="email" type="email" placeholder="namn@exempel.se" className="bg-white" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">{t('password')}</Label>
                <Link href="#" className="text-xs text-primary font-bold hover:underline">
                  {t('forgotPassword')}
                </Link>
              </div>
              <Input id="password" type="password" className="bg-white" />
            </div>
            <Button className="w-full h-12 font-bold" onClick={handleEmailLogin}>
              {t('loginButton')}
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm">
          <span className="text-slate-500">{t('noAccount')} </span>
          <Link href={`/${locale}/auth/register`} className="font-bold text-primary hover:underline">
            {t('registerLink')}
          </Link>
        </div>

      </div>
    </div>
  );
}
