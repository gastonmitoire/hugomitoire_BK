import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Book } from ".prisma/client";
import { db } from "~/utils/db.server";
import { BookCard } from "../components/book_card";
import { BookHero } from "~/components/book_hero";
import { Button } from "~/components/button";
import { Slider } from "~/components/slider";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const loader = async ({ request }: LoaderArgs) => {
  console.log("request", request);
  const books = await db.book.findMany({});

  return json({ books });
};

export default function Index() {
  const { books } = useLoaderData<typeof loader>();

  function handleChange(index: number) {
    console.log("Current index:", index);
  }

  function renderCard(book: Book) {
    return (
      <BookHero
        key={book.id}
        book={book}
        actions={
          <div className="flex space-x-4">
            <Button isLink to={`libros/${book.title.replace(/ /g, "_")}`}>
              Leer
            </Button>
          </div>
        }
      />
    );
  }

  return (
    <div className="h-screen md:h-[90vh]">
      {books.length > 0 ? (
        <Slider
          items={books}
          onChange={handleChange}
          renderItem={renderCard}
          autoPlay
        />
      ) : (
        "No books found"
      )}
    </div>
  );
}
