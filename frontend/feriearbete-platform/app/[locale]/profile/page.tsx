'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { MOCK_JOBS_DATA } from '@/lib/mock-jobs-data';
import { StatusTracker } from '@/components/youth/status-tracker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, Edit2, LogOut, Heart, Briefcase, Calendar, 
  MapPin, Clock, Bell, ChevronRight, FileText, User 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const t = useTranslations('profile');
  const tCommon = useTranslations('common');
  const tCats = useTranslations('categories');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { user, logout } = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    if (!user) {
      // Uncomment to force login in production
      // router.push(`/${locale}/auth/login`); 
    }
  }, [user, router, locale]);

  if (!isClient) return null; // or a loading spinner

  // Fallback to "Mock Liam" if viewing page without login during dev
  const profileName = user?.name || "Gäst Användare";
  const profileEmail = user?.email || "gast@exempel.se";
  const initials = profileName.substring(0, 2).toUpperCase();
  
  // Real Data Logic: Filter jobs based on the User's saved IDs
  const savedJobs = MOCK_JOBS_DATA.filter(job => user?.savedJobIds?.includes(job.id));
  
  // Mock logic for status (since we haven't built the full backend yet)
  const appStatus = 'guardian_pending';
  const guardianName = 'Maria Andersson'; // This would come from user.guardianName

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      
      {/* Profile Header */}
      <div className="bg-white border-b-2 border-slate-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gradient-to-br from-primary to-purple-dark rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {initials}
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading text-slate-900">{profileName}</h1>
                <p className="text-slate-500 font-mono text-sm">{profileEmail}</p>
                <Badge className="mt-2 bg-warning text-white border-0">
                  Väntar på målsman
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-slate-600">
                <Bell className="mr-2 h-4 w-4" /> Notiser
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logga ut
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 grid lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          
          {/* Action Alert */}
          <Card className="border-2 border-warning/30 bg-gradient-to-br from-warning/5 to-warning/10 overflow-hidden">
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="bg-warning text-white p-2.5 rounded-xl h-10 w-10 flex items-center justify-center shrink-0 shadow-sm">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">Signering krävs!</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Din ansökan är inte klar förrän <strong>{guardianName}</strong> har signerat.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button size="sm" className="bg-warning hover:bg-warning/90 text-white border-0 flex-1">
                      <Share2 className="mr-2 h-4 w-4" /> Skicka påminnelse
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Tracker */}
          <StatusTracker currentStatus={appStatus} guardianName={guardianName} />

          {/* Quick Actions */}
          <Card className="border-2 border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-900">Snabbåtgärder</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              <Link href={`/${locale}/application`} className="block">
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <Edit2 className="h-4 w-4 text-slate-400" /> Redigera ansökan
                </Button>
              </Link>
              <Link href={`/${locale}/profile/cv`} className="block">
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <FileText className="h-4 w-4 text-slate-400" /> Uppdatera CV
                </Button>
              </Link>
              <Link href={`/${locale}/profile/settings`} className="block">
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <User className="h-4 w-4 text-slate-400" /> Inställningar
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          
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

            {savedJobs.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {savedJobs.map(job => (
                  <Link key={job.id} href={`/${locale}/jobs/${job.id}`} className="block">
                    <Card className="border-2 border-slate-200 hover:border-coral/50 hover:shadow-md transition-all h-full">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <Badge className="rounded-sm border-0 font-bold text-xs bg-slate-100 text-slate-700">
                            {tCats(job.category as keyof typeof tCats)}
                          </Badge>
                          <Heart className="h-5 w-5 text-coral fill-coral" />
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1 line-clamp-1">{job.title}</h3>
                        <p className="text-sm text-slate-500 mb-3">{job.employer}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {job.location}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50">
                <Heart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">Du har inga sparade jobb än.</p>
                <Link href={`/${locale}/jobs`} className="text-primary font-bold hover:underline mt-2 block">
                  Gå till jobbsöket →
                </Link>
              </div>
            )}
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
