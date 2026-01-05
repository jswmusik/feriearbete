'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, Users, Briefcase, Calendar, 
  Settings, MessageSquare, PieChart, Shuffle,
  ChevronRight, HelpCircle, Bell
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function MunicipalitySidebar() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'sv';

  const navItems = [
    { href: `/${locale}/admin`, label: 'Översikt', icon: LayoutDashboard },
    { href: `/${locale}/admin/applications`, label: 'Ansökningar', icon: Users, badge: '142' },
    { href: `/${locale}/admin/jobs`, label: 'Arbetsplatser', icon: Briefcase },
    { href: `/${locale}/admin/lottery`, label: 'Lottning & Placering', icon: Shuffle },
    { href: `/${locale}/admin/periods`, label: 'Perioder', icon: Calendar },
    { href: `/${locale}/admin/communication`, label: 'Utskick', icon: MessageSquare },
    { href: `/${locale}/admin/reports`, label: 'Rapporter', icon: PieChart },
    { href: `/${locale}/admin/settings`, label: 'Inställningar', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white h-screen flex flex-col fixed left-0 top-0 border-r-2 border-slate-200 z-50">
      {/* Brand Header */}
      <div className="p-6 border-b-2 border-slate-100 flex items-center gap-3">
        <div className="h-10 w-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-white font-bold font-heading text-xl shadow-lg shadow-primary/20">
          K
        </div>
        <div>
          <h1 className="font-bold text-slate-900 leading-tight">Kramfors</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Municipality Admin</p>
        </div>
      </div>

      {/* Season Banner */}
      <div className="mx-4 mt-4 p-3 bg-gradient-to-r from-primary/5 to-tiffany/5 rounded-xl border-2 border-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-wider">Säsong 2026</p>
            <p className="text-xs text-slate-500 mt-0.5">Ansökan öppen</p>
          </div>
          <div className="h-2 w-2 rounded-full bg-tiffany animate-pulse" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== `/${locale}/admin` && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-white" : "text-slate-400"
              )} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge className={cn(
                  "text-xs px-2 py-0.5",
                  isActive 
                    ? "bg-white/20 text-white border-0" 
                    : "bg-primary/10 text-primary border-0"
                )}>
                  {item.badge}
                </Badge>
              )}
              {isActive && <ChevronRight className="h-4 w-4 text-white/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Help Card */}
      <div className="mx-4 mb-4 p-4 bg-slate-50 rounded-xl border-2 border-slate-100">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-tiffany/10 flex items-center justify-center shrink-0">
            <HelpCircle className="h-4 w-4 text-tiffany" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700">Behöver du hjälp?</p>
            <p className="text-xs text-slate-500 mt-0.5">Se vår guide för att komma igång.</p>
          </div>
        </div>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t-2 border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold text-sm">
            LH
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">Lena Handläggare</p>
            <p className="text-xs text-slate-500 truncate">HR-avdelningen</p>
          </div>
          <button className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors relative">
            <Bell className="h-4 w-4 text-slate-400" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
}

