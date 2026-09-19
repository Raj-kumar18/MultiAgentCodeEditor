
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { useDispatch } from 'react-redux'
import { me } from './features/me'
import { setUserData } from './redux/userSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchUserData = async ()=>{
      const data = await me()
      dispatch(setUserData(data))
      console.log(data)
    }

    fetchUserData()
  }, [])
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
