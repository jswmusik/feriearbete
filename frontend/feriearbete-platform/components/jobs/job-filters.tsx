'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { JOB_CATEGORIES, JOB_PERIODS } from '@/lib/mock-jobs-data';

interface JobFiltersProps {
  selectedCategories: string[];
  selectedPeriods: string[];
  onCategoryChange: (category: string) => void;
  onPeriodChange: (period: string) => void;
  onClearAll: () => void;
}

// Category color mapping for visual indicators
const categoryColors: Record<string, string> = {
  parkWork: 'bg-success',
  elderlyCare: 'bg-coral',
  kids: 'bg-warning',
  culture: 'bg-tiffany',
  administration: 'bg-primary',
  it: 'bg-info',
};

export function JobFilters({
  selectedCategories,
  selectedPeriods,
  onCategoryChange,
  onPeriodChange,
  onClearAll,
}: JobFiltersProps) {
  const t = useTranslations('jobs');
  const tCats = useTranslations('categories');

  const totalFilters = selectedCategories.length + selectedPeriods.length;

  return (
    <Card className="border-2 border-slate-200 h-fit sticky top-8 shadow-sm bg-white">
      <CardHeader className="bg-slate-50 border-b-2 border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-400" />
            {t('filters')}
          </CardTitle>
          {totalFilters > 0 && (
            <Badge className="bg-primary text-white border-0">{totalFilters}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        
        {/* Active Filters */}
        {totalFilters > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aktiva filter</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClearAll}
                className="h-7 text-xs text-slate-500 hover:text-red-500 gap-1 px-2"
              >
                <RotateCcw className="h-3 w-3" /> Rensa
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(cat => (
                <Badge 
                  key={cat} 
                  variant="secondary" 
                  className="bg-primary/10 text-primary border-0 gap-1 cursor-pointer hover:bg-primary/20"
                  onClick={() => onCategoryChange(cat)}
                >
                  {tCats(cat as keyof typeof tCats)}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
              {selectedPeriods.map(period => (
                <Badge 
                  key={period} 
                  variant="secondary" 
                  className="bg-tiffany/10 text-tiffany border-0 gap-1 cursor-pointer hover:bg-tiffany/20"
                  onClick={() => onPeriodChange(period)}
                >
                  {t(period as keyof typeof t)}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
            <Separator />
          </div>
        )}

        {/* Categories */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Kategorier</h4>
          <div className="space-y-3">
            {JOB_CATEGORIES.map((cat) => (
              <div 
                key={cat} 
                className={cn(
                  "flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors",
                  selectedCategories.includes(cat) ? "bg-primary/5" : "hover:bg-slate-50"
                )}
                onClick={() => onCategoryChange(cat)}
              >
                <Checkbox 
                  id={cat} 
                  checked={selectedCategories.includes(cat)}
                  onCheckedChange={() => onCategoryChange(cat)}
                />
                <div className={cn("h-3 w-3 rounded-full", categoryColors[cat])} />
                <Label 
                  htmlFor={cat} 
                  className={cn(
                    "text-slate-700 font-medium cursor-pointer flex-1 text-sm",
                    selectedCategories.includes(cat) && "text-primary font-bold"
                  )}
                >
                  {tCats(cat as keyof typeof tCats)}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Periods */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Perioder</h4>
          <div className="space-y-3">
            {JOB_PERIODS.map((period) => (
              <div 
                key={period} 
                className={cn(
                  "flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors",
                  selectedPeriods.includes(period) ? "bg-tiffany/5" : "hover:bg-slate-50"
                )}
                onClick={() => onPeriodChange(period)}
              >
                <Checkbox 
                  id={period} 
                  checked={selectedPeriods.includes(period)}
                  onCheckedChange={() => onPeriodChange(period)}
                />
                <Label 
                  htmlFor={period} 
                  className={cn(
                    "text-slate-700 font-medium cursor-pointer flex-1 text-sm",
                    selectedPeriods.includes(period) && "text-tiffany font-bold"
                  )}
                >
                  {t(period as keyof typeof t)}
                </Label>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
