
import React, { useState } from 'react'; // useState hook import kiya

function LandingPage() {
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
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-700 font-medium hover:text-blue-700 transition duration-300 ease-in-out">Products</a>
          <a href="#" className="text-gray-700 font-medium hover:text-blue-700 transition duration-300 ease-in-out">Solutions</a>
          <a href="#" className="text-gray-700 font-medium hover:text-blue-700 transition duration-300 ease-in-out">Resources</a>
          <a href="#" className="text-gray-700 font-medium hover:text-blue-700 transition duration-300 ease-in-out">Pricing</a>
        </nav>
        <div className="hidden md:flex space-x-4">
          <button className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out">Talk to sales</button>
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition duration-300 ease-in-out">Sign up for free</button>
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
            <li><a href="#" className="block text-gray-700 font-medium hover:text-blue-700 transition duration-300 ease-in-out" onClick={toggleMobileMenu}>Products</a></li>
            <li><a href="#" className="block text-gray-700 font-medium hover:text-blue-700 transition duration-300 ease-in-out" onClick={toggleMobileMenu}>Solutions</a></li>
            <li><a href="#" className="block text-gray-700 font-medium hover:text-blue-700 transition duration-300 ease-in-out" onClick={toggleMobileMenu}>Resources</a></li>
            <li><a href="#" className="block text-gray-700 font-medium hover:text-blue-700 transition duration-300 ease-in-out" onClick={toggleMobileMenu}>Pricing</a></li>
            <li><button className="w-full px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out" onClick={toggleMobileMenu}>Talk to sales</button></li>
            <li><button className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition duration-300 ease-in-out" onClick={toggleMobileMenu}>Sign up for free</button></li>
          </ul>
        </nav>
      )}

      {/* Hero Section - Improved */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-9 px-6 md:px-12 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
              Uniting the world, <br className="hidden md:inline"/> one video call at a time
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-lg">
              Experience the future of communication with Meetzy – where crystal-clear video,
              seamless collaboration, and top-notch security make every conversation extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <button className="px-7 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-xl transition duration-300 ease-in-out transform hover:scale-105">Start your free trial</button>
              <button className="px-7 py-3 text-blue-700 flex items-center justify-center hover:bg-blue-100 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197 2.132A1 1 0 0110 13.132V10.868a1 1 0 011.555-.832l3.197 2.132a1 1 0 010 1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Discover in 5 min
              </button>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3 text-gray-600">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white" src="https://placehold.co/36x36/FFD700/000000?text=A" alt="Avatar" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white" src="https://placehold.co/36x36/C0C0C0/000000?text=B" alt="Avatar" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white" src="https://placehold.co/36x36/CD7F32/000000?text=C" alt="Avatar" />
              </div>
              <div>
                <span className="font-bold text-lg">5.0</span>
                <span className="text-yellow-500 ml-1 text-xl">★★★★★</span>
                <p className="text-base">from 3,000+ reviews</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="grid grid-cols-3 gap-4 p-5 bg-white rounded-3xl shadow-2xl border border-gray-100">
              {/* User 1 with icons */}
              <div className="flex flex-col items-center">
                <img className="w-28 h-28 object-cover rounded-xl mb-2" src="https://placehold.co/112x112/E0BBE4/000000?text=User1" alt="User" />
                <div className="flex space-x-2 text-gray-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3.53-2.64 6.44-6.14 6.93V22h-1.72v-4.07c-3.5-.49-6.14-3.4-6.14-6.93h-2c0 4.17 3.13 7.62 7.21 8.12v4.38h4.58v-4.38c4.08-.5 7.21-3.95 7.21-8.12h-2z"/></svg> {/* Mike */}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg> {/* Video */}
                </div>
              </div>
              {/* User 2 with icons */}
              <div className="flex flex-col items-center">
                <img className="w-28 h-28 object-cover rounded-xl mb-2" src="https://placehold.co/112x112/957DAD/000000?text=User2" alt="User" />
                <div className="flex space-x-2 text-gray-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 10H9v-2h6v2zm0-3H9v-2h6v2z"/></svg> {/* Screen */}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5s.67 1.5 1.5 1.5zm3.5 6.5c-2.33 0-4.32-1.45-5.12-3.5h10.24c-.81 2.05-2.79 3.5-5.12 3.5z"/></svg> {/* Emoji */}
                </div>
              </div>
              {/* User 3 with icons */}
              <div className="flex flex-col items-center">
                <img className="w-28 h-28 object-cover rounded-xl mb-2" src="https://placehold.co/112x112/D291BC/000000?text=User3" alt="User" />
                <div className="flex space-x-2 text-gray-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.09-.75-1.7-.92L13.75 3c-.09-.27-.33-.47-.6-.47h-3.5c-.27 0-.51.2-.6.47l-.25 2.5c-.61.17-1.18.52-1.7.92l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.12.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.09.75 1.7.92l.25 2.5c.09.27.33.47.6.47h3.5c.27 0 .51-.2.6-.47l.25-2.5c.61-.17 1.18-.52 1.7-.92l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg> {/* Settings */}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg> {/* Chat */}
                </div>
              </div>
              {/* Other users without icons for simplicity, but you can add them */}
              <img className="w-28 h-28 object-cover rounded-xl" src="https://placehold.co/112x112/FFC72C/000000?text=User4" alt="User" />
              <img className="w-28 h-28 object-cover rounded-xl" src="https://placehold.co/112x112/FF6F61/000000?text=User5" alt="User" />
              <img className="w-28 h-28 object-cover rounded-xl" src="https://placehold.co/112x112/6B5B95/000000?text=User6" alt="User" />
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="bg-gray-50 py-8 px-6 md:px-12 text-center">
        <p className="text-gray-600 mb-6">Trusted by 3,000+ companies</p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <img src="https://placehold.co/120x40/FFFFFF/000000?text=Shopify" alt="Shopify Logo" className="h-8" />
          <img src="https://placehold.co/120x40/FFFFFF/000000?text=Coinbase" alt="Coinbase Logo" className="h-8" />
          <img src="https://placehold.co/120x40/FFFFFF/000000?text=Dropbox" alt="Dropbox Logo" className="h-8" />
          <img src="https://placehold.co/120x40/FFFFFF/000000?text=Intercom" alt="Intercom Logo" className="h-8" />
          <img src="https://placehold.co/120x40/FFFFFF/000000?text=Marvel" alt="Marvel Logo" className="h-8" />
        </div>
      </section>

      {/* Why Choose Meetzy Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-blue-600 text-lg font-semibold mb-2 text-center md:text-left">Why choose Meetzy?</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
            The Meetzy difference – <br className="hidden md:inline"/> unparalleled quality and security
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Crystal-clear HD video</h4>
              <p className="text-gray-600">
                No more pixelation or blurriness – just stunning, high-definition video that brings
                every detail to life.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Noise-canceling audio</h4>
              <p className="text-gray-600">
                Say goodbye to distractions with our advanced noise-canceling technology,
                ensuring every word is heard loud and clear.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v3h8z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Bank-grade security</h4>
              <p className="text-gray-600">
                Your conversations are safe with us. We use end-to-end encryption and
                advanced security protocols to protect your data.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Calendar integration</h4>
              <p className="text-gray-600">
                Seamlessly schedule and manage your meetings with our integrated calendar
                functionality.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="bg-blue-100 p-4 rounded-lg inline-block mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.324 1.118l1.519 4.674c.3.921-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.519-4.674a1 1 0 00-.324-1.118L2.283 9.091c-.783-.57-.381-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"></path>
                </svg>
              </div>
              <h4 className="text-2xl font-semibold mb-2">Meetzy has upgraded our collaboration capabilities</h4>
              <p className="text-gray-600 mb-4">
                "Meetzy has upgraded our collaboration capabilities with crystal-clear video, screen sharing, and top-notch security, making it essential for our team."
              </p>
              <div className="flex items-center space-x-4">
                <img className="w-12 h-12 rounded-full object-cover" src="https://placehold.co/48x48/50C878/000000?text=S" alt="Sarah Thompson" />
                <div>
                  <p className="font-semibold">Sarah Thompson</p>
                  <p className="text-sm text-gray-500">Project Manager, Shopify</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img className="w-full max-w-md rounded-lg shadow-lg" src="https://placehold.co/600x400/ADD8E6/000000?text=Team+Meeting" alt="Team Meeting" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-blue-600 text-lg font-semibold mb-2 text-center md:text-left">FAQs</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
            Solving your everyday communication challenges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-2">How does Meetzy ensure call quality?</h4>
                <p className="text-gray-600">
                  Meetzy uses adaptive bitrate streaming and advanced codecs to optimize video and audio quality based on your network conditions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Can I use Meetzy on my mobile device?</h4>
                <p className="text-gray-600">
                  Yes, Meetzy is fully responsive and available on iOS and Android devices through our dedicated mobile apps.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Is Meetzy secure?</h4>
                <p className="text-gray-600">
                  Absolutely. We employ end-to-end encryption, multi-factor authentication, and regular security audits to protect your data.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-2">What integrations does Meetzy offer?</h4>
                <p className="text-gray-600">
                  Meetzy integrates with popular tools like Google Calendar, Outlook, Slack, and more to streamline your workflow.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-2">How do I get started with Meetzy?</h4>
                <p className="text-gray-600">
                  Simply sign up for a free trial on our website, download the app, and start your first video call in minutes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Do you offer customer support?</h4>
                <p className="text-gray-600">
                  Yes, our dedicated support team is available 24/7 via chat, email, and phone to assist you with any queries.
                </p>
              </div>
            </div>
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
              <button className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Talk to sales</button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Sign up for free</button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img className="w-full max-w-md rounded-lg shadow-lg" src="https://placehold.co/600x400/C3B1E1/000000?text=Video+Call" alt="Video Call" />
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
          <p>&copy; 2023 Meetzy. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012 10.7c-.045 0-.088 0-.132.002.0 4.48 3.18 8.203 7.465 9.044A4.07 4.07 0 014 19.95a8.216 8.216 0 004.227 1.22c5.623 0 9.78-4.638 9.78-9.78 0-.157-.003-.312-.01-.466A7.495 7.495 0 0022 5.92z"></path>
              </svg>
            </a>
            <a href="#" className="hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22H12c5.523 0 10-4.477 10-10z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" className="hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.75 13.75a.75.75 0 01-1.5 0v-4.5a.75.75 0 011.5 0v4.5zM12 9.25a.75.75 0 01-1.5 0v-2.5a.75.75 0 011.5 0v2.5z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
