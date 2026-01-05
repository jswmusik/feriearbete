'use client';

import { useState } from 'react';
import { MOCK_ADMIN_JOBS, getCategoryLabel } from '@/lib/mock-admin-jobs';
import { JobStatusBadge } from '@/components/admin/job-status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Search, Plus, Users, 
  MapPin, Calendar, Edit2, Copy, Trash2, Eye, MoreHorizontal
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredJobs = MOCK_ADMIN_JOBS.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (statusFilter === 'all') return true;
    return job.status === statusFilter;
  });

  // Stats
  const stats = {
    total: MOCK_ADMIN_JOBS.length,
    published: MOCK_ADMIN_JOBS.filter(j => j.status === 'published').length,
    totalCapacity: MOCK_ADMIN_JOBS.reduce((acc, j) => acc + j.capacity, 0),
    totalAssigned: MOCK_ADMIN_JOBS.reduce((acc, j) => acc + j.assigned, 0),
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">Arbetsplatser</h1>
          <p className="text-slate-500">Hantera annonser, platser och tilldelning.</p>
        </div>
        <Button variant="action" className="gap-2">
          <Plus className="h-5 w-5" /> Skapa ny annons
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 border-2 border-slate-200 bg-white">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Totalt Jobb</p>
          <p className="text-2xl font-extrabold font-heading text-slate-900 mt-1">{stats.total}</p>
        </Card>
        <Card className="p-4 border-2 border-tiffany/30 bg-tiffany/5">
          <p className="text-xs font-bold text-tiffany uppercase tracking-wider">Publicerade</p>
          <p className="text-2xl font-extrabold font-heading text-tiffany mt-1">{stats.published}</p>
        </Card>
        <Card className="p-4 border-2 border-slate-200 bg-white">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Kapacitet</p>
          <p className="text-2xl font-extrabold font-heading text-slate-900 mt-1">{stats.totalCapacity}</p>
        </Card>
        <Card className="p-4 border-2 border-primary/30 bg-primary/5">
          <p className="text-xs font-bold text-primary uppercase tracking-wider">Tillsatta</p>
          <p className="text-2xl font-extrabold font-heading text-primary mt-1">
            {stats.totalAssigned}
            <span className="text-sm font-normal text-slate-400 ml-1">
              ({Math.round((stats.totalAssigned / stats.totalCapacity) * 100)}%)
            </span>
          </p>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 border-2 border-slate-200 bg-white">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Sök jobb, avdelning eller plats..." 
              className="pl-10 h-12 bg-slate-50 border-2 border-slate-200 focus:bg-white transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'Alla' },
              { value: 'published', label: 'Publicerade' },
              { value: 'draft', label: 'Utkast' },
              { value: 'closed', label: 'Stängda' },
            ].map((filter) => (
              <Button 
                key={filter.value}
                variant="outline" 
                onClick={() => setStatusFilter(filter.value)}
                className={cn(
                  "border-2 transition-all",
                  statusFilter === filter.value
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary"
                )}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50 border-b-2 border-slate-100">
            <TableRow>
              <TableHead className="font-bold text-slate-700 w-[350px]">Annons</TableHead>
              <TableHead className="font-bold text-slate-700">Status</TableHead>
              <TableHead className="font-bold text-slate-700 w-[200px]">Beläggning</TableHead>
              <TableHead className="font-bold text-slate-700">Sökande</TableHead>
              <TableHead className="font-bold text-slate-700">Period</TableHead>
              <TableHead className="text-right font-bold text-slate-700">Åtgärd</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => {
              const fillPercentage = job.capacity > 0 
                ? Math.round((job.assigned / job.capacity) * 100) 
                : 0;
              const isFull = fillPercentage === 100;
              
              return (
                <TableRow key={job.id} className="hover:bg-purple-light/10 transition-colors group">
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">{job.title}</span>
                        <Badge variant="outline" className="text-xs bg-slate-50 text-slate-500 border-slate-200">
                          {getCategoryLabel(job.category)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {job.location}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span>{job.department}</span>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <JobStatusBadge status={job.status} showIcon />
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className={isFull ? "text-tiffany" : "text-slate-600"}>
                          {job.assigned} / {job.capacity}
                        </span>
                        <span className={isFull ? "text-tiffany" : "text-slate-400"}>
                          {fillPercentage}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            isFull ? "bg-tiffany" : 
                            fillPercentage > 50 ? "bg-primary" : 
                            fillPercentage > 0 ? "bg-warning" : "bg-slate-200"
                          )}
                          style={{ width: `${fillPercentage}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "h-9 w-9 rounded-xl flex items-center justify-center font-bold text-sm",
                        job.applicantsCount > 50 
                          ? "bg-primary/10 text-primary" 
                          : "bg-slate-100 text-slate-600"
                      )}>
                        {job.applicantsCount}
                      </div>
                      <span className="text-xs text-slate-400">sökande</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline" className="font-normal bg-white border-2 border-slate-200">
                      <Calendar className="mr-1.5 h-3 w-3 text-slate-400" />
                      {job.period}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Visa">
                        <Eye className="h-4 w-4 text-slate-500 hover:text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Redigera">
                        <Edit2 className="h-4 w-4 text-slate-500 hover:text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Duplicera">
                        <Copy className="h-4 w-4 text-slate-500 hover:text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50" title="Radera">
                        <Trash2 className="h-4 w-4 text-slate-400 hover:text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
        {/* Footer */}
        <div className="p-4 border-t-2 border-slate-100 bg-slate-50 flex justify-between items-center">
          <span className="text-sm text-slate-500">
            Visar <span className="font-bold text-slate-700">{filteredJobs.length}</span> av{' '}
            <span className="font-bold text-slate-700">{MOCK_ADMIN_JOBS.length}</span> jobb
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Föregående</Button>
            <Button variant="outline" size="sm" disabled>Nästa</Button>
          </div>
        </div>
      </div>

    </div>
  );
}

