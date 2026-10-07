import React from "react"
import {FiMoon} from "react-icons/fi";

function Navbar() {
    return (
        <>
        <div className="w-full h-16 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border-b border-slate-200 
        dark:border-white/[0.7] flex items-center justify-between px-6 gap-6 font-sans transition-colors duration-300">
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
        <span className="text-[17px] font-bold text-slate-900 dark:text-white tracking-tight">
            FirdayAI
        </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
        <button>
            <FiMoon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        </button>
        </div>
        </>
    )
}

export default Navbar