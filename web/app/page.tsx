import EllipseGradient from "../components/Ellipse";
import { Hero } from "../components/Hero";
import { StaggeredLines } from "../components/StaggerLines";

export default function Home() {
  return (
    <main className="relative z-20 text-white overflow-x-hidden">
      <EllipseGradient />
      <Hero />
      <StaggeredLines />
    </main>
  );
}
