export type JobType = 'lottery' | 'standard';

export interface JobListing {
  id: string;
  title: string;
  employer: string;
  location: string;
  period: string;
  category: 'parkWork' | 'elderlyCare' | 'administration' | 'culture' | 'kids' | 'it';
  deadline: string;
  seats: number;
  featured?: boolean;
  description: string;
  tasks: string[];
  requirements: string[];
  salary: string;
  type: JobType; // Lottery (municipal) vs Standard (merit-based)
}

export const MOCK_JOBS_DATA: JobListing[] = [
  // === LOTTERY JOBS (Municipal Feriejobb) ===
  {
    id: '1',
    title: 'Parkarbetare',
    employer: 'Tekniska Enheten',
    location: 'Kramfors C',
    period: 'Juni',
    category: 'parkWork',
    deadline: '2026-03-31',
    seats: 15,
    featured: true,
    salary: '85 kr/tim',
    type: 'lottery',
    description: 'Vi söker dig som gillar att vara utomhus och inte är rädd för att ta i. Som parkarbetare hjälper du till att göra Kramfors fint inför sommaren.',
    tasks: [
      'Gräsklippning och trimning',
      'Rensning av rabatter',
      'Målning av parkbänkar',
      'Plocka skräp i parker och grönområden'
    ],
    requirements: [
      'Du ska vara född 2008-2010',
      'Du gillar fysiskt arbete',
      'Du kan ta dig till samlingsplatsen på egen hand'
    ]
  },
  {
    id: '3',
    title: 'Fritidsledare',
    employer: 'Ungdomens Hus',
    location: 'Bollstabruk',
    period: 'Augusti',
    category: 'kids',
    deadline: '2026-04-01',
    seats: 6,
    featured: true,
    salary: '85 kr/tim',
    type: 'lottery',
    description: 'Var med och skapa en rolig sommar för barn och unga! Du kommer att leda aktiviteter och vara en förebild för ungdomarna på fritidsgården.',
    tasks: [
      'Leda lekar och aktiviteter',
      'Planera och genomföra temakvällar',
      'Stötta ungdomar i deras fritidsaktiviteter',
      'Hjälpa till med praktiska sysslor'
    ],
    requirements: [
      'Gillar att arbeta med barn och unga',
      'Ansvarsfull och pålitlig',
      'Kreativ och idérik'
    ]
  },
  {
    id: '4',
    title: 'Äldreomsorgsassistent',
    employer: 'Vård & Omsorg',
    location: 'Nyland',
    period: 'Juni',
    category: 'elderlyCare',
    deadline: '2026-03-31',
    seats: 10,
    salary: '90 kr/tim',
    type: 'lottery',
    description: 'Sätt guldkant på de äldres vardag. Som äldreomsorgsassistent får du möjlighet att göra verklig skillnad i någons liv.',
    tasks: [
      'Promenader med boende',
      'Högläsning och sällskap',
      'Hjälpa till vid måltider och fika',
      'Ordna sociala aktiviteter'
    ],
    requirements: [
      'Tålmodig och lugn',
      'Empatisk och omtänksam',
      'Bekväm med att prata med äldre'
    ]
  },
  {
    id: '6',
    title: 'Strandstädare',
    employer: 'Tekniska Enheten',
    location: 'Icktjärn',
    period: 'Juni',
    category: 'parkWork',
    deadline: '2026-03-25',
    seats: 4,
    salary: '85 kr/tim',
    type: 'lottery',
    description: 'Håll våra badplatser rena och inbjudande! Du kommer att arbeta utomhus vid kommunens vackraste badplatser.',
    tasks: [
      'Städa stränder och badplatser',
      'Tömma papperskorgar',
      'Kontrollera bryggor och utrustning',
      'Rapportera eventuella skador'
    ],
    requirements: [
      'Gillar att vara utomhus',
      'Kan simma',
      'Ansvarsfull och självgående'
    ]
  },
  {
    id: '8',
    title: 'Cafébiträde',
    employer: 'Kulturförvaltningen',
    location: 'Biblioteket',
    period: 'Juli',
    category: 'culture',
    deadline: '2026-03-28',
    seats: 3,
    featured: true,
    salary: '85 kr/tim',
    type: 'lottery',
    description: 'Jobba i bibliotekets mysiga café! Servera fika och ge besökarna en trevlig upplevelse.',
    tasks: [
      'Servera fika och enklare maträtter',
      'Kassahantering',
      'Städa och hålla ordning',
      'Ge god service till besökare'
    ],
    requirements: [
      'Serviceinriktad och glad',
      'Kan hantera stress',
      'Intresse för mat och bakning är meriterande'
    ]
  },

  // === STANDARD JOBS (Merit-based, CV required) ===
  {
    id: '2',
    title: 'Sommarvärd / Guide',
    employer: 'Kulturförvaltningen',
    location: 'Höga Kusten',
    period: 'Juli',
    category: 'culture',
    deadline: '2026-03-15',
    seats: 4,
    salary: '90 kr/tim',
    type: 'standard',
    description: 'Är du social, språkkunnig och älskar Höga Kusten? Då är detta jobbet för dig. Du kommer att möta turister från hela världen.',
    tasks: [
      'Guida besökare i utställningar',
      'Svara på frågor i receptionen',
      'Hjälpa till vid evenemang',
      'Enklare städning och iordningställande'
    ],
    requirements: [
      'God engelska',
      'Social och utåtriktad',
      'CV & Personligt brev krävs',
      'Intresse för kultur och historia'
    ]
  },
  {
    id: '5',
    title: 'Administratör',
    employer: 'Kommunledningsförvaltningen',
    location: 'Kramfors C',
    period: 'Juli',
    category: 'administration',
    deadline: '2026-03-20',
    seats: 2,
    salary: '85 kr/tim',
    type: 'standard',
    description: 'Hjälp till på kontoret med diverse administrativa uppgifter. Perfekt för dig som trivs med kontorsarbete och vill lära dig mer om hur kommunen fungerar.',
    tasks: [
      'Arkivering av dokument',
      'Svara i telefon och ta emot besökare',
      'Enklare datorarbete och registrering',
      'Hjälpa till med kopiering och utskick'
    ],
    requirements: [
      'Noggrann och strukturerad',
      'Grundläggande datavana',
      'CV & Personligt brev krävs',
      'Bra på att kommunicera'
    ]
  },
  {
    id: '7',
    title: 'IT-support',
    employer: 'IT-avdelningen',
    location: 'Kramfors C',
    period: 'Juli',
    category: 'it',
    deadline: '2026-03-28',
    seats: 2,
    salary: '90 kr/tim',
    type: 'standard',
    description: 'Hjälp kommunens anställda med IT-frågor. Perfekt för dig som är teknikintresserad och vill lära dig mer om IT i en stor organisation.',
    tasks: [
      'Hjälpa användare med enklare IT-problem',
      'Installera och konfigurera datorer',
      'Dokumentera support-ärenden',
      'Assistera vid IT-projekt'
    ],
    requirements: [
      'Intresse för IT och teknik',
      'Tålmodig och pedagogisk',
      'CV krävs',
      'Grundläggande datorkunskaper'
    ]
  },
  {
    id: '9',
    title: 'Butiksbiträde',
    employer: 'ICA Supermarket',
    location: 'Bollstabruk',
    period: 'Juni - Aug',
    category: 'administration',
    deadline: '2026-04-15',
    seats: 2,
    featured: true,
    salary: 'Enl. handelsavtal',
    type: 'standard',
    description: 'Vi söker extrapersonal till kassan och varuplock i sommar. Perfekt för dig som vill jobba i en fartfylld miljö med mycket kundkontakt.',
    tasks: [
      'Kassaarbete och betalningshantering',
      'Varuplock och påfyllning',
      'Kundservice och rådgivning',
      'Städning och ordning i butiken'
    ],
    requirements: [
      'Fyllt 18 år',
      'Tidigare kassavana är meriterande',
      'CV & Personligt brev krävs',
      'Flexibel med arbetstider'
    ]
  },
  {
    id: '10',
    title: 'Serveringspersonal',
    employer: 'Hotell Höga Kusten',
    location: 'Höga Kusten',
    period: 'Juni - Aug',
    category: 'culture',
    deadline: '2026-04-01',
    seats: 5,
    salary: 'Enl. HRF-avtal',
    type: 'standard',
    description: 'Jobba på ett av Höga Kustens finaste hotell! Vi söker serviceinriktade ungdomar till vår restaurang och frukostmatsal.',
    tasks: [
      'Servering i restaurang och bar',
      'Frukostservering och dukning',
      'Kundservice och beställningar',
      'Städning och iordningställande'
    ],
    requirements: [
      'Fyllt 18 år',
      'Erfarenhet av servering är meriterande',
      'CV & Personligt brev krävs',
      'God svenska och engelska'
    ]
  },
  {
    id: '11',
    title: 'Lagerarbetare',
    employer: 'PostNord',
    location: 'Kramfors C',
    period: 'Juli - Aug',
    category: 'administration',
    deadline: '2026-04-10',
    seats: 3,
    salary: 'Enl. avtal',
    type: 'standard',
    description: 'Hjälp till med sortering och hantering av paket på vårt lager. Fysiskt arbete i ett snabbt tempo.',
    tasks: [
      'Sortering av paket och brev',
      'Lastning och lossning',
      'Skanning och registrering',
      'Ordning och reda på lagret'
    ],
    requirements: [
      'Fyllt 18 år',
      'Fysiskt god form',
      'CV krävs',
      'Truckkort är meriterande'
    ]
  }
];

// All available categories (aligned with messages/sv.json)
export const JOB_CATEGORIES = [
  'parkWork',
  'elderlyCare', 
  'kids',
  'culture',
  'administration',
  'it'
] as const;

// All available periods
export const JOB_PERIODS = [
  'period1', // Juni
  'period2', // Juli
  'period3'  // Augusti
] as const;

// Job types for filtering
export const JOB_TYPES = ['lottery', 'standard'] as const;

// Helper function to find a job by ID
export function getJobById(id: string): JobListing | undefined {
  return MOCK_JOBS_DATA.find(job => job.id === id);
}

// Helper to get jobs by type
export function getJobsByType(type: JobType): JobListing[] {
  return MOCK_JOBS_DATA.filter(job => job.type === type);
}

// Helper to get lottery jobs count
export function getLotteryJobsCount(): number {
  return MOCK_JOBS_DATA.filter(job => job.type === 'lottery').length;
}

// Helper to get standard jobs count
export function getStandardJobsCount(): number {
  return MOCK_JOBS_DATA.filter(job => job.type === 'standard').length;
}
