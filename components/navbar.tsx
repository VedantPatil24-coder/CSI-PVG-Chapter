"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/#about" },
  { name: "Events", link: "/events" },
  { name: "Moments & Milestones", link: "/moments-and-milestones" },
  { name: "Team", link: "/team" },
];

export default function AppNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const isLinkActive = (link: string) => {
    if (link === "/#about") {
      return pathname === "/" && hash === "#about";
    }
    if (link === "/") {
      return pathname === "/" && hash !== "#about";
    }
    if (link === "/moments-and-milestones") {
      return pathname === "/moments-and-milestones" || pathname === "/recent-news";
    }
    if (link === "/team") {
      return pathname === "/team" || pathname.startsWith("/team/");
    }
    if (link === "/events") {
      return pathname === "/events" || pathname.startsWith("/events/");
    }
    return pathname === link;
  };

  const currentActiveLink =
    navItems.find((item) => isLinkActive(item.link))?.link || (pathname === "/" ? "/" : "");

  const handleItemClick = (link: string) => {
    if (link === "/#about") {
      setHash("#about");
    } else if (link === "/") {
      setHash("");
    }
  };

  return (
    <div className="relative w-full pt-1 sm:pt-2">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={navItems}
            activeLink={currentActiveLink}
            onItemClick={handleItemClick}
          />
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 bg-white flex items-center justify-center shrink-0 hover:border-white/40 transition-colors shadow-sm"
              title="Pune Vidhyarthi Griha"
              aria-label="PVG College Home"
            >
              <Image
                src="/images/pvg-college-logo.png"
                alt="PVG College"
                width={32}
                height={32}
                className="w-full h-full object-contain p-0.5"
              />
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => {
              const isActive = isLinkActive(item.link);
              return (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleItemClick(item.link);
                  }}
                  className={`w-full py-2.5 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-white/10 text-white font-semibold"
                      : "text-neutral-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="relative inline-block">
                    {item.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 shadow-[0_0_8px_rgba(56,189,248,0.85)]" />
                    )}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.85)]" />
                  )}
                </a>
              );
            })}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
