import Image from "next/image";
import { Linkedin } from "lucide-react";
import type { TeamMember } from "@/lib/team-data";

export default function TeamMemberCard({ member, index = 0 }: { member: TeamMember; index?: number }) {
  return (
    <article className="team-member-card department-member-card">
      <div className="team-member-photo">
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes="(max-width: 680px) 42vw, 240px"
          priority={index < 2}
        />
      </div>
      <div className="team-member-info">
        <span className="member-card-accent" aria-hidden="true" />
        <p className="team-member-role">{member.role}</p>
        <h3>{member.name}</h3>
        <p className="team-member-detail">{member.detail}</p>
        {member.linkedin ? (
          <a className="team-linkedin team-linkedin-cta" href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`View ${member.name} on LinkedIn`} title={`View ${member.name} on LinkedIn`}>
            <Linkedin size={16} strokeWidth={1.9} />
            <span>Connect on LinkedIn</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
