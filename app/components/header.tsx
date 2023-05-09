import React from "react";

export function Header() {
  return (
    <header className="container mx-auto flex items-center justify-between w-full h-16 bg-white dark:bg-neutral-900">
      <div className="flex-1 flex items-center">
        <nav>
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <a
                href="/"
                className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/books"
                className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                Books
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
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
