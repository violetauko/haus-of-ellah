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
//dcomment
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
  const resolvedParams = await Promise.resolve(params);
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F5EFE7] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white px-8 py-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-gray-700">HOME</a>
          <span>/</span>
          <a href="/products" className="hover:text-gray-700">PRODUCTS</a>
          <span>/</span>
          <a href={`/category/${product.category.id}`} className="hover:text-gray-700">
            {product.category.name.toUpperCase()}
          </a>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image Gallery */}
          <div className="space-y-6 ">
            {/* Main Image */}
            <div className="relative h-[600px] bg-[#F5EFE7] rounded-sm overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-8"
                priority
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  className="relative w-20 h-20 bg-white rounded border-2 border-transparent hover:border-amber-300 transition-colors overflow-hidden"
                >
                  <Image
                    src={product.imageUrl}
                    alt={`View ${i}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif text-gray-800 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <button className="flex items-center gap-1 hover:text-gray-800">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-gray-900 mb-6">
                KSh {product.price.toLocaleString()}
              </div>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">5.0 (421)</span>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3 mb-6">
                <AddToCartButton product={product} />
                
               
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-sm mb-6">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-700 font-medium">
                  {product.inStock ? 'ITEM IN STOCK' : 'OUT OF STOCK'}
                </span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Additional Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Product Details</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Handcrafted with premium materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Hypoallergenic and safe for sensitive skin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Compatible with all charm bracelets</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}