import Link from "next/link";
import Categories from "./Categories";
import Colophon from "./Colophon";
import MobileHeader from "./MobileHeader";
import Wordmark from "./Wordmark";
import { navItems } from "./nav-items";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MobileHeader />
      <div className="page">
      <div className="shell">
        <nav className="sidebar">
          <Link href="/" className="sidebar-button">
            Home
          </Link>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="sidebar-button">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="main">
          <Link href="/" className="wordmark">
            <Wordmark className="wordmark-svg" />
          </Link>
          <div className="content">{children}</div>
          <Categories />
          <Colophon />
        </div>
      </div>
      </div>
    </>
  );
}
