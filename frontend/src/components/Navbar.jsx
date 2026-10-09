import React from "react"
import { useState, useEffect } from "react"
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../features/logout";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice"

function Navbar() {
  const dispatch = useDispatch()
   const {userData} = useSelector((state)=>state.user)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const name = userData?.user.name || "Guest"
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
  useEffect(() => {
    if (typeof window == undefined) return
    const theme = localStorage.getItem("theme")
    const dark = theme ? theme == "dark" : true
    document.documentElement.classList.toggle("dark", dark)
    setIsDarkMode(dark)
  }, [])

  const toggleTheme = () => {
    const next = !isDarkMode
    setIsDarkMode(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")

  }

  const handleLogout = async () => {
    const result = await logout();
    if (result?.success) {
      dispatch(setUserData(null));
      setMenuOpen(false);
    }
  }
  return (
    <>
      <div className="w-full h-16 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.7] flex items-center justify-between px-6 gap-6 font-sans transition-colors duration-300">

        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-[17px] font-bold text-slate-900 dark:text-white tracking-tight">
            FridayAI
          </span>
        </div>

        {/* Theme Button */}
        <div className="flex items-center gap-2 shrink-0">
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
          <div className="relative ml-1">
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 cursor-pointer rounded-lg bg-white/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] shadow-lg shadow-black/5 dark:shadow-black/40 transition-colors duration-300 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-200 dark:to-white flex items-center justify-center overflow-hidden ring-1 right-black/5 dark:ring-white/20">
                <span className="text-[12px] font-semibold text-white dark:text-slate-900">
                  {initials}
                </span>


              </div>
              <span className="text-[13.5px] font-medium text-slate-700 dark:text-slate-200 hidden sm:inline">
                {name}
              </span>
              <ChevronDown size={14} className={`text-slate-200 dark:text-slate-500 transition-transform duration-150 ${menuOpen ? "rotate-180" : ""}`} />
            </button>
            {
              menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] shadow-lg shadow-black/5 dark:shadow-black/40 rounded-lg py-2 z-50">

                  {/* User Info */}
                  <div className="px-4 py-2 border-b border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-200 flex items-center gap-2.5">

                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-200 dark:to-white flex items-center justify-center overflow-hidden ring-1 ring-black/5 dark:ring-white/20">
                      <span className="text-[12px] font-semibold text-white dark:text-slate-900">
                        {initials}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="text-[13.5px] font-medium text-slate-700 dark:text-slate-200 truncate">
                        {name}
                      </span>

                      <span className="text-[12px] font-normal text-slate-500 dark:text-slate-400 truncate">
                        {userData?.user.email || ""}
                      </span>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full cursor-pointer flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-200"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>

                </div>


              )
            }
          </div>
        </div>
      </div>



    </>
  )
}

export default Navbar