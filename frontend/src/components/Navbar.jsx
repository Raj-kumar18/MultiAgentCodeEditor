import React from "react"
import { useState, useEffect } from "react"
import {FiMoon} from "react-icons/fi";
import {IoSunnyOutline} from "react-icons/io5";

function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(()=>{
        if(typeof window == undefined) return
        const theme = localStorage.getItem("theme")
        const dark = theme?theme=="dark":true
        document.documentElement.classList.toggle("dark",dark)
        setIsDarkMode(dark)
    },[])

    const toggleTheme =()=>{
        const next = !isDarkMode
        setIsDarkMode(next)
        document.documentElement.classList.toggle("dark",next)
        localStorage.setItem("theme",next?"dark":"light")

    }
    return (
        <>
       <div className="w-full h-16 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.7] flex items-center justify-between px-6 font-sans transition-colors duration-300">

      {/* Logo + Theme Toggle */}
      <div className="flex items-center gap-3">

        {/* Logo */}
        <span className="text-[17px] font-bold text-slate-900 dark:text-white tracking-tight">
          FridayAI
        </span>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-lg bg-white/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] shadow-lg shadow-black/5 dark:shadow-black/40 transition-colors duration-300"
        >
          {isDarkMode ? (
            <IoSunnyOutline className="w-5 h-5 text-slate-900 dark:text-white" />
          ) : (
            <FiMoon className="w-5 h-5 text-slate-900 dark:text-white" />
          )}
        </button>

      </div>

    </div>
        </>
    )
}

export default Navbar