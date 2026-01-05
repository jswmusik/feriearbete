export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      
      {/* Left Column: Brand & Inspiration */}
      <div className="hidden lg:flex flex-col justify-between bg-purple-dark text-white p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-tiffany blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center font-bold text-white text-xl">
              F
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight">Feriearbete.se</span>
          </div>
          <h2 className="text-5xl font-extrabold font-heading leading-tight mb-6">
            Din startplats <br />
            <span className="text-tiffany">för framtiden.</span>
          </h2>
          <p className="text-purple-200 text-lg max-w-md">
            Sök jobb, få erfarenhet och tjäna dina egna pengar i sommar. Allt börjar med ett konto.
          </p>
        </div>

        <div className="relative z-10 text-sm text-purple-300">
          © 2026 Kramfors Kommun • Byggt för ungdomar
        </div>
      </div>

      {/* Right Column: The Form */}
      <div className="flex items-center justify-center bg-slate-50 p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>

    </div>
  );
}

