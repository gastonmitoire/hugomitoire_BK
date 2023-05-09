import { Outlet } from "@remix-run/react";

export default function Libros() {
  return (
    <div className="container mx-auto h-[90vh] py-3">
      <Outlet />
    </div>
  );
}
