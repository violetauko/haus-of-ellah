import React from 'react';
import { Heart } from 'lucide-react';

export default function JewelryCollection() {
  const products = [
    {
      id: 1,
      name: 'Round Earring.',
      image: 'https://i.pinimg.com/1200x/16/60/39/1660393c2527a4e6cb9ad3a3be81ed64.jpg'
    },
    {
      id: 2,
      name: 'Flower Earrings',
      image: 'https://i.pinimg.com/736x/c8/96/0b/c8960bf0d75b5399e524e80f425683f9.jpg'
    },
    {
      id: 3,
      name: 'Stud Earrings',
      image: 'https://i.pinimg.com/736x/8f/cd/96/8fcd9613cf3e231b04379b42f23c071f.jpg'
    }
  ];
  return (
    <div className="bg-[#301E0B] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="bg-stone-100 rounded-3xl p-12">
            <h2 className="text-5xl font-serif mb-6 text-gray-900">
              Our Collection
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
              Discover our exquisite collection of handcrafted earrings, where timeless elegance meets contemporary design. Each piece is carefully selected to complement your unique style, from delicate studs perfect for everyday wear to statement pieces that capture attention. Crafted with premium materials and meticulous attention to detail, our earrings are designed to become cherished additions to your jewelry collection.
            </p>
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
                </div>
                <h3 className="text-lg font-serif text-stone-50 mb-3">
                  {product.name}
                </h3>
                <a href="/products">
                  <button className="w-full px-4 py-2 border-2 text-stone-200 rounded-full font-medium hover:bg-stone-50 hover:text-amber-900 transition-colors duration-300">
                    View 
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}