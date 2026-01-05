export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  period: string;
  seats: number;
  category: 'park' | 'care' | 'admin' | 'culture' | 'kids';
}

export const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Parkarbetare', department: 'Tekniska Enheten', location: 'Kramfors C', period: 'Period 1 (Juni)', seats: 15, category: 'park' },
  { id: '2', title: 'Strandstädare', department: 'Tekniska Enheten', location: 'Icktjärn', period: 'Period 1 (Juni)', seats: 4, category: 'park' },
  { id: '3', title: 'Äldreomsorg­sassistent', department: 'Vård & Omsorg', location: 'Brunne', period: 'Period 2 (Juli)', seats: 8, category: 'care' },
  { id: '4', title: 'Fritidsledare', department: 'Kultur & Fritid', location: 'Bollstabruk', period: 'Period 2 (Juli)', seats: 6, category: 'kids' },
  { id: '5', title: 'Administratör', department: 'Kommunledningsförvaltningen', location: 'Kramfors C', period: 'Period 1 (Juni)', seats: 2, category: 'admin' },
  { id: '6', title: 'Sommarvärd / Guide', department: 'Kulturförvaltningen', location: 'High Coast Art Valley', period: 'Period 3 (Aug)', seats: 4, category: 'culture' },
  { id: '7', title: 'Förskoleassistent', department: 'Bildningsförvaltningen', location: 'Nyland', period: 'Period 1 (Juni)', seats: 5, category: 'kids' },
  { id: '8', title: 'Köksbiträde', department: 'Måltidsservice', location: 'Kramfors C', period: 'Period 2 (Juli)', seats: 3, category: 'care' },
  { id: '9', title: 'IT-support', department: 'Kommunledningsförvaltningen', location: 'Kramfors C', period: 'Period 1 (Juni)', seats: 2, category: 'admin' },
  { id: '10', title: 'Biblioteksassistent', department: 'Kulturförvaltningen', location: 'Kramfors C', period: 'Period 3 (Aug)', seats: 3, category: 'culture' },
];

