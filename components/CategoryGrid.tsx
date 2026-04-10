import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categoriesData = [
  { name: "Cricket Bats", image: "/cat-bat.jpg" },
  { name: "Cricket Gear", image: "/cat-gear.jpg" },
  { name: "Custom Jerseys", image: "/cat-jersey.jpg" },
  { name: "Custom Hats & Bags", image: "/cat-bags.jpg" },
];

export default function CategoryGrid() {
  return (
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

        <div className="flex flex-col gap-6">
          {categoriesData.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative w-full h-[250px] md:h-[400px] overflow-hidden bg-black flex flex-col items-center justify-end pb-8"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-300 group-hover:from-black/90" />
              <div className="relative z-10 text-center">
                <h3 className="text-white font-bold text-3xl md:text-5xl uppercase tracking-wider mb-2">
                  {cat.name}
                </h3>
                <span className="text-white text-sm md:text-base font-medium tracking-widest uppercase opacity-90 group-hover:text-neon-green transition-colors">
                  Shop Now -&gt;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
