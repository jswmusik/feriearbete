'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Users, ArrowRight, Heart, Shuffle, Briefcase } from 'lucide-react';
import { JobListing } from '@/lib/mock-jobs-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface JobCardProps {
  job: JobListing;
  isFavorite?: boolean;
  onToggleFavorite?: (jobId: string) => void;
  locale?: string;
}

export function JobCard({ job, isFavorite = false, onToggleFavorite, locale = 'sv' }: JobCardProps) {
  const t = useTranslations('jobs');
  const tCommon = useTranslations('common');
  const tCats = useTranslations('categories');

  // Helper for category colors based on Design System variables
  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'parkWork': return 'bg-success/10 text-success border-success/20';
      case 'elderlyCare': return 'bg-coral/10 text-coral border-coral/20';
      case 'kids': return 'bg-warning/10 text-slate-900 border-warning/20';
      case 'culture': return 'bg-tiffany/10 text-tiffany border-tiffany/20';
      case 'administration': return 'bg-purple-light text-primary border-primary/20';
      case 'it': return 'bg-info/10 text-info border-info/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <Card className="border-2 border-slate-200 hover:border-primary hover:shadow-md transition-all group relative overflow-hidden flex flex-col h-full bg-white">
      
      {/* JOB TYPE BADGE (The main differentiator) */}
      <div className="absolute top-0 right-0 z-10">
        {job.type === 'lottery' ? (
          <div className="bg-tiffany text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-lg uppercase tracking-wider flex items-center gap-1.5">
            <Shuffle className="h-3 w-3" /> Feriejobb
          </div>
        ) : (
          <div className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-lg uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="h-3 w-3" /> CV-ansökan
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3 pt-8">
        <div className="flex justify-between items-start">
          <Badge className={cn("rounded-md border font-bold", getCategoryColor(job.category))}>
            {tCats(job.category as keyof typeof tCats)}
          </Badge>
          <button 
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite?.(job.id);
            }}
            className={cn(
              "text-slate-300 hover:text-coral transition-colors p-1",
              isFavorite && "text-coral"
            )}
          >
            <Heart className={cn("h-6 w-6", isFavorite && "fill-current")} />
          </button>
        </div>
        <div>
          <CardTitle className="text-xl font-bold font-heading text-slate-900 mt-3 group-hover:text-primary transition-colors line-clamp-2">
            {job.title}
          </CardTitle>
          <p className="text-sm text-slate-500 font-medium mt-1">{job.employer}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-grow">
        <div className="flex flex-wrap gap-y-2 gap-x-3 text-sm text-slate-600">
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            {job.location}
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {job.period}
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
            <Users className="h-3.5 w-3.5 text-slate-400" />
            {job.seats} pl.
          </div>
        </div>
        
        {/* Helper text for the track */}
        <p className="text-xs text-slate-400 italic">
          {job.type === 'lottery' 
            ? "Inga förkunskaper krävs. Tilldelas via lottning." 
            : "Kräver CV och personligt brev."}
        </p>
      </CardContent>

      <CardFooter className="pt-4 border-t-2 border-slate-50 bg-slate-50/50 mt-auto">
        <div className="w-full flex items-center justify-between gap-3">
          <span className="text-xs font-mono text-slate-400 font-medium whitespace-nowrap">
            Slutar: {job.deadline}
          </span>
          
          <Link href={`/${locale}/jobs/${job.id}`} className="flex-1 max-w-[140px]">
            <Button 
              variant={job.type === 'lottery' ? 'outline' : 'default'} 
              size="sm" 
              className={cn(
                "w-full font-bold",
                job.type === 'lottery' 
                  ? 'border-2 border-tiffany text-tiffany hover:bg-tiffany hover:text-white' 
                  : 'bg-primary text-white hover:bg-primary/90'
              )}
            >
              {job.type === 'lottery' ? 'Läs & Önska' : 'Ansök nu'} 
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
