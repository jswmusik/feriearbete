import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Search, ArrowRight, Filter, Heart, MoreHorizontal, 
  CheckCircle2, AlertCircle, Download, Loader2, Upload,
  Briefcase, GraduationCap, FileText, Users
} from "lucide-react"

export default function DesignSystemPage() {
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
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Badge className="bg-tiffany text-tiffany-foreground hover:bg-tiffany mb-4 text-sm px-3 py-1">
            DESIGN SYSTEM V4.0
          </Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold font-heading tracking-tight mb-4">
            {t('design.systemTitle')} <span className="text-tiffany">{t('design.systemTitleHighlight')}</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl font-medium mb-12">
            {t('design.systemSubtitle')}
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded p-2 flex flex-col md:flex-row gap-2 max-w-4xl shadow-xl">
            <div className="flex-grow relative">
              <Input 
                className="h-14 text-lg border-0 bg-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:border-0" 
                placeholder={t('hero.searchPlaceholder')}
              />
            </div>
            <div className="hidden md:block w-px bg-slate-200 my-2"></div>
            <div className="flex-grow relative">
              <Input 
                className="h-14 text-lg border-0 bg-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:border-0" 
                placeholder={t('hero.locationPlaceholder')}
              />
            </div>
            <Button className="h-14 px-8 bg-primary hover:bg-primary/90">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Popular Searches */}
          <div className="mt-12">
            <p className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">{t('hero.popularSearches')}</p>
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">

        {/* SECTION 1: COLOR PALETTE */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-10 bg-primary flex items-center justify-center rounded font-bold text-white">01</div>
            <h2 className="text-3xl font-bold font-heading text-slate-900">{t('design.brandColors')}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-primary rounded"></div>
              <p className="font-bold text-sm">Royal Purple</p>
              <p className="text-xs text-slate-500 font-mono">#6E46AE</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-tiffany rounded"></div>
              <p className="font-bold text-sm">Tiffany Blue</p>
              <p className="text-xs text-slate-500 font-mono">#00B6B4</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-purple-dark rounded"></div>
              <p className="font-bold text-sm">Purple Dark</p>
              <p className="text-xs text-slate-500 font-mono">#2D2241</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-purple-light rounded border"></div>
              <p className="font-bold text-sm">Purple Light</p>
              <p className="text-xs text-slate-500 font-mono">Background</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-tiffany-light rounded border"></div>
              <p className="font-bold text-sm">Tiffany Light</p>
              <p className="text-xs text-slate-500 font-mono">Background</p>
            </div>
          </div>

          {/* Category Badge Colors */}
          <div className="bg-slate-50 p-8 rounded">
            <Label className="text-xs font-bold uppercase text-slate-400 mb-4 block">{t('design.categoryBadgeColors')}</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-16 bg-tiffany rounded"></div>
                <p className="text-xs font-bold">Teal ({t('design.assessments')})</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-warning rounded"></div>
                <p className="text-xs font-bold">Yellow ({t('design.jobs')})</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-success rounded"></div>
                <p className="text-xs font-bold">Green ({t('design.resume')})</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-coral rounded"></div>
                <p className="text-xs font-bold">Coral ({t('design.interview')})</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ARTICLE CARDS */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-10 bg-primary flex items-center justify-center rounded font-bold text-white">02</div>
            <h2 className="text-3xl font-bold font-heading text-slate-900">{t('design.articleCards')}</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border rounded overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="aspect-square bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <GraduationCap className="h-16 w-16 text-slate-400" />
                </div>
              </div>
              <CardContent className="p-4">
                <Badge className="bg-tiffany text-tiffany-foreground text-xs font-bold mb-2">{t('design.assessments')}</Badge>
                <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">11 awesome free career self assessments</h3>
              </CardContent>
            </Card>

            <Card className="border rounded overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="aspect-square bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <Briefcase className="h-16 w-16 text-slate-400" />
                </div>
              </div>
              <CardContent className="p-4">
                <Badge className="bg-warning text-warning-foreground text-xs font-bold mb-2">{t('design.jobs')}</Badge>
                <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">How to start looking for a job</h3>
              </CardContent>
            </Card>

            <Card className="border rounded overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="aspect-square bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-slate-400" />
                </div>
              </div>
              <CardContent className="p-4">
                <Badge className="bg-success text-success-foreground text-xs font-bold mb-2">{t('design.resume')}</Badge>
                <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">Resume samples</h3>
              </CardContent>
            </Card>

            <Card className="border rounded overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="aspect-square bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <Users className="h-16 w-16 text-slate-400" />
                </div>
              </div>
              <CardContent className="p-4">
                <Badge className="bg-coral text-coral-foreground text-xs font-bold mb-2">{t('design.interview')}</Badge>
                <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">100 top interview questions - be prepared</h3>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SECTION 3: BUTTONS */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-10 bg-primary flex items-center justify-center rounded font-bold text-white">03</div>
            <h2 className="text-3xl font-bold font-heading text-slate-900">{t('design.buttonsActions')}</h2>
          </div>

          <div className="bg-slate-50 p-8 rounded">
            <div className="flex flex-wrap items-end gap-6">
              <div className="text-center space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase">Primary (Purple)</p>
                <Button size="lg">
                  {t('common.login')}
                </Button>
              </div>

              <div className="text-center space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase">Action (Tiffany)</p>
                <Button variant="action" size="lg">
                  {t('hero.searchButton')} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="text-center space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase">Secondary</p>
                <Button variant="secondary" size="lg">
                  Secondary
                </Button>
              </div>

              <div className="text-center space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase">Outline</p>
                <Button variant="outline" size="lg">
                  {t('common.readMore')}
                </Button>
              </div>

              <div className="text-center space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase">Destructive</p>
                <Button variant="destructive" size="lg">
                  {t('common.delete')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: JOB CARDS */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-10 bg-primary flex items-center justify-center rounded font-bold text-white">04</div>
            <h2 className="text-3xl font-bold font-heading text-slate-900">{t('design.jobCards')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-slate-200 rounded shadow-sm hover:shadow-md hover:border-primary transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge className="bg-purple-light text-primary">{t('jobs.period1')}</Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-coral">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-primary pt-2">
                  Sommarvärd / Guide
                </CardTitle>
                <p className="text-slate-500 font-medium">Kulturförvaltningen • 3 {t('jobs.weeks', { count: 3 }).split(' ')[1]}</p>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Guide tourists at the High Coast museum. Requires English and Swedish.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs bg-slate-50">Social</Badge>
                  <Badge variant="outline" className="text-xs bg-slate-50">{t('categories.culture')}</Badge>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-slate-50/50 p-4">
                <Button className="w-full" variant="outline">{t('common.viewDetails')}</Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-l-8 border-l-tiffany border-slate-200 rounded shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <CardHeader className="pb-2">
                <p className="text-xs font-bold text-tiffany uppercase tracking-wider">{t('jobs.mostPopular')}</p>
                <CardTitle className="text-xl font-bold text-slate-900">
                  {t('categories.parkWork')}
                </CardTitle>
                <p className="text-sm text-slate-500">Tekniska Enheten • 4 {t('jobs.weeks', { count: 4 }).split(' ')[1]}</p>
              </CardHeader>
              <CardContent>
                <div className="h-2 w-full bg-slate-100 rounded-sm overflow-hidden mt-2">
                  <div className="h-full w-1/3 bg-tiffany rounded-sm"></div>
                </div>
                <p className="text-xs text-slate-400 mt-2">{t('jobs.spotsLeft', { count: 8 })}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button size="sm" variant="action" className="w-full">{t('common.applyNow')}</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* SECTION 5: FORM ELEMENTS */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-10 bg-primary flex items-center justify-center rounded font-bold text-white">05</div>
            <h2 className="text-3xl font-bold font-heading text-slate-900">{t('design.formElements')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-6 rounded">
              <Label className="text-sm font-bold text-slate-700 mb-3 block">{t('application.uploadCV')}</Label>
              <div className="border-2 border-dashed border-slate-300 rounded p-8 flex flex-col items-center justify-center bg-white hover:border-tiffany transition-colors cursor-pointer group">
                <div className="h-14 w-14 bg-tiffany-light rounded flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="h-6 w-6 text-tiffany" />
                </div>
                <span className="font-bold text-slate-700">{t('application.dropFileHere')}</span>
                <span className="text-sm text-slate-400">{t('application.maxFileSize')}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded">
              <Label className="text-sm font-bold text-slate-700 mb-3 block">{t('bankid.title')}</Label>
              <div className="flex items-center gap-4 p-6 bg-white border border-slate-200 rounded">
                <div className="h-14 w-14 bg-purple-light rounded flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                </div>
                <div>
                  <p className="font-bold text-primary">{t('bankid.openApp')}</p>
                  <p className="text-sm text-slate-500">{t('bankid.waiting')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: ADMIN TABLE */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-10 bg-primary flex items-center justify-center rounded font-bold text-white">06</div>
            <h2 className="text-3xl font-bold font-heading text-slate-900">{t('design.adminTable')}</h2>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border-2 border-slate-200 rounded">
              <p className="text-sm font-bold text-slate-400 uppercase">{t('admin.totalApplications')}</p>
              <p className="text-4xl font-extrabold text-slate-900 mt-2">1,402</p>
              <div className="w-full bg-slate-100 h-2 mt-4 rounded-sm overflow-hidden">
                <div className="bg-primary h-full w-[70%] rounded-sm"></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">70% from Kramfors C</p>
            </div>
            <div className="p-6 bg-white border-2 border-slate-200 rounded border-b-8 border-b-tiffany">
              <p className="text-sm font-bold text-slate-400 uppercase">{t('admin.placements')}</p>
              <p className="text-4xl font-extrabold text-slate-900 mt-2">850</p>
              <p className="text-xs text-tiffany font-bold mt-2 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> {t('admin.allTargetsMet')}</p>
            </div>
            <div className="p-6 bg-white border-2 border-slate-200 rounded border-b-8 border-b-warning">
              <p className="text-sm font-bold text-slate-400 uppercase">{t('admin.pendingApproval')}</p>
              <p className="text-4xl font-extrabold text-slate-900 mt-2">42</p>
              <p className="text-xs text-orange font-bold mt-2 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/> {t('admin.actionRequired')}</p>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white border-2 border-slate-200 rounded overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-700">{t('admin.latestApplicants')}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">{t('admin.exportCSV')}</Button>
                <Button variant="outline" size="sm"><Filter className="w-3 h-3 mr-2" /> {t('admin.filter')}</Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"><Checkbox /></TableHead>
                  <TableHead>{t('admin.name')}</TableHead>
                  <TableHead>{t('admin.status')}</TableHead>
                  <TableHead>{t('admin.priorityGroup')}</TableHead>
                  <TableHead className="text-right">{t('admin.action')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell className="font-medium">Liam Andersson</TableCell>
                  <TableCell><Badge className="bg-warning text-warning-foreground">{t('status.pending')}</Badge></TableCell>
                  <TableCell>Grupp A (2008)</TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell className="font-medium">Noah Svensson</TableCell>
                  <TableCell><Badge className="bg-tiffany text-tiffany-foreground">{t('status.placed')}</Badge></TableCell>
                  <TableCell>Grupp B</TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell className="font-medium">Alice Lindberg</TableCell>
                  <TableCell><Badge variant="outline" className="text-slate-500">{t('status.draft')}</Badge></TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-center">
              <span className="text-xs text-slate-500">{t('admin.page', { current: 1, total: 12 })}</span>
            </div>
          </div>
        </section>

        {/* SECTION 7: STATUS BADGES */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-10 bg-primary flex items-center justify-center rounded font-bold text-white">07</div>
            <h2 className="text-3xl font-bold font-heading text-slate-900">{t('design.statusBadges')}</h2>
          </div>

          <div className="bg-slate-50 p-8 rounded">
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-primary text-primary-foreground">{t('status.new')}</Badge>
              <Badge className="bg-tiffany text-tiffany-foreground">{t('status.accepted')}</Badge>
              <Badge className="bg-success text-success-foreground">{t('status.completed')}</Badge>
              <Badge className="bg-info text-info-foreground">{t('status.inReview')}</Badge>
              <Badge className="bg-warning text-warning-foreground">{t('status.actionRequired')}</Badge>
              <Badge className="bg-orange text-orange-foreground">{t('status.reserved')}</Badge>
              <Badge className="bg-coral text-coral-foreground">{t('status.waitlist')}</Badge>
              <Badge className="bg-error text-error-foreground">{t('status.rejected')}</Badge>
              <Badge variant="outline" className="border-2">{t('status.draft')}</Badge>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <div className="bg-purple-dark text-white py-8 mt-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400">Design System v4.0 • Royal Purple + Tiffany Blue • Subtle Corners</p>
        </div>
      </div>
    </div>
  )
}
