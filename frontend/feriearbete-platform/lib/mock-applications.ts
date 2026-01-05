export type ApplicationStatus = 'new' | 'pending' | 'offered' | 'accepted' | 'rejected' | 'reserve';
export type GuardianStatus = 'pending' | 'signed';

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  personnummer: string;
  email: string;
  phone: string;
  status: ApplicationStatus;
  submittedAt: string;
  priorityGroup: 'A' | 'B' | 'C'; // Lottery group
  choices: string[]; // Job IDs
  assignedJob?: string;
  area: string;
  school?: string;
  hasDriverLicense: boolean;
  guardian?: string;       // Name of parent/guardian
  guardianStatus?: GuardianStatus; // Signature status
}

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    firstName: 'Liam',
    lastName: 'Andersson',
    personnummer: '080312-1234',
    email: 'liam.a@gmail.com',
    phone: '070-123 45 67',
    status: 'new',
    submittedAt: '2026-02-14',
    priorityGroup: 'A',
    choices: ['1', '3', '5'],
    area: 'Kramfors C',
    school: 'Ådalsskolan',
    hasDriverLicense: false,
    guardian: 'Maria Andersson',
    guardianStatus: 'pending'
  },
  {
    id: 'app-2',
    firstName: 'Noah',
    lastName: 'Svensson',
    personnummer: '080522-2345',
    email: 'noah.s@hotmail.com',
    phone: '072-345 67 89',
    status: 'offered',
    submittedAt: '2026-02-10',
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
    id: 'app-3',
    firstName: 'Alice',
    lastName: 'Lindberg',
    personnummer: '071105-3456',
    email: 'alice.l@outlook.com',
    phone: '076-789 01 23',
    status: 'accepted',
    submittedAt: '2026-02-01',
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
    id: 'app-4',
    firstName: 'Elsa',
    lastName: 'Ek',
    personnummer: '080130-4567',
    email: 'elsa.ek@gmail.com',
    phone: '070-000 11 22',
    status: 'rejected',
    submittedAt: '2026-02-18',
    priorityGroup: 'C',
    choices: ['5', '6', '7'],
    area: 'Kramfors C',
    school: 'Gudmundråskolan',
    hasDriverLicense: false,
    guardian: 'Lars Ek',
    guardianStatus: 'signed'
  },
  {
    id: 'app-5',
    firstName: 'Lucas',
    lastName: 'Berg',
    personnummer: '080815-5678',
    email: 'lucas.b@yahoo.com',
    phone: '073-999 88 77',
    status: 'reserve',
    submittedAt: '2026-02-20',
    priorityGroup: 'B',
    choices: ['2', '1'],
    area: 'Brunne',
    school: 'Ådalsskolan',
    hasDriverLicense: true,
    guardian: 'Karin Berg',
    guardianStatus: 'signed'
  },
  {
    id: 'app-6',
    firstName: 'Emma',
    lastName: 'Karlsson',
    personnummer: '070928-6789',
    email: 'emma.k@gmail.com',
    phone: '070-111 22 33',
    status: 'accepted',
    submittedAt: '2026-01-28',
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
    id: 'app-7',
    firstName: 'Oscar',
    lastName: 'Lindqvist',
    personnummer: '080203-7890',
    email: 'oscar.l@hotmail.com',
    phone: '072-444 55 66',
    status: 'pending',
    submittedAt: '2026-02-22',
    priorityGroup: 'B',
    choices: ['1', '2', '5', '6'],
    area: 'Bollstabruk',
    school: 'Gudmundråskolan',
    hasDriverLicense: false,
    guardian: 'Sofia Lindqvist',
    guardianStatus: 'pending'
  },
  {
    id: 'app-8',
    firstName: 'Maja',
    lastName: 'Johansson',
    personnummer: '071215-8901',
    email: 'maja.j@outlook.com',
    phone: '076-777 88 99',
    status: 'new',
    submittedAt: '2026-02-24',
    priorityGroup: 'A',
    choices: ['4', '3'],
    area: 'Nyland',
    school: 'Ådalsskolan',
    hasDriverLicense: false,
    guardian: 'Jonas Johansson',
    guardianStatus: 'signed'
  },
];
