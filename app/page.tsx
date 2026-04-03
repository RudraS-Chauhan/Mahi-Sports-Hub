import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, MapPin, TrendingUp, ArrowRight } from "lucide-react";
import { products, categories } from "@/data/products";
import { reviews } from "@/data/reviews";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="https://picsum.photos/seed/sportshero/1920/1080"
            alt="Sports Equipment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <Star className="w-4 h-4 text-neon-green fill-neon-green" />
              <span className="text-sm font-medium tracking-wide">4.8★ Rated by 100+ Athletes</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-6 leading-tight">
              Premium Sports Gear in <span className="text-neon-green">Indira Nagar</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
              Your trusted local destination for authentic cricket bats, fitness equipment, and premium sports accessories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-neon-green hover:bg-white transition-colors"
              >
                Shop Now
              </Link>
              <a
                href="https://wa.me/918382908844"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-transparent border-2 border-white hover:bg-white hover:text-black transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-neon-green text-black py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-black/20">
            <div className="flex items-center justify-center gap-3 pt-4 md:pt-0">
              <ShieldCheck className="w-8 h-8" />
              <div className="text-left">
                <p className="font-bold text-lg leading-tight">100% Authentic</p>
                <p className="text-sm font-medium opacity-80">Genuine Products</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 pt-4 md:pt-0">
              <TrendingUp className="w-8 h-8" />
              <div className="text-left">
                <p className="font-bold text-lg leading-tight">Affordable Pricing</p>
                <p className="text-sm font-medium opacity-80">Best in Lucknow</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 pt-4 md:pt-0">
              <MapPin className="w-8 h-8" />
              <div className="text-left">
                <p className="font-bold text-lg leading-tight">Trusted Local Store</p>
                <p className="text-sm font-medium opacity-80">Indira Nagar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">Shop by Category</h2>
              <p className="text-gray-600">Find exactly what you need for your game.</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 font-bold hover:text-neon-green transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="group relative h-40 rounded-xl overflow-hidden bg-black flex items-center justify-center"
              >
                <Image
                  src={`https://picsum.photos/seed/cat${index}/400/400`}
                  alt={category}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-300"
                />
                <span className="relative z-10 text-white font-bold text-center px-2 group-hover:scale-110 transition-transform duration-300">
                  {category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Trending Now</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most popular sports gear, loved by athletes across Lucknow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-black hover:bg-gray-800 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-neon-green fill-neon-green" />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">What Our Customers Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what athletes in Lucknow think about Mahi Sports Hub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-gray-900 p-8 rounded-xl border border-gray-800">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-neon-green fill-neon-green" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">&quot;{review.text}&quot;</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold">{review.name}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
