'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';

interface AIJobWriterProps {
  jobTitle: string;
  onGenerate: (data: { description: string; tasks: string[]; requirements: string[] }) => void;
}

export function AIJobWriter({ jobTitle, onGenerate }: AIJobWriterProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!jobTitle) return;
    setIsGenerating(true);

    // Simulate AI Generation
    setTimeout(() => {
      onGenerate({
        description: `Vi söker en engagerad ${jobTitle} som vill vara med och göra skillnad i sommar. Du kommer att arbeta i ett glatt team och få värdefull arbetslivserfarenhet.`,
        tasks: [
          'Utföra dagliga rutinuppgifter',
          'Samarbeta med kollegor',
          'Rapportera till handledare',
          'Bidra till en god arbetsmiljö'
        ],
        requirements: [
          'Du är ansvarsfull och punktlig',
          'Du gillar att samarbeta',
          'Ingen tidigare erfarenhet krävs'
        ]
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-r from-purple-light/50 to-white p-4 rounded-lg border-2 border-primary/10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center border border-primary/20 shadow-sm text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="font-bold text-sm text-slate-900">AI-Copywriter</p>
          <p className="text-xs text-slate-500">
            Fyll i titeln ovan så skriver vi ett utkast åt dig.
          </p>
        </div>
      </div>
      <Button 
        size="sm" 
        onClick={handleGenerate} 
        disabled={!jobTitle || isGenerating}
        className="bg-white text-primary hover:bg-primary/5 border-2 border-primary/20"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Skriver...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" /> Generera text
          </>
        )}
      </Button>
    </div>
  );
}

