import { useState, useEffect, useRef } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";

import { db } from "~/utils/db.server";

import { BookDetails } from "~/components/book_details";
import { BookHero } from "~/components/book_hero";
import { ChapterList } from "~/components/chapter_list";
import { Header } from "~/components/header";

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
    include: {
      text: true,
      book: {
        select: {
          title: true,
        },
      },
    },
  });

  return json({ book, chapters });
};

export default function LibroRoute() {
  const { book, chapters } = useLoaderData();

  const goToSection = (section: string) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-[90vh]">
      <div className="relative">
        {/* GO BACK BUTTON */}
        <button
          className="absolute top-0 left-0 z-20 p-5"
          onClick={() => history.back()}
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
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </button>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neutral-950 via-transparent to-transparent z-10"></div>
        <BookHero book={book} genre={book.genre} className="h-[80vh]" />
      </div>

      <div className="relative">
        <nav
          aria-label="Sub navigation"
          role="navigation"
          className="sticky top-0 left-0 z-20 uppercase bg-neutral-950 h-full hidden lg:block"
        >
          <ul className="flex items-center justify-center gap-5 py-5 z-10">
            <li
              className="cursor-pointer"
              onClick={() => goToSection("detail-section")}
            >
              Detalles
            </li>
            <li
              className="cursor-pointer"
              onClick={() => goToSection("chapters-section")}
            >
              Capítulos
            </li>
            <li
              className="cursor-pointer"
              onClick={() => goToSection("gallery-section")}
            >
              Galería
            </li>
          </ul>
        </nav>

        <motion.section
          id="detail-section"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="w-full h-full scroll-m-16"
        >
          <BookDetails book={book} />
        </motion.section>

        <section id="chapters-section" className="scroll-m-16">
          <Header title="Capítulos" />
          <div className="py-8">
            <ChapterList chapters={chapters} />
          </div>
        </section>

        <section id="gallery-section" className="scroll-m-16">
          <Header title="Galería" />
          <motion.div className="py-8"></motion.div>
        </section>
      </div>
    </div>
  );
}
