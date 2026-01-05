import { useTranslations } from 'next-intl';
import { JobWizard } from '@/components/admin/job-wizard/job-wizard';

export default function EditJobPage() {
  const t = useTranslations('admin.jobWizard');

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900">{t('editTitle')}</h1>
        <p className="text-slate-500">{t('editSubtitle')}</p>
      </div>
      
      <JobWizard />
    </div>
  );
}

