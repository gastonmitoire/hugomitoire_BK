import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Book } from ".prisma/client";
import { db } from "~/utils/db.server";
import { BookCard } from "../components/book_card";
import Hero, { ItemProps } from "~/components/hero";
import { Button } from "~/components/button";
import { Header } from "~/components/header";
import { Slider } from "~/components/slider";
import { SliderGallery } from "~/components/slider_gallery";

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

  function renderHero(book: Book) {
    return (
      <Hero
        key={book.id}
        item={
          {
            title: book.title,
            subtitle: book.type,
            image: book.secondaryImage,
          } as ItemProps
        }
        className="h-[80vh]"
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
    <div className="flex flex-col h-auto">
      <div className="h-[90vh]">
        {books.length > 0 ? (
          <Slider
            items={books}
            onChange={handleChange}
            renderItem={renderHero}
            autoPlay
            hideProgressBar
          />
        ) : (
          "No books found"
        )}
      </div>
    </div>
  );
}
