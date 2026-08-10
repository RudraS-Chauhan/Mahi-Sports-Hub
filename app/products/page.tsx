"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { products, categories, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { ProductCardSkeleton, ShopPageSkeleton } from "@/components/Skeletons";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const queryParam = searchParams.get("q");
  
  const [overrideCategory, setOverrideCategory] = useState<string | null | undefined>(undefined);
  const [overrideQuery, setOverrideQuery] = useState<string | null | undefined>(undefined);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedCategory = overrideCategory !== undefined ? overrideCategory : categoryParam;
  const searchQuery = overrideQuery !== undefined ? overrideQuery : queryParam;

  const handleCategoryChange = (cat: string | null) => {
    setOverrideCategory(cat);
  };

  const handleSearchChange = (q: string | null) => {
    setOverrideQuery(q);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    
    let matchesSearch = true;
    if (searchQuery) {
      const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/);
      const name = p.name.toLowerCase();
      const category = p.category.toLowerCase();
      const itemNum = p.itemNumber.toLowerCase();
      matchesSearch = searchTerms.every(term => name.includes(term) || category.includes(term) || itemNum.includes(term));
    }

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Real-time Search Input & Filter Pills Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Live Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery || ""}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search gear by name, category, or tag (e.g. No. 07)..."
              className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Result Counter & Active Indicator */}
          <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
            <SlidersHorizontal className="w-4 h-4 text-black" />
            <span>Showing <strong className="text-black">{filteredProducts.length}</strong> items</span>
          </div>
        </div>

        {/* Category Pills horizontal scroll on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-gray-100 mt-6 pb-2 scrollbar-hide">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
              selectedCategory === null
                ? "bg-black text-neon-green"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((category) => {
            const count = products.filter((p) => p.category === category).length;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-black text-neon-green"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid / Skeleton State */}
      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2 font-heading">No Products Found</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
              No items match your search query &quot;{searchQuery}&quot;. Try clearing filters or typing another equipment category.
            </p>
            <button
              onClick={() => {
                handleCategoryChange(null);
                handleSearchChange(null);
              }}
              className="px-6 py-2.5 bg-black text-white text-xs font-mono font-bold uppercase rounded-lg hover:bg-neon-green hover:text-black transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 animate-in fade-in duration-300">
      <div className="bg-black text-white py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-neon-green mb-2 block">
            Official Equipment Catalog
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
            MAHI SPORTS <span className="text-neon-green">COLLECTION</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Handcrafted Grade 1 English Willow, Kashmir Willow bats, sublimated custom team jerseys, and professional protective equipment.
          </p>
        </div>
      </div>
      <Suspense fallback={<ShopPageSkeleton />}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
