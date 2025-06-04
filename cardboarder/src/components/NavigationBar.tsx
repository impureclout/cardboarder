import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const USER_PROFILE_KEY = 'userProfile'; // Same key as in AccountPage for consistency

const NavigationBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  // Effect for handling navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
    toast.success("You've been logged out.");
  };

  const handleLogin = () => {
    setIsMenuOpen(false);
    navigate('/account');
  };

  const handleMockSignUp = () => {
    setIsMenuOpen(false);
    toast.success('Mock sign-up successful! Welcome!');
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify({ displayName: 'New User', email: 'newuser@example.com' }));
    login();
    navigate('/account');
  };

  const navLinkBaseStyle = "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out";
  const navLinkActiveStyle = "bg-cb-yellow text-cb-purple shadow-sm";
  const navLinkInactiveStyle = "text-cb-white hover:text-cb-yellow hover:bg-cb-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-cb-yellow focus:ring-opacity-75";

  const buttonBaseStyle = "py-2 px-4 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:-translate-y-px";
  const primaryButtonStyle = `${buttonBaseStyle} text-cb-white bg-cb-orange hover:bg-cb-orange/80 focus:ring-cb-orange`;
  const secondaryButtonStyle = `${buttonBaseStyle} text-cb-white bg-cb-blue hover:bg-cb-blue/80 focus:ring-cb-blue`;
  const supportButtonStyle = `${buttonBaseStyle} text-cb-white bg-cb-red hover:bg-cb-red/80 focus:ring-cb-red`;
  const logoutButtonStyle = `${buttonBaseStyle} text-cb-white bg-cb-purple hover:bg-cb-purple/80 focus:ring-cb-purple`;

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out 
                  ${isScrolled ? 'bg-cb-purple shadow-xl' : 'bg-cb-purple shadow-none'}
                  ${isMenuOpen && !isScrolled ? 'bg-cb-purple shadow-xl' : ''} // Ensure bg on mobile open even if not scrolled
                  p-4`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-heading font-bold text-cb-white hover:text-cb-yellow transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
          Cardboarder
        </Link>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-cb-white hover:text-cb-yellow focus:outline-none focus:ring-2 focus:ring-cb-yellow rounded-md p-1 transition-colors duration-300"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Page Links */}
        <ul className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <li><NavLink to="/" className={({ isActive }) => `${navLinkBaseStyle} ${isActive ? navLinkActiveStyle : navLinkInactiveStyle}`}>Home</NavLink></li>
          <li><NavLink to="/news" className={({ isActive }) => `${navLinkBaseStyle} ${isActive ? navLinkActiveStyle : navLinkInactiveStyle}`}>News</NavLink></li>
          <li><NavLink to="/history" className={({ isActive }) => `${navLinkBaseStyle} ${isActive ? navLinkActiveStyle : navLinkInactiveStyle}`}>History</NavLink></li>
          {isLoggedIn && <li><NavLink to="/account" className={({ isActive }) => `${navLinkBaseStyle} ${isActive ? navLinkActiveStyle : navLinkInactiveStyle}`}>Account</NavLink></li>}
        </ul>

        {/* Desktop User Actions */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className={logoutButtonStyle}>Log Out</button>
            </>
          ) : (
            <>
              <button onClick={handleLogin} className={primaryButtonStyle}>Log In</button>
              <button onClick={handleMockSignUp} className={secondaryButtonStyle}>Sign Up</button>
            </>
          )}
          <a href="https://ko-fi.com" target="_blank" rel="noopener noreferrer" className={supportButtonStyle}>Support</a>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) - with improved transition */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen mt-3 opacity-100' : 'max-h-0 mt-0 opacity-0'}
                  ${isScrolled || isMenuOpen ? 'bg-cb-purple' : 'bg-transparent'} rounded-b-lg shadow-xl`}
      >
        <ul className="flex flex-col px-4 pt-2 pb-4 space-y-2">
          <li><NavLink to="/" className={({ isActive }) => `${navLinkBaseStyle} block w-full text-left ${isActive ? navLinkActiveStyle : navLinkInactiveStyle}`} onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/news" className={({ isActive }) => `${navLinkBaseStyle} block w-full text-left ${isActive ? navLinkActiveStyle : navLinkInactiveStyle}`} onClick={() => setIsMenuOpen(false)}>News</NavLink></li>
          <li><NavLink to="/history" className={({ isActive }) => `${navLinkBaseStyle} block w-full text-left ${isActive ? navLinkActiveStyle : navLinkInactiveStyle}`} onClick={() => setIsMenuOpen(false)}>History</NavLink></li>
          <li><NavLink to="/account" className={({ isActive }) => `${navLinkBaseStyle} block w-full text-left ${isActive ? navLinkActiveStyle : navLinkInactiveStyle}`} onClick={() => setIsMenuOpen(false)}>Account</NavLink></li>
        </ul>
        <div className="px-4 pb-4 pt-3 border-t border-cb-blue/30 flex flex-col space-y-3">
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className={`${logoutButtonStyle} w-full`}>Log Out</button>
            </>
          ) : (
            <>
              <button onClick={handleLogin} className={`${primaryButtonStyle} w-full`}>Log In</button>
              <button onClick={handleMockSignUp} className={`${secondaryButtonStyle} w-full`}>Sign Up</button>
            </>
          )}
          <a href="https://ko-fi.com" target="_blank" rel="noopener noreferrer" className={`${supportButtonStyle} w-full text-center`} onClick={() => setIsMenuOpen(false)}>Support</a>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar; 