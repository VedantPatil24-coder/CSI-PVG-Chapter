"use client";

import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Bot, Braces, CircuitBoard, Code2, ExternalLink, GitFork, Github, Globe2, Lightbulb, Orbit, Terminal, Users, Workflow, Zap } from "lucide-react";

const domains = [
  { number: "01", icon: Bot, title: "AI & Machine Learning", desc: "From model experiments to useful AI-powered applications.", tags: ["Python", "LLMs", "Computer Vision"], className: "domain-featured" },
  { number: "02", icon: Braces, title: "Full-stack Engineering", desc: "Design, build and ship products from interface to API.", tags: ["React", "APIs", "Databases"], className: "" },
  { number: "03", icon: GitFork, title: "Open Source", desc: "Learn in the open, contribute upstream and collaborate.", tags: ["Git", "GitHub", "Community"], className: "" },
  { number: "04", icon: CircuitBoard, title: "Systems & Innovation", desc: "Explore the intersection of software, hardware and ideas.", tags: ["Prototyping", "IoT", "Research"], className: "domain-wide" },
];

const projects = [
  { number: "P–01", type: "AI / ML", title: "Signal Studio", desc: "A concept for turning noisy data into clear, actionable insights.", tech: ["Python", "Machine Learning"], icon: Orbit, accent: "mint" },
  { number: "P–02", type: "DEVELOPER TOOLS", title: "Commit Companion", desc: "A small workflow tool that makes collaboration and project context easier.", tech: ["Next.js", "TypeScript"], icon: Workflow, accent: "violet" },
  { number: "P–03", type: "COMMUNITY", title: "Buildspace Board", desc: "An open project board to discover ideas, teammates and contribution paths.", tech: ["React", "Supabase"], icon: Globe2, accent: "blue" },
];

const events = [
  { kind: "WORKSHOP", date: "COMING SOON", title: "Build with AI", desc: "A practical session on turning AI APIs into useful prototypes.", icon: Bot },
  { kind: "COMMUNITY BUILD", date: "COMING SOON", title: "Open Source Sprint", desc: "Find an issue, meet collaborators and make your first contribution.", icon: GitFork },
  { kind: "SHOWCASE", date: "COMING SOON", title: "Demo Night", desc: "Share what you have built, get feedback and find your next teammate.", icon: Lightbulb },
];

function SectionHeading({ index, eyebrow, title, description }: { index: string; eyebrow: string; title: string; description: string }) {
  return (
    <div className="section-heading">
      <div className="section-heading-meta"><span>{index}</span><span className="heading-rule" /><span>{eyebrow}</span></div>
      <div className="section-heading-main"><h2>{title}</h2><p>{description}</p></div>
    </div>
  );
}

export function DomainsSection() {
  return (
    <section className="content-section section-shell" id="domains">
      <SectionHeading index="01 / WHAT WE EXPLORE" eyebrow="OUR DOMAINS" title="Many disciplines.\nOne builder mindset." description="A place to go deeper, cross boundaries and learn by building with people who are curious about the same things." />
      <div className="domain-grid">
        {domains.map((domain, i) => {
          const Icon = domain.icon;
          return <motion.article key={domain.number} className={`domain-card ${domain.className}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, delay: i * 0.07 }}>
            <div className="card-topline"><span>{domain.number}</span><ArrowUpRight size={17} /></div>
            <div className="domain-icon"><Icon size={21} strokeWidth={1.6} /></div>
            <h3>{domain.title}</h3><p>{domain.desc}</p>
            <div className="tag-row">{domain.tags.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
          </motion.article>;
        })}
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section className="content-section projects-section" id="projects">
      <div className="section-shell">
        <SectionHeading index="02 / WHAT WE BUILD" eyebrow="SELECTED PROJECTS" title="Ideas need form.\nProjects give them one." description="A glimpse into the kinds of things our community can build together. Replace these sample concepts with your chapter's real projects." />
        <div className="project-grid">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return <motion.article key={project.number} className={`project-card accent-${project.accent}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, delay: i * 0.08 }}>
              <div className="project-art"><div className="project-art-grid" /><div className="project-art-frame frame-a" /><div className="project-art-frame frame-b" /><div className="project-art-core"><Icon size={36} strokeWidth={1.2} /></div><span className="project-art-index">{project.number}</span><span className="project-art-label">CONCEPT / 2026</span></div>
              <div className="project-body"><div className="project-kicker">{project.type}</div><h3>{project.title}</h3><p>{project.desc}</p><div className="tag-row">{project.tech.map((tech) => <span className="tech-tag" key={tech}>{tech}</span>)}</div><a className="text-link" href="#join">Interested in building this? <ArrowUpRight size={15} /></a></div>
            </motion.article>;
          })}
        </div>
        <p className="content-note"><span className="note-dot" /> PROJECT NAMES AND DESCRIPTIONS ARE STARTER CONTENT — SWAP IN VERIFIED CHAPTER PROJECTS BEFORE LAUNCH.</p>
      </div>
    </section>
  );
}

export function EventsSection() {
  return (
    <section className="content-section section-shell" id="events">
      <SectionHeading index="03 / WHAT'S HAPPENING" eyebrow="EVENTS & INITIATIVES" title="Learn together.\nShip together." description="Workshops, build sessions and opportunities to meet the people you'll learn from." />
      <div className="events-list">
        {events.map((event, i) => {
          const Icon = event.icon;
          return <motion.article key={event.title} className="event-row" initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.07 }}>
            <div className="event-symbol"><Icon size={20} /></div><div className="event-info"><div className="event-meta"><span>{event.kind}</span><span className="event-date">{event.date}</span></div><h3>{event.title}</h3><p>{event.desc}</p></div><span className="event-arrow" aria-label="Event details pending"><ArrowUpRight size={19} /></span>
          </motion.article>;
        })}
      </div>
      <div className="events-footnote"><Zap size={15} /><span>EVENT DATES AND REGISTRATION LINKS WILL APPEAR HERE WHEN CONFIRMED.</span></div>
    </section>
  );
}

export function CommunitySection() {
  return (
    <section className="community-section section-shell" id="community">
      <div className="community-panel">
        <div className="community-pattern" aria-hidden="true" />
        <div className="community-copy"><div className="section-heading-meta"><span>04 / THE PEOPLE</span><span className="heading-rule" /><span>COMMUNITY</span></div><h2>Good work grows<br />when we <span className="accent-text">build together.</span></h2><p>Bring a question, an unfinished idea or a willingness to learn. You don't need to know everything to get started.</p><a className="text-link" href="#join">Find your place in the chapter <ArrowUpRight size={15} /></a></div>
        <div className="community-stats"><div className="stat-item"><Users size={19} /><strong>Curious minds</strong><span>Different skills. Shared momentum.</span></div><div className="stat-item"><Terminal size={19} /><strong>Learn by doing</strong><span>Small experiments. Real progress.</span></div><div className="stat-item"><GitFork size={19} /><strong>Open collaboration</strong><span>Share work. Help each other grow.</span></div></div>
      </div>
    </section>
  );
}

export function JoinSection() {
  return (
    <section className="join-section section-shell" id="join">
      <div className="join-copy"><div className="section-heading-meta"><span>05 / YOUR NEXT STEP</span><span className="heading-rule" /><span>GET INVOLVED</span></div><h2>Bring an idea.<br /><span className="accent-text">Make it matter.</span></h2><p>Follow the chapter, bring a friend, join a session or start contributing. The next build starts with a conversation.</p></div>
      <div className="join-actions"><a className="join-action" href="https://github.com/" target="_blank" rel="noreferrer"><span className="join-action-icon"><Github size={20} /></span><span><strong>Explore open source</strong><small>Find a project and start contributing</small></span><ExternalLink size={16} /></a><a className="join-action" href="mailto:chapter@example.com"><span className="join-action-icon"><Users size={20} /></span><span><strong>Connect with the chapter</strong><small>Replace with your official contact email</small></span><ArrowUpRight size={16} /></a></div>
    </section>
  );
}
