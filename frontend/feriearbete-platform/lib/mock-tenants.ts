export interface Tenant {
  id: string;
  name: string; // e.g. "Kramfors Kommun"
  domain: string; // e.g. "kramfors"
  status: 'active' | 'suspended' | 'onboarding';
  plan: 'standard' | 'premium_ai';
  usersCount: number;
  applicationsCount: number;
  jobsCount: number;
  lastActive: string;
  createdAt: string;
}

export const MOCK_TENANTS: Tenant[] = [
  { 
    id: '1', 
    name: 'Kramfors Kommun', 
    domain: 'kramfors', 
    status: 'active', 
    plan: 'premium_ai', 
    usersCount: 1450, 
    applicationsCount: 342,
    jobsCount: 28,
    lastActive: '2 min ago',
    createdAt: '2024-01-15'
  },
  { 
    id: '2', 
    name: 'Sundsvalls Kommun', 
    domain: 'sundsvall', 
    status: 'onboarding', 
    plan: 'standard', 
    usersCount: 4, 
    applicationsCount: 0,
    jobsCount: 0,
    lastActive: '1 day ago',
    createdAt: '2025-12-01'
  },
  { 
    id: '3', 
    name: 'Sollefteå Kommun', 
    domain: 'solleftea', 
    status: 'active', 
    plan: 'standard', 
    usersCount: 890, 
    applicationsCount: 156,
    jobsCount: 15,
    lastActive: '4 hours ago',
    createdAt: '2024-06-20'
  },
  { 
    id: '4', 
    name: 'Härnösands Kommun', 
    domain: 'harnosand', 
    status: 'suspended', 
    plan: 'standard', 
    usersCount: 0, 
    applicationsCount: 0,
    jobsCount: 0,
    lastActive: '30 days ago',
    createdAt: '2024-03-10'
  },
  { 
    id: '5', 
    name: 'Örnsköldsviks Kommun', 
    domain: 'ornskoldsvik', 
    status: 'active', 
    plan: 'premium_ai', 
    usersCount: 2100, 
    applicationsCount: 489,
    jobsCount: 42,
    lastActive: '15 min ago',
    createdAt: '2024-02-28'
  },
  { 
    id: '6', 
    name: 'Timrå Kommun', 
    domain: 'timra', 
    status: 'active', 
    plan: 'standard', 
    usersCount: 560, 
    applicationsCount: 98,
    jobsCount: 12,
    lastActive: '1 hour ago',
    createdAt: '2024-08-15'
  },
];

