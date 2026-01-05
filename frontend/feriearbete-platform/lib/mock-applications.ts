export type ApplicationStatus = 'new' | 'pending' | 'interview' | 'offered' | 'accepted' | 'rejected' | 'reserve' | 'withdrawn';
export type ApplicationType = 'lottery' | 'standard';
export type GuardianStatus = 'pending' | 'signed';

export interface Application {
  id: string;
  type: ApplicationType; // Distinguish types
  jobId?: string; // For standard apps (single job)
  jobTitle?: string; // Snapshot of title
  employer?: string; // Snapshot of employer
  
  firstName: string;
  lastName: string;
  personnummer: string;
  email: string;
  phone: string;
  
  status: ApplicationStatus;
  submittedAt: string;
  lastUpdated: string;
  
  // Lottery Specifics
  priorityGroup?: 'A' | 'B' | 'C';
  choices?: string[]; // IDs
  assignedJob?: string;
  
  // Standard Specifics
  interviewDate?: string;
  
  area: string;
  school?: string;
  hasDriverLicense: boolean;
  guardian?: string;
  guardianStatus?: GuardianStatus;
}

export const MOCK_APPLICATIONS: Application[] = [
  // 1. A Lottery Application (The "Pool")
  {
    id: 'app-lottery-1',
    type: 'lottery',
    firstName: 'Liam',
    lastName: 'Andersson',
    personnummer: '080312-1234',
    email: 'liam.a@gmail.com',
    phone: '070-123 45 67',
    status: 'pending', // Waiting for lottery
    submittedAt: '2026-02-14',
    lastUpdated: '2026-02-14',
    priorityGroup: 'A',
    choices: ['1', '3', '5'], // Park, Fritidsledare, Admin
    area: 'Kramfors C',
    school: 'Ådalsskolan',
    hasDriverLicense: false,
    guardian: 'Maria Andersson',
    guardianStatus: 'pending'
  },
  // 2. A Standard Application (Direct to ICA)
  {
    id: 'app-std-1',
    type: 'standard',
    jobId: '9', // ICA Butiksbiträde
    jobTitle: 'Butiksbiträde',
    employer: 'ICA Supermarket',
    firstName: 'Liam',
    lastName: 'Andersson',
    personnummer: '080312-1234',
    email: 'liam.a@gmail.com',
    phone: '070-123 45 67',
    status: 'interview', // Advanced status
    interviewDate: '2026-03-10 14:00',
    submittedAt: '2026-02-20',
    lastUpdated: '2026-03-01',
    area: 'Bollstabruk',
    hasDriverLicense: false,
  },
  // 3. A Rejected Standard Application
  {
    id: 'app-std-2',
    type: 'standard',
    jobId: '10', // Serveringspersonal
    jobTitle: 'Serveringspersonal',
    employer: 'Hotell Höga Kusten',
    firstName: 'Liam',
    lastName: 'Andersson',
    personnummer: '080312-1234',
    email: 'liam.a@gmail.com',
    phone: '070-123 45 67',
    status: 'rejected',
    submittedAt: '2026-02-18',
    lastUpdated: '2026-02-25',
    area: 'Höga Kusten',
    hasDriverLicense: false,
  },
  // 4. Other users' lottery applications (for admin views)
  {
    id: 'app-lottery-2',
    type: 'lottery',
    firstName: 'Noah',
    lastName: 'Svensson',
    personnummer: '080522-2345',
    email: 'noah.s@hotmail.com',
    phone: '072-345 67 89',
    status: 'offered',
    submittedAt: '2026-02-10',
    lastUpdated: '2026-02-28',
    priorityGroup: 'B',
    choices: ['2', '4'],
    assignedJob: 'Parkarbetare (Period 1)',
    area: 'Bollstabruk',
    school: 'Gudmundråskolan',
    hasDriverLicense: true,
    guardian: 'Erik Svensson',
    guardianStatus: 'signed'
  },
  {
    id: 'app-lottery-3',
    type: 'lottery',
    firstName: 'Alice',
    lastName: 'Lindberg',
    personnummer: '071105-3456',
    email: 'alice.l@outlook.com',
    phone: '076-789 01 23',
    status: 'accepted',
    submittedAt: '2026-02-01',
    lastUpdated: '2026-03-01',
    priorityGroup: 'A',
    choices: ['1'],
    assignedJob: 'Fritidsledare (Period 2)',
    area: 'Nyland',
    school: 'Ådalsskolan',
    hasDriverLicense: false,
    guardian: 'Anna Lindberg',
    guardianStatus: 'signed'
  },
  {
    id: 'app-lottery-4',
    type: 'lottery',
    firstName: 'Elsa',
    lastName: 'Ek',
    personnummer: '080130-4567',
    email: 'elsa.ek@gmail.com',
    phone: '070-000 11 22',
    status: 'rejected',
    submittedAt: '2026-02-18',
    lastUpdated: '2026-02-20',
    priorityGroup: 'C',
    choices: ['5', '6', '7'],
    area: 'Kramfors C',
    school: 'Gudmundråskolan',
    hasDriverLicense: false,
    guardian: 'Lars Ek',
    guardianStatus: 'signed'
  },
  {
    id: 'app-lottery-5',
    type: 'lottery',
    firstName: 'Lucas',
    lastName: 'Berg',
    personnummer: '080815-5678',
    email: 'lucas.b@yahoo.com',
    phone: '073-999 88 77',
    status: 'reserve',
    submittedAt: '2026-02-20',
    lastUpdated: '2026-02-22',
    priorityGroup: 'B',
    choices: ['2', '1'],
    area: 'Brunne',
    school: 'Ådalsskolan',
    hasDriverLicense: true,
    guardian: 'Karin Berg',
    guardianStatus: 'signed'
  },
  {
    id: 'app-lottery-6',
    type: 'lottery',
    firstName: 'Emma',
    lastName: 'Karlsson',
    personnummer: '070928-6789',
    email: 'emma.k@gmail.com',
    phone: '070-111 22 33',
    status: 'accepted',
    submittedAt: '2026-01-28',
    lastUpdated: '2026-02-15',
    priorityGroup: 'A',
    choices: ['3', '4', '1'],
    assignedJob: 'Äldreomsorgsassistent (Period 2)',
    area: 'Kramfors C',
    school: 'Ådalsskolan',
    hasDriverLicense: true,
    guardian: 'Peter Karlsson',
    guardianStatus: 'signed'
  },
  {
    id: 'app-lottery-7',
    type: 'lottery',
    firstName: 'Oscar',
    lastName: 'Lindqvist',
    personnummer: '080203-7890',
    email: 'oscar.l@hotmail.com',
    phone: '072-444 55 66',
    status: 'pending',
    submittedAt: '2026-02-22',
    lastUpdated: '2026-02-22',
    priorityGroup: 'B',
    choices: ['1', '2', '5', '6'],
    area: 'Bollstabruk',
    school: 'Gudmundråskolan',
    hasDriverLicense: false,
    guardian: 'Sofia Lindqvist',
    guardianStatus: 'pending'
  },
  {
    id: 'app-lottery-8',
    type: 'lottery',
    firstName: 'Maja',
    lastName: 'Johansson',
    personnummer: '071215-8901',
    email: 'maja.j@outlook.com',
    phone: '076-777 88 99',
    status: 'new',
    submittedAt: '2026-02-24',
    lastUpdated: '2026-02-24',
    priorityGroup: 'A',
    choices: ['4', '3'],
    area: 'Nyland',
    school: 'Ådalsskolan',
    hasDriverLicense: false,
    guardian: 'Jonas Johansson',
    guardianStatus: 'signed'
  },
];
