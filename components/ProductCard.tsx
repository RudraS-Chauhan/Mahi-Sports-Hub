"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = `Hi, I want to order ${product.name} from Mahi Sports Hub.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918382908844?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="relative aspect-square overflow-hidden bg-gray-100 block">
        {product.isBestSeller && (
          <div className="absolute top-3 left-3 z-10 bg-black text-neon-green text-xs font-bold px-3 py-1 uppercase tracking-wider">
            Best Seller
          </div>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">
          {product.category}
        </div>
        <Link href={`/products/${product.id}`} className="block mb-2">
          <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 hover:text-neon-orange transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mb-4 mt-auto">
          <span className="font-bold text-xl text-black">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={() => addToCart(product)}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 px-4 font-bold hover:bg-gray-800 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <button
            onClick={handleWhatsAppOrder}
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 font-bold hover:bg-[#128C7E] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Order on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
