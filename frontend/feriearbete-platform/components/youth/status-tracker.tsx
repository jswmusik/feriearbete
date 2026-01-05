'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, Clock, ArrowRight, UserCheck, Gift, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ApplicationStage } from '@/lib/mock-youth-profile';

const STEPS = [
  { id: 'submitted', label: 'Ansökan skickad', description: 'Din ansökan är registrerad', icon: CheckCircle2 },
  { id: 'guardian_pending', label: 'Väntar på målsman', description: 'Signering krävs', icon: UserCheck },
  { id: 'processing', label: 'Lottning pågår', description: 'Vi matchar dig mot jobb', icon: Clock },
  { id: 'offered', label: 'Besked', description: 'Du får ett erbjudande', icon: Gift },
];

interface StatusTrackerProps {
  currentStatus: ApplicationStage;
  guardianName?: string;
}

export function StatusTracker({ currentStatus, guardianName }: StatusTrackerProps) {
  // Simple logic to determine active/completed index
  const statusOrder = ['submitted', 'guardian_pending', 'processing', 'offered', 'placed'];
  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <Card className="border-2 border-slate-200 overflow-hidden shadow-sm">
      <CardHeader className="bg-gradient-to-r from-purple-dark to-primary text-white p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-tiffany" />
          </div>
          <div>
            <CardTitle className="text-xl font-heading">Din ansökan</CardTitle>
            <p className="text-purple-200 text-sm">Följ din väg till sommarjobbet</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-0">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isActive = index === currentIndex;
            const isLast = index === STEPS.length - 1;
            
            return (
              <div key={step.id} className="relative flex gap-4">
                {/* Connector Line */}
                {!isLast && (
                  <div className={cn(
                    "absolute left-[15px] top-10 h-[calc(100%-16px)] w-0.5 transition-colors",
                    isCompleted ? "bg-success" : "bg-slate-200"
                  )} />
                )}

                {/* Icon Bubble */}
                <div className={cn(
                  "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all shrink-0",
                  isCompleted 
                    ? "bg-success border-success text-white" 
                    : isActive 
                      ? "bg-white border-tiffany text-tiffany shadow-lg ring-4 ring-tiffany/20" 
                      : "bg-white border-slate-200 text-slate-300"
                )}>
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </div>

                {/* Text Content */}
                <div className={cn(
                  "pb-8 flex-1",
                  isActive ? "opacity-100" : "opacity-60"
                )}>
                  <p className={cn(
                    "font-bold text-sm",
                    isActive ? "text-slate-900" : "text-slate-500"
                  )}>
                    {step.label}
                  </p>
                  <p className={cn(
                    "text-xs mt-0.5",
                    isActive ? "text-slate-500" : "text-slate-400"
                  )}>
                    {step.description}
                  </p>
                  
                  {/* Active step special messages */}
                  {isActive && step.id === 'guardian_pending' && guardianName && (
                    <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <p className="text-xs text-warning font-bold">
                        ⚠️ {guardianName} måste signera innan 31 mars
                      </p>
                    </div>
                  )}
                  
                  {isActive && step.id === 'processing' && (
                    <div className="mt-3 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                      <p className="text-xs text-primary font-medium">
                        Lottningen sker 1 april. Du får besked via e-post.
                      </p>
                    </div>
                  )}
                  
                  {isActive && step.id === 'offered' && (
                    <div className="mt-3 p-3 bg-tiffany/10 border border-tiffany/20 rounded-lg">
                      <p className="text-xs text-tiffany font-bold">
                        🎉 Grattis! Du har fått ett erbjudande!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

