import { MunicipalitySidebar } from '@/components/admin/municipality-sidebar';

export default function MunicipalityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <MunicipalitySidebar />
      <main className="pl-64 transition-all duration-300">
        {/* Top Bar placeholder could go here */}
        <div className="p-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

