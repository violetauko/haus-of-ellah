
import Link from 'next/link';
import React from 'react';

export default function HeroSection() {
  return (
    <div className="h-full flex flex-col justify-end">
      {/* Main Heading */}
      <h1 className="text-8xl font-bold text-off-white mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, letterSpacing: '-0.02em' }}>
        Our Luxury Collections
      </h1>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4 mb-8">
        <Link  href="/products">
        <button className="bg-white text-amber-900 px-8 py-3 rounded-lg font-bold hover:bg-amber-100 transition">
          Shop Now
        </button>
        </Link>
         <Link  href="/products">
        <button className="bg-white/20 hover:bg-white/30 text-white w-10 h-12 rounded-full flex items-center justify-center transition border border-white/30 backdrop-blur-sm">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        </Link>
      </div>

      {/* Description Text */}
      <p className="text-white text-sm leading-relaxed w-1/2 font-light">
        A Haus of Ellah Jewelry Store Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
}
