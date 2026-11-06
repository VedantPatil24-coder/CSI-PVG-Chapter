import Navbar from "@/components/navbar";
import RecentNewsSection from "@/components/recent-news-section";
import Footer from "@/components/footer";

export const metadata = {
  title: "Moments & Milestones | CSI–PVG Chapter",
  description: "Event memories, photographs and reflections from the CSI–PVG Student Chapter.",
};

export default function MomentsAndMilestonesPage() {
  return (
    <main className="inner-page moments-page">
      <Navbar />
      <RecentNewsSection />
      <Footer />
    </main>
  );
}
