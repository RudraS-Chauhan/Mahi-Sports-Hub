import React from "react";
import Link from "next/link";
import { products } from "@/data/products";
import SafeImage from "./SafeImage";

export default function HotSellers() {
  const trendingProducts = products.filter((product) => product.isTrending);

  if (trendingProducts.length === 0) return null;

  return (
    <section className="py-12 bg-black text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex justify-between items-end">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-neon-green mb-1 block">
            Trending Equipment
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading uppercase tracking-tight text-white">
            HOT SELLERS IN LUCKNOW
          </h2>
        </div>
        <span className="text-xs font-mono text-gray-400 hidden sm:block">Scroll &rarr;</span>
      </div>

      {/* Horizontally scrollable container */}
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4 sm:px-6 lg:px-8 gap-6 max-w-7xl mx-auto">
        {trendingProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products?q=${encodeURIComponent(product.name)}`}
            className="flex-none w-60 sm:w-64 snap-center group"
          >
            <div className="bg-gray-900 rounded-xl p-3 border border-gray-800 transition-all group-hover:border-neon-green">
              <div className="relative h-64 w-full mb-3 bg-gray-950 rounded-lg overflow-hidden">
                <span className="absolute top-2 left-2 z-10 font-mono text-[10px] font-bold bg-black text-neon-green px-2 py-0.5 rounded">
                  {product.itemNumber}
                </span>
                <SafeImage
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="text-left px-1">
                <h3 className="text-sm font-bold text-white truncate mb-1">
                  {product.name}
                </h3>
                <p className="text-neon-green font-mono font-bold text-xs">
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
