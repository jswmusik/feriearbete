'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MOCK_GUARDIAN, getChildStatusLabel, getChildStatusColor } from '@/lib/mock-guardian-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  ShieldCheck, User, Clock, CheckCircle2, Loader2, ArrowRight, 
  Lock, AlertTriangle, FileText, Phone, Mail, Briefcase, Calendar,
  ExternalLink, HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GuardianPage() {
  const tBankId = useTranslations('bankid');
  
  // States: 'login' -> 'dashboard' -> 'success'
  const [viewState, setViewState] = useState<'login' | 'dashboard' | 'success'>('login');
  const [isSigning, setIsSigning] = useState(false);
  const [signedChildren, setSignedChildren] = useState<string[]>([]);

  // Simulate Login
  const handleLogin = () => {
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      setViewState('dashboard');
    }, 2000);
  };

  // Simulate Approval Signature
  const handleApprove = (childId: string) => {
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      setSignedChildren(prev => [...prev, childId]);
      setViewState('success');
    }, 2500);
  };

  // 1. LOGIN SCREEN
  if (viewState === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4 font-sans">
        <Card className="w-full max-w-md border-2 border-slate-200 shadow-xl overflow-hidden">
          <CardHeader className="text-center space-y-4 pb-8 bg-gradient-to-b from-white to-slate-50">
            <div className="h-20 w-20 bg-gradient-to-br from-purple-dark to-primary text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-heading font-extrabold text-slate-900">
                Vårdnadshavarportalen
              </CardTitle>
              <CardDescription className="text-base">
                Logga in för att godkänna feriejobbsansökningar för dina barn.
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6 p-6">
            <div className="bg-purple-light/30 p-4 rounded-lg border border-primary/10">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-bold text-slate-900">Säker inloggning</p>
                  <p className="text-slate-600">
                    Vi använder BankID för att verifiera din identitet och koppla dig till ditt barns ansökan.
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full h-14 text-lg bg-[#183E4E] hover:bg-[#112b36] border-0 shadow-md"
              onClick={handleLogin}
              disabled={isSigning}
            >
              {isSigning ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Identifierar...
                </>
              ) : (
                <>
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  Logga in med BankID
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-slate-400">
              Genom att logga in godkänner du vår <a href="#" className="underline hover:text-primary">integritetspolicy</a>.
            </p>
          </CardContent>
          
          <CardFooter className="justify-center border-t bg-slate-50 py-4 flex-col gap-2">
            <p className="text-xs text-slate-500">Problem att logga in?</p>
            <Button variant="link" size="sm" className="text-primary h-auto p-0">
              <HelpCircle className="mr-1 h-3 w-3" /> Kontakta Medborgarservice
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // 2. SUCCESS SCREEN
  if (viewState === 'success') {
    const signedChild = MOCK_GUARDIAN.children.find(c => signedChildren.includes(c.id));
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="text-center space-y-8 animate-in zoom-in-95 duration-500 max-w-lg">
          <div className="relative">
            <div className="h-28 w-28 bg-success text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="h-14 w-14" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md border border-slate-200">
              <span className="text-success font-bold text-sm">✓ Signerat</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold font-heading text-slate-900">
              Tack för ditt godkännande!
            </h2>
            <p className="text-slate-500 text-lg">
              Vi har mottagit din signering för <strong className="text-slate-700">{signedChild?.name || 'ditt barns'}</strong> ansökan.
            </p>
          </div>

          <Card className="border-2 border-slate-200 text-left">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-slate-900">Vad händer nu?</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-xs">1</span>
                  </div>
                  Ansökan är nu komplett och deltager i lottningen.
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-xs">2</span>
                  </div>
                  Lottningen sker den 1 april 2026.
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-xs">3</span>
                  </div>
                  Ni får besked via e-post direkt efter lottningen.
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => setViewState('dashboard')}>
              Tillbaka till översikt
            </Button>
            <Button variant="default" className="bg-primary">
              <ExternalLink className="mr-2 h-4 w-4" /> Gå till Kramfors.se
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 3. DASHBOARD
  const pendingChildren = MOCK_GUARDIAN.children.filter(
    c => c.status === 'pending_signature' && !signedChildren.includes(c.id)
  );
  const completedChildren = MOCK_GUARDIAN.children.filter(
    c => c.status !== 'pending_signature' || signedChildren.includes(c.id)
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      
      {/* Header */}
      <div className="bg-white border-b-2 border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gradient-to-br from-primary to-purple-dark text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
              {MOCK_GUARDIAN.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-lg">{MOCK_GUARDIAN.name}</h1>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-success" /> Inloggad som vårdnadshavare
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setViewState('login')} className="text-slate-600">
            Logga ut
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">
        
        {/* Pending Section */}
        {pendingChildren.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-heading text-slate-900">Att göra</h2>
                <p className="text-sm text-slate-500">
                  {pendingChildren.length} ansökan väntar på ditt godkännande
                </p>
              </div>
            </div>

            {pendingChildren.map((child) => (
              <Card key={child.id} className="border-l-8 border-l-warning border-2 border-slate-200 overflow-hidden shadow-sm">
                <CardHeader className="bg-gradient-to-r from-warning/5 to-transparent border-b border-warning/10 pb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center border-2 border-warning/20 shadow-sm">
                        <User className="h-7 w-7 text-warning" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-slate-900">{child.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Calendar className="h-3 w-3" />
                          Ansökan inskickad {child.submittedAt}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-warning text-white border-0 px-3 py-1.5 font-bold">
                      <Clock className="mr-1.5 h-3 w-3" /> Signering krävs
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 space-y-6">
                  {/* Contact Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Mail className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">E-post</p>
                        <p className="text-slate-700 font-mono text-sm">{child.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Phone className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Telefon</p>
                        <p className="text-slate-700 font-mono text-sm">{child.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Job Choices */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Briefcase className="h-3 w-3" /> Valda jobb (i prioritetsordning)
                    </p>
                    <div className="space-y-2">
                      {child.jobChoices.map((job, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100"
                        >
                          <div className={cn(
                            "h-7 w-7 rounded-md flex items-center justify-center text-sm font-bold text-white",
                            i === 0 ? "bg-tiffany" : i === 1 ? "bg-primary" : "bg-slate-400"
                          )}>
                            {i + 1}
                          </div>
                          <span className="font-medium text-slate-700">{job}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Terms */}
                  <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 border-2 border-slate-100">
                    <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" /> Ditt godkännande innebär:
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        Att du godkänner att {child.name.split(' ')[0]} söker feriearbete i Kramfors kommun.
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        Att du intygar att kontaktuppgifterna ovan stämmer.
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        Att du tagit del av kommunens <a href="#" className="text-primary underline">regler för feriearbete</a>.
                      </li>
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="bg-slate-50/50 border-t-2 border-slate-100 p-4 flex flex-col sm:flex-row justify-end gap-3">
                  <Button 
                    variant="outline" 
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 sm:w-auto w-full"
                  >
                    Neka ansökan
                  </Button>
                  <Button 
                    variant="action" 
                    size="lg" 
                    onClick={() => handleApprove(child.id)}
                    disabled={isSigning}
                    className="pl-4 pr-6 sm:w-auto w-full"
                  >
                    {isSigning ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signerar...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="mr-2 h-5 w-5" />
                        Signera med BankID
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Completed Section */}
        {completedChildren.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-heading text-slate-900">Godkända ansökningar</h2>
                <p className="text-sm text-slate-500">{completedChildren.length} ansökan</p>
              </div>
            </div>

            {completedChildren.map((child) => (
              <Card key={child.id} className="border-2 border-slate-200 bg-slate-50/50">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-success/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-success" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{child.name}</h3>
                        <p className="text-sm text-slate-500">
                          {child.jobChoices.length} jobb valda • Signerad
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-success/10 text-success border-0">
                      Godkänd
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Info Box */}
        <Card className="bg-blue-50 border-blue-100 border-2">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-sm text-blue-800">
              <p className="font-bold text-blue-900">Viktigt datum</p>
              <p className="mt-1">
                Sista dag för att godkänna ansökningar är den <strong>31 mars 2026</strong>. 
                Ansökningar som inte signerats då kommer inte att inkluderas i lottningen.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="text-center pt-4">
          <p className="text-sm text-slate-500 mb-2">Har du frågor?</p>
          <Button variant="link" className="text-primary">
            <HelpCircle className="mr-1 h-4 w-4" /> Läs vanliga frågor och svar
          </Button>
        </div>

      </div>
    </div>
  );
}

