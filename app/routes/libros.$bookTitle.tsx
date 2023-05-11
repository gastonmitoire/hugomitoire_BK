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

import { db } from "~/utils/db.server";

import { Chapter } from ".prisma/client";

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

  return json(book);
};

export default function LibroRoute() {
  const data = useLoaderData();

  return (
    <div
      className="h-[90vh] w-full bg-cover bg-center py-3 px-1 md:px-0"
      style={{
        backgroundImage: `url(${data.secondaryImage})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto p-3 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3 h-full w-full rounded-xl dark:bg-neutral-900 dark:bg-opacity-50">
        <div className="h-full md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0">
          <motion.img
            initial={{ x: 150 }}
            animate={{ x: 0 }}
            exit={{ x: 150 }}
            transition={{ duration: 1 }}
            src={data.cover}
            alt={data.title}
            className="md:h-[80vh] w-full object-contain z-10"
          />
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
                {data.chapters.map(({ id, title, order }: Chapter) => (
                  <motion.li
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.7, delay: order * 0.1 }}
                    key={id}
                    className="py-3 px-3 cursor-pointer dark:bg-neutral-900 dark:bg-opacity-80 hover:dark:bg-opacity-95"
                  >
                    <Link
                      to={`/libros/${data.title.replace(/ /g, "_")}/${id}`}
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
        <div className="flex flex-col md:items-end gap-1 h-full">
          <p className="text-xl font-bold text-white text-right font-bellefair py-1 px-3 rounded-xl dark:text-neutral-800 dark:bg-neutral-200 dark:bg-opacity-90">
            {data.description}
          </p>
          <span className="flex items-center gap-1 font-cinzel dark:text-neutral-300">
            <h5 className="italic uppercase">{data.type}</h5>|
            <strong className="lowercase">{data.genre.name}</strong>
          </span>
          <h1 className="text-3xl font-bold text-white text-right">
            {data.title}
          </h1>
        </div>
      </div>
    </div>
  );
}
