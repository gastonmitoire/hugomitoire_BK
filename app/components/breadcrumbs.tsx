import { useLocation } from "react-router";

interface BreadcrumbsProps {
  className?: string;
}

interface BreadcrumbItem {
  label: string;
  to: string;
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  const breadcrumbItems: BreadcrumbItem[] = pathSegments.map(
    (segment, index) => {
      const segmentPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const label = segment.charAt(0) + segment.slice(1).replace(/-/g, " ");
      return { label, to: segmentPath };
    }
  );

  return location.pathname !== "/" ? (
    <nav
      aria-label="Breadcrumb"
      className={`container mx-auto flex py-0.5 px-1.5 font-body lowercase text-sm bg-neutral-800 ${
        className || ""
      }`}
    >
      <ol className="flex items-center">
        {breadcrumbItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center opacity-30 dark:text-neutral-300 dark:opacity-50 hover:underline hover:dark:opacity-70"
          >
            <a href={item.to} className="text-sm font-medium">
              {item.label}
            </a>
            {index !== breadcrumbItems.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  ) : null;
}
