import { Navigation } from "./navigation";

import { User } from "@prisma/client";

import { Drawer } from "./drawer";
import { UserMenu } from "./user_menu";

interface HeaderProps {
  user: {
    id: string;
    username: string;
    email?: string;
    profile?: {
      id: string;
      image?: string;
      displayName?: string;
    };
  };
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="container mx-auto flex items-center justify-between w-full h-[10vh] px-3 md:p-0 bg-white dark:bg-neutral-900">
      <div className="flex-1">
        <Drawer buttonClassName="lg:hidden">
          <Navigation isvertical />
        </Drawer>
        <Navigation className="hidden lg:block" />
      </div>
      <div className="flex-0 flex items-center">
        <a
          href="/"
          className="text-3xl font-cinzel font-bold uppercase text-neutral-700 dark:text-neutral-300"
        >
          Hugo Mitoire
        </a>
      </div>
      <div className="md:flex-1 flex justify-end items-center">
        <UserMenu user={user} />
      </div>
    </header>
  );
}
