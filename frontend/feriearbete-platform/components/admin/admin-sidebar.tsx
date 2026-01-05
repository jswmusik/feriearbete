'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Building2, Users, Settings, LogOut, Shield, Zap } from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();
  
  // Extract locale from path to keep links working
  const locale = pathname.split('/')[1] || 'sv';

  const navItems = [
    { href: `/${locale}/super-admin`, label: 'Dashboard', icon: LayoutDashboard },
    { href: `/${locale}/super-admin/tenants`, label: 'Municipalities', icon: Building2 },
    { href: `/${locale}/super-admin/users`, label: 'Global Users', icon: Users },
    { href: `/${locale}/super-admin/settings`, label: 'Platform Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-purple-dark text-white h-screen flex flex-col fixed left-0 top-0 border-r border-white/10">
      {/* Brand */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="h-10 w-10 bg-gradient-to-br from-tiffany to-tiffany/80 rounded-xl flex items-center justify-center shadow-lg shadow-tiffany/20">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold font-heading text-lg tracking-tight">Super Admin</h1>
          <p className="text-xs text-slate-400">Feriearbete.se</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== `/${locale}/super-admin` && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-white/10 text-white shadow-lg" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-tiffany" : "text-slate-500"
              )} />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-tiffany" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Platform Status */}
      <div className="p-4 mx-4 mb-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-4 w-4 text-tiffany" />
          <span className="text-xs font-bold text-white">System Status</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-slate-400">All systems operational</span>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200">
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

