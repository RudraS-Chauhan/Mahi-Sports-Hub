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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoriesData.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative w-full h-[300px] md:h-[450px] overflow-hidden bg-black flex flex-col items-center justify-center"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/60" />
              <div className="relative z-10 text-center flex flex-col items-center">
                <h3 className="text-white font-extrabold text-3xl md:text-4xl uppercase tracking-wide">
                  {cat.name}
                </h3>
                <div className="mt-4 border-2 border-white text-white uppercase tracking-widest text-sm py-2 px-6 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                  Shop Now
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
