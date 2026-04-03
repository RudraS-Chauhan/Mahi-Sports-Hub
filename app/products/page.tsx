"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-24">
            <h2 className="font-bold text-xl mb-6 font-heading">Categories</h2>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === null
                      ? "bg-black text-white font-bold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  All Products
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category
                        ? "bg-black text-white font-bold"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-heading mb-2">
              {selectedCategory ? selectedCategory : "All Products"}
            </h1>
            <p className="text-gray-500">
              Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-xl text-gray-500 font-medium">No products found in this category.</p>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="mt-4 text-neon-green font-bold hover:underline"
              >
                View all products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Our Shop</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse our extensive collection of premium sports gear, equipment, and accessories.
          </p>
        </div>
      </div>
      <Suspense fallback={<div className="py-20 text-center">Loading products...</div>}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
