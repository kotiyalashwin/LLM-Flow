import { AnimatedAIName } from "./AnimatedAIName";

export const StaggeredLines = () => {
  return (
    <div className="relative z-20 w-screen flex flex-row justify-center">
      <div className="w-full md:max-w-[85vw]">
        <div className="min-h-screen p-10 text-6xl justify-evenly flex flex-col">
          <p>
            Let <AnimatedAIName lineIndex={0} delay={0} /> think
          </p>
          <p>
            <AnimatedAIName lineIndex={1} delay={100} /> summarize
          </p>
          <p>
            and <AnimatedAIName lineIndex={2} delay={200} /> write.
          </p>
        </div>
      </div>
    </div>
  );
};
