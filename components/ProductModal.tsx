"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ShoppingCart, MessageCircle, Check, ShieldCheck, Truck, Scale } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useCompare } from "@/context/CompareContext";
import SafeImage from "./SafeImage";
import { openWhatsApp, buildProductInquiryMessage } from "@/lib/whatsapp";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [prevProductId, setPrevProductId] = useState<string | null>(null);

  if (product && product.id !== prevProductId) {
    setPrevProductId(product.id);
    setActiveImageIndex(0);
    setQuantity(1);
    setAdded(false);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const inCompare = isInCompare(product.id);

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsAppInquiry = () => {
    openWhatsApp(buildProductInquiryMessage(product.name, product.itemNumber, product.price));
  };

  const handleToggleCompare = () => {
    if (inCompare) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 hover:bg-black text-black hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Carousel */}
        <div className="w-full md:w-1/2 bg-gray-100 relative flex flex-col items-center justify-center min-h-[320px] md:min-h-[450px]">
          {/* Tag Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <span className="font-mono text-xs font-bold bg-black text-neon-green px-3 py-1 uppercase tracking-wider rounded">
              {product.itemNumber}
            </span>
            {product.isBestSeller && (
              <span className="text-xs font-bold bg-neon-green text-black px-3 py-1 uppercase tracking-wider rounded">
                Best Seller
              </span>
            )}
          </div>

          {/* Main Display Image */}
          <div className="relative w-full h-full aspect-square overflow-hidden">
            <SafeImage
              src={imagesList[activeImageIndex]}
              alt={`${product.name} view ${activeImageIndex + 1}`}
              fill
              className="object-cover transition-all duration-300"
              priority
            />
          </div>

          {/* Navigation Arrows */}
          {imagesList.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2 rounded-full backdrop-blur-sm transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2 rounded-full backdrop-blur-sm transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Pagination Dots */}
          {imagesList.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {imagesList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === activeImageIndex ? "bg-neon-green w-6" : "bg-white/70 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
            {product.category}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-black mb-3 leading-tight">
            {product.name}
          </h2>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-mono text-3xl font-extrabold text-black">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-lg text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="space-y-4 mt-auto pt-4 border-t border-gray-100">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-700">Quantity:</span>
              <div className="flex items-center border-2 border-black rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 font-mono text-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 font-mono font-bold text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 font-mono text-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 px-6 font-bold text-base hover:bg-gray-800 transition-all rounded-lg disabled:opacity-50"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-neon-green" /> Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" /> Add to Bag
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 font-bold text-sm hover:bg-[#128C7E] transition-all rounded-lg"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Inquire
                </button>

                <button
                  onClick={handleToggleCompare}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 font-bold text-sm rounded-lg border transition-all ${
                    inCompare
                      ? "bg-neon-green/20 text-black border-neon-green font-extrabold"
                      : "bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  <Scale className="w-4 h-4 text-black" />
                  {inCompare ? "In Compare" : "+ Compare"}
                </button>
              </div>
            </div>


            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-2 pt-4 text-xs text-gray-500 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neon-green" />
                <span>100% Authentic Product</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neon-green" />
                <span>Store Pickup & Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
