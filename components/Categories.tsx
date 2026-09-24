import Link from "next/link";
import { navItems } from "./nav-items";

export default function Categories() {
  return (
    <section className="categories">
      <h2 className="categories-title">CATEGORIES</h2>
      <Link href="/" className="categories-row">
        Home
      </Link>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="categories-row">
          {item.label}
        </Link>
      ))}
    </section>
  );
}
