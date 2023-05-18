import React from "react";

interface PaginationDotsProps {
  currentPage: number;
  totalPages: number;
  onClick: (page: number) => void;
}

export function PaginationDots({
  currentPage,
  totalPages,
  onClick,
}: PaginationDotsProps) {
  return (
    <div className="flex justify-center items-center">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`w-3 h-3 rounded-full mx-1 ${
            index === currentPage ? "bg-primary" : "bg-neutral-100"
          }`}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
}
