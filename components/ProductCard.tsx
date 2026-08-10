"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, MessageCircle, Eye, Scale, Check } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useCompare } from "@/context/CompareContext";
import ProductModal from "./ProductModal";
import SafeImage from "./SafeImage";
import { openWhatsApp, buildProductInquiryMessage } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inCompare = isInCompare(product.id);

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openWhatsApp(buildProductInquiryMessage(product.name, product.itemNumber, product.price));
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-black transition-all duration-300 shadow-sm hover:shadow-md">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 block group">
          {/* Item Jersey Number Tag & Best Seller Badge */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
            <span className="font-mono text-xs font-bold bg-black text-neon-green px-2.5 py-1 uppercase tracking-wider rounded">
              {product.itemNumber}
            </span>
            {product.isBestSeller && (
              <span className="text-[10px] font-bold bg-neon-green text-black px-2 py-0.5 uppercase tracking-wider rounded">
                Best Seller
              </span>
            )}
          </div>

          <Link href={`/products/${product.id}`} className="block w-full h-full relative">
            <SafeImage
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>

          {/* Quick View & Compare Overlay */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
            <button
              onClick={handleToggleCompare}
              className={`p-2.5 rounded-full backdrop-blur-sm transition-all duration-200 shadow-md flex items-center justify-center ${
                inCompare
                  ? "bg-neon-green text-black border border-black font-bold"
                  : "bg-black/80 hover:bg-black text-white"
              }`}
              title={inCompare ? "In Comparison List" : "Add to Compare"}
              aria-label="Compare Product"
            >
              {inCompare ? <Check className="w-4 h-4" /> : <Scale className="w-4 h-4 text-neon-green" />}
            </button>

            <button
              onClick={handleOpenQuickView}
              className="bg-black/80 hover:bg-black text-white p-2.5 rounded-full backdrop-blur-sm transition-all duration-200 shadow-md flex items-center justify-center"
              title="Quick View"
              aria-label="Quick View product"
            >
              <Eye className="w-4 h-4 text-neon-green" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
            {product.category}
          </div>
          
          <Link href={`/products/${product.id}`} className="block mb-3">
            <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 hover:text-black transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-baseline gap-2 mb-4 mt-auto">
            <span className="font-mono font-bold text-xl text-black">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 mt-auto">
            <button
              onClick={() => addToCart(product)}
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-2.5 px-4 font-bold text-sm hover:bg-gray-800 transition-colors rounded-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Bag
            </button>
            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 px-4 font-bold text-sm hover:bg-[#128C7E] transition-colors rounded-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Inquire via WhatsApp
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}


