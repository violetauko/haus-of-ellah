// app/products/[id]/page.tsx

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true }
  });
  
  return product;
}

// This is important for Next.js 15
export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { id: true }
  });
  
  return products.map((product) => ({
    id: product.id,
  }));
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // Await params for Next.js 15 compatibility
  const resolvedParams = await Promise.resolve(params);
  const product = await getProduct(resolvedParams.id);
  
  if (!product) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative h-[500px] bg-white rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Details */}
          <div>
            <span className="text-sm text-amber-600 font-semibold">
              {product.category.name}
            </span>
            <h1 className="text-4xl font-bold text-amber-900 mt-2 mb-4">
              {product.name}
            </h1>
            
            <p className="text-3xl font-bold text-amber-800 mb-6">
              KSh {product.price.toLocaleString()}
            </p>
            
            {product.description && (
              <div className="prose max-w-none mb-8">
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}
            
            <div className="mb-8">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                product.inStock
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <AddToCartButton product={product} />
            
            <div className="mt-8 border-t border-amber-200 pt-8">
              <h3 className="font-bold text-amber-900 mb-4">Product Details</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Handcrafted with premium materials</li>
                <li>• Hypoallergenic and safe for sensitive skin</li>
                <li>• Perfect for any occasion</li>
                <li>• Gift packaging available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}