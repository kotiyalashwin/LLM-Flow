import * as motion from "motion/react-client";
import { Button } from "../ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { color } from "motion";
import Navbar from "./Navbar";
import { LayoutProvider } from "./LayoutProvider";
import { AuthButton } from "./AuthButton";

const fadeIn = {
  initial: { opacity: 0, y: +40, filter: "blur(10px)", color: "black" },
  fadeIn: { opacity: 1, y: 0, filter: "blur(0px)", color: "white" },
};

export const Hero = () => {
  return (
    // <div className=" relative z-20 w-screen flex flex-row justify-center">
    //   <div className="w-full md:max-w-[85vw]">
    <LayoutProvider>
      <div className="min-h-screen flex flex-col text-white px-4 md:px-10 py-10 space-y-4">
        <section className="justify-center rounded-4xl  md:mt-8  overflow-hidden flex-1 flex flex-col  ">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-700"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400/20 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse delay-500"></div>
          </div>

          <div
            className="flex flex-col items-center justify-center  z-40 h-[40vh] 
             md:h-auto w-full "
          >
            <div className="w-full">
              <h1 className="text-6xl sm:text-5xl md:mt-10 md:text-6xl leading-10  text-center   text-amber-50 md:leading-tight">
                <motion.span
                  variants={fadeIn}
                  initial="initial"
                  animate="fadeIn"
                  transition={{ duration: 0.25, ease: "easeIn" }}
                  className="flex space-x-4 justify-center mb-2 "
                >
                  <span className="hidden md:block whitespace-nowrap">
                    Convert{" "}
                  </span>
                  <span>Prompts</span>
                </motion.span>
                <motion.span
                  variants={fadeIn}
                  initial="initial"
                  animate="fadeIn"
                  transition={{ duration: 0.35, delay: 0.25, ease: "easeIn" }}
                  className="block mb-2 text-center"
                >
                  into
                </motion.span>

                <motion.span
                  variants={fadeIn}
                  initial="initial"
                  animate="fadeIn"
                  transition={{ duration: 0.45, delay: 0.5, ease: "easeIn" }}
                  className="block text-center mb-4"
                >
                  <span className=" inline-block px-2 py-1  text-black talic font-semibold skew-x-[-6deg] rounded">
                    <span className="skew-x-[6deg] inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                      Workflows
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 blur-2xl opacity-30 -z-10"></span>
                    </span>
                  </span>
                </motion.span>
                <motion.span
                  variants={fadeIn}
                  initial="initial"
                  animate="fadeIn"
                  transition={{ duration: 0.5, delay: 0.5, ease: "easeIn" }}
                  className="block mb-2"
                >
                  using LLMs{" "}
                </motion.span>
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, ease: "easeIn" }}
                className="flex mt-8 md:ml-2 w-full  items-center space-x-4 justify-center"
              >
                <AuthButton>Create WorkFlow</AuthButton>
                <Button
                  variant="outline"
                  size="lg"
                  className="group items-center flex bg-transparent border-2 border-gray-600 hover:border-purple-400 text-white hover:text-purple-400 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 backdrop-blur-sm"
                >
                  <Star className="w-5 h-5 group-hover:text-yellow-400 transition-colors duration-300" />
                  <a
                    href="https://github.com/kotiyalashwin/LLM-Flow"
                    target="_blank_"
                  >
                    Star on Github
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* <motion.button className="border border-neutral-400/50 md:float-start rounded-2xl hover:text-purple-800 text-lg m-4 md:ml-8 py-2 px-6 ">
                Begin
              </motion.button> */}
          </div>
          <div className=" hidden md:flex flex-col justify-center items-center p-8">
            <motion.img
              initial={{
                opacity: 0,
                rotate: -20,

                y: +100,
                x: +50,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                rotate: 0,

                y: 0,
                x: 0,
                filter: "blur(0px)",
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              src="/ss1.svg"
              alt=""
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-10  text-xl md:text-2xl text-neutral-400"
            >
              ~LLM powered orchestrations
            </motion.p>
          </div>
        </section>
      </div>
    </LayoutProvider>
    //   </div>
    // </div>
  );
};
