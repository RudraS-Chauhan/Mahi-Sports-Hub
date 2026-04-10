import React from "react";
import Link from "next/link";
import { products } from "@/data/products";

export default function HotSellers() {
  const trendingProducts = products.filter((product) => product.isTrending);

  if (trendingProducts.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold font-heading uppercase tracking-tight text-black">
          Hot Sellers
        </h2>
      </div>

      {/* Horizontally scrollable container */}
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-4 sm:px-6 lg:px-8 gap-6">
        {trendingProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products?q=${encodeURIComponent(product.name)}`}
            className="flex-none w-64 snap-center group"
          >
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative h-80 w-full mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="text-center px-2">
                <h3 className="text-lg font-bold text-black truncate mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 font-medium">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
