'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/store';
import { Product } from '@/lib/types';


export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart(state => state.addItem);
  
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <section className="">
      <Link href={`/products/${product.id}`}>
        
        {/* Products Grid */}
        <div className="">
              {/* Rounded Image Container */}
              <div className="relative h-56 bg-stone-200 rounded-3xl overflow-hidden mb-4">
                <Image
                  src={product.imageUrl || '/placeholder-earring.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Name - Centered, Uppercase */}
              <h3 className="text-center text-xs uppercase tracking-widest text-slate-800 font-medium mb-3">
                {product.name}
              </h3>

              {/* Price - Centered */}
              <p className="text-center text-sm font-medium text-slate-800 mb-4">
                Ksh.{product.price}
              </p>
        </div>
      </Link>
       {/* Add to Cart Button */}
    //   {product.inStock && (
        <button
          onClick={handleAddToCart}
          className="mt-1 w-full bg-[#301E0B] text-white py-3 text-[10px] font-medium hover:bg-amber-800 transition flex items-center justify-center gap-1.5"
        >
          <ShoppingCart size={12} />
          <span>ADD TO CART</span>
        </button>
      )}
    </section>
  );
}