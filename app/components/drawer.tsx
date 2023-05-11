import React, { useState } from "react";
import { motion } from "framer-motion";

interface DrawerProps {
  children: React.ReactNode;
  button?: React.ReactNode;
  buttonClassName?: string;
}

export const Drawer = ({ children, button, buttonClassName }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      {button ? (
        React.cloneElement(button as React.ReactElement, {
          onClick: toggleDrawer,
        })
      ) : (
        <button
          onClick={toggleDrawer}
          className={`p-1 z-50 rounded-xl border dark:border-neutral-500 ${buttonClassName}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-neutral-700 dark:text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
      {!isOpen ? (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0 left-0 w-full h-full bg-white dark:bg-red-900 z-40"
        >
          {children}
        </motion.div>
      ) : null}
    </>
  );
};
