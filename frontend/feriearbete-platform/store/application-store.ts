import { create } from 'zustand';

// Define the shape of our Application Data
interface PersonalInfo {
  personnummer: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  school: string;
  grade: string;
  hasDriverLicense: boolean | null; // null = not answered yet
}

interface ApplicationState {
  currentStep: number;
  personalInfo: PersonalInfo;
  selectedJobIds: string[]; // The ranked list of IDs (max 5)

  // Actions
  setStep: (step: number) => void;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  toggleJobSelection: (jobId: string) => void; // Handles Add/Remove logic
  reorderJobs: (newOrder: string[]) => void; // For drag-and-drop
  nextStep: () => void;
  prevStep: () => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  currentStep: 1,
  
  personalInfo: {
    personnummer: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    school: '',
    grade: '',
    hasDriverLicense: null,
  },

  selectedJobIds: [],

  setStep: (step) => set({ currentStep: step }),
  
  updatePersonalInfo: (data) => set((state) => ({
    personalInfo: { ...state.personalInfo, ...data }
  })),

  // THE SMART LOGIC
  toggleJobSelection: (jobId) => set((state) => {
    const isSelected = state.selectedJobIds.includes(jobId);
    
    // If removing
    if (isSelected) {
      return { selectedJobIds: state.selectedJobIds.filter(id => id !== jobId) };
    }
    
    // If adding (limit to 5)
    if (state.selectedJobIds.length >= 5) {
      return state; // Do nothing if full
    }
    
    return { selectedJobIds: [...state.selectedJobIds, jobId] };
  }),

  reorderJobs: (newOrder) => set({ selectedJobIds: newOrder }),

  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
}));
