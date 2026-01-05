'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { MOCK_JOBS_DATA } from '@/lib/mock-jobs-data';
import { JobFilters } from '@/components/jobs/job-filters';
import { JobCard } from '@/components/jobs/job-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

// Period mapping for filtering
const periodMapping: Record<string, string> = {
  'period1': 'Juni',
  'period2': 'Juli',
  'period3': 'Augusti',
};

export default function JobsPage() {
  const t = useTranslations('jobs');
  const tCommon = useTranslations('common');
  const tHero = useTranslations('hero');

  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return MOCK_JOBS_DATA.filter(job => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.employer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(job.category);

      // Period filter - map period keys to actual period values
      const matchesPeriod = selectedPeriods.length === 0 || 
        selectedPeriods.some(p => periodMapping[p] === job.period);

      return matchesSearch && matchesCategory && matchesPeriod;
    });
  }, [searchTerm, selectedCategories, selectedPeriods]);

  // Handlers
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriods(prev => 
      prev.includes(period) 
        ? prev.filter(p => p !== period)
        : [...prev, period]
    );
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedPeriods([]);
    setSearchTerm('');
  };

  const toggleFavorite = (jobId: string) => {
    setFavorites(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header Section */}
      <div className="bg-purple-dark text-white pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold font-heading mb-6 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-purple-200 text-lg max-w-2xl mb-8">
            Här hittar du alla feriejobb som går att söka just nu. Filtrera på kategori eller område för att hitta det som passar dig.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2 max-w-4xl shadow-2xl mx-auto md:mx-0">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <Input 
                className="h-14 pl-12 text-lg border-0 bg-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:border-0" 
                placeholder={tHero('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="h-14 px-8 bg-primary hover:bg-primary/90 text-lg font-bold rounded-md shrink-0">
              {tCommon('search')}
            </Button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 grid lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar (Hidden on mobile, uses sticky) */}
        <div className="hidden lg:block lg:col-span-1">
          <JobFilters 
            selectedCategories={selectedCategories}
            selectedPeriods={selectedPeriods}
            onCategoryChange={handleCategoryChange}
            onPeriodChange={handlePeriodChange}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Mobile Filter Toggle & Count */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg border-2 border-slate-200 shadow-sm lg:bg-transparent lg:border-0 lg:shadow-none lg:p-0">
            <p className="text-slate-500 font-medium">
              Visar <span className="text-slate-900 font-bold">{filteredJobs.length}</span> jobb
            </p>
            <div className="flex gap-2 lg:hidden">
               <Button variant="outline" size="sm">
                 <SlidersHorizontal className="mr-2 h-4 w-4" /> {t('filters')}
               </Button>
            </div>
            <div className="hidden lg:flex gap-2">
               {/* Desktop Sorting or other controls if needed */}
            </div>
          </div>

          {/* Cards */}
          {filteredJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job}
                  isFavorite={favorites.includes(job.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-12 text-center">
              <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Inga jobb hittades</h3>
              <p className="text-slate-500 mb-4">Försök med andra sökord eller filter</p>
              <Button variant="outline" onClick={handleClearAll}>
                Rensa alla filter
              </Button>
            </div>
          )}
          
          {/* "Load More" Button */}
          {filteredJobs.length > 0 && (
            <div className="flex justify-center pt-8">
               <Button variant="outline" size="lg" className="px-8 border-2">
                 Ladda fler jobb
               </Button>
            </div>
          )}

          {/* CTA Banner */}
          <div className="mt-8 p-8 bg-gradient-to-r from-primary/5 to-tiffany/5 border-2 border-primary/20 rounded-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">
                  Redo att söka?
                </h3>
                <p className="text-slate-600">
                  Skapa din ansökan och välj upp till 5 jobb i prioritetsordning.
                </p>
              </div>
              <Link href="/sv/application">
                <Button variant="action" size="lg" className="whitespace-nowrap">
                  Starta ansökan
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
