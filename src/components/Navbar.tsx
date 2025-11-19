"use client";

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/lib/store';
import Image from 'next/image';

export default function Navbar() {
   const items = useCart(state => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      {/* Logo */}
      
      <div className="">
       <Image src="/logo.jpeg" 
       alt="Haus of Ellah Logo" 
       width={90} 
       height={90} 
       className="object-contain"/>

      </div>

      {/* Navigation Menu */}
      <div className="hidden md:flex items-center gap-1 bg-white backdrop-blur-md px-8 py-3 text-black rounded-full border border-white/25 shadow-lg">
        <a href="/" className=" text-sm font-medium px-4 py-2 hover:bg-white/10 rounded-full transition">
          Home
        </a>
        <a href="#about" className=" text-sm font-medium px-4 py-2 hover:bg-white/10 rounded-full transition">
          About
        </a>
        <a href="/products" className="text-sm font-medium px-4 py-2 hover:bg-white/10 rounded-full transition">
          Collections
        </a>
         <Link 
              href="/cart" 
              className="text-white relative p-2 bg-amber-900 hover:bg-amber-700 rounded-lg transition"
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
