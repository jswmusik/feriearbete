'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { MOCK_APPLICATIONS, Application } from '@/lib/mock-applications';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Shuffle, Briefcase, Calendar, MapPin, 
  Clock, CheckCircle2, XCircle, FileText
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Helper for status colors
const getStatusBadge = (status: string, t: (key: string) => string) => {
  const styles: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    interview: "bg-purple-100 text-primary border-primary/20",
    offered: "bg-tiffany text-white",
    accepted: "bg-success text-white",
    rejected: "bg-slate-100 text-slate-500",
    reserve: "bg-orange-100 text-orange-700",
    withdrawn: "bg-slate-100 text-slate-400 line-through",
  };

  const icons: Record<string, React.ElementType> = {
    interview: Calendar,
    offered: CheckCircle2,
    rejected: XCircle,
    pending: Clock,
  };

  const Icon = icons[status] || null;

  return (
    <Badge variant="outline" className={cn("border-0 px-2.5 py-0.5", styles[status] || "bg-slate-100")}>
      {Icon && <Icon className="w-3 h-3 mr-1.5" />}
      <span>{t(status)}</span>
    </Badge>
  );
};

export default function MyApplicationsPage() {
  const t = useTranslations('profile.applications');
  const tStatus = useTranslations('status');
  const tCommon = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;

  // Filter applications for "Liam" (our mock user)
  const myApps = MOCK_APPLICATIONS.filter(app => app.firstName === 'Liam');
  
  const lotteryApps = myApps.filter(app => app.type === 'lottery');
  const standardApps = myApps.filter(app => app.type === 'standard');

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-slate-900">{t('title')}</h1>
          <p className="text-slate-500">{t('subtitle')}</p>
        </div>

        <div className="grid gap-8">
          
          {/* SECTION 1: LOTTERY APPS */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-tiffany/10 flex items-center justify-center">
                <Shuffle className="h-4 w-4 text-tiffany" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">{t('lotterySection')}</h2>
            </div>

            {lotteryApps.length > 0 ? (
              <div className="grid gap-4">
                {lotteryApps.map(app => (
                  <Card key={app.id} className="border-2 border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-tiffany/5 to-transparent border-b border-slate-100 p-4 flex justify-between items-center">
                      <div className="flex gap-2">
                        <Badge className="bg-white border-slate-200 text-slate-600 hover:bg-white">
                          {t('season')} 2026
                        </Badge>
                        {app.guardianStatus === 'pending' && (
                          <Badge variant="destructive" className="animate-pulse">
                            {t('signatureRequired')}
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-mono">ID: {app.id}</span>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                        <div className="space-y-4 flex-1">
                          <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{t('yourChoices')}</p>
                            <div className="flex flex-wrap gap-2">
                              {app.choices?.map((choiceId, i) => (
                                <Badge key={choiceId} variant="secondary" className="bg-slate-100 text-slate-700 border-0 py-1.5 px-3">
                                  <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs mr-2 font-bold">
                                    {i + 1}
                                  </span>
                                  Jobb ID #{choiceId}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-6 text-sm text-slate-600">
                            <span className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-slate-400" /> {t('submitted')}: {app.submittedAt}
                            </span>
                            <span className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-slate-400" /> {app.area}
                            </span>
                          </div>
                        </div>

                        <div className="w-full md:w-auto flex flex-col gap-3 min-w-[200px]">
                          <div className="text-right mb-2">
                            <p className="text-xs text-slate-400 font-medium uppercase mb-1">Status</p>
                            {getStatusBadge(app.status, tStatus)}
                          </div>
                          <Link href={`/${locale}/application`} className="w-full">
                            <Button variant="outline" className="w-full border-2">
                              {tCommon('viewDetails')}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState type="lottery" locale={locale} t={t} />
            )}
          </section>

          <Separator className="my-4" />

          {/* SECTION 2: STANDARD APPS */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">{t('standardSection')}</h2>
            </div>

            {standardApps.length > 0 ? (
              <div className="grid gap-4">
                {standardApps.map(app => (
                  <Card key={app.id} className="border-2 border-slate-200 hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6 justify-between">
                        
                        <div className="flex gap-4">
                          <div className="h-12 w-12 rounded-xl bg-purple-light flex items-center justify-center shrink-0">
                            <Briefcase className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-slate-900">{app.jobTitle}</h3>
                            <p className="text-sm text-slate-500 font-medium mb-3">{app.employer}</p>
                            
                            {app.interviewDate && (
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-md text-sm font-medium border border-purple-100">
                                <Calendar className="h-4 w-4" /> 
                                {t('interview')}: {app.interviewDate}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-4">
                          {getStatusBadge(app.status, tStatus)}
                          
                          <div className="flex gap-2 w-full md:w-auto">
                            {app.status === 'offered' ? (
                              <Button className="bg-success hover:bg-success/90 text-white flex-1">
                                {t('viewOffer')}
                              </Button>
                            ) : (
                              <Button variant="ghost" className="text-slate-400 hover:text-red-500 flex-1">
                                {t('withdraw')}
                              </Button>
                            )}
                            <Button variant="outline" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState type="standard" locale={locale} t={t} />
            )}
          </section>

        </div>
      </div>
    </div>
  );
}

function EmptyState({ type, locale, t }: { type: 'lottery' | 'standard'; locale: string; t: (key: string) => string }) {
  return (
    <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50">
      <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
        {type === 'lottery' ? <Shuffle className="h-6 w-6 text-slate-300" /> : <Briefcase className="h-6 w-6 text-slate-300" />}
      </div>
      <p className="text-slate-500 font-medium">{t('noApplications')}</p>
      <Link href={`/${locale}/jobs`} className="text-primary font-bold text-sm hover:underline mt-1 block">
        {t('findJobs')} →
      </Link>
    </div>
  );
}

