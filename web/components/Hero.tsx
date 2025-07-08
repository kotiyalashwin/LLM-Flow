import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: +40, filter: "blur(10px)" },
  fadeIn: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const Hero = () => {
  return (
    <div className=" relative z-20 w-screen flex flex-row justify-center">
      <div className="w-full md:max-w-[85vw]">
        <div className="min-h-screen flex flex-col text-white  p-10 space-y-4">
          <motion.nav
            className="flex items-center "
            initial={{ filter: "blur(10px)" }}
            animate={{ filter: "blur(0px)" }}
          >
            <div className="flex bg-white/10 backdrop-blur-3xl w-full justify-between items-center rounded-2xl py-2 px-6 ">
              {/* <img className="w-8 h-8" src="/logo.svg" alt="logo" /> */}
              <p className=" text-center md:text-[22px] ">TaskFlow</p>
              <Button
                variant={"outline"}
                className="bg-transparent cursor-pointer text-xs md:text-sm"
              >
                Get Started
              </Button>
            </div>
          </motion.nav>

          <section className="justify-center rounded-4xl    overflow-hidden flex-1 flex flex-col  ">
            <div
              className="flex flex-col items-center justify-center  z-40 h-[40vh] 
             md:h-auto w-full "
            >
              <div className="w-full">
                <h1 className="text-5xl leading-10  text-center  md:text-6xl  text-amber-50 md:leading-tight">
                  <motion.span
                    variants={fadeIn}
                    initial="initial"
                    animate="fadeIn"
                    transition={{ duration: 0.5, ease: "easeIn" }}
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
                    transition={{ duration: 0.5, delay: 0.25, ease: "easeIn" }}
                    className="block mb-2 text-center"
                  >
                    into
                  </motion.span>

                  <motion.span
                    variants={fadeIn}
                    initial="initial"
                    animate="fadeIn"
                    transition={{ duration: 0.5, delay: 0.5, ease: "easeIn" }}
                    className="block text-center mb-4"
                  >
                    <span className=" inline-block px-2 py-1 bg-purple-600 text-black talic font-semibold skew-x-[-6deg] rounded">
                      <span className="skew-x-[6deg] inline-block">
                        Workflows
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

                <motion.div className="flex mt-8 md:ml-2 w-full items-center space-x-4 justify-center">
                  <motion.button
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, delay: 0.5, ease: "easeIn" }}
                    className="outline-2 p-2 rounded-2xl "
                  >
                    Create Workflow
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, delay: 0.75, ease: "easeIn" }}
                    className=" outline-2   rounded-2xl p-2"
                  >
                    <Link
                      className="flex items-centerllhjy8y9t8ttt88t8ttt8t"
                      target="_blank"
                      href={"https://github.com/kotiyalashwin/LLM-Flow"}
                    >
                      Star on Github <Star className="ml-1" size={18} />
                    </Link>
                  </motion.button>
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
      </div>
    </div>
  );
};
