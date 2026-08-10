import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SafeImage from "./SafeImage";

const categoriesData = [
  { name: "Cricket Bats", image: "/cat-bat.jpg" },
  { name: "Cricket Gear", image: "/cat-gear.jpg" },
  { name: "Custom Jerseys", image: "/cat-jersey.jpg" },
  { name: "Custom Hats & Bags", image: "/cat-bags.jpg" },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 mb-1 block">
              Equipment Categories
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-black uppercase tracking-tight">
              SHOP BY CATEGORY
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 font-mono text-xs font-bold text-black hover:text-neon-green transition-colors uppercase tracking-wider"
          >
            Explore Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoriesData.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative w-full h-[280px] md:h-[400px] rounded-2xl overflow-hidden bg-black flex flex-col items-center justify-center border border-gray-200"
            >
              <SafeImage
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
              <div className="relative z-10 text-center flex flex-col items-center p-6">
                <h3 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl font-heading uppercase tracking-wide">
                  {cat.name}
                </h3>
                <div className="mt-4 border-2 border-white text-white font-mono uppercase tracking-widest text-xs py-2.5 px-6 rounded-lg transition-colors duration-300 group-hover:bg-neon-green group-hover:text-black group-hover:border-neon-green font-bold">
                  Explore Products &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
