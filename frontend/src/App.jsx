
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LandingPage from './pages/Landing'
import Authentication from './pages/authentication'
import { AuthProvider } from './contexts/AuthContext'
import VideoMeet from './pages/VideoMeet'
import Home from './pages/Home'
import History from './pages/History'

function App() {


  return (
   <div>
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/auth" element={<Authentication/>} />
        <Route path="/history" element={<History/>}/>
        <Route path="/home" element={<Home/>} />
        <Route path="/:url" element={<VideoMeet/>} />
      </Routes>
      </AuthProvider>
    </Router>
   </div>
  )
}

export default App
