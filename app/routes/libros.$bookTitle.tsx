import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";

import { Chapter } from "@prisma/client";
import { db } from "~/utils/db.server";

import { Tabs } from "~/components/tabs";
import { Book } from "~/components/book";

export const loader = async ({ params }: LoaderArgs) => {
  const formatedTitle = params.bookTitle?.replace(/_/g, " ");
  const book = await db.book.findUnique({
    where: { title: formatedTitle },
    include: { genre: true, chapters: true, comments: true },
  });

  if (!book) {
    return json(
      { message: `No book found with the title ${params.bookTitle}` },
      { status: 404 }
    );
  }

  return json({ book });
};

export default function LibroRoute() {
  const { book } = useLoaderData();

  console.log("book", book);

  return (
    <div
      className="h-[90vh] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${book.secondaryImage})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-full bg-neutral-500 bg-opacity-75">
        <div className="container mx-auto grid grid-cols-3 grid-rows-3 h-full w-full p-3">
          <div className="col-span-2 row-span-3">
            <Book {...book} />
          </div>
          <div className="row-span-3">
            <div className="flex flex-col gap-3 md:gap-0 h-full md:overflow-y-auto">
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-xl text-center font-light font-cinzel lowercase py-3 dark:bg-neutral-900 dark:bg-opacity-50"
              >
                Indice
              </motion.h3>
              <AnimatePresence>
                <motion.ul className="flex-1 flex flex-col gap-1 min-h-min">
                  {book.chapters.map(({ id, title, order }: Chapter) => (
                    <motion.li
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.7, delay: order * 0.1 }}
                      key={id}
                      className="py-3 px-3 cursor-pointer dark:bg-neutral-900 dark:bg-opacity-80 hover:dark:bg-opacity-95"
                    >
                      <Link
                        to={`/libros/${book.title.replace(/ /g, "_")}/${id}`}
                        className="font-cinzel text-lg dark:text-neutral-300"
                      >
                        {order} | {title}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.5,
                }}
                className="py-1.5 px-3 text-center dark:text-neutral-300 cursor-pointer dark:bg-neutral-900 dark:bg-opacity-50"
              >
                .
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
