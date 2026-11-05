import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div id="home"><Hero /></div>
      <AboutSection />
      <Footer />
    </main>
  );
}
