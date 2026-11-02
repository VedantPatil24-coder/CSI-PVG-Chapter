import Navbar from "@/components/navbar";
import RecentNewsSection from "@/components/recent-news-section";

export const metadata = {
  title: "Moments & Milestones | CSI–PVG Chapter",
  description: "Event memories, photographs and reflections from the CSI–PVG Student Chapter.",
};

export default function MomentsAndMilestonesPage() {
  return (
    <main className="inner-page moments-page">
      <Navbar />
      <RecentNewsSection />
      <footer className="site-footer section-shell">
        <p>Curiosity into capability. Ideas into impact.</p>
        <span className="footer-copyright">© {new Date().getFullYear()} CSI–PVG STUDENT CHAPTER</span>
      </footer>
    </main>
  );
}
