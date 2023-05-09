import { motion } from "framer-motion";

import { Button } from "./button";

type CardProps = {
  title: string;
  cover: string;
  secondaryImage: string;
  description: string;
  type: string;
  genre: { name: string };
};

export function BookCard({
  title,
  cover,
  secondaryImage,
  description,
  type,
  genre,
}: CardProps) {
  return (
    <div
      className="w-screen h-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${secondaryImage}')`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-full flex justify-center pt-5 dark:bg-neutral-900 dark:bg-opacity-40">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-4/5 h-4/5 grid grid-flow-col px-10 bg-white dark:bg-neutral-900 dark:bg-opacity-95 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="h-4/5 my-auto">
            <img
              src={cover}
              alt={title}
              className="w-full h-full max-w-md max-h-96 object-contain mx-auto"
            />
          </div>

          <div className="flex flex-col gap-1 justify-center w-2/3 p-6">
            <span className="flex items-center gap-1 font-cinzel dark:text-neutral-400">
              <h5 className="italic uppercase">{type}</h5>|
              <strong className="lowercase">{genre.name}</strong>
            </span>
            <h2 className="text-5xl font-bold mb-2">{title}</h2>
            <p className="font-bellefair text-2xl p-3 text-gray-700 dark:text-neutral-200">
              {description}
            </p>
            <Button color="primary" size="large" className="self-end">
              Ver Libro
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
