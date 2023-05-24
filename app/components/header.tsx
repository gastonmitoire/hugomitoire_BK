import React from "react";

interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
  transparent?: boolean;
  colorClass?: string;
  dense?: boolean;
}

export function Header({
  title,
  children,
  transparent,
  colorClass,
  dense,
}: HeaderProps) {
  return (
    <header
      className={`flex flex-col ${dense ? "pt-4 pb-2" : "pt-8 pb-4"} ${
        transparent ? "bg-transparent" : "bg-neutral-100"
      } `}
    >
      <div className="container mx-auto">
        <h1
          className={`text-4xl font-bold ${
            colorClass ? colorClass : "text-neutral-900"
          }`}
        >
          {title}
        </h1>
        {children}
      </div>
    </header>
  );
}
