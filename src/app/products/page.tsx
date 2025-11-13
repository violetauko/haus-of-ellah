import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import CategoryFilter from './CategoryFilter';

async function getProducts(category?: string) {
  console.log('Fetching products for category:', category || 'all');
  
  const where = category ? { category: { slug: category } } : {};
  
  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });
  
  console.log('Found products:', products.length);
  
  return products;
}

async function getCategories() {
  return await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' }
  });
}

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }> | { category?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Await searchParams for Next.js 15 compatibility
  const resolvedParams = await Promise.resolve(searchParams);
  const category = resolvedParams.category;
  
  const products = await getProducts(category);
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[#F5EDE4] py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* White Content Container */}
        <div className="bg-white px-8 py-6">
        

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light text-amber-900 mb-6 tracking-wide">
            Collections
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Every handcrafted piece is designed to add elegance to your hand-woven beads. 
            Explore our wide selection of charms and accessories to perfect your Pandora 
            style bracelet. Available in a variety of charms, including animal, travel, and 
            family charms, our collection includes some designs with colorful enamel and 
            sparkling stones to create an eye-catching look.
          </p>
        </div>
         <CategoryFilter categories={categories} activeCategory={category} />

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-4">
              {category ? `No products found in this category` : 'No products found'}
            </p>
            {category && (
              <a
                href="/products"
                className="text-amber-900 underline hover:text-amber-700 font-semibold"
              >
                View all products
              </a>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Showing {products.length} product{products.length !== 1 ? 's' : ''}
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* Sort/View Options */}
        

        {/* Load More Button */}
        {/* {products.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-amber-900 text-white hover:bg-amber-800 transition font-medium">
              LOAD MORE
            </button>
          </div>
        )} */}
      </div>
    </div>
    </div>
  );
}


