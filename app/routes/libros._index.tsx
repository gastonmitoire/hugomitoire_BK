import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";

import { Book } from ".prisma/client";
import { db } from "~/utils/db.server";

export const loader = async ({ request }: LoaderArgs) => {
  const bookListItems = await db.book.findMany({
    select: {
      id: true,
      title: true,
      cover: true,
    },
  });

  return json({ bookListItems });
};

export default function LibrosIndex() {
  const data = useLoaderData<typeof loader>();
  const bookListItems = data.bookListItems;

  return (
    <motion.div
      className="grid grid-cols-5 gap-3"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {bookListItems.map(({ cover, title }, index) => (
        <motion.img
          key={index}
          src={cover}
          alt={title}
          className="w-full h-full object-cover cursor-pointer"
          whileHover={{ scale: 1.05 }} // animación al pasar el mouse sobre la imagen
          whileTap={{ scale: 0.95 }} // animación al hacer clic sobre la imagen
        />
      ))}
    </motion.div>
  );
}
