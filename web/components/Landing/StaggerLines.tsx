import { AnimatedAIName } from "./Animated/AnimatedAIName";
import EllipseGradient from "./Ellipse";
import { LayoutProvider } from "./LayoutProvider";
import * as motion from "motion/react-client";
export const StaggeredLines = () => {
  return (
    <LayoutProvider>
      <motion.div
        initial={{ filter: "blur(10px)" }}
        whileInView={{ filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-10 text-6xl  justify-evenly flex flex-col"
      >
        <p>
          Let <AnimatedAIName lineIndex={0} delay={0} /> think
        </p>
        <p>
          <AnimatedAIName lineIndex={1} delay={100} /> summarize
        </p>
        <p>
          and <AnimatedAIName lineIndex={2} delay={200} /> write.
        </p>
      </motion.div>
    </LayoutProvider>
  );
};
