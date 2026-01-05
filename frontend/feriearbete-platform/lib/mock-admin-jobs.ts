export type JobStatus = 'published' | 'draft' | 'closed' | 'archived';

export interface AdminJob {
  id: string;
  title: string;
  department: string;
  location: string;
  period: string;
  capacity: number;
  assigned: number;
  status: JobStatus;
  applicantsCount: number;
  publishedAt: string;
  category: string;
  description?: string;
  requirements?: string[];
}

export const MOCK_ADMIN_JOBS: AdminJob[] = [
  {
    id: '1',
    title: 'Parkarbetare',
    department: 'Tekniska Enheten',
    location: 'Kramfors C',
    period: 'Period 1 (Juni)',
    capacity: 15,
    assigned: 15, // Full
    status: 'closed',
    applicantsCount: 142,
    publishedAt: '2026-01-10',
    category: 'park',
    description: 'Arbete med grönområden och parker i centrala Kramfors.',
    requirements: ['Fysiskt arbete', 'Utomhusarbete']
  },
  {
    id: '2',
    title: 'Strandstädare',
    department: 'Tekniska Enheten',
    location: 'Icktjärn',
    period: 'Period 1 (Juni)',
    capacity: 4,
    assigned: 2,
    status: 'published',
    applicantsCount: 28,
    publishedAt: '2026-01-15',
    category: 'park',
    description: 'Städning och underhåll av kommunens badplatser.',
    requirements: ['Simkunnig', 'Utomhusarbete']
  },
  {
    id: '3',
    title: 'Äldreomsorgsassistent',
    department: 'Vård & Omsorg',
    location: 'Brunne',
    period: 'Period 2 (Juli)',
    capacity: 8,
    assigned: 0,
    status: 'published',
    applicantsCount: 56,
    publishedAt: '2026-02-01',
    category: 'care',
    description: 'Stöd och hjälp till äldre på kommunens äldreboenden.',
    requirements: ['Social kompetens', 'Empati']
  },
  {
    id: '4',
    title: 'Sommarvärd / Guide',
    department: 'Kulturförvaltningen',
    location: 'High Coast Art Valley',
    period: 'Period 3 (Aug)',
    capacity: 4,
    assigned: 0,
    status: 'draft', // Not public yet
    applicantsCount: 0,
    publishedAt: '-',
    category: 'culture',
    description: 'Guida besökare och hjälpa till med evenemang.',
    requirements: ['God kommunikationsförmåga', 'Intresse för kultur']
  },
  {
    id: '5',
    title: 'Fritidsledare',
    department: 'Kultur & Fritid',
    location: 'Bollstabruk',
    period: 'Period 2 (Juli)',
    capacity: 6,
    assigned: 4,
    status: 'published',
    applicantsCount: 89,
    publishedAt: '2026-01-20',
    category: 'kids',
    description: 'Leda aktiviteter för barn och ungdomar på fritidsgården.',
    requirements: ['Erfarenhet av barn/ungdom', 'Kreativitet']
  },
  {
    id: '6',
    title: 'Förskoleassistent',
    department: 'Bildningsförvaltningen',
    location: 'Nyland',
    period: 'Period 1 (Juni)',
    capacity: 5,
    assigned: 3,
    status: 'published',
    applicantsCount: 67,
    publishedAt: '2026-01-25',
    category: 'kids',
    description: 'Assistera pedagoger på förskolan med dagliga aktiviteter.',
    requirements: ['Tålamod', 'Lekfullhet']
  },
  {
    id: '7',
    title: 'Administratör',
    department: 'Kommunledningsförvaltningen',
    location: 'Kramfors C',
    period: 'Period 1 (Juni)',
    capacity: 2,
    assigned: 1,
    status: 'published',
    applicantsCount: 34,
    publishedAt: '2026-02-05',
    category: 'admin',
    description: 'Kontorsarbete och administrativa uppgifter.',
    requirements: ['Datorvana', 'Noggrannhet']
  },
  {
    id: '8',
    title: 'Cafébiträde',
    department: 'Kulturförvaltningen',
    location: 'Biblioteket',
    period: 'Period 2 (Juli)',
    capacity: 3,
    assigned: 0,
    status: 'archived',
    applicantsCount: 45,
    publishedAt: '2025-12-01',
    category: 'culture',
    description: 'Servera fika och hjälpa till i bibliotekets café.',
    requirements: ['Serviceinriktad', 'Hygienkunskap']
  }
];

// Helper to get category display name
export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    park: 'Park & Natur',
    care: 'Vård & Omsorg',
    admin: 'Administration',
    culture: 'Kultur',
    kids: 'Barn & Ungdom',
  };
  return labels[category] || category;
};

