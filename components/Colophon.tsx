"use client";

import { usePathname } from "next/navigation";

export default function Colophon() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return <p className="colophon">&copy; 2026 doasfrancisco</p>;
}
