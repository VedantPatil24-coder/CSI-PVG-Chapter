"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer home-footer section-shell">
      <Link className="brand footer-brand" href="/">
        <span className="brand-logo-wrap footer-logo-wrap">
          <Image
            src="/images/csi-final-logo.jpeg"
            alt="CSI PVG Chapter logo"
            width={48}
            height={48}
            className="brand-logo"
          />
        </span>
        <span className="brand-type">
          <strong>
            CSI<span>·</span>PVG
          </strong>
          <small>CHAPTER</small>
        </span>
      </Link>
      <p>Curiosity into capability. Ideas into impact.</p>
      <aside className="footer-contact" aria-label="Contact CSI–PVG">
        <span className="footer-contact-title">CONTACT</span>
        <a
          className="footer-contact-row"
          href="https://maps.google.com/?q=Pune+Vidhyarthi+Griha+College+of+Engineering+and+Technology+Pune"
          target="_blank"
          rel="noreferrer"
        >
          <MapPin size={16} aria-hidden="true" />
          <span>
            Pune Vidhyarthi Griha&apos;s College Of Engineering And Technology, 44,
            Shiv Darshan Rd, Parvati, Nirmal Baug Colony, Vidya Nagari, Parvati Paytha,
            Pune, Maharashtra 411009
          </span>
        </a>
        <a className="footer-contact-row" href="mailto:csi_pvg@pvgcoet.ac.in">
          <Mail size={16} aria-hidden="true" />
          <span>csi_pvg@pvgcoet.ac.in</span>
        </a>
        <a
          className="footer-contact-row"
          href="https://www.instagram.com/csi_pvg/"
          target="_blank"
          rel="noreferrer"
        >
          <Instagram size={16} aria-hidden="true" />
          <span>@csi_pvg</span>
        </a>
      </aside>
      <a href="#top" onClick={scrollToTop} className="back-top">
        BACK TO TOP ↑
      </a>
      <span className="footer-copyright">
        © {new Date().getFullYear()} CSI–PVG STUDENT CHAPTER · PVG&apos;S COET&amp;M, PUNE
      </span>
    </footer>
  );
}

