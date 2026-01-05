'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, Users, Plus, TrendingUp, MoreHorizontal, 
  Clock, Building2, LogOut
} from 'lucide-react';

const MY_JOBS = [
  { id: '9', title: 'Butiksbiträde', applicants: 12, status: 'active', views: 450, expires: '15 apr' },
  { id: '12', title: 'Lagerarbetare (Extra)', applicants: 5, status: 'draft', views: 0, expires: '-' },
];

const RECENT_APPLICANTS = [
  { id: 1, name: 'Liam Andersson', job: 'Butiksbiträde', date: 'Idag 10:30', match: '90%' },
  { id: 2, name: 'Emma Karlsson', job: 'Butiksbiträde', date: 'Igår 14:15', match: '85%' },
  { id: 3, name: 'Noah Svensson', job: 'Butiksbiträde', date: '25 feb', match: '70%' },
];

export default function EmployerDashboard() {
  const t = useTranslations('employer');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Navbar */}
      <div className="bg-white border-b-2 border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 font-bold text-xl text-slate-900">
            <div className="h-10 w-10 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold">
              I
            </div>
            <span>ICA Supermarket</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/employer/jobs/create`}>
              <Button variant="action" size="sm" className="h-10">
                <Plus className="mr-2 h-4 w-4" /> {t('postJob')}
              </Button>
            </Link>
            <Link href={`/${locale}/employer/login`}>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">{t('dashboard')}</h1>
          <p className="text-slate-500 mt-1">Välkommen tillbaka! Här är en överblick av era annonser.</p>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 border-slate-200">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <Briefcase className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">{t('activeAds')}</p>
                <p className="text-4xl font-extrabold text-slate-900">1</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-slate-200">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 bg-tiffany/10 text-tiffany rounded-xl flex items-center justify-center">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">{t('totalApplicants')}</p>
                <p className="text-4xl font-extrabold text-slate-900">12</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-slate-200">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 bg-warning/10 text-warning rounded-xl flex items-center justify-center">
                <TrendingUp className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">{t('views')}</p>
                <p className="text-4xl font-extrabold text-slate-900">450</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Active Jobs List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">{t('activeAds')}</h2>
            
            {MY_JOBS.map((job) => (
              <Card key={job.id} className="border-2 border-slate-200 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                        <Badge 
                          variant={job.status === 'active' ? 'default' : 'secondary'} 
                          className={job.status === 'active' ? 'bg-success hover:bg-success' : ''}
                        >
                          {job.status === 'active' ? t('status.active') : t('status.draft')}
                        </Badge>
                      </div>
                      <div className="flex gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" /> {job.applicants} {t('applicants')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> {t('expires')} {job.expires}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5 text-slate-400" />
                    </Button>
                  </div>
                  
                  {job.status === 'active' && (
                    <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3">
                      <Button variant="outline" size="sm" className="flex-1 h-10">
                        {t('editAd')}
                      </Button>
                      <Button variant="default" size="sm" className="flex-1 h-10 bg-primary">
                        {t('viewCandidates')}
                      </Button>
                    </div>
                  )}
                  
                  {job.status === 'draft' && (
                    <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3">
                      <Button variant="outline" size="sm" className="flex-1 h-10">
                        {t('editAd')}
                      </Button>
                      <Button variant="action" size="sm" className="flex-1 h-10">
                        Publicera
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Empty State */}
            {MY_JOBS.length === 0 && (
              <Card className="border-2 border-dashed border-slate-300 bg-slate-50">
                <CardContent className="p-12 text-center">
                  <Building2 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-slate-700 mb-2">{t('noJobs')}</h3>
                  <Link href={`/${locale}/employer/jobs/create`}>
                    <Button variant="action">{t('createFirst')}</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recent Candidates */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">{t('recentApplications')}</h2>
            <Card className="border-2 border-slate-200">
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {RECENT_APPLICANTS.map((app) => (
                    <div key={app.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-purple-light text-primary rounded-full flex items-center justify-center font-bold text-sm">
                          {app.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900">{app.name}</p>
                          <p className="text-xs text-slate-500">{app.job}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-white text-xs mb-1 border-slate-200">
                          {t('match')}: {app.match}
                        </Badge>
                        <p className="text-[10px] text-slate-400">{app.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-slate-100 text-center">
                  <Button variant="ghost" size="sm" className="text-xs text-primary w-full">
                    {t('viewAllApplicants')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}

