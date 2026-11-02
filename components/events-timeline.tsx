"use client";

import { motion } from "motion/react";
import { ArrowUpRight, CalendarDays, Code2, Lightbulb, Monitor, Rocket, Terminal, Users, Wrench } from "lucide-react";

const events = [
  { number: "00", date: "24TH AUGUST", title: "INAUGURATION", description: "Official inauguration of the CSI–PVG Student Chapter. Bringing students together to turn engineering knowledge into practical technology leadership.", icon: CalendarDays, status: "CHAPTER MILESTONE" },
  { number: "01", date: "16TH OCTOBER", title: "SYNTAX SWEEP", description: "250 lines of broken code. One ticking clock. Zero mercy. Hunt the bugs, patch the chaos, and ship it clean before time runs out. Only the sharpest debuggers walk away champions.", icon: Terminal },
  { number: "02", date: "FEBRUARY", title: "IDEATHON", description: "Brainstorm, design, and prototype solutions for real-world problems in an intense collaborative format.", icon: Lightbulb, collaboration: "Collaboration with ACES PVG" },
  { number: "03", date: "FEBRUARY", title: "TECH SESSION + CODE MODE", description: "Expert-led technical sessions on modern technologies and architectures, followed by practical coding drills.", icon: Monitor, format: "ONLINE", collaboration: "Collaboration with ACES PVG" },
  { number: "04", date: "MARCH", title: "ZERO CODE", description: "An on-the-spot prompt engineering competition where students design functional web applications using AI tools in a standardized environment.", icon: Wrench },
  { number: "05", date: "APRIL", title: "HACKATHON", description: "Our flagship hackathon: build functional prototypes, collaborate under pressure, and present your solutions to industry panels.", icon: Rocket, collaboration: "Collaboration with ACES PVG" },
];

export default function EventsTimeline() {
  return (
    <section className="events-timeline-section" id="events" aria-labelledby="events-title">
      <div className="section-shell">
        <div className="section-heading">
          <div className="section-heading-main">
            <h2 id="events-title">Make plans.<br />Make things happen.</h2>
            <p>A chapter calendar built around building, competing, collaborating and learning in public.</p>
          </div>
        </div>
        <div className="event-timeline">
          {events.map((event, index) => {
            const Icon = event.icon;
            return <motion.article className={`timeline-event ${index % 2 ? "timeline-event-left" : "timeline-event-right"}`} key={event.number} style={{ gridRow: index + 1 }} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.45, delay: Math.min(index * 0.045, 0.2) }}>
              <span className="timeline-node" aria-hidden="true">{event.number}</span>
              <div className="timeline-card">
                <div className="timeline-card-top"><span className="timeline-date">{event.date}</span><span className="timeline-icon"><Icon size={17} /></span></div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="timeline-tags">
                  {event.status && <span className="timeline-tag timeline-tag-status">{event.status}</span>}
                  {event.format && <span className="timeline-tag">{event.format}</span>}
                  {event.collaboration && <span className="timeline-tag timeline-tag-collab">{event.collaboration}</span>}
                </div>
                <span className="timeline-card-mark"><ArrowUpRight size={15} /></span>
              </div>
            </motion.article>;
          })}
          <motion.div className="timeline-future" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="timeline-future-node">??</span>
            <div className="timeline-future-copy"><span className="timeline-date">CURRENT HORIZON</span><h3>FURTHER DEPLOYMENTS UNCHARTED.</h3><p>Additional workshops, secret missions, guest lectures, and newer technical modules yet to be revealed.</p></div>
          </motion.div>
        </div>
        <div className="timeline-endnote"><Users size={15} /><span>THE CALENDAR WILL EVOLVE AS THE CHAPTER BUILDS.</span></div>
      </div>
    </section>
  );
}
