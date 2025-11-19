"use client"

import Link from 'next/link';
import { useCart } from '@/lib/store';
import { ShoppingCart } from 'lucide-react';

export default function CartButton() {
  const items = useCart(state => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link
      href="/cart"
      className="relative p-2 hover:bg-amber-700 rounded-lg transition"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingCart className="h-6 w-6" strokeWidth={2} />
      {itemCount > 0 && (
        <span
          className="absolute -top-1 -right-1 bg-red-600 text-[#301E0B] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-amber-900"
          style={{ minWidth: '20px' }}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}