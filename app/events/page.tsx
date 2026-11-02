import Navbar from "@/components/navbar";
import EventsTimeline from "@/components/events-timeline";

export const metadata = { title: "Events | CSI–PVG Chapter", description: "Upcoming workshops, competitions and events from the CSI–PVG Student Chapter." };

export default function EventsPage() {
  return <main className="inner-page"><Navbar /><EventsTimeline /><footer className="site-footer section-shell"><p>Curiosity into capability. Ideas into impact.</p><span className="footer-copyright">© {new Date().getFullYear()} CSI–PVG STUDENT CHAPTER</span></footer></main>;
}
