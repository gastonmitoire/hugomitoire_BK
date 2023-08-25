import React, { useState, useRef } from "react";

interface SwiperProps {
  slides: React.ReactNode[];
}

const NavigationButton: React.FC<{
  direction: "left" | "right";
  onClick: () => void;
  isDisabled: boolean;
}> = ({ direction, onClick, isDisabled }) => {
  const icon =
    direction === "left" ? (
      <svg
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-gray-300"
      >
        <path
          d="M15.75 19.5L8.25 12l7.5-7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-gray-300"
      >
        <path
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

  return (
    <button
      className={`absolute top-0 h-full flex justify-center items-center transition-all ${
        direction === "left"
          ? `left-0 bg-gradient-to-tr from-black via-transparent ${
              isDisabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:via-black hover:to-transparent ease-in-out"
            }`
          : `right-0 bg-gradient-to-tl from-black via-transparent ${
              isDisabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:via-black hover:to-transparent ease-in-out"
            }`
      }`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export const Swiper: React.FC<SwiperProps> = ({ slides }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const swiperRef = useRef<HTMLDivElement | null>(null);

  const isPrevDisabled = scrollPosition <= 0;
  const isNextDisabled = swiperRef.current
    ? scrollPosition >=
      swiperRef.current.scrollWidth - swiperRef.current.offsetWidth
    : true;

  const nextSlide = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      const slideWidth = swiper.offsetWidth; // Ancho de cada diapositiva
      const newPosition = scrollPosition + slideWidth;
      swiper.scrollTo({
        left: newPosition,
        behavior: "smooth", // Esto proporciona una animación suave al desplazamiento
      });
      setScrollPosition(newPosition);
    }
  };

  const prevSlide = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      const slideWidth = swiper.offsetWidth;
      const newPosition = scrollPosition - slideWidth; // Cambia el signo aquí a negativo
      swiper.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  const handleScroll = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      const newPosition = swiper.scrollLeft;
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={swiperRef}
        className="w-full h-min m-auto whitespace-nowrap snap-x snap-mandatory overflow-x-scroll overflow-y-hidden scrollbar-hide"
        style={{ overflowX: "scroll", whiteSpace: "nowrap" }} // Agrega estos estilos
        onScroll={handleScroll} // Agrega el evento onScroll
      >
        {slides.map((slide, index) => {
          return (
            <div
              key={index}
              className="inline-block snap-center mx-1.5 h-full bg-green-50"
            >
              {slide}
            </div>
          );
        })}
      </div>

      <NavigationButton
        direction="left"
        onClick={prevSlide}
        isDisabled={isPrevDisabled}
      />
      <NavigationButton
        direction="right"
        onClick={nextSlide}
        isDisabled={isNextDisabled}
      />
    </div>
  );
};
