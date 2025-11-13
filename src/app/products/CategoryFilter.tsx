// app/products/CategoryFilter.tsx

'use client';
import { Category } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
}

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    console.log('Active category:', activeCategory);
    console.log('Available categories:', categories);
  }, [activeCategory, categories]);
  
  const handleCategoryClick = (slug: string | null) => {
    console.log('Clicked category:', slug);
    
    if (slug === null) {
      // Show all products
      router.push('/products');
    } else {
      // Filter by category
      router.push(`/products?category=${slug}`);
    }
    
    // Force refresh
    router.refresh();
  };
  
  return (
    <div className="mb-8">
      <div className="flex gap-3 flex-wrap">
        {/* All Products Button */}
        <button
          onClick={() => handleCategoryClick(null)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            !activeCategory
              ? 'bg-[#301E0B] text-white shadow-lg'
              : 'bg-white text-amber-900 hover:bg-amber-100 border-2 border-amber-200'
          }`}
        >
          All Products
        </button>
        
        {/* Category Buttons */}
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.slug)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeCategory === category.slug
                ? 'bg-[#301E0B] text-white shadow-lg'
                : 'bg-white text-amber-900 hover:bg-stone-300 border-2 border-[#301E0B]'
            }`}
          >
            {category.name}
            {category._count && (
              <span className="ml-2 text-sm opacity-75">
                ({category._count.products})
              </span>
            )}
          </button>
        ))}
      </div>
      
      {/* Active Filter Display */}
      {activeCategory && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-gray-600">Showing:</span>
          <span className="border-2 text-amber-900 px-3 py-1 rounded-full text-sm font-semibold">
            {categories.find(c => c.slug === activeCategory)?.name}
          </span>
          <button
            onClick={() => handleCategoryClick(null)}
            className="text-amber-900 hover:text-amber-700 text-sm underline"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}