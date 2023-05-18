import React from "react";

interface PaginationArrowsProps {
  currentPage: number;
  totalPages: number;
  onClick: (page: number) => void;
}

export function PaginationArrows({
  currentPage,
  totalPages,
  onClick,
}: PaginationArrowsProps) {
  return (
    <div className="flex justify-center items-center">
      <button
        className="w-3 h-3 rounded-full mx-1 bg-neutral-100"
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        className="w-3 h-3 rounded-full mx-1 bg-neutral-100"
        onClick={() => onClick(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
