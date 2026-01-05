'use client';

import { useState, useEffect } from 'react';
import { MOCK_PRIORITY_GROUPS, LOTTERY_HISTORY } from '@/lib/mock-lottery';
import { PriorityGroupCard } from '@/components/admin/priority-group-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Plus, Play, AlertTriangle, History, 
  RotateCw, CheckCircle2, Download, Settings2,
  Users, Briefcase, TrendingUp, Calendar, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LotteryPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleRunLottery = () => {
    setIsRunning(true);
    setProgress(0);
    setCurrentGroup(0);
    setShowResults(false);
  };

  // Simulate lottery progress
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setShowResults(true);
          return 100;
        }
        
        // Update current group based on progress
        if (prev < 25) setCurrentGroup(1);
        else if (prev < 50) setCurrentGroup(2);
        else if (prev < 75) setCurrentGroup(3);
        else setCurrentGroup(4);
        
        return prev + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Stats
  const totalApplicants = MOCK_PRIORITY_GROUPS.reduce((acc, g) => acc + g.estimatedApplicants, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">Lottning & Placering</h1>
          <p className="text-slate-500">Konfigurera prioriteringsordning och kör tilldelningsmotorn.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white gap-2">
            <History className="h-4 w-4" /> Historik
          </Button>
          <Button variant="action" size="lg" onClick={handleRunLottery} disabled={isRunning} className="gap-2">
            {isRunning ? <RotateCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            {isRunning ? 'Kör algoritm...' : 'Kör Lottning Nu'}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COL: RULES ENGINE */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Alert Banner */}
          <Card className="bg-gradient-to-r from-primary/5 to-tiffany/5 border-2 border-primary/20">
            <CardContent className="p-4 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-primary">Konfiguration för Period 1 (Juni 2026)</h3>
                <p className="text-sm text-primary/70 mt-0.5">
                  Systemet fyller platser baserat på grupp 1 först, därefter grupp 2, osv. 
                  Drag och släpp för att ändra ordningen.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Priority Groups Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Prioriteringsgrupper</h2>
              <p className="text-sm text-slate-500">{MOCK_PRIORITY_GROUPS.length} grupper konfigurerade</p>
            </div>
            <Button variant="outline" className="border-dashed border-2 border-slate-300 hover:border-primary text-slate-500 hover:text-primary gap-2">
              <Plus className="h-4 w-4" /> Lägg till grupp
            </Button>
          </div>
          
          {/* Priority Group Cards */}
          <div className="space-y-0">
            {MOCK_PRIORITY_GROUPS.map((group, index) => (
              <PriorityGroupCard 
                key={group.id} 
                group={group} 
                isLast={index === MOCK_PRIORITY_GROUPS.length - 1} 
              />
            ))}
          </div>

          {/* Algorithm Settings */}
          <Card className="border-2 border-slate-200 bg-white">
            <CardHeader className="border-b-2 border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-heading flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-slate-400" />
                  Algoritminställningar
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-primary">Redigera</Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Matchningsläge</p>
                  <p className="font-bold text-slate-900">Strikt prioritet</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Geografisk vikt</p>
                  <p className="font-bold text-slate-900">Aktiverad (30%)</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reservlista</p>
                  <p className="font-bold text-slate-900">Max 200 per jobb</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COL: STATUS & HISTORY */}
        <div className="space-y-6 sticky top-8">
          
          {/* Status Card */}
          <Card className="border-2 border-slate-200 bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-100 pb-3">
              <CardTitle className="text-sm font-bold uppercase text-slate-500 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Systemstatus
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-400" />
                  Sökande (Totalt)
                </span>
                <span className="font-extrabold text-slate-900">{totalApplicants.toLocaleString()} st</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                  Tillgängliga platser
                </span>
                <span className="font-extrabold text-slate-900">850 st</span>
              </div>
              <div className="h-px bg-slate-200 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-slate-400" />
                  Est. Matchningsgrad
                </span>
                <Badge className="bg-tiffany text-white border-0 font-bold">~60%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  Aktiv period
                </span>
                <Badge variant="outline" className="bg-white font-bold">Period 1</Badge>
              </div>
            </CardContent>
          </Card>

          {/* History List */}
          <Card className="border-2 border-slate-200 bg-white">
            <CardHeader className="bg-slate-50 border-b-2 border-slate-100 pb-3">
              <CardTitle className="text-sm font-bold uppercase text-slate-500">Tidigare Körningar</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {LOTTERY_HISTORY.map((run) => (
                <div key={run.id} className="p-4 border-b-2 border-slate-100 last:border-0 hover:bg-slate-50 transition-colors flex justify-between items-center cursor-pointer">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{run.date}</p>
                    <p className="text-xs text-slate-500">Körd av {run.admin} • {run.period}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-tiffany text-sm">{run.placed} placerade</p>
                    <p className="text-xs text-slate-400">{run.reserves} reserver</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Help */}
          <Card className="bg-gradient-to-br from-purple-dark to-primary text-white border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-6 space-y-3 relative z-10">
              <h3 className="font-bold font-heading text-lg">Hur fungerar lottningen?</h3>
              <p className="text-sm text-purple-200">
                Algoritmen matchar sökande mot lediga platser baserat på dina prioriteringsregler.
              </p>
              <Button className="w-full bg-white text-purple-dark hover:bg-slate-100 border-0 font-bold gap-2">
                Läs dokumentationen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* RESULTS MODAL */}
      <Dialog open={isRunning || showResults} onOpenChange={(open) => !isRunning && setShowResults(open)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-heading text-slate-900">
              {isRunning ? 'Kör Lottningsmotor...' : '🎉 Lottning Klar!'}
            </DialogTitle>
            <DialogDescription>
              {isRunning 
                ? 'Algoritmen matchar sökande mot platser baserat på dina regler.' 
                : 'Här är resultatet av körningen. Granska innan du publicerar.'}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            {isRunning ? (
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-600">Framsteg</span>
                    <span className="font-bold text-primary">{progress}%</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-tiffany rounded-full transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Current Group Indicator */}
                <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bearbetar nu</p>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center text-lg font-bold text-white",
                      currentGroup === 1 ? "bg-primary" :
                      currentGroup === 2 ? "bg-tiffany" :
                      currentGroup === 3 ? "bg-warning" : "bg-slate-500"
                    )}>
                      {currentGroup}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">
                        {MOCK_PRIORITY_GROUPS[currentGroup - 1]?.name || 'Slutför...'}
                      </p>
                      <p className="text-xs text-slate-500">
                        {MOCK_PRIORITY_GROUPS[currentGroup - 1]?.estimatedApplicants || 0} kandidater
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-center text-sm text-slate-400 animate-pulse">
                  Vänligen vänta medan algoritmen körs...
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="h-20 w-20 bg-tiffany/10 text-tiffany rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                </div>
                
                {/* Results Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-tiffany/5 rounded-xl border-2 border-tiffany/20 text-center">
                    <p className="text-4xl font-extrabold font-heading text-tiffany">850</p>
                    <p className="text-xs font-bold text-tiffany/70 uppercase mt-1">Placerade</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-xl border-2 border-slate-200 text-center">
                    <p className="text-4xl font-extrabold font-heading text-slate-500">552</p>
                    <p className="text-xs font-bold text-slate-400 uppercase mt-1">Reserver</p>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200 space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fördelning per grupp</p>
                  {MOCK_PRIORITY_GROUPS.map((group, index) => (
                    <div key={group.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={cn("h-3 w-3 rounded-full", group.color)} />
                        <span className="text-slate-600">{group.name}</span>
                      </div>
                      <span className="font-bold text-slate-900">
                        {index === 0 ? '450' : index === 1 ? '120' : index === 2 ? '180' : '100'} st
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-2">
                  <Button variant="action" className="w-full h-12 text-base">
                    Godkänn & Publicera
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" /> Ladda ner PDF-rapport
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

