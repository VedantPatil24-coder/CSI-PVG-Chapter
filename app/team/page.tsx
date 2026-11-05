import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Linkedin } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { type TeamMember } from "@/lib/team-data";


export const metadata = { title: "Team | CSI–PVG Chapter" };

type LeadershipMember = TeamMember & { teamHref?: string };

const faculty: LeadershipMember[] = [
  { name: "Prof. Urmila Kalshetti", role: "HOD (Computer Department)", detail: "Computer Department • Staff", image: "/team/urmila_kalshetti.jpeg", linkedin: "https://www.linkedin.com/in/urmila-kalshetti-3507669a/" },
  { name: "Prof. Aakanksha Mishra Tripathi", role: "Faculty Coordinator", detail: "Computer Department • Staff", image: "/team/aakanksha_mishra_tripathi.jpeg", linkedin: "https://www.linkedin.com/in/akansha-mishra-22783825/" },
];

const executive: LeadershipMember[] = [
  { name: "Gauri Kharad", role: "President", detail: "Computer Department • B.E", image: "/team/gauri_kharad.jpeg", linkedin: "https://www.linkedin.com/in/gauri-kharad-136365298/" },
  { name: "Pratika Bankar", role: "Vice President", detail: "Computer Department • T.E", image: "/team/pratika_bankar.jpeg", linkedin: "https://www.linkedin.com/in/pratikabankar/" },
];

const heads: { title: string; members: LeadershipMember[]; href: string }[] = [
  { title: "TECHNICAL HEADS", href: "/team/technical", members: [
    { name: "Nehal Rawool", role: "Technical Head", detail: "Computer Department • S.Y", image: "/team/nehal_rawool.jpeg", linkedin: "https://www.linkedin.com/in/nehal-rawool-461602417/", teamHref: "/team/technical" },
    { name: "Vedant Patil", role: "Technical Head", detail: "Computer Department • S.Y", image: "/team/vedant_patil.jpeg", linkedin: "https://www.linkedin.com/in/vedant-patil-286944382/", teamHref: "/team/technical" },
  ]},
  { title: "DESIGN HEADS", href: "/team/design", members: [
    { name: "Shreyasi Jadhav", role: "Design Head", detail: "Computer Department • S.Y", image: "/team/shreyasi_jadhav.jpeg", linkedin: "https://www.linkedin.com/in/shreyasi-jadhao-167427384/", teamHref: "/team/design" },
    { name: "Sharvee Kulkarni", role: "Design Head", detail: "Computer Department • S.Y", image: "/team/sharvee_kulkarni.jpeg", linkedin: "https://www.linkedin.com/in/sharvee-kulkarni-635a5a391/", teamHref: "/team/design" },
  ]},
  { title: "EVENT & PUBLICITY HEADS", href: "/team/event-publicity", members: [
    { name: "Salil Bokil", role: "Event & Publicity Head", detail: "Computer Department • S.Y", image: "/team/salil_bokil.jpeg", linkedin: "https://www.linkedin.com/in/bsalil/", teamHref: "/team/event-publicity" },
    { name: "Bhumika Gote", role: "Event & Publicity Head", detail: "Computer Department • S.Y", image: "/team/bhumika_gote.jpeg", linkedin: "https://www.linkedin.com/in/bhumika-gote-455030386/", teamHref: "/team/event-publicity" },
  ]},
  { title: "FINANCE HEADS", href: "/team/finance", members: [
    { name: "Meet Shrishrimal", role: "Finance Head", detail: "Computer Department • S.Y", image: "/team/meet_shrishrimal.jpeg", linkedin: "https://www.linkedin.com/in/meet-shrishrimal-237a8441a/", teamHref: "/team/finance" },
    { name: "Om Kashid", role: "Finance Head", detail: "Computer Department • S.Y", image: "/team/om_kashid.jpeg", linkedin: "https://www.linkedin.com/in/om-kashid-880935397/", teamHref: "/team/finance" },
  ]},
];

function LeadershipCard({ member, index }: { member: LeadershipMember; index: number }) {
  return (
    <article className="team-member-card">
      <div className="team-member-photo">
        <Image src={member.image} alt={`${member.name}, ${member.role}`} fill sizes="(max-width: 680px) 90vw, 320px" priority={index < 2} />
      </div>
      <div className="team-member-info">
        <h3>{member.name}</h3>
        <p className="team-member-role">{member.role}</p>
        <p className="team-member-detail">{member.detail}</p>
        <div className="team-card-actions" aria-label="Profile and team links">
          {member.linkedin ? <a className="team-linkedin" href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`View ${member.name} on LinkedIn`}><Linkedin size={19} strokeWidth={1.9} /></a> : null}
          {member.teamHref ? <Link className="team-view-button" href={member.teamHref}>View Team <ArrowUpRight size={15} /></Link> : null}
        </div>
      </div>
    </article>
  );
}

function LeadershipGroup({ title, members }: { title: string; members: LeadershipMember[] }) {
  return (
    <section className="team-group">
      <div className="team-group-heading"><h2>{title}</h2></div>
      <div className="team-member-grid">
        {members.map((member, index) => <LeadershipCard key={member.name} member={member} index={index} />)}
      </div>
    </section>
  );
}

export default function TeamPage() {
  return (
    <main className="inner-page team-page">
      <Navbar />
      <section className="standalone-page section-shell team-page-shell">
        <h1>The people who<br /><span>make it happen.</span></h1>
        <p className="standalone-intro">Meet the faculty mentors and student team building a community around curiosity, collaboration and technology.</p>
        <div className="team-roster">
          <LeadershipGroup title="FACULTY COORDINATORS" members={faculty} />
          <LeadershipGroup title="EXECUTIVE OFFICERS" members={executive} />
          {heads.map((group) => <LeadershipGroup key={group.href} title={group.title} members={group.members} />)}
        </div>
      </section>
      <Footer />



    </main>
  );
}
