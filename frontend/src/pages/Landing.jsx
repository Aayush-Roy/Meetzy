
import React, { useState } from 'react'; // useState hook import kiya
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
function LandingPage() {
  const router = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="font-sans antialiased text-gray-800">
      {/* Header Section - Modernized */}
      <header className="bg-white shadow-lg py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
        <div className="text-3xl font-extrabold text-blue-700">
          Meetzy
        </div>
        {/* Desktop Navigation */}
        {/* <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-700 font-medium hover:text-blue-700 transition duration-300 ease-in-out">Products</a>
          <a href="#" className="text-gray-700 font-medium hover:text-blue-700 transition duration-300 ease-in-out">Solutions</a>
          <a href="#" className="text-gray-700 font-medium hover:text-blue-700 transition duration-300 ease-in-out">Resources</a>
          <a href="#" className="text-gray-700 font-medium hover:text-blue-700 transition duration-300 ease-in-out">Pricing</a>
        </nav> */}
        <div className="hidden md:flex space-x-4">
          <button onClick={()=>{
            router("/qcet45");
          }} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out">Join as Guest</button>
          <button onClick={()=>{
            router("/auth");
          }} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition duration-300 ease-in-out">Sign up for free</button>
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
          onClick={toggleMobileMenu} // onClick handler add kiya
          aria-label="Toggle mobile menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </header>

      {/* Mobile Navigation (Conditionally rendered) */}
      {isMobileMenuOpen && ( // isMobileMenuOpen true hone par hi dikhega
        <nav className="md:hidden bg-white shadow-lg py-4 px-6 fixed top-[64px] left-0 w-full z-40 h-[calc(100vh-64px)] overflow-y-auto"> {/* Fixed position aur top set kiya, height aur overflow bhi add kiya */}
          <ul className="flex flex-col space-y-4">
           
            <li><button className="w-full px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out" onClick={()=>{router("/qcet45")}}>Join as Guest</button></li>
            <li><button className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition duration-300 ease-in-out" onClick={()=>{
            router("/auth");
          }}>Sign up for free</button></li>
          </ul>
        </nav>
      )}

      {/* Hero Section - Improved */} 
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-14 px-6 md:px-12 text-center md:text-left">
  <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
    
    {/* Left Panel */}
    <div className="md:w-1/2">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
        Uniting the world, <br className="hidden md:inline" />
        <span className="text-indigo-600">one video call at a time</span>
      </h1>

      <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-lg">
        Experience the future of communication with <strong>Meetzy</strong> – where crystal-clear video, seamless collaboration, and top-notch security make every conversation extraordinary.
      </p>

      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-start gap-4 mb-8">
        <button
          onClick={() => router("/qwe45")}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 transition-transform shadow-lg"
        >
          Get Free Trial
        </button>
      </div>

      {/* Rating and Avatars */}
      <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-600">
        <div className="flex -space-x-2 overflow-hidden">
          <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://i.pinimg.com/1200x/f3/23/33/f323338233ea1ef3e83ad205919f7a3a.jpg" alt="A" />
          <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://i.pinimg.com/1200x/0e/f9/6c/0ef96c195aa3c64e100ccef8c0cc8c07.jpg" alt="B" />
          <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://i.pinimg.com/1200x/ae/7d/56/ae7d56a3c846d03139a11574122dcb3e.jpg" alt="C" />
        </div>
        <div>
          <span className="font-semibold text-lg">5.0</span>
          <span className="text-yellow-500 ml-1 text-xl">★★★★★</span>
          <p className="text-sm text-gray-500">From 3,000+ reviews</p>
        </div>
      </div>
    </div>

    {/* Right Panel */}
    <div className="md:w-1/2 flex justify-center md:justify-end">
      <img
        src="https://i.pinimg.com/1200x/3a/b8/75/3ab87585d459c5e1ae509c5883732c88.jpg"
        alt="Video Call Preview"
        className="rounded-3xl shadow-2xl border border-gray-200"
      />
    </div>
  </div>
</section>


    

    
    
      {/* Ready to Clear the Path Section */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-l from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Ready to clear the path to perfect communication?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Reach out to us and let's start a conversation about how Meetzy can transform your team's communication.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button onClick={()=>{
                router("/qwert45")
              }} className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Join as Gest</button>
              <button onClick={()=>{
                router("/auth")
              }} className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Sign up for free</button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img className="w-full max-w-md rounded-lg shadow-lg" src="https://i.pinimg.com/1200x/35/f7/e8/35f7e8fe65b7183750f0e8f4a7297dc8.jpg" alt="Video Call" />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Meetzy</h3>
            <p className="text-gray-400 text-sm">
              Meetzy is your ultimate solution for seamless video conferencing,
              offering unparalleled quality, security, and ease of use.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Overview</a></li>
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Solutions</a></li>
              <li><a href="#" className="hover:text-white">Tutorials</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
              <li><a href="#" className="hover:text-white">News</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Events</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Tutorials</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Cookies</a></li>
              <li><a href="#" className="hover:text-white">Licenses</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2025 Meetzy. All rights reserved.</p>
         <div className="flex space-x-4 mt-4 md:mt-0">
      <IconButton
        component="a"
        href="https://www.instagram.com/aayush_roy03"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'white' }}
      >
        <InstagramIcon />
      </IconButton>
      <IconButton
        component="a"
        href="https://www.linkedin.com/in/aayushsharma1"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'white' }}
      >
        <LinkedInIcon />
      </IconButton>
      <IconButton
        component="a"
        href="https://github.com/Aayush-Roy"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'white' }}
      >
        <GitHubIcon />
      </IconButton>
      <IconButton
        component="a"
        href="https://twitter.com/unrealaayush"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'white' }}
      >
        <TwitterIcon />
      </IconButton>
    </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
