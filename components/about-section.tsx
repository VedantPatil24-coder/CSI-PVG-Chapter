"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Compass, Crosshair, MoveUpRight } from "lucide-react";

const principles = [
  {
    number: "01",
    label: "OUR VISION",
    title: "Make the future yours.",
    description:
      "Empower students to become leaders in computing technologies and drive meaningful innovation on a global scale.",
    icon: Compass,
    id: "vision",
    theme: "vision-card",
    footer: "LOOK BEYOND WHAT EXISTS",
  },
  {
    number: "02",
    label: "OUR MISSION",
    title: "Turn curiosity into capability.",
    description:
      "Create meaningful pathways for skill development, continuous training, research support, and industry connections—bridging classroom learning with real-world challenges.",
    icon: Crosshair,
    id: "mission",
    theme: "mission-card",
    footer: "LEARN IT. BUILD IT. SHARE IT.",
  },
];

function MemberCounter() {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted.current) return;
        hasStarted.current = true;
        observer.disconnect();

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
          setCount(150);
          return;
        }

        const duration = 1500;
        let startTime = 0;
        const tick = (time: number) => {
          if (!startTime) startTime = time;
          const progress = Math.min((time - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setCount(Math.round(eased * 150));
          if (progress < 1) frame = window.requestAnimationFrame(tick);
        };
        frame = window.requestAnimationFrame(tick);
      },
      { threshold: 0.55 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="about-fact about-fact-members" ref={counterRef}>
      <span className="about-fact-value member-count" aria-label="More than 150 student members">
        {count}<span className="count-plus">{count === 150 ? "+" : ""}</span>
      </span>
      <span className="about-fact-label">STUDENT MEMBERS</span>
      <span className="member-count-track" aria-hidden="true"><span style={{ width: `${(count / 150) * 100}%` }} /></span>
    </div>
  );
}

function OrganizedEventsCounter() {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasStarted.current) return;
      hasStarted.current = true;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCount(1);
        return;
      }
      const start = performance.now();
      const duration = 850;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setCount(progress >= 1 ? 1 : 0);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.55 });
    observer.observe(element);
    return () => { observer.disconnect(); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return <div className="about-fact about-fact-events" ref={counterRef}>
    <span className="about-fact-value member-count">{count}</span>
    <span className="about-fact-label">EVENTS ORGANIZED</span>
    <span className="fact-caption">One chapter. The first milestone.</span>
    <span className="member-count-track" aria-hidden="true"><span style={{ width: `${count * 100}%` }} /></span>
  </div>;
}

export default function AboutSection() {
  return (
    <section className="about-section section-shell" id="about" aria-labelledby="about-title">
      <div className="about-intro-grid">
        <motion.div
          className="about-title-block"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <p className="about-overline">COMPUTER SOCIETY OF INDIA · PVG&apos;S COET&amp;M</p>
          <h2 id="about-title">About <span>us.</span></h2>
          <p className="about-subheading">A place for curious minds to become capable makers.</p>
        </motion.div>

        <motion.div
          className="about-copy"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <p className="about-lead">
            Established in July 2026 under the Department of Computer Engineering, the CSI–PVG Student Chapter is the student-led hub for computing, engineering, and digital creation at PVG&apos;s College of Engineering and Technology, Pune.
          </p>
          <p className="about-body-copy">
            We turn classroom learning into practical capability. Through hands-on bootcamps, hackathons, focused coding sessions, and industry collaborations, we help our student community build the skills, confidence, and perspective to shape what comes next in technology.
          </p>
          <a className="about-inline-link" href="#vision">What drives us <ArrowUpRight size={15} /></a>
        </motion.div>
      </div>

      <div className="principles-heading">
        <div>
          <p className="principles-overline">THE REASON WE&apos;RE HERE</p>
          <h3>Purpose, with <span>direction.</span></h3>
        </div>
      </div>

      <div className="about-principles">
        {principles.map((principle, index) => {
          const Icon = principle.icon;
          return (
            <motion.article
              className={`principle-card ${principle.theme}`}
              id={principle.id}
              key={principle.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
            >
              <div className="principle-card-art" aria-hidden="true">
                <span className="principle-orbit principle-orbit-one" />
                <span className="principle-orbit principle-orbit-two" />
                <span className="principle-art-cross">+</span>
              </div>
              <div className="principle-card-top">
                <span className="principle-icon-wrap"><Icon size={19} strokeWidth={1.6} /></span>
              </div>
              <p className="principle-label">{principle.label}</p>
              <h4>{principle.title}</h4>
              <p className="principle-description">{principle.description}</p>
              <div className="principle-card-footer"><span>{principle.footer}</span><MoveUpRight size={15} /></div>
            </motion.article>
          );
        })}
      </div>

      <div className="about-facts" aria-label="Chapter details">
        <div className="about-fact">
          <span className="about-fact-value">JUL <span>’26</span></span>
          <span className="about-fact-label">CHAPTER ESTABLISHED</span>
          <span className="fact-caption">A new chapter. A lot to build.</span>
        </div>
        <MemberCounter />
        <OrganizedEventsCounter />
      </div>
    </section>
  );
}
