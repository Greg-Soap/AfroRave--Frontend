export default function CreatorDashboardHeader() {
  return (
    <header className="w-full flex justify-center bg-white border-b border-b-light-gray">
      <nav className="relative px-4 md:px-8 w-full flex items-center justify-between py-4">
        <img
          src="/assets/dashboard/creator/ar2.png"
          alt="Logo"
          width={60}
          height={32}
        />

        <div className="flex items-center gap-8">
          <img
            src="/assets/dashboard/creator/bell-icon.png"
            alt="Bell"
            width={20}
            height={22}
          />

          <p className="size-10 rounded-full border border-black text-black flex items-center justify-center font-sf-pro-text text-sm font-black uppercase">
            EA
          </p>
        </div>
      </nav>
    </header>
  );
}
