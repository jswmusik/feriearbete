'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useApplicationStore } from '@/store/application-store';
import { MOCK_JOBS } from '@/lib/mock-jobs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Plus, X, ArrowRight, ArrowLeft, Sparkles, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

// Category colors matching the design system
const categoryColors: Record<string, string> = {
  park: 'bg-green-100 text-green-700 border-green-200',
  care: 'bg-coral/20 text-coral border-coral/30',
  admin: 'bg-warning/20 text-warning border-warning/30',
  culture: 'bg-tiffany-light text-tiffany border-tiffany/30',
  kids: 'bg-purple-light text-primary border-primary/30',
};

export function StepJobSelection() {
  const t = useTranslations('application');
  const tCommon = useTranslations('common');
  const { selectedJobIds, toggleJobSelection, reorderJobs, nextStep, prevStep } = useApplicationStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Filter jobs based on search
  const filteredJobs = MOCK_JOBS.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle drag start
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newOrder = [...selectedJobIds];
    const draggedItem = newOrder[draggedIndex];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, draggedItem);
    
    reorderJobs(newOrder);
    setDraggedIndex(index);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const isFull = selectedJobIds.length >= 5;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-2">
        <h2 className="text-3xl font-bold font-heading text-slate-900">{t('selectYourJobs')}</h2>
        <p className="text-slate-500">{t('selectJobsDescription')}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: JOB MARKET */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <Input 
              className="pl-12 bg-white h-12 border-2" 
              placeholder={t('searchJobsPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {t('showingJobs', { count: filteredJobs.length })}
            </p>
            {isFull && (
              <Badge className="bg-tiffany text-white border-0 animate-pulse">
                <Sparkles className="h-3 w-3 mr-1" />
                {t('listFull')}
              </Badge>
            )}
          </div>

          {/* Job List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const isSelected = selectedJobIds.includes(job.id);
              const selectionIndex = selectedJobIds.indexOf(job.id);

              return (
                <div 
                  key={job.id}
                  className={cn(
                    "group relative bg-white border-2 rounded-xl p-5 transition-all duration-200",
                    isSelected 
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                      : "border-slate-200 hover:border-primary/50 hover:shadow-md",
                    !isSelected && isFull && "opacity-50"
                  )}
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute -top-2 -left-2 h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-lg animate-in zoom-in duration-200">
                      {selectionIndex + 1}
                    </div>
                  )}

                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2 flex-grow min-w-0">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className={cn("rounded-md text-xs font-medium border", categoryColors[job.category])}>
                          {job.period}
                        </Badge>
                        <Badge variant="outline" className="rounded-md border-slate-300 text-slate-500 text-xs">
                          {job.seats} {t('seatsAvailable')}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> 
                          {job.location}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline truncate">{job.department}</span>
                      </div>
                    </div>

                    <Button
                      size="icon"
                      variant={isSelected ? "destructive" : "default"}
                      disabled={!isSelected && isFull}
                      onClick={() => toggleJobSelection(job.id)}
                      className={cn(
                        "h-11 w-11 rounded-md shadow-none transition-all flex-shrink-0",
                        isSelected 
                          ? "bg-red-100 text-red-600 hover:bg-red-200 border-2 border-red-200" 
                          : "bg-white border-2 border-slate-200 text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5",
                        !isSelected && !isFull && "group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                      )}
                    >
                      {isSelected ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: PRIORITY LIST (Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-4">
            <Card className="border-2 border-primary/20 bg-gradient-to-b from-purple-light/50 to-white p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold font-heading text-lg text-primary">{t('yourPriorityList')}</h3>
                <Badge className={cn(
                  "text-sm px-2.5 py-0.5 font-bold",
                  selectedJobIds.length === 5 
                    ? "bg-tiffany text-white border-0" 
                    : "bg-white text-slate-600 border-2 border-slate-200"
                )}>
                  {selectedJobIds.length} / 5
                </Badge>
              </div>

              {selectedJobIds.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-300 rounded-xl bg-white/50">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                    <Plus className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium">{t('noJobsSelected')}</p>
                  <p className="text-xs text-slate-400 mt-1">{t('clickToAdd')}</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {selectedJobIds.map((id, index) => {
                    const job = MOCK_JOBS.find(j => j.id === id);
                    if (!job) return null;
                    
                    return (
                      <li 
                        key={id} 
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        className={cn(
                          "flex items-center gap-3 bg-white p-3 rounded-xl border-2 border-slate-200 shadow-sm cursor-grab active:cursor-grabbing animate-in slide-in-from-left-2 duration-200",
                          draggedIndex === index && "opacity-50 border-primary"
                        )}
                      >
                        <div className="flex-shrink-0 text-slate-300 hover:text-slate-500 transition-colors">
                          <GripVertical className="h-4 w-4" />
                        </div>
                        <div className={cn(
                          "flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shadow-sm",
                          index === 0 ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
                        )}>
                          {index + 1}
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">{job.title}</p>
                          <p className="text-xs text-slate-500 truncate">{job.location}</p>
                        </div>
                        <button 
                          onClick={() => toggleJobSelection(id)}
                          className="flex-shrink-0 p-1 text-slate-300 hover:text-red-500 transition-colors rounded-md hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Drag hint */}
              {selectedJobIds.length > 1 && (
                <p className="text-xs text-slate-400 mt-4 text-center">
                  {t('dragToReorder')}
                </p>
              )}
            </Card>

            {/* Navigation Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <Button 
                variant="action" 
                size="lg" 
                className="w-full" 
                onClick={nextStep}
                disabled={selectedJobIds.length === 0}
              >
                {t('goToConfirmation')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-slate-400 hover:text-slate-600" 
                onClick={prevStep}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> {tCommon('back')}
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

