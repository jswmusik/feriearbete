import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { JobStatus } from '@/lib/mock-admin-jobs';
import { CheckCircle2, FileEdit, Lock, Archive } from 'lucide-react';

interface JobStatusBadgeProps {
  status: JobStatus;
  showIcon?: boolean;
}

export function JobStatusBadge({ status, showIcon = false }: JobStatusBadgeProps) {
  const config = {
    published: {
      style: "bg-tiffany text-white hover:bg-tiffany/90 border-0",
      label: "Publicerad",
      icon: CheckCircle2,
    },
    draft: {
      style: "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200",
      label: "Utkast",
      icon: FileEdit,
    },
    closed: {
      style: "bg-purple-dark text-white hover:bg-purple-900 border-0",
      label: "Stängd",
      icon: Lock,
    },
    archived: {
      style: "bg-slate-100 text-slate-400 border-dashed border-slate-300",
      label: "Arkiverad",
      icon: Archive,
    },
  };

  const { style, label, icon: Icon } = config[status];

  return (
    <Badge variant="outline" className={cn("capitalize font-bold px-2.5 py-0.5 gap-1.5", style)}>
      {showIcon && <Icon className="h-3 w-3" />}
      {label}
    </Badge>
  );
}

