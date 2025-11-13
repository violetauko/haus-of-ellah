// app/products/[id]/AddToCartButton.tsx

'use client';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Product } from '@/lib/types';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCart(state => state.addItem);
  const router = useRouter();
  const [justAdded, setJustAdded] = useState(false);
  
  const handleAddToCart = () => {
    addItem(product);
    setJustAdded(true);
    
    // Reset the "just added" state after 2 seconds
    setTimeout(() => setJustAdded(false), 2000);
  };
  
  const handleBuyNow = () => {
    addItem(product);
    router.push('/checkout');
  };
  
  if (!product.inStock) {
    return (
      <button
        disabled
        className="w-full bg-gray-400 text-white py-4 rounded-lg font-bold cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <span>Out of Stock</span>
      </button>
    );
  }
  
  return (
    <div className=" flex justify-between gap-4">
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`w-full py-4 rounded-lg font-bold transition flex items-center justify-center  ${
          justAdded
            ? 'bg-green-600 text-white'
            : 'bg-[#301E0B] text-white hover:bg-amber-800'
        }`}
      >
        <ShoppingCart size={24} />
        <span>{justAdded ? '✓ Added to Cart!' : 'Add to Cart'}</span>
      </button>
      
      {/* Buy Now Button */}
      <button
        onClick={handleBuyNow}
        className="w-full border-2 text-black hover:bg-stone-100  py-4 rounded-lg font-bold  transition flex items-center justify-center space-x-2"
      >
        <ShoppingBag size={24} />
        <span>Buy Now</span>
      </button>
      
      {justAdded && (
        <p className="text-center text-sm text-green-600 animate-pulse">
          Item added to your cart!
        </p>
      )}
    </div>
  );
}