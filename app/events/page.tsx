import Navbar from "@/components/navbar";
import EventsTimeline from "@/components/events-timeline";
import Footer from "@/components/footer";

export const metadata = {
  title: "Events | CSI–PVG Chapter",
  description: "Upcoming workshops, competitions and events from the CSI–PVG Student Chapter.",
};

export default function EventsPage() {
  return (
    <main className="inner-page">
      <Navbar />
      <EventsTimeline />
      <Footer />
    </main>
  );
}
