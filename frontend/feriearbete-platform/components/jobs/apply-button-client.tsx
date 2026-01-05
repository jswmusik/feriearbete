'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StandardApplicationModal } from '@/components/application/standard-application-modal';
import { FileText } from 'lucide-react';

interface Props {
  jobId: string;
  jobTitle: string;
  employer: string;
}

export function ApplyButtonClient({ jobId, jobTitle, employer }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        size="lg" 
        className="w-full text-lg h-14 shadow-md bg-primary hover:bg-primary/90"
        onClick={() => setIsModalOpen(true)}
      >
        Sök jobbet med CV <FileText className="ml-2 h-5 w-5" />
      </Button>

      <StandardApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        jobTitle={jobTitle}
        employer={employer}
      />
    </>
  );
}

