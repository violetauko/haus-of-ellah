'use client';
import { useCart } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-100 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some beautiful earrings to your cart</p>
          <Link
            href="/products"
            className="bg-[#301E0B] text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-800 transition inline-block"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-stone-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-2xl p-4 flex gap-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-bold text-amber-900">{item.name}</h3>
                  <p className="text-amber-700 font-semibold">
                    KSh {item.price.toLocaleString()}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-[#301E0B] p-1 rounded hover:bg-amber-900"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-gray-700 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-[#301E0B] text-white p-1 rounded hover:bg-amber-900"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col justify-between items-end">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                  <p className="font-bold text-amber-900">
                    KSh {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-amber-900 mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">KSh {getTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
              </div>
              
              <div className="border-t border-amber-200 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-amber-900">Total</span>
                  <span className="text-lg font-bold text-amber-900">
                    KSh {getTotal().toLocaleString()}
                  </span>
                </div>
              </div>
              
              <Link
                href="/checkout"
                className="block w-full bg-[#301E0B] text-white py-3 rounded-lg font-bold hover:bg-amber-900 transition text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}