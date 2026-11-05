import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TeamMemberCard from "@/components/team-member-card";
import { departmentTeams, getDepartmentTeam } from "@/lib/team-data";

export function generateStaticParams() {
  return departmentTeams.map((team) => ({ department: team.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ department: string }> }): Promise<Metadata> {
  const { department } = await params;
  const team = getDepartmentTeam(department);
  return { title: team ? `${team.title} | CSI–PVG Chapter` : "Team | CSI–PVG Chapter" };
}

export default async function DepartmentTeamPage({ params }: { params: Promise<{ department: string }> }) {
  const { department } = await params;
  const team = getDepartmentTeam(department);

  if (!team) {
    return (
      <main className="inner-page team-page">
        <Navbar />
        <section className="standalone-page section-shell team-page-shell">
          <p className="page-kicker">CSI–PVG / TEAM</p>
          <h1>Team not found.</h1>
          <Link className="team-back-link" href="/team"><ArrowLeft size={16} /> Back to the full team</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="inner-page team-page">
      <Navbar />
      <section className="standalone-page section-shell team-page-shell department-team-page">
        <Link className="team-back-link" href="/team"><ArrowLeft size={16} /> Back to the full team</Link>
        <h1 className="department-page-title">{team.title.split(" ")[0]}<br /><span>{team.title.split(" ").slice(1).join(" ")}</span></h1>
        <p className="standalone-intro">{team.description}</p>
        <div className="team-member-grid department-member-grid">
          {team.members.map((member, index) => <TeamMemberCard key={member.name} member={member} index={index} />)}
        </div>
      </section>
      <Footer />



    </main>
  );
}
