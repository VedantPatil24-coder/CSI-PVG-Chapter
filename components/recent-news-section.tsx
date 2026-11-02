"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, CalendarDays, Quote, X } from "lucide-react";

type Moment = {
  id: string;
  date: string;
  dateLabel: string;
  category: string;
  title: string;
  description: string;
  images: { src: string; alt: string; position?: string }[];
};

const moments: Moment[] = [
  {
    id: "inauguration",
    date: "24 AUGUST 2026",
    dateLabel: "24 Aug ’26",
    category: "CHAPTER INAUGURATION",
    title: "CSI INAUGRATION: A beginning worth remembering",
    description: "We were delighted to host the official Inauguration Ceremony of the Computer Society of India (CSI) Student Chapter at PVG's College of Engineering and Technology and G. K. Pate (Wani) Institute of Management, Pune, on 24th August 2026, marking the beginning of a community built to connect learning, innovation, and industry.",
    images: [
      { src: "/images/moments/inaugration_image_1.jpeg", alt: "Students attending the CSI Student Chapter inauguration" },
      { src: "/images/moments/inaugration_image_2.jpeg", alt: "CSI Student Chapter members together at the inauguration" },
      { src: "/images/moments/inaugration_image_3.jpeg", alt: "Inauguration ceremony and presentation at the college" },
      { src: "/images/moments/inaugration_image_4.jpeg", alt: "Students and guests gathered for the inauguration" },
    ],
  },
  {
    id: "syntax-sweep",
    date: "16 OCTOBER 2026",
    dateLabel: "16 Oct ’26",
    category: "DEBUGGING CHALLENGE",
    title: "Syntax Sweep: find the fault, fix the flow",
    description: "We were delighted to host Syntax Sweep, a competitive debugging event organised by the CSI Student Chapter, where participants put their programming knowledge and problem-solving skills to the test. The event challenged participants to identify and correct errors in pre-written C++ and Python programs within a limited time, encouraging logical thinking, precision, and efficient debugging while fostering a spirit of healthy competition.",
    images: [
      { src: "/images/moments/syntax_sweep_1.jpeg", alt: "Participants working through the Syntax Sweep debugging challenge" },
      { src: "/images/moments/syntax_sweep_2.jpeg", alt: "Students taking part in Syntax Sweep" },
      { src: "/images/moments/syntax_sweep_3.jpeg", alt: "Syntax Sweep participants working in the computer laboratory" },
      { src: "/images/moments/syntax_sweep_4.jpeg", alt: "Students and organisers during Syntax Sweep" },
    ],
  },
];

export default function RecentNewsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="moments-section section-shell" aria-labelledby="moments-title">
      <header className="moments-heading">
        <div className="moments-heading-row">
          <h1 id="moments-title">Moments <span>&amp;</span><br />Milestones<span className="moments-title-period">.</span></h1>
          <p>More than events on a calendar. A collection of the people, ideas and experiences shaping our chapter.</p>
        </div>
      </header>

      <div className="moments-list">
        {moments.map((moment, index) => {
          const isExpanded = expandedId === moment.id;
          return (
            <motion.article layout key={moment.id} className={`moment-entry ${isExpanded ? "is-expanded" : ""}`}>
              <button
                type="button"
                className="moment-trigger"
                aria-expanded={isExpanded}
                aria-controls={`moment-details-${moment.id}`}
                onClick={() => setExpandedId(isExpanded ? null : moment.id)}
              >
                <span className="moment-date-block"><span>{moment.date.split(" ")[0]}</span><small>{moment.date.split(" ").slice(1).join(" ")}</small></span>
                <span className="moment-cover">
                  <Image src={moment.images[0].src} alt={moment.images[0].alt} fill sizes="(max-width: 760px) 90vw, 42vw" className="moment-cover-image" />
                  <span className="moment-cover-shade" />
                  <span className="moment-cover-caption">CSI–PVG <i>•</i> {moment.category}</span>
                  <span className="moment-open-icon">{isExpanded ? <X size={19} /> : <ArrowDownRight size={21} />}</span>
                </span>
                <span className="moment-summary">
                  <span className="moment-category">{moment.category}</span>
                  <strong>{moment.title}</strong>
                  <span className="moment-date-mobile"><CalendarDays size={13} /> {moment.dateLabel}</span>
                  <span className="moment-expand-label">{isExpanded ? "CLOSE STORY" : "EXPLORE THE MOMENT"} <ArrowUpRight size={14} /></span>
                </span>
                <span className="moment-index" aria-hidden="true">0{index + 1}</span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={`moment-details-${moment.id}`}
                    className="moment-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="moment-details-inner">
                      <div className="moment-story-copy">
                        <span className="moment-story-label"><span /> THE STORY</span>
                        <p>{moment.description}</p>
                      </div>
                      <div className="moment-gallery-heading"><span>IN FRAMES</span><span>PHOTO GALLERY</span></div>
                      <div className="moment-gallery">
                        {moment.images.map((photo, photoIndex) => (
                          <figure className={`moment-photo moment-photo-${photoIndex + 1}`} key={photo.src}>
                            <div className="moment-photo-frame">
                              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 88vw, 45vw" className="moment-gallery-image" />
                            </div>
                          </figure>
                        ))}
                      </div>
                      <div className="moment-voices">
                        <div className="moment-voices-mark"><Quote size={23} /></div>
                        <div>
                          <span className="moment-story-label"><span /> VOICES FROM THE DAY</span>
                          <h3>Every moment has a story.<br /><em>Some are best told by the people who lived it.</em></h3>
                          <p>Reflections and testimonials from participants, speakers and organisers will be added here.</p>
                        </div>
                        <span className="moment-voices-note">COMMUNITY<br />REFLECTIONS</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
      <footer className="moments-footer-note"><span className="moments-footer-star">✳</span><p>THE STORY IS STILL UNFOLDING.<br /><strong>MORE MOMENTS TO COME.</strong></p><span className="moments-footer-rule" /></footer>
    </section>
  );
}
