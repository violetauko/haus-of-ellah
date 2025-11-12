'use client';

import Link from 'next/link';
import { Sparkles, Package, Shield, Truck } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import { Product, Category } from '@prisma/client';
import AboutBrand from '@/components/AboutBrand';
import FeatureCard from '@/components/FeatureCard';
import FeaturesSection from '@/components/FeaturesSection';
import HeroSection from '@/components/HeroSection';
import JewelryCollection from '@/components/JewelryCollection';
import Navbar from '@/components/Navbar';
import RefinementSection from '@/components/RefinementSection';

//  Define the product type with its relations
type ProductWithCategory = Product & {
  category: Category;
};

async function getFeaturedProducts() {
  return await prisma.product.findMany({
    take: 6,
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });
}

export default async function Home() {
  const products = await getFeaturedProducts();
  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/images/background_hero.webp')`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center right',
        backgroundSize: 'cover',
      }}
    >
      <div className='flex items-center justify-center w-full h-full px-4 py-20'>

        <div className="w-7/8 h-full bg-white/2 backdrop-blur-sm rounded-2xl px-4 pt-20 pb-10 border border-white/30 transition shadow-xl">

          <Navbar />

          {/* Main Content Container */}
          <div className="h-full flex items-center pt-20 px-10">
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left Section - Hero Content */}
              <div className="flex items-center pt-20 lg:pt-0">
                <HeroSection />
              </div>

              {/* Right Section - Glassmorphism Container with Client Testimonial and Feature Card */}
              <div className="h-full flex items-end justify-end lg:pt-0 ">
                <div className="relative w-full max-w-md">
                  <div className="">
                    {/* Client Testimonial Section */}
                    {/* <div className="mb-8 pb-8 border-b border-white/20">
                  <ClientTestimonial />
                </div> */}

                    {/* Feature Card Section */}
                    <div className="bottom-0">
                      <FeatureCard />
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeaturesSection />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">
            Featured Collections
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product: ProductWithCategory) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="bg-amber-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-800 transition inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
      <RefinementSection />
      <JewelryCollection />
      <AboutBrand />
    </div>
  );
}
