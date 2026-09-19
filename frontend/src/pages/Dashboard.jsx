import {FcGoogle} from "react-icons/fc"
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../firebase'
import { login } from '../features/login'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"
const Dashboard = () => {

    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const {userData} = useSelector((state)=>state.user)
    const handleLogin = async () => {
    try {
        setLoading(true)
      const result = await signInWithPopup(auth, googleProvider);

      const token = await result.user.getIdToken();

      const data = await login(token);
      dispatch(setUserData(data))
       setLoading(false)
      console.log(data); 
    } catch (error) {
      console.log(error);
    }
  }



  if(!userData){

      return (/*  */
          <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-4 transition-colors duration-300 dark:bg-[#07070c]">
  
              {/* Background glow */}
              <div
                  className="
        pointer-events-none
        absolute
        -top-32
        left-1/2
        h-[600px]
        w-[600px]
        -translate-x-1/2
        rounded-full
        bg-blue-200/40
        blur-[120px]
        dark:bg-white/[0.06]
      "
              />
  
              {/* Login Card */}
              <div
                  className="
        relative
        z-10
        w-full
        max-w-sm
        rounded-2xl
        border
        border-slate-200/70
        bg-white/80
        p-8
        text-center
        shadow-xl
        shadow-slate-200/50
        backdrop-blur-xl
        transition-colors
        duration-300
        dark:border-white/[0.08]
        dark:bg-white/[0.03]
        dark:shadow-black/40
      "
              >
                  <div className="
      mx-auto
      mb-5
      flex
      h-14
      w-14
      items-center
      justify-center
  
      rounded-xl
      border
      border-slate-200
      bg-white
      shadow-lg
      shadow-black/5
      dark:border-transparent
  
      ">
                      <span className="
          text-lg
          font-bold
          text-slate-900
          ">
                          AI
                      </span>
                  </div>
                  <h2 className="
          mb-2
          text-xl
          font-bold
          text-slate-900
          dark:text-white
          ">Welcome to CodeAI</h2>
  
          <p className="
          mb-6 
          text-[13.5px]
           leading-relaxed
            text-slate-500
             dark-text-slate-4000
  
          ">
              Sign in to access your projects and continue building.
              
          </p>
  
  <button onClick={handleLogin}
  disabled={loading}
  className="flex items-center w-full
  justify-center 
  gap-3
  rounded-xl
  border
  border-slate-200
  bg-white
  py-2.5
  text-[13.5px]
  font-medium
  text-slate-800
  shadow-sm
  transition-colors
  duration-150
  hover:bg-slate-50
  disable:opacity-70
  dark:border-transparent
  dark:bg-white
  dark:hover:bg-slate-100
  cursor-pointer
  ">
      <FcGoogle />
      {loading ? "Signing in..." : "Continue with Google"}
  </button>
  
  <p
  className="
  mt-5
  text-[11px]
  text-slate-400
  dark:text-slate-600
  
  "
  >By continue you agree to our Terms & Privacy Policy</p>
  
              </div>
  
          </div>
      )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Welcome, {userData.user.name}!</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">You are now logged in.</p>
    </div>
  );
}

export default Dashboard