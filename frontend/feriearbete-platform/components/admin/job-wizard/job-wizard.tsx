'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { AIJobWriter } from './ai-job-writer';
import { 
  ArrowRight, ArrowLeft, Save, Briefcase, Shuffle, 
  CheckCircle2, X, Plus, Calendar 
} from 'lucide-react';
import { JOB_CATEGORIES, JOB_PERIODS } from '@/lib/mock-jobs-data';
import { cn } from '@/lib/utils';

interface JobWizardProps {
  mode?: 'admin' | 'employer';
}

export function JobWizard({ mode = 'admin' }: JobWizardProps) {
  const t = useTranslations('admin.jobWizard');
  const tEmployer = useTranslations('employer');
  const tCats = useTranslations('categories');
  const tJobs = useTranslations('jobs');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [step, setStep] = useState(1);
  // Initialize type based on mode - employer is always 'standard'
  const [jobType, setJobType] = useState<'lottery' | 'standard'>(
    mode === 'employer' ? 'standard' : 'lottery'
  );
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    employer: '',
    location: '',
    category: '',
    description: '',
    tasks: [''] as string[],
    requirements: [''] as string[],
    period: '',
    seats: 1,
    salary: '',
    deadline: '2026-03-31'
  });

  const updateField = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Helper for array fields (tasks/requirements)
  const handleArrayChange = (field: 'tasks' | 'requirements', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    updateField(field, newArray);
  };

  const addArrayItem = (field: 'tasks' | 'requirements') => {
    updateField(field, [...formData[field], '']);
  };

  const removeArrayItem = (field: 'tasks' | 'requirements', index: number) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    updateField(field, newArray);
  };

  const handleSave = () => {
    // In a real app: POST /api/jobs
    if (mode === 'employer') {
      router.push(`/${locale}/employer/dashboard`);
    } else {
      router.push(`/${locale}/admin/jobs`);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else if (mode === 'employer') {
      router.push(`/${locale}/employer/dashboard`);
    } else {
      router.back();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Progress Stepper */}
      <div className="flex justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full" />
        {[1, 2, 3].map((s) => (
          <div 
            key={s}
            className={cn(
              "flex items-center justify-center h-10 w-10 rounded-full border-4 font-bold bg-white transition-all",
              step >= s ? "border-primary text-primary" : "border-slate-300 text-slate-400"
            )}
          >
            {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
          </div>
        ))}
      </div>

      <div className="grid gap-8">
        
        {/* STEP 1: BASICS */}
        {step === 1 && (
          <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
            <CardContent className="p-8 space-y-6">
              
              {/* Type Selection - Only show for admin mode */}
              {mode === 'admin' && (
                <div className="space-y-4">
                  <Label className="text-lg">{t('typeLabel')}</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div 
                      onClick={() => setJobType('lottery')}
                      className={cn(
                        "cursor-pointer p-4 rounded-xl border-2 flex items-start gap-4 transition-all hover:shadow-md",
                        jobType === 'lottery' ? "border-tiffany bg-tiffany/5" : "border-slate-200 hover:border-tiffany/50"
                      )}
                    >
                      <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", jobType === 'lottery' ? "bg-tiffany text-white" : "bg-slate-100 text-slate-400")}>
                        <Shuffle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{t('typeLottery')}</p>
                        <p className="text-xs text-slate-500 mt-1">{t('typeLotteryDesc')}</p>
                      </div>
                    </div>

                    <div 
                      onClick={() => setJobType('standard')}
                      className={cn(
                        "cursor-pointer p-4 rounded-xl border-2 flex items-start gap-4 transition-all hover:shadow-md",
                        jobType === 'standard' ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/50"
                      )}
                    >
                      <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", jobType === 'standard' ? "bg-primary text-white" : "bg-slate-100 text-slate-400")}>
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{t('typeStandard')}</p>
                        <p className="text-xs text-slate-500 mt-1">{t('typeStandardDesc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Employer Mode Info Banner */}
              {mode === 'employer' && (
                <div className="p-4 bg-blue-50 text-blue-800 rounded-xl border-2 border-blue-200">
                  <p className="font-bold flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4" /> {tEmployer('standardAdLabel')}
                  </p>
                  <p className="text-sm mt-1">{tEmployer('standardAdInfo')}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>{t('titleLabel')}</Label>
                  <Input 
                    placeholder="T.ex. Parkarbetare" 
                    value={formData.title} 
                    onChange={(e) => updateField('title', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('employerLabel')}</Label>
                  <Input 
                    placeholder={mode === 'employer' ? 'T.ex. ICA Supermarket' : 'T.ex. Tekniska Enheten'} 
                    value={formData.employer}
                    onChange={(e) => updateField('employer', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>{t('locationLabel')}</Label>
                  <Input 
                    placeholder="T.ex. Kramfors C" 
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('categoryLabel')}</Label>
                  <Select onValueChange={(val) => updateField('category', val)} value={formData.category}>
                    <SelectTrigger><SelectValue placeholder={t('selectCategory')} /></SelectTrigger>
                    <SelectContent>
                      {JOB_CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{tCats(cat as 'parkWork' | 'elderlyCare' | 'kids' | 'culture' | 'administration' | 'it')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* STEP 2: DETAILS */}
        {step === 2 && (
          <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
            <CardContent className="p-8 space-y-8">
              
              <AIJobWriter 
                jobTitle={formData.title} 
                onGenerate={(data) => {
                  updateField('description', data.description);
                  updateField('tasks', data.tasks);
                  updateField('requirements', data.requirements);
                }} 
              />

              <div className="space-y-2">
                <Label>{t('descriptionLabel')}</Label>
                <Textarea 
                  className="min-h-[150px]" 
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <Label>{t('tasksLabel')}</Label>
                {formData.tasks.map((task, i) => (
                  <div key={i} className="flex gap-2">
                    <Input 
                      value={task} 
                      onChange={(e) => handleArrayChange('tasks', i, e.target.value)}
                      placeholder={`Uppgift ${i + 1}`}
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeArrayItem('tasks', i)}>
                      <X className="h-4 w-4 text-slate-400" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addArrayItem('tasks')}>
                  <Plus className="h-4 w-4 mr-2" /> {t('addRow')}
                </Button>
              </div>

              <div className="space-y-4">
                <Label>{t('requirementsLabel')}</Label>
                {formData.requirements.map((req, i) => (
                  <div key={i} className="flex gap-2">
                    <Input 
                      value={req} 
                      onChange={(e) => handleArrayChange('requirements', i, e.target.value)}
                      placeholder={`Krav ${i + 1}`}
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeArrayItem('requirements', i)}>
                      <X className="h-4 w-4 text-slate-400" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addArrayItem('requirements')}>
                  <Plus className="h-4 w-4 mr-2" /> {t('addRow')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* STEP 3: PUBLISH */}
        {step === 3 && (
          <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Period Selection (Dynamic based on type) */}
                <div className="space-y-2">
                  <Label>{t('periodLabel')}</Label>
                  {jobType === 'lottery' ? (
                    <Select onValueChange={(val) => updateField('period', val)} value={formData.period}>
                      <SelectTrigger><SelectValue placeholder={t('selectPeriod')} /></SelectTrigger>
                      <SelectContent>
                        {JOB_PERIODS.map(p => (
                          <SelectItem key={p} value={p}>{tJobs(p as 'period1' | 'period2' | 'period3')}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input 
                      placeholder="T.ex. 15 juni - 15 augusti" 
                      value={formData.period}
                      onChange={(e) => updateField('period', e.target.value)}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label>{t('deadlineLabel')}</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                    <Input 
                      className="pl-10" 
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => updateField('deadline', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>{t('seatsLabel')}</Label>
                  <Input 
                    type="number" 
                    value={formData.seats}
                    onChange={(e) => updateField('seats', parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('salaryLabel')}</Label>
                  <Input 
                    placeholder="T.ex. 90 kr/tim" 
                    value={formData.salary}
                    onChange={(e) => updateField('salary', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> {step === 1 ? 'Avbryt' : 'Tillbaka'}
          </Button>
          
          <div className="flex gap-3">
            {step === 3 ? (
              <>
                <Button variant="outline" className="text-slate-600">
                  <Save className="mr-2 h-4 w-4" /> {t('saveDraft')}
                </Button>
                <Button onClick={handleSave} className="bg-success hover:bg-success/90 text-white">
                  {t('publish')}
                </Button>
              </>
            ) : (
              <Button onClick={() => setStep(step + 1)}>
                Nästa <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
