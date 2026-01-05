import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowRight, Briefcase, Users, FileText, GraduationCap } from 'lucide-react';

export default function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations();

  const popularSearches = [
    t('categories.parkWork'),
    t('categories.preschool'),
    t('categories.elderlyCare'),
    t('categories.administration'),
    t('categories.it'),
    t('categories.warehouse'),
    t('categories.kitchen'),
    t('categories.cleaning'),
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <div className="bg-purple-dark text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-5xl md:text-6xl font-extrabold font-heading tracking-tight mb-4">
            {t('hero.title')} <span className="text-tiffany">{t('hero.titleHighlight')}</span> {t('hero.titleEnd')}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl font-medium mb-12">
            {t('hero.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded p-2 flex flex-col md:flex-row gap-2 max-w-4xl shadow-xl">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <Input 
                className="h-14 pl-12 text-lg border-0 bg-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-0" 
                placeholder={t('hero.searchPlaceholder')}
              />
            </div>
            <div className="hidden md:block w-px bg-slate-200 my-2"></div>
            <div className="flex-grow relative">
              <Input 
                className="h-14 text-lg border-0 bg-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-0" 
                placeholder={t('hero.locationPlaceholder')}
              />
            </div>
            <Button className="h-14 px-8 bg-primary hover:bg-primary/90">
              <Search className="h-5 w-5 mr-2" />
              {t('hero.searchButton')}
            </Button>
          </div>

          {/* Popular Searches */}
          <div className="mt-12">
            <p className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">
              {t('hero.popularSearches')}
            </p>
            <div className="flex flex-wrap gap-3">
              {popularSearches.map((term) => (
                <button 
                  key={term}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded text-white font-medium transition-colors border border-white/10"
                >
                  <Search className="h-4 w-4 text-tiffany" />
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Resume CTA */}
          <div className="mt-8">
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white">
              {t('hero.uploadResume')}
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          <Link href="/jobs" className="group p-6 bg-white border-2 border-slate-200 rounded hover:border-primary hover:shadow-lg transition-all">
            <div className="h-12 w-12 bg-tiffany-light rounded flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Briefcase className="h-6 w-6 text-tiffany" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary">{t('navigation.jobs')}</h3>
            <p className="text-slate-500 text-sm mt-1">{t('hero.subtitle').slice(0, 50)}...</p>
          </Link>

          <Link href="/application" className="group p-6 bg-white border-2 border-slate-200 rounded hover:border-primary hover:shadow-lg transition-all">
            <div className="h-12 w-12 bg-purple-light rounded flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary">{t('application.title')}</h3>
            <p className="text-slate-500 text-sm mt-1">{t('common.applyNow')}</p>
          </Link>

          <Link href="/profile" className="group p-6 bg-white border-2 border-slate-200 rounded hover:border-primary hover:shadow-lg transition-all">
            <div className="h-12 w-12 bg-warning/10 rounded flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6 text-warning" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary">{t('navigation.profile')}</h3>
            <p className="text-slate-500 text-sm mt-1">{t('profile.editProfile')}</p>
          </Link>

          <Link href="/help" className="group p-6 bg-white border-2 border-slate-200 rounded hover:border-primary hover:shadow-lg transition-all">
            <div className="h-12 w-12 bg-success/10 rounded flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary">{t('navigation.help')}</h3>
            <p className="text-slate-500 text-sm mt-1">{t('common.readMore')}</p>
          </Link>
        </div>
      </div>

      {/* Design System Link */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-slate-50 rounded p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Badge className="bg-tiffany text-tiffany-foreground mb-2">Dev</Badge>
            <h2 className="text-2xl font-bold text-slate-900 font-heading">Design System</h2>
            <p className="text-slate-500">View all UI components and brand colors</p>
          </div>
          <Link href="/design">
            <Button variant="action" size="lg">
              View Components <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Feriearbete.se</h3>
              <p className="text-slate-400 text-sm">{t('metadata.description')}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('navigation.jobs')}</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/jobs" className="hover:text-white">{t('jobs.title')}</Link></li>
                <li><Link href="/application" className="hover:text-white">{t('application.title')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.about')}</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/about" className="hover:text-white">{t('footer.about')}</Link></li>
                <li><Link href="/contact" className="hover:text-white">{t('footer.contact')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/privacy" className="hover:text-white">{t('footer.privacy')}</Link></li>
                <li><Link href="/terms" className="hover:text-white">{t('footer.terms')}</Link></li>
                <li><Link href="/accessibility" className="hover:text-white">{t('footer.accessibility')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-slate-400">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </div>
        </div>
      </footer>
    </div>
  );
}
