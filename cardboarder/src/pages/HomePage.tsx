import React from 'react';
import { Link } from 'react-router-dom'; // For call to action buttons

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cb-purple via-cb-orange to-cb-yellow text-cb-black p-6 pt-24 md:pt-32">
      {/* Welcoming Section */}
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-cb-white text-shadow-md">
          Welcome to Cardboarder!
        </h1>
        <p className="text-xl md:text-2xl text-cb-white opacity-95 max-w-3xl mx-auto leading-relaxed text-shadow-sm">
          Your central hub for the latest Trading Card Game news, updates, and insights. Dive into the world of TCGs with us!
        </p>
      </header>

      {/* Visual Appeal - (Gradient background applied to main div) */}
      {/* Consider adding a subtle background pattern or illustration here if desired */}

      {/* Call to Action */}
      <section className="flex flex-col sm:flex-row gap-6 md:gap-8">
        <Link 
          to="/news"
          className="bg-cb-blue hover:bg-cb-blue/80 focus:bg-cb-blue/90 text-cb-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cb-blue focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-lg md:text-xl"
        >
          Explore News
        </Link>
        {/* Future Sign Up button - for now, can be a placeholder or link to account page */}
        <Link 
          to="/account" // Or a dedicated /signup page in the future
          className="bg-cb-red hover:bg-cb-red/80 focus:bg-cb-red/90 text-cb-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cb-red focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-lg md:text-xl"
        >
          Sign Up / Account
        </Link>
      </section>

      {/* Optional: A small section hinting at other features */}
      <footer className="mt-16 md:mt-24 text-center text-cb-white opacity-90 text-shadow-sm">
        <p>Discover trending articles, track game histories, and manage your TCG profile all in one place.</p>
      </footer>
    </div>
  );
};

export default HomePage; 