"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Scale, ShoppingCart, MessageCircle, Trash2, Plus, ArrowLeft, Check } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";
import { products, Product } from "@/data/products";
import SafeImage from "@/components/SafeImage";
import { openWhatsApp, buildProductInquiryMessage } from "@/lib/whatsapp";

export default function ComparePage() {
  const { comparedProducts, removeFromCompare, clearCompare, addToCompare } = useCompare();
  const { addToCart } = useCart();
  const [selectedSelectorId, setSelectedSelectorId] = useState<string>("");

  const availableToSelect = products.filter(
    (p) => !comparedProducts.some((cp) => cp.id === p.id)
  );

  const handleSelectProductToSlot = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (!selectedId) return;
    const found = products.find((p) => p.id === selectedId);
    if (found) {
      addToCompare(found);
      setSelectedSelectorId("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-600 hover:text-black mb-3"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Store
            </Link>
            <h1 className="text-3xl font-extrabold font-heading text-black uppercase tracking-tight">
              Compare <span className="text-neon-green bg-black px-2 py-0.5 rounded">Gear & Equipment</span>
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Analyze specs, prices, and features side-by-side to make the right choice for your game.
            </p>
          </div>

          {comparedProducts.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-xs font-mono font-bold text-red-600 hover:bg-red-50 border border-red-200 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Reset Comparison
            </button>
          )}
        </div>

        {comparedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm max-w-2xl mx-auto">
            <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">
              Your Comparison List is Empty
            </h2>
            <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
              Select products from our catalog or pick two items below to start comparing specifications and pricing.
            </p>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-left">
              <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-2">
                Choose First Product to Compare:
              </label>
              <select
                value={selectedSelectorId}
                onChange={handleSelectProductToSlot}
                className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-3 font-medium focus:ring-black focus:border-black"
              >
                <option value="">-- Select Product from Mahi Sports Catalog --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.itemNumber}] {p.name} - ₹{p.price.toLocaleString("en-IN")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Quick Add Bar */}
            {comparedProducts.length < 3 && (
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-700 uppercase">
                  <Plus className="w-4 h-4 text-neon-green" />
                  <span>Add another item to comparison ({comparedProducts.length}/3):</span>
                </div>
                <select
                  value={selectedSelectorId}
                  onChange={handleSelectProductToSlot}
                  className="w-full sm:w-auto min-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg p-2.5 font-medium"
                >
                  <option value="">+ Add item to comparison matrix...</option>
                  {availableToSelect.map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.itemNumber}] {p.name} - ₹{p.price.toLocaleString("en-IN")}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full min-w-[700px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-100/80">
                    <th className="p-5 w-44 text-xs font-mono font-bold uppercase text-gray-500">
                      Product Overview
                    </th>
                    {comparedProducts.map((product) => (
                      <th key={product.id} className="p-5 min-w-[220px] align-top">
                        <div className="relative flex flex-col items-center text-center">
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors mb-2"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="relative w-36 h-36 bg-gray-50 rounded-xl overflow-hidden mb-3 border border-gray-200">
                            <SafeImage src={product.image} alt={product.name} fill className="object-cover" />
                          </div>
                          <span className="font-mono text-xs font-bold bg-black text-neon-green px-2.5 py-0.5 rounded mb-1">
                            {product.itemNumber}
                          </span>
                          <h3 className="font-bold text-base text-gray-900 line-clamp-2">
                            {product.name}
                          </h3>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {/* Price Row */}
                  <tr>
                    <td className="p-5 font-mono font-bold text-xs uppercase text-gray-700 bg-gray-50">
                      Price & Discount
                    </td>
                    {comparedProducts.map((p) => {
                      const savings = p.originalPrice ? p.originalPrice - p.price : 0;
                      return (
                        <td key={p.id} className="p-5 text-center">
                          <div className="font-mono font-extrabold text-xl text-black">
                            ₹{p.price.toLocaleString("en-IN")}
                          </div>
                          {p.originalPrice && (
                            <div className="text-xs font-mono text-gray-400 line-through">
                              ₹{p.originalPrice.toLocaleString("en-IN")}
                            </div>
                          )}
                          {savings > 0 && (
                            <span className="inline-block mt-1 font-mono text-[10px] font-bold bg-green-100 text-green-800 px-2.5 py-0.5 rounded">
                              Save ₹{savings.toLocaleString("en-IN")}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Category */}
                  <tr>
                    <td className="p-5 font-mono font-bold text-xs uppercase text-gray-700 bg-gray-50">
                      Category
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-5 text-center font-bold text-gray-800">
                        {p.category}
                      </td>
                    ))}
                  </tr>

                  {/* Stock */}
                  <tr>
                    <td className="p-5 font-mono font-bold text-xs uppercase text-gray-700 bg-gray-50">
                      Availability
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-5 text-center">
                        {p.inStock ? (
                          <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                            <Check className="w-3.5 h-3.5 text-green-600" /> In Stock
                          </span>
                        ) : (
                          <span className="font-mono text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Description */}
                  <tr>
                    <td className="p-5 font-mono font-bold text-xs uppercase text-gray-700 bg-gray-50">
                      Specifications
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-5 text-xs text-gray-600 leading-relaxed align-top">
                        {p.description}
                      </td>
                    ))}
                  </tr>

                  {/* Actions */}
                  <tr>
                    <td className="p-5 font-mono font-bold text-xs uppercase text-gray-700 bg-gray-50">
                      Order Actions
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-5">
                        <div className="flex flex-col gap-2.5">
                          <button
                            onClick={() => addToCart(p)}
                            className="w-full flex items-center justify-center gap-2 bg-black text-white py-2.5 px-4 rounded-lg font-bold text-xs hover:bg-gray-800 transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4" /> Add to Bag
                          </button>
                          <button
                            onClick={() => {
                              openWhatsApp(buildProductInquiryMessage(p.name, p.itemNumber, p.price));
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 px-4 rounded-lg font-bold text-xs hover:bg-[#128C7E] transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" /> Inquire via WhatsApp
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
