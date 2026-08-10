"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ShieldCheck, MapPin, TrendingUp, ArrowRight, MessageCircle } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import HotSellers from "@/components/HotSellers";
import CategoryGrid from "@/components/CategoryGrid";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { ProductCardSkeleton, HotSellersSkeleton, CategoryGridSkeleton } from "@/components/Skeletons";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black animate-in fade-in duration-300">
      {/* Hero Section: Full-width black tile */}
      <section className="relative bg-black text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900 border border-gray-800 mb-6">
            <Star className="w-4 h-4 text-neon-green fill-neon-green" />
            <span className="text-xs font-mono font-bold tracking-wide text-gray-200">
              4.8★ Rated (106+ Verified Reviews) • Lucknow, UP
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight mb-6 leading-tight uppercase">
            MAHI SPORTS <span className="text-neon-green">HUB</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl font-sans">
            Lucknow&apos;s premier cricket store & custom sportswear specialist. English Willow bats, protective gear, and team jersey sublimation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-4 font-bold text-black bg-neon-green hover:bg-white transition-colors rounded-lg text-sm font-mono uppercase tracking-wider"
            >
              Explore Equipment
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 font-bold text-white bg-gray-900 border border-gray-700 hover:bg-white hover:text-black transition-colors rounded-lg text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-neon-green" />
              Inquire Now
            </Link>
          </div>
        </div>
      </section>

      {/* Hot Sellers Marquee or Skeleton */}
      {isLoading ? <HotSellersSkeleton /> : <HotSellers />}

      {/* Trust Bar */}
      <section className="bg-black text-white py-6 border-y border-gray-800 font-mono text-xs uppercase tracking-wider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3 py-2">
              <ShieldCheck className="w-6 h-6 text-neon-green" />
              <div className="text-left">
                <p className="font-bold text-white">100% Authentic</p>
                <p className="text-[10px] text-gray-400">Grade 1 Willow & Gear</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 py-2 border-t md:border-t-0 md:border-l border-gray-800">
              <TrendingUp className="w-6 h-6 text-neon-green" />
              <div className="text-left">
                <p className="font-bold text-white">Best Wholesale Rates</p>
                <p className="text-[10px] text-gray-400">Lucknow Wholesale Price</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 py-2 border-t md:border-t-0 md:border-l border-gray-800">
              <MapPin className="w-6 h-6 text-neon-green" />
              <div className="text-left">
                <p className="font-bold text-white">Indira Nagar Store</p>
                <p className="text-[10px] text-gray-400">Open Daily till 10:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid (White Background) */}
      {isLoading ? <CategoryGridSkeleton /> : <CategoryGrid />}

      {/* Popular Products (White Background) */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 mb-2 block">
                Featured Gear
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-black">
                BEST SELLERS
              </h2>
            </div>
            <Link
              href="/products"
              className="mt-4 md:mt-0 text-xs font-mono font-bold text-black hover:text-neon-green flex items-center gap-2 uppercase tracking-wider underline underline-offset-4"
            >
              View Full Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              [...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)
            ) : (
              bestSellers.map((product) => <ProductCard key={product.id} product={product} />)
            )}
          </div>
        </div>
      </section>

      {/* Testimonial Auto-Sliding Carousel Section */}
      <TestimonialCarousel />
    </div>
  );
}
