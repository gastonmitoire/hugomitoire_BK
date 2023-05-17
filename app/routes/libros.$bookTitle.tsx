import { useState, useEffect, useRef } from "react";
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

import { ChapterList } from "~/components/chapter_list";

export const loader = async ({ params }: LoaderArgs) => {
  const formatedTitle = params.bookTitle?.replace(/_/g, " ");
  const book = await db.book.findUnique({
    where: { title: formatedTitle },
    include: {
      genre: true,
      comments: true,
    },
  });

  if (!book) {
    return json(
      { message: `No book found with the title ${params.bookTitle}` },
      { status: 404 }
    );
  }

  const chapters = await db.chapter.findMany({
    where: { bookId: book.id },
    orderBy: { order: "asc" },
  });

  return json({ book, chapters });
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0 },
};

export default function LibroRoute() {
  const { book, chapters } = useLoaderData();

  return (
    <div className="h-full">
      <div
        className="w-full h-4/5"
        style={{
          background: `url(${book.secondaryImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full h-full"
          style={{
            background: `linear-gradient(3deg, rgba(0, 0, 0, 1) 5rem, rgba(0,0,0, 0.7), rgba(0,0,0, 0.3), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0))`,
          }}
        >
          <div className="container flex flex-col items-start justify-end w-full h-full space-y-4">
            <motion.div variants={item}>
              <h1 className="text-5xl font-bold text-center">{book.title}</h1>
            </motion.div>
            <motion.div
              variants={item}
              className="flex items-center gap-7 font-body text-sm text-center text-neutral-400 uppercase tracking-wide"
            >
              <h3>{book.type}</h3>
              <h3>{book.genre.name}</h3>
              <h3>{book.genre.ageRange}</h3>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="dark:bg-black h-full">
        <nav>
          <ul className="flex items-center justify-center gap-5 pt-10">
            <li>
              <Link to={`/libros/${book.title}/detalles`}>Detalles</Link>
            </li>
            <li>
              <Link to={`/libros/${book.title}/capitulos`}>Capítulos</Link>
            </li>
            <li>
              <Link to={`/libros/${book.title}/galeria`}>Galería</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
