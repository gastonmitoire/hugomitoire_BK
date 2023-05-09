import { Navigation } from "./navigation";

export function Header() {
  return (
    <header className="container mx-auto flex items-center justify-between w-full h-[10vh] bg-white dark:bg-neutral-900">
      <div className="flex-1">
        <Navigation />
      </div>
      <div className="flex-0 flex items-center">
        <a
          href="/"
          className="text-3xl font-cinzel font-bold uppercase text-neutral-700 dark:text-neutral-300"
        >
          Hugo Mitoire
        </a>
      </div>
      <div className="flex-1"></div>
    </header>
  );
}
