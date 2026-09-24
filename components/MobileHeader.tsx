"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";
import { navItems } from "./nav-items";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="mobile-header-wrap">
      <header className="mobile-header">
        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
        >
          <span className="menu-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="menu-label">MENU</span>
        </button>
        <Link href="/" className="mobile-wordmark">
          <Wordmark className="mobile-wordmark-svg" />
        </Link>
      </header>

      <nav className="drawer" aria-hidden={!open}>
        <Link href="/" className="drawer-row" onClick={close} tabIndex={open ? 0 : -1}>
          Home
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="drawer-row"
            onClick={close}
            tabIndex={open ? 0 : -1}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        className="drawer-scrim"
        aria-label="Close menu"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onClick={close}
      />
    </div>
  );
}
