import React from "react";
import { Book as BookProps } from "@prisma/client";

interface BookDetailsProps {
  book: BookProps & {
    illustrator?: string;
    publisher: {
      username: string;
    };
  };
}

// extend the BookDetailsProps interface with illustrator and publisher

export function BookDetails({ book }: BookDetailsProps) {
  return (
    <div className="flex flex-col lg:flex-row xl:flex-row 2xl:flex-row h-full container py-8">
      <div className="p-8 bg-neutral-900" style={{ flex: "2 1 0%" }}>
        <h1 className="text-4xl font-bold pb-5">Sinopsis</h1>
        <p className="text-xl font-bellefair">{book.description}</p>
      </div>
      <div className="lg:flex-1 flex flex-col gap-5 p-8 bg-neutral-950">
        <span>
          <h3 className="text-2xl font-bold">Fecha de publicación</h3>
          <p className="text-neutral-400">{book.publicationDate.toString()}</p>
        </span>
        {book.illustrator && (
          <span>
            <h3 className="text-2xl font-bold">Ilustrador</h3>
            <p className="text-neutral-400">{book.illustrator}</p>
          </span>
        )}
        <span>
          <h3 className="text-2xl font-bold">Editorial</h3>
          <p className="text-neutral-400">{book.publisher.username}</p>
        </span>
      </div>
    </div>
  );
}
