'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { JobWizard } from '@/components/admin/job-wizard/job-wizard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EmployerCreateJobPage() {
  const t = useTranslations('admin.jobWizard');
  const tEmployer = useTranslations('employer');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        
        <Link 
          href={`/${locale}/employer/dashboard`} 
          className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {tEmployer('backToOverview')}
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">{t('createTitle')}</h1>
          <p className="text-slate-500 mt-1">{tEmployer('createSubtitle')}</p>
        </div>
        
        {/* Render Wizard in 'employer' mode */}
        <JobWizard mode="employer" />
      </div>
    </div>
  );
}

