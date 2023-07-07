import React from "react";
import { motion } from "framer-motion";

import { Book as BookProps, Genre as GenreProps } from "@prisma/client";

export interface ItemProps {
  image: string;
  title: string;
  subtitle: string;
}

interface HeroProps {
  item: ItemProps;
  actions?: React.ReactNode;
  className?: string;
}

// Framer Motion config
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0 },
};

function Hero({ item, actions, className }: HeroProps) {
  const { title, image, subtitle } = item;

  return (
    <div className={`h-[90vh] w-full ${className}`}>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 0.7 }}
        className="w-full h-4/5 mb-16"
        style={{
          background: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(3deg, rgba(10, 10, 10, 1) 5rem, rgba(10,10,10, 0.7), rgba(10,10,10, 0.3), rgba(10, 10, 10, 0.2), rgba(10, 10, 10, 0))`,
          }}
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="container flex flex-col items-start justify-end w-full h-full space-y-4"
          >
            <motion.div variants={itemAnimation}>
              <h1 className="text-5xl font-bold">{title}</h1>
            </motion.div>
            <motion.div
              variants={itemAnimation}
              className="flex items-start lg:items-center gap-5 font-body text-sm text-neutral-400 uppercase tracking-wide"
            >
              <p>{subtitle}</p>
            </motion.div>
            {actions && actions}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
