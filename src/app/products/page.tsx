import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import CategoryFilter from './CategoryFilter';
import CartButton from '@/components/CartButton';

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
  const resolvedParams = await Promise.resolve(searchParams);
  const category = resolvedParams.category;

  const products = await getProducts(category);
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[#F5EBE1] py-8">
      <div className="min-h-screen w-10/12 mx-auto px-6">
        <div className='flex justify-between text-[#301E0B]'>
          <h1 className="text-4xl font-light text-amber-900 mb-6 tracking-wide">
            Collections
          </h1>
          <CartButton/>
        </div>
        
        {/* Rest of your code remains the same */}
        <div className="bg-white px-8 py-6">
          <div className='flex justify-items-start text-xs'>
            <Link href="/" className="cursor-pointer text-[#301E0B]">Home</Link>
            <span className="mx-2 text-[#301E0B]">/</span>
            <Link href="/products" className="cursor-pointer text-[#301E0B]">Products</Link>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl font-light text-amber-900 mb-6 tracking-wide">
              Products
            </h1>
            <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Every handcrafted earring is designed to add elegance and charm to your look.
              Explore our wide selection of unique earrings — from delicate studs to bold statement pieces — all made with intricate detail and care.
            </p>
          </div>
          
          <CategoryFilter categories={categories} activeCategory={category} />

          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-4">
                {category ? `No products found in this category` : 'No products found'}
              </p>
              {category && (
                <Link
                  href="/products"
                  className="text-amber-900 underline hover:text-amber-700 font-semibold"
                >
                  View all products
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="mb-4 text-gray-600">
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
              </div>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}