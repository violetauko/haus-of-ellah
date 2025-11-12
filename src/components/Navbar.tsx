
import React from 'react';

export default function Navbar() {

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      {/* Logo */}
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center border border-white/50">
          <span className="text-xs font-bold text-white">✦</span>
        </div>
        <span className="text-white text-lg font-semibold tracking-wide">Haus of Ellah</span>
      </div>

      {/* Navigation Menu */}
      <div className="hidden md:flex items-center gap-1 bg-white/15 backdrop-blur-md px-8 py-3 rounded-full border border-white/25 shadow-lg">
        <a href="#" className="text-white text-sm font-medium px-4 py-2 hover:bg-white/10 rounded-full transition">
          Home
        </a>
        <a href="#" className="text-white text-sm font-medium px-4 py-2 hover:bg-white/10 rounded-full transition">
          About Us
        </a>
        <a href="/products" className="text-white text-sm font-medium px-4 py-2 hover:bg-white/10 rounded-full transition">
          Collections
        </a>

        {/* Contact Us Button */}
        <button className="bg-amber-900 text-primary-brown px-6 py-2 rounded-full font-semibold text-sm ml-2 hover:bg-off-white transition shadow-md">
          Contact Us
        </button>
      </div>
    </nav>
  );
}
