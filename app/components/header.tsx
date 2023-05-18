import React from "react";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function Header({ title, children }: HeaderProps) {
  return (
    <header className="flex items-center py-8 text-neutral-900 bg-white">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">{title}</h1>
        {children}
      </div>
    </header>
  );
}
