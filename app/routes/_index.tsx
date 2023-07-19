import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { Hero } from "~/components/hero";
import { Button } from "~/components/button";
import { Slider } from "~/components/slider";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const loader = async ({ request }: LoaderArgs) => {
  const books = await db.book.findMany({});

  return json({ books });
};

export default function Index() {
  const { books } = useLoaderData<typeof loader>();

  function handleChange(index: number) {
    console.log("Current index:", index);
  }

  function renderHero(index: number) {
    const book = books[index];
    return (
      <Hero
        key={book.id}
        item={{
          title: book.title,
          subtitle: book.type,
          image: book.secondaryImage,
          cover: book.cover,
        }}
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
            length={books.length}
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
