import React from "react";
import { LayoutProvider } from "./LayoutProvider";
import * as motion from "motion/react-client";

function Orchestration() {
  return (
    <LayoutProvider>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-blue-400/40 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse delay-500"></div>
      </div>
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
