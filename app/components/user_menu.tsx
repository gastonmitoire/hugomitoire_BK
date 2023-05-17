import { useState } from "react";
import { Form, Link } from "@remix-run/react";
import { motion } from "framer-motion";

interface UserMenuProps {
  user: {
    id: string;
    username: string;
    email?: string;
    profile?: {
      id: string;
      image?: string;
      displayName?: string;
    };
  };
}

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        {user ? (
          <button
            type="button"
            className="flex items-center text-sm rounded-full select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-secondary"
            onClick={toggleMenu}
          >
            <span className="hidden md:inline mr-2 text-neutral-700 dark:text-neutral-300">
              {user.profile?.displayName || user.username}
            </span>
            {user.profile?.image ? (
              <img
                className="w-8 h-8 rounded-full"
                src={user.profile.image}
                alt={`Avatar de ${user.username}`}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            )}
          </button>
        ) : (
          <Link
            to="/ingreso"
            className="text-sm rounded-full select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-secondary"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
      <motion.div
        className={`absolute right-0 z-10 w-56 mt-2 origin-top-right bg-neutral-200 dark:bg-neutral-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
          isOpen ? "block" : "hidden"
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="py-1">
          <Form action="/logout" method="post">
            <motion.button
              type="submit"
              title="Cerrar sesión"
              name="logout"
              className="w-full px-4 py-2 text-sm text-left hover:bg-neutral-100 hover:dark:bg-neutral-900 focus:outline-none"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Cerrar sesión
            </motion.button>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};
