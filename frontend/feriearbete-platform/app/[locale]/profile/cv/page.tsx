'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { UploadCloud, FileText, Sparkles, Wand2, Trash2, Plus, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

// Skills available to select
const AVAILABLE_SKILLS = [
  'Noggrann', 'Punktlig', 'Social', 'Engelska', 'Körkort B', 
  'Leda grupper', 'Datorvana', 'Fysiskt arbete', 'Hygienpass', 'HLR'
];

export default function CVPage() {
  const t = useTranslations('cv');
  const tCommon = useTranslations('common');
  
  const [aboutMe, setAboutMe] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Social', 'Punktlig']);
  const [uploadedFile, setUploadedFile] = useState<string | null>('liam_cv_v1.pdf');
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const generateAboutMe = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAboutMe("Jag är en driven och social ungdom som gillar att arbeta med människor. Mina vänner beskriver mig som punktlig och noggrann. Jag ser fram emot att lära mig nya saker och bidra till en bra stämning på arbetsplatsen.");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-8">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold font-heading text-slate-900">{t('title')}</h1>
            <p className="text-slate-500">{t('subtitle')}</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> {t('preview')}
          </Button>
        </div>

        <div className="grid gap-8">
          
          {/* SECTION 1: UPLOAD */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>{t('uploadTitle')}</CardTitle>
              <CardDescription>{t('uploadDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              {uploadedFile ? (
                <div className="flex items-center justify-between p-4 bg-purple-light/20 border-2 border-primary/20 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{uploadedFile}</p>
                      <p className="text-xs text-slate-500">{t('uploaded')} 2026-02-14</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setUploadedFile(null)} className="text-slate-400 hover:text-red-500">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="h-14 w-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="h-7 w-7 text-primary" />
                  </div>
                  <p className="font-bold text-slate-700">{t('dropFileHere')}</p>
                  <p className="text-sm text-slate-400">PDF, DOCX (Max 5MB)</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SECTION 2: SKILLS */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>{t('skills')}</CardTitle>
              <CardDescription>{t('skillsDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {AVAILABLE_SKILLS.map(skill => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                    className={cn(
                      "cursor-pointer px-3 py-1.5 text-sm select-none transition-all",
                      selectedSkills.includes(skill) 
                        ? "bg-tiffany hover:bg-tiffany/90 border-0" 
                        : "bg-white hover:border-tiffany hover:text-tiffany"
                    )}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="h-8 border-dashed border-slate-300 text-slate-500">
                  <Plus className="h-3 w-3 mr-1" /> {t('addCustomSkill')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* SECTION 3: ABOUT ME (AI) */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{t('aboutMe')}</CardTitle>
                  <CardDescription>{t('aboutMeDesc')}</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary gap-1">
                  <Sparkles className="h-3 w-3" /> {t('aiHelp')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Textarea 
                  className="min-h-[150px] text-base leading-relaxed p-4"
                  placeholder={t('aboutMePlaceholder')}
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                />
                
                {/* AI Overlay Button */}
                {!aboutMe && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Button 
                      size="sm" 
                      onClick={generateAboutMe}
                      disabled={isGenerating}
                      className="pointer-events-auto bg-white text-primary hover:bg-purple-50 border-2 border-primary shadow-sm"
                    >
                      {isGenerating ? t('writing') : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" /> {t('generateAbout')}
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <Button className="w-full sm:w-auto">{tCommon('save')}</Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

