
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Product, Category } from '@prisma/client';
import Image from 'next/image';

// Define the product type with its relations
type ProductWithCategory = Product & {
  category: Category;
};

async function getFeaturedProducts() {
  return await prisma.product.findMany({
    take: 8,
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="py-10 bg-stone-100">
      <h2 className="text-4xl text-center font-serif mb-6 text-gray-900">
              Spotlight Selections
            </h2>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product: ProductWithCategory) => (
            <div 
              key={product.id} 
              className=" p-4 flex flex-col h-full"
            >
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

              {/* Button  */}
              <Link
                href={`/products/${product.id}`}
                className="block w-full py-2.5 bg-[#301E0B] text-white text-xs font-medium uppercase tracking-wider text-center rounded hover:bg-amber-900 transition-colors"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}