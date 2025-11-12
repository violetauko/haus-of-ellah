'use client';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-12">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-amber-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-700 mb-8">
          Thank you for your order! We've received your WhatsApp message and will respond shortly to confirm your order details.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link
            href="/products"
            className="bg-amber-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-800 transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="bg-white text-amber-900 px-8 py-3 rounded-lg font-bold hover:bg-amber-100 transition border-2 border-amber-900"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}