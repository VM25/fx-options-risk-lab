export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-backdrop relative min-h-screen w-full">
      <div className="grain" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-9">
        {children}
      </div>
    </div>
  );
}
