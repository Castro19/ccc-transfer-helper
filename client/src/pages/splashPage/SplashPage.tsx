import { AuroraBackground } from "@/components/ui/aurora-background";
import { SparklesCore } from "@/components/ui/sparkles";

import { TextRevealCard } from "@/components/ui/text-reveal-card";
import { TextRevealCardTitle } from "@/components/ui/text-reveal-card";
import { TextRevealCardDescription } from "@/components/ui/text-reveal-card";

import { LampContainer } from "@/components/ui/lamp";
// import styles from "./SplashPage.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const SplashPage = () => {
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/home");
  };
  return (
    <div>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          
          
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          <div className="h-[20rem]  flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-1xl font-bold text-center text-white relative z-20 ">
        
      California Community College Transfer Helper
      </h1>
      
      <div className="w-[40rem] h-40 relative">
        
        
        {/* Gradients */}
       
        
 
        {/* Radial Gradient to prevent sharp edges */}
        {/* <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"> */}
        <div className="font-extralight text-base md:text-4xl dark:text-white py-4">
          - <b>Generate</b> Academic Schedules 
          <br></br>
          - <b>Save</b> Academic Schedules
          <br></br>
          - <b>View</b> your General-Ed Completion 
          <br></br>

          {/* </div> */}
        </div>
      </div>
    </div>
    
          <div className="md:text-3xl text-2xl lg:text-1xl font-bold text-center text-white relative z-20 dark:text-white">
            All in Seconds

          </div>
          
  
          </div>

          <button
            onClick={goToHomePage}
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Get Started
            </span>
          </button>
        </motion.div>
      </AuroraBackground>
      
    </div>
  );
};

export default SplashPage;
