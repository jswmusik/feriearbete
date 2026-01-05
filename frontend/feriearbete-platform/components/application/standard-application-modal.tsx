'use client';

import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AIHelper } from './ai-helper';
import { 
  UploadCloud, FileText, CheckCircle2, X, AlertCircle, 
  Briefcase, Send, Loader2, ArrowRight, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  employer: string;
}

export function StandardApplicationModal({ isOpen, onClose, jobTitle, employer }: Props) {
  const [step, setStep] = useState<'form' | 'submitting' | 'success'>('form');
  const [coverLetter, setCoverLetter] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    // Simulate file selection
    setUploadedFile({ name: 'mitt_cv_2026.pdf', size: '245 KB' });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Simulate file drop
    setUploadedFile({ name: 'mitt_cv_2026.pdf', size: '245 KB' });
  };

  const handleSubmit = () => {
    setStep('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleClose = () => {
    setStep('form');
    setCoverLetter('');
    setUploadedFile(null);
    onClose();
  };

  const letterLength = coverLetter.length;
  const letterProgress = Math.min((letterLength / 500) * 100, 100);

  // SUCCESS STATE
  if (step === 'success') {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md text-center py-12 px-8">
          <div className="relative">
            <div className="h-24 w-24 bg-success text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-in zoom-in-95 duration-500">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md border border-slate-200">
              <span className="text-success font-bold text-sm">✓ Skickad</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-extrabold font-heading text-slate-900 mb-2 mt-4">
            Ansökan skickad!
          </h2>
          <p className="text-slate-500 mb-8">
            Tack! Vi har skickat din ansökan till <strong className="text-slate-700">{employer}</strong>. 
            Du kan följa statusen på din profil.
          </p>
          
          <div className="space-y-3">
            <Button onClick={handleClose} className="w-full bg-primary hover:bg-primary/90">
              Stäng fönstret
            </Button>
            <Button variant="ghost" onClick={handleClose} className="w-full text-slate-500">
              Gå till min profil <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // SUBMITTING STATE
  if (step === 'submitting') {
    return (
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md text-center py-12 px-8">
          <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Skickar din ansökan...</h2>
          <p className="text-slate-500 text-sm">
            Vänta medan vi laddar upp dina dokument.
          </p>
          <Progress value={66} className="mt-6 h-2" />
        </DialogContent>
      </Dialog>
    );
  }

  // FORM STATE
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-purple-dark text-white p-6 rounded-t-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-heading font-bold text-white">
                {jobTitle}
              </DialogTitle>
              <DialogDescription className="text-purple-200 text-sm">
                {employer}
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* SECTION 1: CV UPLOAD */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                1
              </div>
              <Label className="font-bold text-slate-900">Ladda upp ditt CV</Label>
              <span className="text-xs text-red-500 font-medium">*Obligatoriskt</span>
            </div>
            
            {!uploadedFile ? (
              <div 
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer group",
                  isDragging 
                    ? "border-primary bg-primary/5" 
                    : "border-slate-300 bg-slate-50 hover:bg-white hover:border-primary/50"
                )}
                onClick={handleFileSelect}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className={cn(
                  "h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-all",
                  isDragging ? "bg-primary/10 scale-110" : "bg-white shadow-sm group-hover:scale-105"
                )}>
                  <UploadCloud className={cn(
                    "h-7 w-7 transition-colors",
                    isDragging ? "text-primary" : "text-slate-400 group-hover:text-primary"
                  )} />
                </div>
                <p className="font-bold text-slate-700 text-sm mb-1">
                  {isDragging ? 'Släpp filen här!' : 'Dra och släpp eller klicka för att välja'}
                </p>
                <p className="text-xs text-slate-400">PDF eller Word • Max 5MB</p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-success/5 border-2 border-success/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">{uploadedFile.name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-success" />
                      {uploadedFile.size} • Redo att skickas
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setUploadedFile(null)} 
                  className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* SECTION 2: PERSONAL LETTER */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <Label className="font-bold text-slate-900">Personligt brev</Label>
              </div>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">Valfritt men rekommenderas</span>
            </div>
            
            {/* The Text Area */}
            <div className="relative">
              <Textarea 
                placeholder="Berätta varför du söker detta jobb och vad du kan bidra med..." 
                className="min-h-[160px] text-base resize-none border-2 focus-visible:ring-0 focus-visible:border-primary pr-16 pb-8"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
              <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-mono">
                {letterLength}/500
              </div>
            </div>
            
            {/* Progress indicator */}
            {letterLength > 0 && (
              <div className="space-y-1">
                <Progress value={letterProgress} className="h-1.5" />
                <p className="text-xs text-slate-400">
                  {letterLength < 100 && 'Skriv lite mer för att göra ett bra intryck'}
                  {letterLength >= 100 && letterLength < 300 && 'Bra start! Fortsätt gärna lite till.'}
                  {letterLength >= 300 && letterLength < 500 && '✨ Perfekt längd!'}
                  {letterLength >= 500 && 'Bra! Du kan korta ner om du vill.'}
                </p>
              </div>
            )}

            {/* AI Assistant */}
            <AIHelper 
              jobTitle={jobTitle} 
              onGenerate={(text) => setCoverLetter(text)} 
            />
          </div>

          {/* Warning if no CV */}
          {!uploadedFile && (
            <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg text-sm">
              <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">CV saknas</p>
                <p className="text-slate-600 text-xs">Du måste ladda upp ett CV för att kunna skicka din ansökan.</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 p-4 flex gap-3 rounded-b-lg">
          <Button variant="outline" onClick={onClose} className="flex-1 border-2">
            Avbryt
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={!uploadedFile}
          >
            <Send className="mr-2 h-4 w-4" />
            Skicka ansökan
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}

