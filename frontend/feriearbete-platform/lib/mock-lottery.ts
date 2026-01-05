export interface LotteryRule {
  id: string;
  type: 'age' | 'geo' | 'history' | 'school';
  label: string; // Human readable e.g. "Född år 2008"
  value: string | number | boolean;
}

export interface PriorityGroup {
  id: string;
  name: string;
  description: string;
  rank: number; // 1 = Highest priority
  color: string; // For UI visualization
  rules: LotteryRule[];
  estimatedApplicants: number;
}

export const MOCK_PRIORITY_GROUPS: PriorityGroup[] = [
  {
    id: 'pg-1',
    name: 'Garanti 2008',
    description: 'Ungdomar födda 2008 som aldrig haft feriejobb tidigare.',
    rank: 1,
    color: 'bg-primary',
    estimatedApplicants: 450,
    rules: [
      { id: 'r1', type: 'age', label: 'Född år', value: '2008' },
      { id: 'r2', type: 'history', label: 'Tidigare jobb', value: false },
    ]
  },
  {
    id: 'pg-2',
    name: 'Geografisk Prio (Bollsta)',
    description: 'Sökande skrivna i postnummerområden med låg sysselsättning.',
    rank: 2,
    color: 'bg-tiffany',
    estimatedApplicants: 120,
    rules: [
      { id: 'r3', type: 'geo', label: 'Postnummer', value: '873 XX' },
    ]
  },
  {
    id: 'pg-3',
    name: 'Övriga 2007-2009',
    description: 'Sökande födda 2007-2009 som haft feriejobb tidigare.',
    rank: 3,
    color: 'bg-warning',
    estimatedApplicants: 320,
    rules: [
      { id: 'r5', type: 'age', label: 'Åldersspann', value: '2007-2009' },
      { id: 'r6', type: 'history', label: 'Tidigare jobb', value: true },
    ]
  },
  {
    id: 'pg-4',
    name: 'Övriga behöriga',
    description: 'Resterande behöriga sökande lottas om kvarvarande platser.',
    rank: 4,
    color: 'bg-slate-500',
    estimatedApplicants: 512,
    rules: [
      { id: 'r4', type: 'age', label: 'Åldersspann', value: '16-19' },
    ]
  }
];

export interface LotteryRun {
  id: string;
  date: string;
  admin: string;
  placed: number;
  reserves: number;
  status: 'completed' | 'draft' | 'cancelled';
  period: string;
}

export const LOTTERY_HISTORY: LotteryRun[] = [
  { id: 'l-1', date: '2025-05-10', admin: 'Lena H', placed: 820, reserves: 150, status: 'completed', period: 'Period 1' },
  { id: 'l-2', date: '2024-05-12', admin: 'Anders S', placed: 790, reserves: 210, status: 'completed', period: 'Period 1' },
  { id: 'l-3', date: '2024-06-01', admin: 'Lena H', placed: 650, reserves: 180, status: 'completed', period: 'Period 2' },
];

// Rule type icons and labels for UI
export const RULE_TYPE_CONFIG = {
  age: { label: 'Ålder', icon: 'Calendar' },
  geo: { label: 'Geografi', icon: 'MapPin' },
  history: { label: 'Historik', icon: 'History' },
  school: { label: 'Skola', icon: 'GraduationCap' },
} as const;

