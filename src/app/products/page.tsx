import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

async function getProducts(category?: string) {
  const where = category ? { category: { slug: category } } : {};
  
  return await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });
}

async function getCategories() {
  return await prisma.category.findMany({
    include: { _count: { select: { products: true } } }
  });
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  const products = await getProducts(category);
  const categories = await getCategories();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">Our Products</h1>
        
        {/* Category Filter */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <Link
            href="/products"
            className={`px-6 py-2 rounded-full transition ${
              !category
                ? 'bg-amber-900 text-white'
                : 'bg-white text-amber-900 hover:bg-amber-100'
            }`}
          >
            All Products
          </Link>
          
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className={`px-6 py-2 rounded-full transition ${
                category === cat.slug
                  ? 'bg-amber-900 text-white'
                  : 'bg-white text-amber-900 hover:bg-amber-100'
              }`}
            >
              {cat.name} ({cat._count.products})
            </Link>
          ))}
        </div>
        
        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}