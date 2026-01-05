import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { MOCK_JOBS_DATA, getJobById } from '@/lib/mock-jobs-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ApplyButtonClient } from '@/components/jobs/apply-button-client';
import { 
  MapPin, Calendar, Users, ArrowLeft, ArrowRight, 
  Clock, Coins, CheckCircle2, Building2, Sparkles, Heart,
  Shuffle, Briefcase, FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Category color mapping
const getCategoryColor = (cat: string) => {
  switch(cat) {
    case 'parkWork': return 'bg-success text-white';
    case 'elderlyCare': return 'bg-coral text-white';
    case 'kids': return 'bg-warning text-slate-900';
    case 'culture': return 'bg-tiffany text-white';
    case 'administration': return 'bg-purple-light text-primary';
    case 'it': return 'bg-info text-white';
    default: return 'bg-primary text-white';
  }
};

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations('jobs');
  const tCats = await getTranslations('categories');
  const tCommon = await getTranslations('common');
  
  // Find the job
  const job = getJobById(id);

  if (!job) {
    notFound();
  }

  const isLottery = job.type === 'lottery';

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-8 font-sans">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Breadcrumb / Back */}
        <Link 
          href={`/${locale}/jobs`}
          className="inline-flex items-center text-slate-500 hover:text-primary font-medium mb-8 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
          Tillbaka till alla jobb
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* MAIN CONTENT (Left Col) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Card */}
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
              {/* Job Type Badge */}
              <div className="absolute top-0 right-0">
                {isLottery ? (
                  <div className="bg-tiffany text-white text-xs font-bold px-4 py-2 rounded-bl-xl flex items-center gap-2">
                    <Shuffle className="h-4 w-4" /> Feriejobb (Lottning)
                  </div>
                ) : (
                  <div className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-bl-xl flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> CV-ansökan
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4 mt-2">
                <Badge className={cn("rounded-md border-0 font-bold px-3 py-1", getCategoryColor(job.category))}>
                  {tCats(job.category as keyof typeof tCats).toUpperCase()}
                </Badge>
                {job.featured && (
                  <Badge className="bg-warning text-slate-900 border-0 rounded-md px-3 py-1 font-bold flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> POPULÄR
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 mb-3 tracking-tight">
                {job.title}
              </h1>
              <div className="flex items-center gap-2 text-lg text-slate-500 font-medium">
                <Building2 className="h-5 w-5" />
                {job.employer}
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="space-y-1 p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Period</p>
                  <div className="flex items-center font-bold text-slate-900">
                    <Calendar className="mr-2 h-4 w-4 text-primary" /> {job.period}
                  </div>
                </div>
                <div className="space-y-1 p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plats</p>
                  <div className="flex items-center font-bold text-slate-900">
                    <MapPin className="mr-2 h-4 w-4 text-primary" /> {job.location}
                  </div>
                </div>
                <div className="space-y-1 p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Antal</p>
                  <div className="flex items-center font-bold text-slate-900">
                    <Users className="mr-2 h-4 w-4 text-primary" /> {job.seats} st
                  </div>
                </div>
                <div className="space-y-1 p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lön</p>
                  <div className="flex items-center font-bold text-slate-900">
                    <Coins className="mr-2 h-4 w-4 text-primary" /> {job.salary}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-8">
              <section className="bg-white rounded-xl border-2 border-slate-200 p-6 md:p-8">
                <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">Om jobbet</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {job.description}
                </p>
              </section>

              <section className="bg-white rounded-xl border-2 border-slate-200 p-6 md:p-8">
                <h3 className="text-xl font-bold font-heading text-slate-900 mb-6">Dina arbetsuppgifter</h3>
                <ul className="grid gap-3">
                  {job.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border-2 border-slate-100 hover:border-primary/20 transition-colors">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold text-sm">{i + 1}</span>
                      </div>
                      <span className="font-medium text-slate-700 pt-1">{task}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white rounded-xl border-2 border-slate-200 p-6 md:p-8">
                <h3 className="text-xl font-bold font-heading text-slate-900 mb-6">Vem är du?</h3>
                <ul className="space-y-4">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-700">
                      <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      </div>
                      <span className="font-medium">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

          </div>

          {/* SIDEBAR (Right Col) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Apply Card - CONDITIONAL based on job type */}
              <Card className={cn(
                "border-x-2 border-b-2 border-slate-200 shadow-lg overflow-hidden",
                isLottery ? "border-t-8 border-t-tiffany" : "border-t-8 border-t-primary"
              )}>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Sista ansökningsdag</p>
                      <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xl">
                        <Clock className="h-5 w-5 text-destructive" />
                        {job.deadline}
                      </div>
                    </div>
                    <button className="h-10 w-10 rounded-lg border-2 border-slate-200 flex items-center justify-center text-slate-300 hover:text-coral hover:border-coral transition-colors">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>

                  {/* CONDITIONAL ACTION BUTTONS */}
                  {isLottery ? (
                    <>
                      <div className="bg-tiffany/10 p-4 rounded-lg border border-tiffany/20 text-sm text-slate-700">
                        <p className="font-bold flex items-center gap-2 text-tiffany">
                          <Shuffle className="h-4 w-4" /> Detta är ett feriejobb
                        </p>
                        <p className="mt-2 text-xs text-slate-600">
                          Du behöver inte skicka CV. Lägg till jobbet i din önskelista så är du med i utlottningen.
                        </p>
                      </div>
                      <Link href={`/${locale}/application`} className="block">
                        <Button variant="action" size="lg" className="w-full text-lg h-14 shadow-md">
                          Lägg till i önskelista <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                      <p className="text-xs text-center text-slate-400">
                        Det tar bara 3 minuter. Inga förkunskaper krävs.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="bg-purple-light p-4 rounded-lg border border-primary/20 text-sm text-slate-700">
                        <p className="font-bold flex items-center gap-2 text-primary">
                          <Briefcase className="h-4 w-4" /> Vanlig ansökan
                        </p>
                        <p className="mt-2 text-xs text-slate-600">
                          Arbetsgivaren väljer personal baserat på meriter. Se till att din profil är uppdaterad.
                        </p>
                      </div>
                      
                      {/* Client Component for Modal */}
                      <ApplyButtonClient 
                        jobId={job.id} 
                        jobTitle={job.title} 
                        employer={job.employer} 
                      />
                      
                      <p className="text-xs text-center text-slate-400">
                        CV och personligt brev krävs för detta jobb.
                      </p>
                    </>
                  )}

                </CardContent>
              </Card>

              {/* Employer Info */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold font-heading text-lg mb-3 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-tiffany" />
                  Om arbetsgivaren
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  <strong className="text-white">{job.employer}</strong> {isLottery 
                    ? 'är en del av Kramfors Kommun. Vi erbjuder meningsfulla feriejobb för ungdomar.' 
                    : 'söker motiverade ungdomar. Skicka in din ansökan med CV och personligt brev.'}
                </p>
                <Link 
                  href="#" 
                  className="inline-flex items-center text-tiffany text-sm font-bold hover:underline"
                >
                  Läs mer om arbetsgivaren <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Quick Info - CONDITIONAL */}
              {isLottery ? (
                <div className="bg-tiffany/10 rounded-xl p-6 border-2 border-tiffany/20">
                  <h4 className="font-bold text-tiffany mb-3 flex items-center gap-2">
                    <Shuffle className="h-4 w-4" /> Så funkar lottningen
                  </h4>
                  <p className="text-sm text-slate-600">
                    Alla som söker har lika stor chans. Du kan välja upp till 5 jobb i din önskelista och rangordna dem efter preferens.
                  </p>
                </div>
              ) : (
                <div className="bg-purple-light/30 rounded-xl p-6 border-2 border-primary/10">
                  <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Tips för din ansökan
                  </h4>
                  <p className="text-sm text-slate-600">
                    Berätta varför just du passar för jobbet. Lyft fram relevant erfarenhet och visa din motivation!
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Related Jobs Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6">Liknande jobb</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {MOCK_JOBS_DATA
              .filter(j => j.id !== job.id && (j.category === job.category || j.type === job.type))
              .slice(0, 3)
              .map(relatedJob => (
                <Link 
                  key={relatedJob.id} 
                  href={`/${locale}/jobs/${relatedJob.id}`}
                  className="block"
                >
                  <Card className="border-2 border-slate-200 hover:border-primary hover:shadow-md transition-all h-full relative overflow-hidden">
                    {/* Mini type badge */}
                    <div className="absolute top-0 right-0">
                      {relatedJob.type === 'lottery' ? (
                        <div className="bg-tiffany text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg">
                          <Shuffle className="h-3 w-3 inline mr-1" />Lottning
                        </div>
                      ) : (
                        <div className="bg-primary text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg">
                          <Briefcase className="h-3 w-3 inline mr-1" />CV
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5 pt-8">
                      <Badge className={cn("rounded-sm border-0 font-bold text-xs mb-3", getCategoryColor(relatedJob.category))}>
                        {tCats(relatedJob.category as keyof typeof tCats).toUpperCase()}
                      </Badge>
                      <h3 className="font-bold text-lg text-slate-900 mb-1">{relatedJob.title}</h3>
                      <p className="text-sm text-slate-500 mb-3">{relatedJob.employer}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {relatedJob.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {relatedJob.period}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
