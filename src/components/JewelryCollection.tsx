import React from 'react';
import { Heart } from 'lucide-react';

export default function JewelryCollection() {
  const products = [
    {
      id: 1,
      name: 'Gold Earring',
      price: '$240.00',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Diamond Ring',
      price: '$240.00',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Gold Necklace',
      price: '$240.00',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-pink-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="bg-pink-50/50 rounded-3xl p-12">
            <h2 className="text-5xl font-serif mb-6 text-gray-900">
              Our Collection
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors duration-300 font-medium">
              See More
            </button>
          </div>

          {/* Right Content - Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="relative mb-4 overflow-hidden rounded-2xl bg-gray-100 aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-pink-50 transition-colors duration-300">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                <h3 className="text-lg font-serif text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 font-medium">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}