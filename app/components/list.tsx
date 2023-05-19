import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ListProps {
  items: string[];
  height?: number;
  className?: string;
  clickHandler?: (item: string) => void;
}

export function List({ items, height, className, clickHandler }: ListProps) {
  return (
    <AnimatePresence>
      <motion.ul
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`flex flex-col gap-2 ${className}`}
        style={{ height }}
      >
        {items.map((item) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center justify-between p-3 bg-neutral-700 bg-opacity-10 ${
              clickHandler &&
              "cursor-pointer select-none border border-transparent hover:border-primary hover:bg-opacity-20"
            }}`}
            onClick={() => clickHandler && clickHandler(item)}
          >
            <span className="text-xl text-neutral-500">{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
}
