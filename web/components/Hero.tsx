import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

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
              <p className="text-xl text-center md:text-[22px] ">TaskFlow</p>
              <Button
                variant={"outline"}
                className="bg-transparent cursor-pointer"
              >
                Get Started
              </Button>
            </div>
          </motion.nav>

          <section className="  rounded-4xl    overflow-hidden flex-1 flex flex-col md:flex-row py-10">
            <div
              className="flex flex-col items-center justify-center  z-40 h-[40vh] md:w-[40vw]
             md:h-auto w-full "
            >
              <div className="w-full">
                <h1 className="text-5xl leading-10  text-center md:text-left md:text-6xl  text-white md:leading-tight">
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: "easeIn" }}
                    className="block mb-2"
                  >
                    Convert Prompts
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: "easeIn" }}
                    className="block mb-2"
                  >
                    into{" "}
                    <span className="bg-gradient-to-r from-55% from-purple-600 to-orange-300 text-transparent bg-clip-text">
                      Workflows
                    </span>
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: "easeIn" }}
                    className="block mb-2"
                  >
                    using LLMs{" "}
                  </motion.span>
                </h1>

                <div className="flex mt-8 md:ml-2 w-full items-center md:justify-start space-x-4 justify-center">
                  <motion.button className="outline-2 p-2 rounded-2xl ">
                    Create Workflow
                  </motion.button>
                  <motion.button className="flex items-center outline-2   rounded-2xl p-2">
                    Star on Github <Star />
                  </motion.button>
                </div>
              </div>

              {/* <motion.button className="border border-neutral-400/50 md:float-start rounded-2xl hover:text-purple-800 text-lg m-4 md:ml-8 py-2 px-6 ">
                Begin
              </motion.button> */}
            </div>
            <div className="flex-1 flex flex-col justify-center items-center p-8">
              <motion.img
                initial={{
                  opacity: 0,
                  rotate: -20,
                  scale: 2,
                  y: +100,
                  x: +50,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 0.75,
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
