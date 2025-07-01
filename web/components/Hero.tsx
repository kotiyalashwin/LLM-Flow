import * as motion from "motion/react-client";

export const Hero = () => {
  return (
    <div className=" relative z-20 w-screen flex flex-row justify-center">
      <div className="w-full md:max-w-[85vw]">
        <div className="min-h-screen flex flex-col text-white  p-10 space-y-4">
          <nav className="flex items-center ">
            <div className="flex items-center space-x-4">
              <img className="w-8 h-8" src="/logo.svg" alt="logo" />
              <p className="text-2xl md:text-[39px] text-transparent bg-clip-text bg-gradient-to-tr  from-purple-800 to-orange-400">
                TaskFlow
              </p>
            </div>
          </nav>

          <section className="bg-white/5 overflow-hidden rounded-4xl  backdrop-blur-2xl flex-1 flex flex-col md:flex-row py-10">
            <div
              className="flex flex-col items-center md:justify-center justify-start z-40 h-[40vh] md:w-[40vw]
             md:h-auto w-full "
            >
              <div>
                <h1 className="text-5xl pl-8 text-center md:text-left md:text-6xl font-semibold text-white md:leading-tight">
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
              </div>

              {/* <motion.button className="border border-neutral-400/50 rounded-2xl hover:text-purple-800 text-lg m-4 md:ml-8 py-2 px-6 ">
                Begin
              </motion.button> */}
            </div>
            <div className="flex-1 flex flex-col justify-center items-center p-8">
              <motion.img
                initial={{
                  rotate: -20,
                  scale: 2,
                  y: +100,
                  x: +50,
                  filter: "blur(10px)",
                }}
                animate={{
                  rotate: 0,
                  scale: 1,
                  y: 0,
                  x: 0,
                  filter: "blur(0px)",
                }}
                transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
                src="/ss1.svg"
                alt=""
              />
              <p className="mt-10  text-xl md:text-2xl text-neutral-400">
                ~LLM powered orchestrations
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
