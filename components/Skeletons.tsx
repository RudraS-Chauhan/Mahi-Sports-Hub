import React from "react";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-square bg-gray-200 w-full p-3">
        <div className="w-16 h-5 bg-gray-300 rounded mb-1" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow gap-3">
        {/* Category Pill */}
        <div className="w-20 h-3 bg-gray-200 rounded" />
        
        {/* Title Lines */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-200 rounded" />
          <div className="w-3/4 h-4 bg-gray-200 rounded" />
        </div>

        {/* Price Skeleton */}
        <div className="w-28 h-6 bg-gray-300 rounded my-2" />

        {/* Action Buttons Skeleton */}
        <div className="space-y-2 mt-auto">
          <div className="w-full h-10 bg-gray-200 rounded-lg" />
          <div className="w-full h-10 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function HotSellersSkeleton() {
  return (
    <section className="py-12 bg-black text-white border-b border-gray-800 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="w-32 h-3 bg-gray-800 rounded mb-2" />
        <div className="w-64 h-7 bg-gray-800 rounded" />
      </div>

      <div className="flex overflow-x-auto gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-none w-60 sm:w-64 bg-gray-900 rounded-xl p-3 border border-gray-800">
            <div className="h-64 w-full bg-gray-800 rounded-lg mb-3" />
            <div className="w-3/4 h-4 bg-gray-800 rounded mb-2" />
            <div className="w-20 h-4 bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function CategoryGridSkeleton() {
  return (
    <div className="py-16 bg-white animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="w-40 h-3 bg-gray-200 rounded mb-2" />
          <div className="w-64 h-8 bg-gray-200 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full h-[280px] md:h-[400px] rounded-2xl bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ShopPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      {/* Search & Filters Skeleton */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-10 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="w-full md:w-96 h-12 bg-gray-200 rounded-xl" />
          <div className="w-32 h-5 bg-gray-200 rounded" />
        </div>
        <div className="flex gap-3 overflow-x-auto pt-4 border-t border-gray-100">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-28 h-8 bg-gray-200 rounded-full shrink-0" />
          ))}
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <div className="space-y-12">
      {/* Hero Skeleton */}
      <div className="bg-black py-20 px-4 text-center animate-pulse border-b border-gray-800">
        <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center">
          <div className="w-64 h-6 bg-gray-900 rounded-full" />
          <div className="w-3/4 h-12 bg-gray-900 rounded-lg" />
          <div className="w-1/2 h-6 bg-gray-900 rounded" />
          <div className="flex gap-4 pt-4">
            <div className="w-36 h-12 bg-gray-800 rounded-lg" />
            <div className="w-36 h-12 bg-gray-800 rounded-lg" />
          </div>
        </div>
      </div>

      <HotSellersSkeleton />
      <CategoryGridSkeleton />

      {/* Products Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-48 h-8 bg-gray-200 rounded mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
