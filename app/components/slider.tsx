import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ProgressBar } from "./progress_bar";

type SliderProps<T> = {
  items: T[];
  onChange: (index: number) => void;
  renderItem: (item: T) => React.ReactNode;
  autoPlay?: boolean;
};

export function Slider<T>({
  items,
  onChange,
  renderItem,
  autoPlay,
}: SliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = items.length;

  function handleNext() {
    const newIndex = currentIndex === length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onChange(newIndex);
  }

  const handleAutoPlay = useCallback(() => {
    const newIndex = currentIndex === length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onChange(newIndex);
  }, [currentIndex, length, onChange]);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        handleAutoPlay();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, handleAutoPlay]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="flex h-full w-full">
        <ProgressBar timeout={30000} />
      </div>
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {renderItem(items[currentIndex])}
        </motion.div>
      </AnimatePresence>

      {/* <div className="absolute bottom-40  flex">
        {items.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${
              index === currentIndex
                ? "bg-neutral-900 dark:bg-neutral-300"
                : "bg-neutral-300 dark:bg-neutral-700"
            }`}
            onClick={() => {
              setCurrentIndex(index);
              onChange(index);
            }}
          />
        ))}
      </div> */}

      <motion.button
        initial={{ top: 30, opacity: 0 }}
        animate={{ top: "initial", opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ top: 30 }}
        className="absolute group grid place-items-center h-3/4 right-0 w-[8%] rounded-l-xl dark:bg-neutral-900 dark:bg-opacity-80 dark:hover:bg-opacity-100"
        onClick={handleNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 dark:stroke-neutral-700 group-hover:dark:stroke-neutral-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </motion.button>
    </div>
  );
}
