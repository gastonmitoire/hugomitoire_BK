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
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0 },
};

export function ChapterList({ chapters }: ChapterListProps) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-2"
    >
      {chapters.map((chapter) => (
        <motion.li
          variants={item}
          key={chapter.id}
          className="flex flex-col gap-2"
        >
          <Link
            to={`/libros/${chapter.title.replace(/ /g, "_")}/${chapter.order}`}
            className="text-xl font-semibold"
          >
            {chapter.title}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}
