import { MOCK_TENANTS } from '@/lib/mock-tenants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, MoreHorizontal, ExternalLink, ShieldCheck, Filter, Download } from 'lucide-react';

export default function TenantsPage() {
  // Calculate stats
  const activeTenants = MOCK_TENANTS.filter(t => t.status === 'active').length;
  const totalUsers = MOCK_TENANTS.reduce((acc, t) => acc + t.usersCount, 0);
  const premiumTenants = MOCK_TENANTS.filter(t => t.plan === 'premium_ai').length;

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">Municipalities</h1>
          <p className="text-slate-500 mt-1">Manage tenants, licenses, and access across the platform.</p>
        </div>
        <Button variant="action" className="gap-2">
          <Plus className="h-5 w-5" /> New Tenant
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 border-2 border-slate-200 bg-white">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Tenants</p>
          <p className="text-3xl font-extrabold font-heading text-slate-900 mt-1">{MOCK_TENANTS.length}</p>
        </Card>
        <Card className="p-4 border-2 border-slate-200 bg-white">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active</p>
          <p className="text-3xl font-extrabold font-heading text-tiffany mt-1">{activeTenants}</p>
        </Card>
        <Card className="p-4 border-2 border-slate-200 bg-white">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
          <p className="text-3xl font-extrabold font-heading text-slate-900 mt-1">{totalUsers.toLocaleString()}</p>
        </Card>
        <Card className="p-4 border-2 border-slate-200 bg-white">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Premium AI</p>
          <p className="text-3xl font-extrabold font-heading text-primary mt-1">{premiumTenants}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 flex gap-4 bg-white border-2 border-slate-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
          <Input placeholder="Search municipalities..." className="pl-10 h-12 border-2" />
        </div>
        <Button variant="outline" className="gap-2 h-12 px-6">
          <Filter className="h-4 w-4" /> Filter
        </Button>
        <Button variant="outline" className="gap-2 h-12 px-6">
          <Download className="h-4 w-4" /> Export
        </Button>
      </Card>

      {/* Data Table */}
      <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50 border-b-2 border-slate-100">
            <TableRow>
              <TableHead className="w-[280px] font-bold text-slate-600">Municipality</TableHead>
              <TableHead className="font-bold text-slate-600">Status</TableHead>
              <TableHead className="font-bold text-slate-600">Plan</TableHead>
              <TableHead className="font-bold text-slate-600">Users</TableHead>
              <TableHead className="font-bold text-slate-600">Applications</TableHead>
              <TableHead className="font-bold text-slate-600">Last Active</TableHead>
              <TableHead className="text-right font-bold text-slate-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_TENANTS.map((tenant) => (
              <TableRow key={tenant.id} className="hover:bg-purple-light/20 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 text-base">{tenant.name}</span>
                    <span className="text-xs text-slate-500 font-mono">{tenant.domain}.feriearbete.se</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={
                      tenant.status === 'active' ? "bg-tiffany text-white border-0" :
                      tenant.status === 'onboarding' ? "bg-warning text-white border-0" :
                      "bg-slate-200 text-slate-600 border-0"
                    }
                  >
                    {tenant.status === 'active' ? 'Active' : 
                     tenant.status === 'onboarding' ? 'Onboarding' : 'Suspended'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {tenant.plan === 'premium_ai' && (
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    )}
                    <span className="font-medium text-slate-700">
                      {tenant.plan === 'premium_ai' ? 'Premium AI' : 'Standard'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-slate-600 font-medium">
                    {tenant.usersCount.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-slate-600 font-medium">
                    {tenant.applicationsCount.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="text-slate-500">
                  {tenant.lastActive}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-tiffany hover:bg-tiffany/10">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Table Footer */}
        <div className="px-6 py-4 border-t-2 border-slate-100 flex items-center justify-between bg-slate-50">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-700">{MOCK_TENANTS.length}</span> municipalities
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

