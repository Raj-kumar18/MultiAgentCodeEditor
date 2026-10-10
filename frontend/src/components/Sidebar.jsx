import React from "react";
import {motion} from "motion/react"
function sidebar() {
    return (
       <>
       <div className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200/70 bg-white/60 px-3 py-5
       font-sans backdrop-blur-xl transition-colors duration-300 dark:border-white/[0.06] dark:bg-white/[0.02]">
        <div className="flex flex-col gap-1">
        <motion.div 
        initial={{opacity:0, y:-20}}
        >

        </motion.div>
        </div>
       </div>
       </>
    );
}

export default sidebar;