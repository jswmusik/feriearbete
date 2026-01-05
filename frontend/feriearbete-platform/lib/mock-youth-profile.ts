import { JobListing, MOCK_JOBS_DATA } from './mock-jobs-data';

export type ApplicationStage = 'submitted' | 'guardian_pending' | 'processing' | 'offered' | 'placed';

export interface YouthProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  personnummer: string;
  status: ApplicationStage;
  guardianName: string;
  guardianEmail: string;
  guardianStatus: 'pending' | 'signed';
  savedJobs: string[]; // Job IDs
  selectedJobs: string[]; // Job IDs in priority order (from application)
  applicationDate: string;
  lastUpdated: string;
}

export const MOCK_YOUTH_PROFILE: YouthProfile = {
  id: 'u1',
  name: 'Liam Andersson',
  email: 'liam.a@gmail.com',
  phone: '070-123 45 67',
  personnummer: '080312-1234',
  status: 'guardian_pending', // The current state for our demo
  guardianName: 'Maria Andersson',
  guardianEmail: 'maria.andersson@gmail.com',
  guardianStatus: 'pending',
  savedJobs: ['1', '3'], // Parkarbetare, Fritidsledare
  selectedJobs: ['1', '3', '2'], // Priority order in application
  applicationDate: '2026-02-14',
  lastUpdated: '2026-02-14',
};

// Helper to get saved jobs with full details
export const getSavedJobs = (): JobListing[] => {
  return MOCK_JOBS_DATA.filter(job => MOCK_YOUTH_PROFILE.savedJobs.includes(job.id));
};

// Helper to get selected jobs (from application) with full details
export const getSelectedJobs = (): JobListing[] => {
  return MOCK_YOUTH_PROFILE.selectedJobs
    .map(id => MOCK_JOBS_DATA.find(job => job.id === id))
    .filter((job): job is JobListing => job !== undefined);
};

// Status display helpers
export const getStatusLabel = (status: ApplicationStage): string => {
  const labels: Record<ApplicationStage, string> = {
    submitted: 'Ansökan skickad',
    guardian_pending: 'Väntar på målsman',
    processing: 'Under behandling',
    offered: 'Erbjudande mottaget',
    placed: 'Placerad',
  };
  return labels[status];
};

export const getStatusColor = (status: ApplicationStage): string => {
  const colors: Record<ApplicationStage, string> = {
    submitted: 'bg-info',
    guardian_pending: 'bg-warning',
    processing: 'bg-primary',
    offered: 'bg-tiffany',
    placed: 'bg-success',
  };
  return colors[status];
};

