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

import { Chapter } from "@prisma/client";

interface ChapterListProps {
  chapters: Chapter[];
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
  show: { opacity: 1, y: 0 },
};

export function ChapterList({ chapters }: ChapterListProps) {
  const columnCount = 7;

  const columnGroups: Chapter[][] = Array.from(
    { length: Math.ceil(chapters.length / columnCount) },
    (_, index) => chapters.slice(index * columnCount, (index + 1) * columnCount)
  );

  return (
    <motion.ul className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-2 w-full">
      {columnGroups.map((column, groupIndex) => (
        <motion.div
          key={groupIndex}
          className="flex flex-col gap-2 w-full py-1"
          initial="hidden"
          animate="show"
          variants={container}
        >
          {column.map((chapter, columnIndex) => (
            <motion.span
              key={chapter.id}
              className="p-0.5 rounded-sm border border-transparent hover:border-primary hover:transition-colors duration-300"
              variants={item}
            >
              <Link
                to={`/libros/${chapter.title.replace(/ /g, "_")}/${
                  chapter.order
                }`}
                className="block p-5 bg-neutral-900 bg-opacity-30 "
              >
                {groupIndex * columnCount + columnIndex + 1} - {chapter.title}
              </Link>
            </motion.span>
          ))}
        </motion.div>
      ))}
    </motion.ul>
  );
}
