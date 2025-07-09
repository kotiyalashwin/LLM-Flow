import React from "react";
import { LayoutProvider } from "./LayoutProvider";
import * as motion from "motion/react-client";

function Orchestration() {
  return (
    <LayoutProvider>
      <div className="min-h-screen relative overflow--hidden">
        <motion.img
          animate={{
            y: [0, 10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute top-50 md:h-[75%] md:top-20"
          src="ss2.svg"
          alt="ss2"
        />
        <motion.img
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            delay: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="hidden md:block h-[60%] top-40 absolute right-0"
          src="ss3.svg"
          alt="ss3"
        />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <motion.h1 className="text-5xl md:text-7xl font-bold text-center leading-tight">
            Build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Ochestration
            </span>{" "}
            <br /> and Relaxxx
          </motion.h1>
        </div>
      </div>
    </LayoutProvider>
  );
}

export default Orchestration;
