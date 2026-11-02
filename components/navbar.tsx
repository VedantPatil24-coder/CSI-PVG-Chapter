"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/", key: "home" },
  { label: "About", href: "/#about", key: "about" },
  { label: "Events", href: "/events", key: "events" },
  { label: "Moments & Milestones", href: "/moments-and-milestones", key: "moments" },
  { label: "Team", href: "/team", key: "team" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, [pathname]);

  const activeKey = pathname === "/events" ? "events"
    : pathname === "/moments-and-milestones" || pathname === "/recent-news" ? "moments"
    : pathname === "/team" ? "team"
    : pathname === "/" && hash === "#about" ? "about"
    : "home";

  const renderLinks = (className: string) => links.map((link) => (
    <a
      key={link.key}
      className={activeKey === link.key ? "active" : undefined}
      href={link.href}
      aria-current={activeKey === link.key ? "page" : undefined}
      onClick={() => setOpen(false)}
    >
      {link.label}
    </a>
  ));

  return (
    <header className="site-header">
      <nav className="nav section-shell" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="CSI PVG Chapter home">
          <span className="brand-logo-wrap"><Image src="/images/csi-final-logo.jpeg" alt="CSI PVG Chapter logo" width={48} height={48} priority className="brand-logo" /></span>
          <span className="brand-type"><strong>CSI<span>·</span>PVG</strong><small>CHAPTER</small></span>
        </a>
        <div className="nav-links">{renderLinks("nav-links")}</div>
        <button className="mobile-menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <a className="college-brand-logo" href="/" aria-label="PVG College home">
          <Image src="/images/pvg-college-logo.png" alt="Pune Vidhyarthi Griha logo" width={48} height={48} priority />
        </a>
      </nav>
      {open && <div className="mobile-nav">{renderLinks("mobile-nav")}</div>}
    </header>
  );
}
