import { DemoSection } from "../components/Landing/DemoSection";
import EllipseGradient from "../components/Landing/Ellipse";
import Features from "../components/Landing/Features";
import Footer from "../components/Landing/Footer";
import { Hero } from "../components/Landing/Hero";
import Navbar from "../components/Landing/Navbar";
import Orchestration from "../components/Landing/Orchestration";
import { StaggeredLines } from "../components/Landing/StaggerLines";

export default function Home() {
  return (
    <main className="relative z-20 text-white overflow-x-hidden">
      <EllipseGradient />
      <Navbar />
      <Hero />
      <StaggeredLines />
      <Orchestration />
      <Features />
      <DemoSection />
      <Footer />
    </main>
  );
}
