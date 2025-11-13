'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function ProductCard({ product }) {
  const addItem = useCart(state => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div className="group cursor-pointer">
      <Link href={`/products/${product.id}`}>
        <div className="bg-[#F5EBE1] hover:shadow-lg transition-shadow pb-3">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-6"
            />
            
            {/* Out of Stock Overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <span className="text-white font-semibold text-xs">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Product Info - Inside the same card */}
          <div className="text-center px-3 pt-2">
            <h3 className="text-gray-700 text-[11px] mb-1 line-clamp-2 leading-tight">
              {product.name}
            </h3>
            <p className="text-gray-900 font-semibold text-xs">
              KSh {product.price.toLocaleString()}
            </p>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      {product.inStock && (
        <button
          onClick={handleAddToCart}
          className="mt-2 w-full bg-[#301E0B] text-white py-1.5 text-[10px] font-medium hover:bg-amber-800 transition flex items-center justify-center gap-1.5"
        >
          <ShoppingCart size={12} />
          <span>ADD TO CART</span>
        </button>
      )}
    </div>
  );
}