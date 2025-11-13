"use client";

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/lib/store';
import React from 'react';

export default function Navbar() {
   const items = useCart(state => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

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
         <Link 
              href="/cart" 
              className="relative p-2 hover:bg-amber-700 rounded-lg transition"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="h-6 w-6" strokeWidth={2} />
              {itemCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-amber-900"
                  style={{ minWidth: '20px' }}
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
      </div>
    </nav>
  );
}
