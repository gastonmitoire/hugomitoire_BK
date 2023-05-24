import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Form,
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";

import { Chapter, Text, Book } from "@prisma/client";

interface ExtendedChapter extends Chapter {
  book: Book;
  text: Text[];
}

interface ChapterListProps {
  chapters: ExtendedChapter[];
}

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
  hidden: { opacity: 0, y: -50 },
};

export function ChapterList({ chapters }: ChapterListProps) {
  const columnCount = 7;

  const columnGroups: ExtendedChapter[][] = Array.from(
    { length: Math.ceil(chapters.length / columnCount) },
    (_, index) => chapters.slice(index * columnCount, (index + 1) * columnCount)
  );

  return (
    <ul className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-2 w-full">
      {columnGroups.map((column, groupIndex) => (
        <motion.div
          key={groupIndex}
          className="flex flex-col gap-2 w-full py-1"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delayChildren: 0.5 }}
          variants={container}
        >
          {column.map((chapter, columnIndex) => (
            <AnimatePresence key={columnIndex}>
              <motion.span
                className="p-0.5 rounded-sm border border-transparent hover:border-primary hover:transition-colors duration-300"
                transition={{ delay: columnIndex * 0.1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                variants={item}
              >
                <Link
                  to={`/libros/${chapter.book.title.replace(/ /g, "_")}/${
                    chapter.id
                  }}`}
                  className="group flex p-5 bg-neutral-900 bg-opacity-30"
                >
                  <span className="flex-1 truncate">
                    {groupIndex * columnCount + columnIndex + 1} -{" "}
                    {chapter.title}
                  </span>
                  <span className="">
                    {chapter.text.length > 0 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 group-hover:stroke-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    ) : null}
                  </span>
                </Link>
              </motion.span>
            </AnimatePresence>
          ))}
        </motion.div>
      ))}
    </ul>
  );
}
