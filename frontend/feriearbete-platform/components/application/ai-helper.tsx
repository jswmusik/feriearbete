'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, RefreshCw, Wand2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIHelperProps {
  jobTitle: string;
  onGenerate: (text: string) => void;
}

const TRAITS = [
  { id: 'noggrann', label: 'Noggrann', emoji: '🎯' },
  { id: 'social', label: 'Social', emoji: '👋' },
  { id: 'punktlig', label: 'Punktlig', emoji: '⏰' },
  { id: 'laraktig', label: 'Läraktig', emoji: '📚' },
  { id: 'lagspelare', label: 'Lagspelare', emoji: '🤝' },
  { id: 'fysisk', label: 'Fysiskt stark', emoji: '💪' },
  { id: 'kreativ', label: 'Kreativ', emoji: '🎨' },
  { id: 'ambitions', label: 'Ambitiös', emoji: '🚀' },
  { id: 'ansvarsfull', label: 'Ansvarsfull', emoji: '✅' },
  { id: 'serviceinriktad', label: 'Serviceinriktad', emoji: '😊' },
];

// Template generator based on traits
const generateCoverLetter = (jobTitle: string, traits: string[]): string => {
  const traitsText = traits.slice(0, -1).join(', ') + 
    (traits.length > 1 ? ' och ' + traits[traits.length - 1] : traits[0]);
  
  const templates = [
    `Hej!\n\nJag skriver för att söka tjänsten som ${jobTitle}. Jag tror att jag skulle passa utmärkt för detta jobb eftersom jag är en person som är ${traitsText.toLowerCase()}.\n\nJag är motiverad att lära mig nya saker och bidra till ett bra team. Jag ser fram emot möjligheten att få visa vad jag kan.\n\nMed vänliga hälsningar`,
    `Hej!\n\nJag är mycket intresserad av att arbeta som ${jobTitle} hos er. Som person är jag ${traitsText.toLowerCase()}, vilket jag tror är viktiga egenskaper för detta jobb.\n\nJag är redo att ta mig an nya utmaningar och ser detta som en fantastisk möjlighet att utvecklas.\n\nVänliga hälsningar`,
    `Hej!\n\nMed stort intresse söker jag jobbet som ${jobTitle}. Mina vänner och familj brukar beskriva mig som ${traitsText.toLowerCase()}.\n\nJag är entusiastisk inför möjligheten att få bidra till ert team och lära mig mer om branschen.\n\nMed vänlig hälsning`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
};

export function AIHelper({ jobTitle, onGenerate }: AIHelperProps) {
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const toggleTrait = (trait: string) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(prev => prev.filter(t => t !== trait));
    } else {
      if (selectedTraits.length < 3) {
        setSelectedTraits(prev => [...prev, trait]);
      }
    }
    setHasGenerated(false);
  };

  const handleGenerate = () => {
    if (selectedTraits.length === 0) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const text = generateCoverLetter(jobTitle, selectedTraits);
      onGenerate(text);
      setIsGenerating(false);
      setHasGenerated(true);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-purple-light/50 to-tiffany-light/30 border-2 border-primary/10 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary font-bold font-heading">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          AI-Assistenten
        </div>
        <Badge variant="secondary" className="bg-white/80 text-xs text-slate-500 border-0">
          Beta
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-600 font-medium">Välj upp till 3 ord som beskriver dig:</p>
          <span className="text-xs text-slate-400 font-mono">{selectedTraits.length}/3</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {TRAITS.map(trait => {
            const isSelected = selectedTraits.includes(trait.label);
            const isDisabled = !isSelected && selectedTraits.length >= 3;
            
            return (
              <Badge
                key={trait.id}
                variant={isSelected ? 'default' : 'outline'}
                className={cn(
                  "cursor-pointer transition-all text-sm py-1.5 px-3 select-none",
                  isSelected 
                    ? "bg-primary border-primary hover:bg-primary/90" 
                    : "bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary",
                  isDisabled && "opacity-40 cursor-not-allowed hover:border-slate-200 hover:text-slate-600"
                )}
                onClick={() => !isDisabled && toggleTrait(trait.label)}
              >
                <span className="mr-1">{trait.emoji}</span>
                {trait.label}
                {isSelected && <Check className="ml-1 h-3 w-3" />}
              </Badge>
            );
          })}
        </div>
      </div>

      <Button 
        size="sm" 
        onClick={handleGenerate} 
        disabled={selectedTraits.length === 0 || isGenerating}
        className={cn(
          "w-full font-bold transition-all",
          hasGenerated 
            ? "bg-success/10 text-success hover:bg-success/20 border-0"
            : "bg-primary/10 text-primary hover:bg-primary/20 border-0"
        )}
      >
        {isGenerating ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Skriver utkast...
          </>
        ) : hasGenerated ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4" /> Generera nytt utkast
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" /> Skapa utkast med AI
          </>
        )}
      </Button>
      
      <p className="text-[10px] text-center text-slate-400">
        AI-assistenten skapar ett utkast baserat på dina val. Du kan redigera texten efteråt.
      </p>
    </div>
  );
}

