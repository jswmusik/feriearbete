export interface ChildApplication {
  id: string;
  name: string;
  personnummer: string;
  status: 'pending_signature' | 'submitted' | 'offered' | 'placed';
  jobChoices: string[]; // Job Titles
  submittedAt: string;
  email: string;
  phone: string;
}

export interface GuardianProfile {
  id: string;
  name: string;
  personnummer: string;
  email: string;
  children: ChildApplication[];
}

export const MOCK_GUARDIAN: GuardianProfile = {
  id: 'g1',
  name: 'Maria Andersson',
  personnummer: '19800520-1234',
  email: 'maria.andersson@gmail.com',
  children: [
    {
      id: 'app-1',
      name: 'Liam Andersson',
      personnummer: '080312-1234',
      status: 'pending_signature',
      jobChoices: ['Parkarbetare', 'Fritidsledare', 'Sommarvärd / Guide'],
      submittedAt: '2026-02-14',
      email: 'liam.a@gmail.com',
      phone: '070-123 45 67'
    }
  ]
};

// Helper to get status label
export const getChildStatusLabel = (status: ChildApplication['status']): string => {
  const labels: Record<ChildApplication['status'], string> = {
    pending_signature: 'Väntar på signering',
    submitted: 'Inskickad',
    offered: 'Erbjudande mottaget',
    placed: 'Placerad',
  };
  return labels[status];
};

// Helper to get status color
export const getChildStatusColor = (status: ChildApplication['status']): string => {
  const colors: Record<ChildApplication['status'], string> = {
    pending_signature: 'bg-warning text-white',
    submitted: 'bg-info text-white',
    offered: 'bg-tiffany text-white',
    placed: 'bg-success text-white',
  };
  return colors[status];
};

