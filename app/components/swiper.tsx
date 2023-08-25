import React, { useState, useRef } from "react";

interface SwiperProps {
  slides: React.ReactNode[];
}

const NavigationButton: React.FC<{
  direction: "left" | "right";
  onClick: () => void;
}> = ({ direction, onClick }) => {
  const icon =
    direction === "left" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-gray-300 cursor-pointer"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <svg
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.75 19.5L8.25 12l7.5-7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-gray-300 cursor-pointer"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <svg
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.25 19.5L15.75 12l-7.5-7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </svg>
    );

  return (
    <button
      className={`absolute top-0 ${
        direction === "left"
          ? "left-0 bg-gradient-to-tr from-black via-transparent hover:via-black hover:to-transparent transition-all ease-in-out"
          : "right-0 bg-gradient-to-tl from-black via-transparent hover:via-black hover:to-transparent transition-all ease-in-out"
      } h-full flex justify-center items-center`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export const Swiper: React.FC<SwiperProps> = ({ slides }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const swiperRef = useRef<HTMLDivElement | null>(null);

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
      const newPosition = scrollPosition - slideWidth;
      if (newPosition >= 0) {
        swiper.scrollTo({
          left: newPosition,
          behavior: "smooth",
        });
        setScrollPosition(newPosition);
      }
    }
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={swiperRef}
        className="w-full h-min m-auto whitespace-nowrap snap-x snap-mandatory overflow-x-scroll overflow-y-hidden scrollbar-hide"
        style={{ overflowX: "scroll", whiteSpace: "nowrap" }} // Agrega estos estilos
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

      <NavigationButton direction="left" onClick={prevSlide} />
      <NavigationButton direction="right" onClick={nextSlide} />
    </div>
  );
};
