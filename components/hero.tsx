"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <div className="hero-scene hero-scene-fallback" aria-hidden="true"><div className="fallback-computer"><div className="fallback-screen" /></div></div>,
});

export default function Hero() {
  const [robotBlinkKey, setRobotBlinkKey] = useState(0);

  // The mascot blinks at varied intervals, while remaining clickable on demand.
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      const delay = 2600 + Math.random() * 4300;
      timeoutId = setTimeout(() => {
        setRobotBlinkKey((key) => key + 1);
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="hero section-shell" id="home">
      <div className="hero-grid-glow" aria-hidden="true" />
      <div className="hero-copy">
        <motion.div className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="status-dot" /> COMPUTER SOCIETY OF INDIA · PVG CHAPTER
        </motion.div>
        <motion.h1 className="hero-brand-heading" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}>
          <span className="hero-wordmark" aria-label="CSI–PVG">
            <svg className="wordmark-cable wordmark-cable-c" viewBox="0 0 100 100" fill="none" aria-hidden="true">
              <path d="M76 12 C47 -1 15 13 8 43 C1 70 20 94 49 91 C63 90 73 82 78 71" stroke="#E8EAF2" strokeWidth="3" strokeLinecap="round"/>
              <path d="M76 12 C47 -1 15 13 8 43 C1 70 20 94 49 91 C63 90 73 82 78 71" stroke="#DCE7F7" strokeOpacity=".45" strokeWidth=".9" strokeLinecap="round"/>
              <rect x="69" y="5" width="15" height="12" rx="3" fill="#1B2533" stroke="#D9DFEF" strokeWidth="1.6" transform="rotate(-16 69 5)"/>
              <circle cx="76" cy="10" r="1.6" fill="#E6EEFF"/>
            </svg>
            <svg className="wordmark-cable wordmark-cable-v" viewBox="0 0 100 100" fill="none" aria-hidden="true">
              <path d="M12 13 C27 7 32 22 40 39 C49 59 63 81 80 76 C92 73 95 61 88 52" stroke="#E8EAF2" strokeWidth="2.6" strokeLinecap="round"/>
              <path d="M12 13 C27 7 32 22 40 39 C49 59 63 81 80 76 C92 73 95 61 88 52" stroke="#DCE7F7" strokeOpacity=".42" strokeWidth=".8" strokeLinecap="round"/>
              <rect x="5" y="7" width="14" height="11" rx="3" fill="#1B2533" stroke="#D9DFEF" strokeWidth="1.5" transform="rotate(-17 5 7)"/>
              <circle cx="12" cy="12" r="1.5" fill="#E6EEFF"/>
            </svg>
            <span className="wordmark-letters">
              <span>C</span><span>S</span><span className="wordmark-i-wrap"><span className="wordmark-i">I</span>            <button
              className="wordmark-robot"
              type="button"
              aria-label="Make the CSI robot blink"
              title="Say hello!"
              onClick={() => setRobotBlinkKey((key) => key + 1)}
            >
              <svg viewBox="0 0 100 128" role="img" aria-label="A small smiling robot">
                <defs>
                  <linearGradient id="botShell" x1="18" y1="8" x2="82" y2="120" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFFFFF" /><stop offset=".48" stopColor="#D9DCE8" /><stop offset="1" stopColor="#8992AD" />
                  </linearGradient>
                  <linearGradient id="botFace" x1="25" y1="24" x2="75" y2="61" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#27314B" /><stop offset="1" stopColor="#090E1B" />
                  </linearGradient>
                  <linearGradient id="botBody" x1="35" y1="67" x2="68" y2="112" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F9F8F4" /><stop offset="1" stopColor="#AEB6CB" />
                  </linearGradient>
                </defs>
                <path d="M50 13V5" stroke="#B9C5F0" strokeWidth="3" strokeLinecap="round" /><circle cx="50" cy="4" r="3" fill="#A8B8F4" />
                <circle cx="13" cy="43" r="8" fill="url(#botShell)" stroke="#F5F2FF" strokeWidth="2" /><circle cx="87" cy="43" r="8" fill="url(#botShell)" stroke="#F5F2FF" strokeWidth="2" />
                <rect x="16" y="16" width="68" height="56" rx="21" fill="url(#botShell)" stroke="#F8F6FF" strokeWidth="2.4" />
                <rect x="23" y="23" width="54" height="41" rx="14" fill="url(#botFace)" stroke="#7783A8" strokeWidth="1.5" />
                <g key={robotBlinkKey} className="robot-eyes robot-click-blink">
                  <ellipse cx="38" cy="42" rx="5.2" ry="6.6" fill="#BFD0FF" /><ellipse cx="62" cy="42" rx="5.2" ry="6.6" fill="#BFD0FF" />
                  <circle cx="39.5" cy="39.7" r="1.8" fill="#FFFFFF" /><circle cx="63.5" cy="39.7" r="1.8" fill="#FFFFFF" />
                </g>
                <circle cx="29" cy="53" r="3.1" fill="#D8A8D4" opacity=".8" /><circle cx="71" cy="53" r="3.1" fill="#D8A8D4" opacity=".8" />
                <path className="robot-smile" d="M41 52Q50 62 59 52" fill="none" stroke="#B8C9FF" strokeWidth="2.7" strokeLinecap="round" />
                <path d="M35 73Q50 67 65 73L68 88Q68 96 60 99H40Q32 96 32 88L35 73Z" fill="url(#botBody)" stroke="#AAB3CC" strokeWidth="1.8" />
                <path d="M45 81Q50 78 55 81" stroke="#FFFFFF" strokeOpacity=".82" strokeWidth="2" strokeLinecap="round" />
                <path d="M34 78Q26 82 25 90L30 94L42 86M66 78Q74 82 75 90L70 94L58 86" fill="url(#botShell)" stroke="#AAB3CC" strokeWidth="2" strokeLinejoin="round" />
                <path d="M39 96Q31 98 32 105L39 109Q47 111 50 103L50 97M61 96Q69 98 68 105L61 109Q53 111 50 103L50 97" fill="url(#botShell)" stroke="#AAB3CC" strokeWidth="2" strokeLinejoin="round" />
                <path d="M33 105Q25 108 28 114Q31 119 43 116L47 112Q45 106 39 106Z" fill="#E7EAF3" stroke="#AAB3CC" strokeWidth="1.7" />
                <path d="M67 105Q75 108 72 114Q69 119 57 116L53 112Q55 106 61 106Z" fill="#E7EAF3" stroke="#AAB3CC" strokeWidth="1.7" />
                <path d="M31 112L41 113M59 113L69 112" stroke="#FFFFFF" strokeOpacity=".8" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button></span><span className="wordmark-dash">–</span><span>P</span><span>V</span><span>G</span>
            </span>

            <span className="wordmark-spark" aria-hidden="true">✦</span>
          </span>
          <span className="chapter-lockup"><i aria-hidden="true"/><span>CHAPTER</span><b aria-hidden="true">&gt;_</b><i aria-hidden="true"/></span>
        </motion.h1>
        <motion.p className="hero-description hero-subtitle" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}>
          Computer Society of India
        </motion.p>
        <motion.p
          className="hero-intro-copy"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26 }}
        >
          A space for curious minds to explore technology, turn ideas into reality, and build what comes next.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <a href="#about"><Button size="lg">Explore CSI <ArrowUpRight size={16} /></Button></a>
        </motion.div>
        <motion.div className="hero-footnote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <span className="tiny-line" />
          <span>INNOVATE · INSPIRE · INTEGRATE</span>
        </motion.div>
      </div>
      <div className="hero-visual">
        <HeroScene />
        <div className="visual-label visual-label-bottom"><Layers3 size={13} /><span>POWER ON → MAKE → SHARE</span></div>
      </div>
    </section>
  );
}
