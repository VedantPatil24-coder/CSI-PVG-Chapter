export type TeamMember = {
  name: string;
  role: string;
  detail: string;
  image: string;
  linkedin?: string;
};

export type DepartmentTeam = {
  slug: string;
  title: string;
  description: string;
  members: TeamMember[];
};

export const departmentTeams: DepartmentTeam[] = [
  {
    slug: "technical",
    title: "Technical Team",
    description: "The people who turn ideas into working technology.",
    members: [
      { name: "Atharv Basole", role: "Technical Team Member", detail: "Computer Department • S.Y", image: "/team/atharv_basole.png", linkedin: "https://www.linkedin.com/in/atharv-basole-322037386?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { name: "Siddhi Jadhav", role: "Technical Team Member", detail: "Computer Department • T.E", image: "/team/siddhi_jadhav.jpeg", linkedin: "https://www.linkedin.com/in/siddhijadhavcs" },
    ],
  },
  {
    slug: "design",
    title: "Design Team",
    description: "The creative minds shaping how our ideas look and feel.",
    members: [
      { name: "Amey Zambare", role: "Design Team Member", detail: "Computer Department • S.Y", image: "/team/amey_zambare.jpeg", linkedin: "https://www.linkedin.com/in/amey-zambare-8b4797382?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { name: "Aditya Attarkar", role: "Design Team Member", detail: "Computer Department • S.Y", image: "/team/aditya_attarkar.jpeg", linkedin: "https://www.linkedin.com/in/attarkaraditya01" },
      { name: "Aboli Chavan", role: "Design Team Member", detail: "Computer Department • S.Y", image: "/team/aboli_chavan.jpeg" },
    ],
  },
  {
    slug: "event-publicity",
    title: "Event & Publicity Team",
    description: "The team bringing our events to life and our community together.",
    members: [
      { name: "Sagar More", role: "Event & Publicity Team Member", detail: "Computer Department • S.Y", image: "/team/sagar_more.jpeg", linkedin: "https://www.linkedin.com/in/sagar-more-013386342?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { name: "Nihar Gokhale", role: "Event & Publicity Team Member", detail: "Computer Department • S.Y", image: "/team/nihar_gokhale.jpeg" },
      { name: "Yaseen Husaini", role: "Event & Publicity Team Member", detail: "Computer Department • S.Y", image: "/team/yaseen_husaini.jpeg", linkedin: "https://www.linkedin.com/in/yaseenhusaini" },
      { name: "Janhvi Chauhan", role: "Event & Publicity Team Member", detail: "Computer Department • S.Y", image: "/team/janhvi_chauhan.jpeg", linkedin: "https://www.linkedin.com/in/janhavi-chauhan-4609a1379?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
    ],
  },
  {
    slug: "finance",
    title: "Finance Team",
    description: "The people keeping plans, resources and budgets on track.",
    members: [
      { name: "Gayatri Sawant", role: "Finance Team Member", detail: "Computer Department • S.Y", image: "/team/gayatri_sawant.jpeg", linkedin: "https://www.linkedin.com/in/gayatri-sawant-268879443" },
      { name: "Gaurav Kale", role: "Finance Team Member", detail: "Computer Department • S.Y", image: "/team/gaurav_kale.jpeg", linkedin: "https://www.linkedin.com/in/gaurav-kale-946104387/" },
    ],
  },
];

export function getDepartmentTeam(slug: string) {
  return departmentTeams.find((team) => team.slug === slug);
}
