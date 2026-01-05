'use client';

import { PriorityGroup } from '@/lib/mock-lottery';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GripVertical, Edit2, Trash2, Users, ArrowDown, Calendar, MapPin, History, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  group: PriorityGroup;
  isLast: boolean;
}

// Get icon for rule type
const getRuleIcon = (type: string) => {
  switch (type) {
    case 'age': return Calendar;
    case 'geo': return MapPin;
    case 'history': return History;
    case 'school': return GraduationCap;
    default: return Calendar;
  }
};

export function PriorityGroupCard({ group, isLast }: Props) {
  return (
    <div className="relative group">
      <Card className="border-2 border-slate-200 hover:border-primary/50 transition-all duration-200 overflow-hidden">
        {/* Left color bar */}
        <div className={cn("absolute left-0 top-0 bottom-0 w-1.5", group.color)} />
        
        <CardContent className="p-0 pl-4">
          <div className="flex items-center p-5 gap-4">
            
            {/* Drag Handle */}
            <div className="cursor-move text-slate-300 hover:text-slate-500 transition-colors -ml-2">
              <GripVertical className="h-6 w-6" />
            </div>

            {/* Rank Number */}
            <div className={cn(
              "h-14 w-14 rounded-xl flex items-center justify-center text-2xl font-extrabold text-white shadow-lg shrink-0",
              group.color
            )}>
              {group.rank}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                {group.name}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-1">{group.description}</p>
              
              {/* Rules Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {group.rules.map(rule => {
                  const Icon = getRuleIcon(rule.type);
                  return (
                    <Badge 
                      key={rule.id} 
                      variant="secondary" 
                      className="bg-slate-100 text-slate-700 border-0 font-medium text-xs gap-1.5 py-1 px-2.5"
                    >
                      <Icon className="h-3 w-3 text-slate-400" />
                      {rule.label}: <span className="font-bold text-slate-900">{String(rule.value)}</span>
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="text-right px-6 border-l-2 border-slate-100 hidden md:block">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-2xl">
                <Users className="h-5 w-5 text-slate-400" />
                {group.estimatedApplicants}
              </div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Kandidater</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-primary hover:bg-primary/10">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visual Arrow for Flow */}
      {!isLast && (
        <div className="flex justify-center py-3">
          <div className="flex flex-col items-center">
            <div className="h-4 w-0.5 bg-slate-200" />
            <ArrowDown className="h-5 w-5 text-slate-300" />
          </div>
        </div>
      )}
    </div>
  );
}

