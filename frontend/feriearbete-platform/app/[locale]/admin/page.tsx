import { DASHBOARD_STATS, PERIOD_STATUS, RECENT_ACTIVITY, TOP_DEPARTMENTS } from '@/lib/mock-municipality-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Briefcase, CheckCircle2, Clock, ArrowUpRight, 
  AlertCircle, FileText, Shuffle, TrendingUp, Calendar,
  ChevronRight, ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">Översikt</h1>
          <p className="text-slate-500 mt-1">
            Säsongen 2026 • Ansökan stänger om{' '}
            <span className="font-bold text-primary">{DASHBOARD_STATS.daysLeft} dagar</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white gap-2">
            <FileText className="h-4 w-4" /> Exportera Rapport
          </Button>
          <Button variant="action" className="gap-2">
            <Shuffle className="h-4 w-4" /> Kör Lottning
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Ansökningar" 
          value={DASHBOARD_STATS.totalApplicants.toLocaleString()} 
          icon={Users} 
          trend="+12%" 
          color="bg-primary"
          href="/sv/admin/applications"
        />
        <KPICard 
          title="Platser" 
          value={DASHBOARD_STATS.totalJobs.toLocaleString()} 
          icon={Briefcase} 
          subtext={`${DASHBOARD_STATS.placementsMade} tillsatta`}
          color="bg-warning"
          href="/sv/admin/jobs"
        />
        <KPICard 
          title="Matchningsgrad" 
          value={`${Math.round((DASHBOARD_STATS.placementsMade / DASHBOARD_STATS.totalJobs) * 100)}%`} 
          icon={CheckCircle2} 
          color="bg-tiffany"
          href="/sv/admin/lottery"
        />
        <KPICard 
          title="Åtgärder" 
          value={DASHBOARD_STATS.unhandledIssues} 
          icon={AlertCircle} 
          alert 
          color="bg-destructive"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Activity Feed */}
        <Card className="lg:col-span-2 border-2 border-slate-200 bg-white overflow-hidden">
          <CardHeader className="border-b-2 border-slate-100 bg-slate-50/50 flex-row items-center justify-between">
            <CardTitle className="text-lg font-heading">Händelselogg</CardTitle>
            <Badge variant="outline" className="bg-white">
              <Clock className="h-3 w-3 mr-1" /> Live
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {RECENT_ACTIVITY.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                      activity.type === 'alert' 
                        ? 'bg-red-100 text-red-600' 
                        : activity.type === 'system'
                          ? 'bg-primary/10 text-primary'
                          : activity.type === 'job'
                            ? 'bg-warning/10 text-warning'
                            : 'bg-slate-100 text-slate-600'
                    }`}>
                      {activity.user.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{activity.user}</p>
                      <p className="text-xs text-slate-500">{activity.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{activity.time}</span>
                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t-2 border-slate-100 text-center bg-slate-50/50">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-1">
                Visa alla händelser <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Period Status */}
          <Card className="border-2 border-slate-200 bg-white">
            <CardHeader className="border-b-2 border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-heading">Periodstatus</CardTitle>
                <Calendar className="h-5 w-5 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {PERIOD_STATUS.map((period) => (
                <div key={period.name} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-700">{period.name}</span>
                    <Badge className={`text-xs ${
                      period.status === 'Full' 
                        ? 'bg-tiffany/10 text-tiffany border-0' 
                        : period.status === 'Matching'
                          ? 'bg-primary/10 text-primary border-0'
                          : 'bg-slate-100 text-slate-600 border-0'
                    }`}>
                      {period.status}
                    </Badge>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        period.fillRate === 100 ? 'bg-tiffany' : 
                        period.fillRate > 50 ? 'bg-primary' : 'bg-slate-300'
                      }`} 
                      style={{ width: `${period.fillRate}%` }} 
                    />
                  </div>
                  <div className="text-xs text-slate-400 text-right font-medium">{period.fillRate}% tillsatta</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Departments */}
          <Card className="border-2 border-slate-200 bg-white">
            <CardHeader className="border-b-2 border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-heading">Toppenheter</CardTitle>
                <TrendingUp className="h-5 w-5 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {TOP_DEPARTMENTS.map((dept, index) => (
                  <div key={dept.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{dept.name}</p>
                      <p className="text-xs text-slate-500">{dept.filled}/{dept.jobs} platser</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-tiffany">
                        {Math.round((dept.filled / dept.jobs) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="bg-gradient-to-br from-purple-dark to-primary text-white border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <CardContent className="p-6 space-y-4 relative z-10">
              <h3 className="font-bold font-heading text-xl">Behöver du hjälp?</h3>
              <p className="text-sm text-purple-200">
                Se vår videoguide om hur du sätter upp lottningsregler för 2026.
              </p>
              <Button className="w-full bg-white text-purple-dark hover:bg-slate-100 border-0 font-bold gap-2">
                Starta Guiden <ExternalLink className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

// Helper Component for Stats
function KPICard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  subtext, 
  color, 
  alert,
  href 
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  subtext?: string;
  color: string;
  alert?: boolean;
  href?: string;
}) {
  const CardWrapper = href ? Link : 'div';
  
  return (
    <CardWrapper href={href || ''}>
      <Card className={`border-2 border-slate-200 bg-white transition-all duration-200 shadow-sm ${
        href ? 'hover:border-primary/50 hover:shadow-md cursor-pointer' : ''
      }`}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-white ${color} shadow-lg`}>
              <Icon className="h-6 w-6" />
            </div>
            {trend && (
              <Badge className="bg-green-100 text-green-700 border-0 flex items-center gap-1 font-bold">
                <ArrowUpRight className="h-3 w-3" /> {trend}
              </Badge>
            )}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
            <h3 className={`text-3xl font-extrabold font-heading mt-1 ${alert ? 'text-red-500' : 'text-slate-900'}`}>
              {value}
            </h3>
            {subtext && <p className="text-xs text-slate-500 mt-1 font-medium">{subtext}</p>}
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
}

