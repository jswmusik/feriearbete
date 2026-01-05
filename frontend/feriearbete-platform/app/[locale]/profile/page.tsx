import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { MOCK_YOUTH_PROFILE, getSavedJobs, getSelectedJobs, getStatusLabel, getStatusColor } from '@/lib/mock-youth-profile';
import { StatusTracker } from '@/components/youth/status-tracker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, Edit2, LogOut, Heart, Briefcase, Calendar, 
  MapPin, Clock, Bell, ChevronRight, FileText, User
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('profile');
  const tCommon = await getTranslations('common');
  const tCats = await getTranslations('categories');
  
  const savedJobs = getSavedJobs();
  const selectedJobs = getSelectedJobs();

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      
      {/* Profile Header */}
      <div className="bg-white border-b-2 border-slate-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gradient-to-br from-primary to-purple-dark rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {MOCK_YOUTH_PROFILE.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading text-slate-900">{MOCK_YOUTH_PROFILE.name}</h1>
                <p className="text-slate-500 font-mono text-sm">{MOCK_YOUTH_PROFILE.email}</p>
                <Badge className={cn("mt-2", getStatusColor(MOCK_YOUTH_PROFILE.status), "text-white border-0")}>
                  {getStatusLabel(MOCK_YOUTH_PROFILE.status)}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-slate-600">
                <Bell className="mr-2 h-4 w-4" /> Notiser
              </Button>
              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
                <LogOut className="mr-2 h-4 w-4" /> Logga ut
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 grid lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Status & Actions */}
        <div className="space-y-6">
          
          {/* Action Alert (If waiting for Guardian) */}
          {MOCK_YOUTH_PROFILE.status === 'guardian_pending' && (
            <Card className="border-2 border-warning/30 bg-gradient-to-br from-warning/5 to-warning/10 overflow-hidden">
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <div className="bg-warning text-white p-2.5 rounded-xl h-10 w-10 flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">Signering krävs!</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Din ansökan är inte klar förrän <strong>{MOCK_YOUTH_PROFILE.guardianName}</strong> har signerat.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Button size="sm" className="bg-warning hover:bg-warning/90 text-white border-0 flex-1">
                        <Share2 className="mr-2 h-4 w-4" /> Skicka påminnelse
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-warning/30 text-warning hover:bg-warning/10">
                        Kopiera länk
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status Tracker */}
          <StatusTracker 
            currentStatus={MOCK_YOUTH_PROFILE.status} 
            guardianName={MOCK_YOUTH_PROFILE.guardianName}
          />

          {/* Quick Actions */}
          <Card className="border-2 border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-900">Snabbåtgärder</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              <Link href={`/${locale}/application`} className="block">
                <Button variant="outline" className="w-full justify-start gap-3 h-12 text-slate-700 hover:text-primary hover:border-primary">
                  <Edit2 className="h-4 w-4 text-slate-400" /> Redigera ansökan
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start gap-3 h-12 text-slate-700 hover:text-primary hover:border-primary">
                <FileText className="h-4 w-4 text-slate-400" /> Visa kvitto
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12 text-slate-700 hover:text-primary hover:border-primary">
                <User className="h-4 w-4 text-slate-400" /> Uppdatera profil
              </Button>
            </CardContent>
          </Card>

          {/* Application Info */}
          <Card className="border-2 border-slate-200 bg-slate-50">
            <CardContent className="p-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ansökningsinfo</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Ansökningsdatum</span>
                  <span className="font-mono font-bold text-slate-900">{MOCK_YOUTH_PROFILE.applicationDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Valda jobb</span>
                  <span className="font-bold text-slate-900">{selectedJobs.length} st</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Målsman</span>
                  <span className="font-medium text-slate-900">{MOCK_YOUTH_PROFILE.guardianName}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Jobs & Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Selected Jobs (From Application) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-heading text-slate-900">Dina jobbval</h2>
                  <p className="text-sm text-slate-500">I prioritetsordning</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0 font-bold">
                {selectedJobs.length} / 5
              </Badge>
            </div>

            <div className="space-y-3">
              {selectedJobs.map((job, index) => (
                <Card key={job.id} className="border-2 border-slate-200 hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center text-lg font-bold text-white shrink-0",
                        index === 0 ? "bg-tiffany" : index === 1 ? "bg-primary" : "bg-slate-400"
                      )}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 truncate">{job.title}</h3>
                        <p className="text-sm text-slate-500 truncate">{job.employer}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {job.period}
                        </span>
                      </div>
                      <Link href={`/${locale}/jobs/${job.id}`}>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Saved Jobs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-coral/10 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-coral fill-coral" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-heading text-slate-900">Sparade jobb</h2>
                  <p className="text-sm text-slate-500">Jobb du har gillat</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-coral/10 text-coral border-0 font-bold">
                {savedJobs.length}
              </Badge>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {savedJobs.map(job => (
                <Link key={job.id} href={`/${locale}/jobs/${job.id}`} className="block">
                  <Card className="border-2 border-slate-200 hover:border-coral/50 hover:shadow-md transition-all h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <Badge className={cn(
                          "rounded-sm border-0 font-bold text-xs",
                          job.category === 'parkWork' ? "bg-success text-white" :
                          job.category === 'kids' ? "bg-warning text-slate-900" :
                          "bg-primary text-white"
                        )}>
                          {tCats(job.category as keyof typeof tCats).toUpperCase()}
                        </Badge>
                        <Heart className="h-5 w-5 text-coral fill-coral" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 mb-1">{job.title}</h3>
                      <p className="text-sm text-slate-500 mb-3">{job.employer}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {job.period}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              
              {/* "Find More" Placeholder Card */}
              <Link 
                href={`/${locale}/jobs`}
                className="group flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-xl hover:border-primary hover:bg-primary/5 transition-all min-h-[200px]"
              >
                <div className="h-14 w-14 bg-slate-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:scale-110 transition-all">
                  <span className="text-3xl text-slate-400 group-hover:text-primary font-light">+</span>
                </div>
                <p className="font-bold text-slate-700 group-hover:text-primary">Hitta fler jobb</p>
                <p className="text-sm text-slate-400 text-center mt-2 px-4">
                  Utforska alla lediga feriejobb i din kommun
                </p>
              </Link>
            </div>
          </div>

          {/* Help Card */}
          <Card className="bg-gradient-to-r from-purple-dark to-primary text-white border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-6 md:p-8 relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold font-heading text-xl mb-2">Har du frågor?</h3>
                  <p className="text-purple-200 text-sm max-w-md">
                    Kontakta oss om du har frågor om din ansökan eller sommarjobben.
                  </p>
                </div>
                <Button className="bg-white text-purple-dark hover:bg-slate-100 border-0 font-bold shrink-0">
                  Kontakta oss
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}

