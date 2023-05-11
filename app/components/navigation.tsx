type NavigationProps = {
  isvertical?: boolean;
  className?: string;
};

export function Navigation({ isvertical = false, className }: NavigationProps) {
  const classes = isvertical
    ? "flex flex-col space-y-6"
    : "flex items-center space-x-4";

  return (
    <nav className={`${className}`}>
      <ul className={`lowercase dark:text-neutral-400 ${classes}`}>
        <li className="transition-all hover:dark:text-neutral-100">
          <a href="/">Inicio</a>
        </li>
        <li className="transition-all hover:dark:text-neutral-100">
          <a href="/libros">Bio</a>
        </li>
        <li className="transition-all hover:dark:text-neutral-100">
          <a href="/libros">Libros</a>
        </li>
        <li className="transition-all hover:dark:text-neutral-100">
          <a href="/libros">Media</a>
        </li>
        <li className="transition-all hover:dark:text-neutral-100">
          <a href="/libros">Contacto</a>
        </li>
      </ul>
    </nav>
  );
}
