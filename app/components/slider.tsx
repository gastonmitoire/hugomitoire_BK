import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { PaginationArrows } from "./pagination_arrows";
import { PaginationDots } from "./pagination_dots";
import { ProgressBar } from "./progress_bar";

type SliderProps = {
  length: number;
  onChange: (index: number) => void;
  renderItem: (index: number) => React.ReactNode;
  autoPlay?: boolean;
  hideProgressBar?: boolean;
  hidePagination?: boolean;
  hideArrows?: boolean;
};

export function Slider({
  length,
  onChange,
  renderItem,
  autoPlay,
  hideProgressBar,
  hidePagination,
  hideArrows,
}: SliderProps) {
  const [reset, setReset] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAutoPlay = useCallback(() => {
    const newIndex = currentIndex === length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onChange(newIndex);
    handleReset();
  }, [currentIndex, length, onChange]);

  function handleNext() {
    const newIndex = currentIndex === length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onChange(newIndex);
    handleReset();
  }

  function handlePrev() {
    const newIndex = currentIndex === 0 ? length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    onChange(newIndex);
    handleReset();
  }

  function handleReset() {
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 100);
  }

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        handleAutoPlay();
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, handleAutoPlay]);

  return (
    <div className="relative w-full h-full select-none overflow-x-hidden">
      {!hideProgressBar && (
        <div className="flex h-full w-full">
          <ProgressBar timeout={15000} reset={reset} />
        </div>
      )}

      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:absolute inset-0 flex items-center justify-center"
        >
          {renderItem(currentIndex)}
        </motion.div>
      </AnimatePresence>

      {!hidePagination && (
        <PaginationDots
          totalPages={length}
          currentPage={currentIndex}
          onClick={setCurrentIndex}
          className="absolute bottom-16 w-full"
        />
      )}

      {!hideArrows && (
        <PaginationArrows
          totalPages={length}
          currentPage={currentIndex}
          onNext={handleNext}
          onPrev={handlePrev}
          className="absolute top-48 2xl:top-80 w-full"
        />
      )}
    </div>
  );
}
