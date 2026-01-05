'use client';

import { useState } from 'react';
import { MOCK_APPLICATIONS, ApplicationStatus, GuardianStatus } from '@/lib/mock-applications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Search, Filter, Download, MoreHorizontal, 
  CheckCircle2, Mail, Eye, UserCheck, Clock, ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to style statuses
const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
  const styles = {
    new: "bg-blue-100 text-blue-700 border-blue-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    offered: "bg-purple-100 text-purple-700 border-purple-200",
    accepted: "bg-tiffany/15 text-tiffany border-tiffany/30",
    rejected: "bg-red-100 text-red-700 border-red-200",
    reserve: "bg-orange-100 text-orange-700 border-orange-200",
  };

  const labels = {
    new: "Ny",
    pending: "Behandlas",
    offered: "Erbjuden",
    accepted: "Signerad",
    rejected: "Avböjd/Ej vald",
    reserve: "Reserv",
  };

  return (
    <Badge variant="outline" className={cn("capitalize font-bold border", styles[status])}>
      {labels[status]}
    </Badge>
  );
};

// Helper for guardian status
const GuardianStatusBadge = ({ guardian, status }: { guardian?: string; status?: GuardianStatus }) => {
  if (!guardian) {
    return <span className="text-sm text-slate-400 italic">-</span>;
  }

  return (
    <div className="flex flex-col">
      <span className="text-sm text-slate-900 font-medium">{guardian}</span>
      {status === 'pending' ? (
        <span className="text-xs text-warning font-medium flex items-center gap-1 mt-0.5">
          <Clock className="h-3 w-3" /> Väntar signering
        </span>
      ) : (
        <span className="text-xs text-success font-medium flex items-center gap-1 mt-0.5">
          <CheckCircle2 className="h-3 w-3" /> Signerad
        </span>
      )}
    </div>
  );
};

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Alla');

  const filters = ['Alla', 'Nya', 'Signerade', 'Reserver', 'Grupp A', 'Grupp B', 'Väntar målsman'];

  // Simple filtering logic
  const filteredApps = MOCK_APPLICATIONS.filter(app => {
    const matchesSearch = 
      app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.personnummer.includes(searchTerm) ||
      (app.guardian?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    if (!matchesSearch) return false;
    
    switch (activeFilter) {
      case 'Nya': return app.status === 'new';
      case 'Signerade': return app.status === 'accepted';
      case 'Reserver': return app.status === 'reserve';
      case 'Grupp A': return app.priorityGroup === 'A';
      case 'Grupp B': return app.priorityGroup === 'B';
      case 'Väntar målsman': return app.guardianStatus === 'pending';
      default: return true;
    }
  });

  // Stats for the header
  const stats = {
    total: MOCK_APPLICATIONS.length,
    new: MOCK_APPLICATIONS.filter(a => a.status === 'new').length,
    accepted: MOCK_APPLICATIONS.filter(a => a.status === 'accepted').length,
    pendingGuardian: MOCK_APPLICATIONS.filter(a => a.guardianStatus === 'pending').length,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">Ansökningar</h1>
          <p className="text-slate-500">Hantera inkomna ansökningar och placeringar.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white gap-2">
            <Download className="h-4 w-4" /> Exportera CSV
          </Button>
          <Button variant="action" className="gap-2">
            <Filter className="h-4 w-4" /> Avancerat Filter
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-2 border-slate-200 bg-white">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Totalt</p>
          <p className="text-2xl font-extrabold font-heading text-slate-900 mt-1">{stats.total}</p>
        </Card>
        <Card className="p-4 border-2 border-blue-200 bg-blue-50">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Nya</p>
          <p className="text-2xl font-extrabold font-heading text-blue-700 mt-1">{stats.new}</p>
        </Card>
        <Card className="p-4 border-2 border-tiffany/30 bg-tiffany/5">
          <p className="text-xs font-bold text-tiffany uppercase tracking-wider">Signerade</p>
          <p className="text-2xl font-extrabold font-heading text-tiffany mt-1">{stats.accepted}</p>
        </Card>
        <Card className="p-4 border-2 border-warning/30 bg-warning/5">
          <p className="text-xs font-bold text-warning uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> Väntar målsman
          </p>
          <p className="text-2xl font-extrabold font-heading text-warning mt-1">{stats.pendingGuardian}</p>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 border-2 border-slate-200 bg-white">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Sök på namn, personnummer eller målsman..." 
              className="pl-10 h-12 bg-slate-50 border-2 border-slate-200 focus:bg-white transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {filters.map((filter) => (
              <Button 
                key={filter} 
                variant="outline" 
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "whitespace-nowrap border-2 transition-all",
                  filter === activeFilter 
                    ? "bg-primary text-white border-primary hover:bg-primary/90" 
                    : "bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary"
                )}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 border-b-2 border-slate-100">
              <TableRow>
                <TableHead className="w-[50px] font-bold text-slate-700">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                </TableHead>
                <TableHead className="font-bold text-slate-700">Sökande</TableHead>
                <TableHead className="font-bold text-slate-700">Status</TableHead>
                <TableHead className="font-bold text-slate-700">Målsman</TableHead>
                <TableHead className="font-bold text-slate-700">Prio-grupp</TableHead>
                <TableHead className="font-bold text-slate-700">Valda Jobb</TableHead>
                <TableHead className="font-bold text-slate-700">Placering</TableHead>
                <TableHead className="text-right font-bold text-slate-700">Åtgärd</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApps.map((app) => (
                <TableRow key={app.id} className="hover:bg-purple-light/10 transition-colors group">
                  <TableCell>
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 text-base">{app.firstName} {app.lastName}</span>
                      <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                        {app.personnummer} <span className="text-slate-300">•</span> {app.area}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>
                  <TableCell>
                    <GuardianStatusBadge guardian={app.guardian} status={app.guardianStatus} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={cn(
                          "font-mono font-bold border-0",
                          app.priorityGroup === 'A' ? "bg-primary/10 text-primary" :
                          app.priorityGroup === 'B' ? "bg-warning/10 text-warning" :
                          "bg-slate-100 text-slate-600"
                        )}
                      >
                        Grupp {app.priorityGroup}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      {app.choices.length} st
                    </span>
                  </TableCell>
                  <TableCell>
                    {app.assignedJob ? (
                      <div className="flex items-center gap-2 text-sm font-medium text-tiffany">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="truncate max-w-[180px]">{app.assignedJob}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400 italic">Ej placerad</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100" title="Visa detaljer">
                        <Eye className="h-4 w-4 text-slate-500 hover:text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100" title="Skicka meddelande">
                        <Mail className="h-4 w-4 text-slate-500 hover:text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-tiffany/10" title="Tilldela plats">
                        <UserCheck className="h-4 w-4 text-slate-500 hover:text-tiffany" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100">
                        <MoreHorizontal className="h-4 w-4 text-slate-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t-2 border-slate-100 bg-slate-50 flex justify-between items-center text-sm text-slate-500">
          <span>
            Visar <span className="font-bold text-slate-700">{filteredApps.length}</span> av{' '}
            <span className="font-bold text-slate-700">1,402</span> resultat
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Föregående</Button>
            <Button variant="outline" size="sm">Nästa</Button>
          </div>
        </div>
      </div>

    </div>
  );
}
