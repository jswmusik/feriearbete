import { MOCK_TENANTS } from '@/lib/mock-tenants';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users, 
  FileText, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export default function SuperAdminDashboard() {
  // Calculate platform-wide stats
  const totalTenants = MOCK_TENANTS.length;
  const activeTenants = MOCK_TENANTS.filter(t => t.status === 'active').length;
  const totalUsers = MOCK_TENANTS.reduce((acc, t) => acc + t.usersCount, 0);
  const totalApplications = MOCK_TENANTS.reduce((acc, t) => acc + t.applicationsCount, 0);
  const totalJobs = MOCK_TENANTS.reduce((acc, t) => acc + t.jobsCount, 0);
  const premiumTenants = MOCK_TENANTS.filter(t => t.plan === 'premium_ai').length;

  // Recent activity (simulated)
  const recentActivity = [
    { id: 1, type: 'tenant', message: 'Sundsvalls Kommun started onboarding', time: '1 hour ago', icon: Building2 },
    { id: 2, type: 'user', message: 'New admin added to Kramfors Kommun', time: '3 hours ago', icon: Users },
    { id: 3, type: 'application', message: '50 new applications in Örnsköldsvik', time: '5 hours ago', icon: FileText },
    { id: 4, type: 'system', message: 'Platform update deployed v2.4.1', time: '1 day ago', icon: Zap },
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">Command Center</h1>
          <p className="text-slate-500 mt-1">Platform-wide overview and system health.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-tiffany/10 text-tiffany border-tiffany/20 px-3 py-1">
            <Activity className="h-3 w-3 mr-1.5 animate-pulse" />
            Live
          </Badge>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 border-2 border-slate-200 bg-white hover:border-primary/30 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Municipalities</p>
              <p className="text-4xl font-extrabold font-heading text-slate-900 mt-2">{totalTenants}</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="h-4 w-4 text-tiffany" />
                <span className="text-sm text-tiffany font-medium">+2 this month</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-slate-200 bg-white hover:border-tiffany/30 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
              <p className="text-4xl font-extrabold font-heading text-slate-900 mt-2">{totalUsers.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="h-4 w-4 text-tiffany" />
                <span className="text-sm text-tiffany font-medium">+12% vs last month</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-tiffany/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-tiffany" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-slate-200 bg-white hover:border-warning/30 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applications</p>
              <p className="text-4xl font-extrabold font-heading text-slate-900 mt-2">{totalApplications.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-warning" />
                <span className="text-sm text-warning font-medium">Season active</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-warning" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-slate-200 bg-white hover:border-green-500/30 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Jobs</p>
              <p className="text-4xl font-extrabold font-heading text-slate-900 mt-2">{totalJobs}</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500 font-medium">Across all tenants</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <Card className="col-span-2 p-6 border-2 border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold font-heading text-slate-900">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="text-primary">View all</Button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-white border-2 border-slate-200 flex items-center justify-center shrink-0">
                  <activity.icon className="h-5 w-5 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span className="text-xs text-slate-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Plan Distribution */}
          <Card className="p-6 border-2 border-slate-200 bg-white">
            <h2 className="text-lg font-bold font-heading text-slate-900 mb-4">Plan Distribution</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="font-medium text-slate-700">Premium AI</span>
                </div>
                <Badge className="bg-primary/10 text-primary border-0">{premiumTenants}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-slate-400" />
                  <span className="font-medium text-slate-700">Standard</span>
                </div>
                <Badge className="bg-slate-100 text-slate-600 border-0">{totalTenants - premiumTenants}</Badge>
              </div>
              <div className="h-3 rounded-full bg-slate-100 overflow-hidden mt-4">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-tiffany rounded-full transition-all"
                  style={{ width: `${(premiumTenants / totalTenants) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 text-center">
                {Math.round((premiumTenants / totalTenants) * 100)}% on Premium AI
              </p>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 border-2 border-slate-200 bg-white">
            <h2 className="text-lg font-bold font-heading text-slate-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/sv/super-admin/tenants">
                <Button variant="outline" className="w-full justify-start gap-2 h-11">
                  <Building2 className="h-4 w-4" /> Add New Municipality
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start gap-2 h-11">
                <Users className="h-4 w-4" /> Manage Global Users
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-11">
                <Zap className="h-4 w-4" /> System Health Check
              </Button>
            </div>
          </Card>

          {/* Tenant Health */}
          <Card className="p-6 border-2 border-slate-200 bg-white">
            <h2 className="text-lg font-bold font-heading text-slate-900 mb-4">Tenant Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Active</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-tiffany" />
                  <span className="font-bold text-slate-900">{activeTenants}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Onboarding</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-warning" />
                  <span className="font-bold text-slate-900">{MOCK_TENANTS.filter(t => t.status === 'onboarding').length}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Suspended</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-slate-300" />
                  <span className="font-bold text-slate-900">{MOCK_TENANTS.filter(t => t.status === 'suspended').length}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

