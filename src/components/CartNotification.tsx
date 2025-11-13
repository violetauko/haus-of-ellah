// components/CartNotification.tsx

'use client';
import { useCart } from '@/lib/store';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function CartNotification() {
  const items = useCart(state => state.items);
  const [lastItemCount, setLastItemCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  
  useEffect(() => {
    const currentCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    if (currentCount > lastItemCount && items.length > 0) {
      // New item added
      setShowNotification(true);
      
      // Hide after 2 seconds
      setTimeout(() => setShowNotification(false), 2000);
    }
    
    setLastItemCount(currentCount);
  }, [items]);
  
  if (!showNotification) return null;
  
  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in">
      <div className="bg-green-600 text-white rounded-lg shadow-xl px-4 py-3 flex items-center space-x-2">
        <CheckCircle size={20} />
        <span className="font-semibold">Added to cart!</span>
      </div>
    </div>
  );
}