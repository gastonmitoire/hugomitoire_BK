import { Outlet } from "@remix-run/react";

export default function Libros() {
  return (
    <div className="h-[90vh]">
      <Outlet />
    </div>
  );
}
