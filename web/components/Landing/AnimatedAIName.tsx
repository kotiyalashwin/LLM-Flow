"use client";

import { useState, useEffect } from "react";

// Client component for the animated text
export function AnimatedAIName({
  lineIndex,
  delay = 0,
}: {
  lineIndex: number;
  delay: number;
}) {
  "use client";

  const [cycle, setCycle] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);
  const aiNames = ["Gemini", "Claude", "OpenAI"];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(1); // Start blur out
      setTimeout(() => {
        setCycle((prev) => (prev + 1) % 3);
        setAnimationPhase(2); // Start blur in
        setTimeout(() => {
          setAnimationPhase(0); // Complete
        }, 750);
      }, 375);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const getCurrentName = () => {
    return aiNames[(cycle + lineIndex) % 3];
  };

  const getBlurStyle = () => {
    const phase = animationPhase;
    if (phase === 0)
      return {
        filter: "blur(0px)",
        transitionProperty: "filter",
        transitionDuration: "0.375s",
        transitionTimingFunction: "ease-in-out",
      };
    if (phase === 1)
      return {
        filter: "blur(10px)",
        transitionProperty: "filter",
        transitionDuration: "0.375s",
        transitionTimingFunction: "ease-in-out",
        transitionDelay: `${delay}ms`,
      };
    if (phase === 2)
      return {
        filter: "blur(0px)",
        transitionProperty: "filter",
        transitionDuration: "0.375s",
        transitionTimingFunction: "ease-in-out",
        transitionDelay: `${delay}ms`,
      };
    return { filter: "blur(0px)" };
  };

  return (
    <span
      style={getBlurStyle()}
      className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
    >
      {getCurrentName()}
    </span>
  );
}
