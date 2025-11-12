'use client';
import { useCart } from '@/lib/store';
import { useEffect, useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartNotification() {
  const items = useCart(state => state.items);
  const [lastItemCount, setLastItemCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [latestItem, setLatestItem] = useState<any>(null);
  
  useEffect(() => {
    const currentCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    if (currentCount > lastItemCount && items.length > 0) {
      // New item added
      setLatestItem(items[items.length - 1]);
      setShowNotification(true);
      
      // Hide after 3 seconds
      setTimeout(() => setShowNotification(false), 3000);
    }
    
    setLastItemCount(currentCount);
  }, [items]);
  
  if (!showNotification || !latestItem) return null;
  
  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in">
      <div className="bg-white rounded-lg shadow-2xl border-2 border-green-500 p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-16 h-16 relative rounded overflow-hidden">
            <Image
              src={latestItem.imageUrl}
              alt={latestItem.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-green-600 font-bold text-sm flex items-center gap-1">
                  <ShoppingCart size={16} />
                  Added to Cart!
                </p>
                <p className="text-gray-900 font-semibold text-sm mt-1">
                  {latestItem.name}
                </p>
                <p className="text-amber-700 text-sm">
                  KSh {latestItem.price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
            
            <Link
              href="/cart"
              className="mt-3 block w-full bg-amber-900 text-white text-center py-2 rounded text-sm font-bold hover:bg-amber-800 transition"
            >
              View Cart ({items.length})
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}