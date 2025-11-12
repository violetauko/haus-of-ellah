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
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
        <div className="relative h-64 bg-amber-50">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <span className="text-xs text-amber-600 font-semibold">
            {product.category?.name}
          </span>
          <h3 className="font-bold text-amber-900 mt-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-bold text-amber-800">
              KSh {product.price.toLocaleString()}
            </span>
            
            {product.inStock && (
              <button
                onClick={handleAddToCart}
                className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition flex items-center space-x-2"
              >
                <ShoppingCart size={18} />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}