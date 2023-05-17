import React, { useState } from "react";
import { motion } from "framer-motion";

interface BookProps {
  title: string;
  description: string;
  type: string;
  genre: {
    name: string;
  };
  cover: string;
}

export function Book({ title, description, type, genre, cover }: BookProps) {
  const [showDetails, setShowDetails] = useState(true);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex flex-col md:flex-row h-full rounded-l-xl dark:bg-neutral-900 dark:bg-opacity-70">
      <motion.div
        className={`${
          showDetails ? "md:w-full" : "hidden"
        } flex flex-col gap-y-3 py-3 pl-3 h-full`}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.9 }}
      >
        <p className="text-xl font-bold text-white text-right font-bellefair py-1 px-3 rounded-l-xl dark:text-neutral-800 dark:bg-neutral-200 dark:bg-opacity-90">
          {description}
        </p>
        <div className="pr-3 text-right font-cinzel dark:text-neutral-300">
          <h5 className="italic uppercase">{type}</h5>
          <strong className="lowercase pl-10">{genre.name}</strong>
          <h1 className="pb-3 pt-5 pl-5 text-5xl font-bold text-white text-right">
            {title}
          </h1>
        </div>
        <div className="h-full flex justify-evenly items-end">
          <span>
            <h6 className="text-xs text-right font-bold italic text-neutral-500 uppercase">
              Ilustrador
            </h6>
            <p className="text-lg font-sans">Maco Pacheco</p>
          </span>
          <span>
            <h6 className="text-xs text-right font-bold italic text-neutral-500 uppercase">
              Editorial
            </h6>
            <p className="text-lg font-sans">Ediciones de La Paz</p>
          </span>
        </div>
      </motion.div>
      <motion.img
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        src={cover}
        alt=""
        className={`${
          showDetails ? "md:full hidden lg:block" : "w-full"
        } h-full mx-auto object-contain`}
      />
    </div>
  );
}
