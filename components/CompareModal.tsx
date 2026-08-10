"use client";

import React, { useState } from "react";
import { X, Scale, ShoppingCart, MessageCircle, Trash2, Plus, Check } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";
import { products, Product } from "@/data/products";
import SafeImage from "./SafeImage";
import { openWhatsApp, buildProductInquiryMessage } from "@/lib/whatsapp";

export default function CompareModal() {
  const { comparedProducts, removeFromCompare, clearCompare, isCompareOpen, setIsCompareOpen, addToCompare } = useCompare();
  const { addToCart } = useCart();
  const [selectedSelectorId, setSelectedSelectorId] = useState<string>("");

  if (!isCompareOpen) return null;

  // Fill up comparison slot if fewer than 2 items are selected
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-black text-white p-6 flex items-center justify-between border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-neon-green/10 rounded-xl border border-neon-green/30">
              <Scale className="w-6 h-6 text-neon-green" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading uppercase tracking-wide text-white">
                Product Comparison <span className="text-neon-green">Matrix</span>
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                Side-by-side specification & price breakdown ({comparedProducts.length}/3 selected)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {comparedProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-mono font-bold text-gray-400 hover:text-red-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-800 hover:border-red-900 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Close comparison"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
          {comparedProducts.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-heading">
                No Products Selected for Comparison
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                Select products from our store or choose two products from the dropdown below to compare specifications, price savings, and features side-by-side.
              </p>

              {/* Quick Select Dropdowns */}
              <div className="max-w-md mx-auto bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-left">
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-2">
                  Add Product to Compare:
                </label>
                <select
                  value={selectedSelectorId}
                  onChange={handleSelectProductToSlot}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3 font-medium focus:ring-black focus:border-black"
                >
                  <option value="">-- Choose a Product --</option>
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
              {/* Quick Add Selector if fewer than 3 */}
              {comparedProducts.length < 3 && (
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-700 uppercase">
                    <Plus className="w-4 h-4 text-neon-green" />
                    <span>Add another item to comparison:</span>
                  </div>
                  <select
                    value={selectedSelectorId}
                    onChange={handleSelectProductToSlot}
                    className="w-full sm:w-auto min-w-[280px] bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg p-2.5 font-medium"
                  >
                    <option value="">+ Select product from catalog...</option>
                    {availableToSelect.map((p) => (
                      <option key={p.id} value={p.id}>
                        [{p.itemNumber}] {p.name} - ₹{p.price.toLocaleString("en-IN")}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Comparison Matrix Grid */}
              <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full min-w-[650px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-100/80">
                      <th className="p-4 w-40 text-xs font-mono font-bold uppercase text-gray-500">
                        Feature / Product
                      </th>
                      {comparedProducts.map((product) => (
                        <th key={product.id} className="p-4 min-w-[200px] align-top">
                          <div className="relative flex flex-col items-center text-center">
                            <button
                              onClick={() => removeFromCompare(product.id)}
                              className="absolute -top-2 -right-2 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                              title="Remove item"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="relative w-28 h-28 bg-gray-50 rounded-xl overflow-hidden mb-3 border border-gray-200">
                              <SafeImage
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="font-mono text-[10px] font-bold bg-black text-neon-green px-2 py-0.5 rounded mb-1">
                              {product.itemNumber}
                            </span>
                            <h4 className="font-bold text-sm text-gray-900 line-clamp-2">
                              {product.name}
                            </h4>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-sm">
                    {/* Price & Savings Row */}
                    <tr>
                      <td className="p-4 font-mono font-bold text-xs uppercase text-gray-700 bg-gray-50">
                        Price & Savings
                      </td>
                      {comparedProducts.map((p) => {
                        const savings = p.originalPrice ? p.originalPrice - p.price : 0;
                        return (
                          <td key={p.id} className="p-4 text-center">
                            <div className="font-mono font-extrabold text-lg text-black">
                              ₹{p.price.toLocaleString("en-IN")}
                            </div>
                            {p.originalPrice && (
                              <div className="text-xs font-mono text-gray-400 line-through">
                                ₹{p.originalPrice.toLocaleString("en-IN")}
                              </div>
                            )}
                            {savings > 0 && (
                              <span className="inline-block mt-1 font-mono text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                Save ₹{savings.toLocaleString("en-IN")}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>

                    {/* Category Row */}
                    <tr>
                      <td className="p-4 font-mono font-bold text-xs uppercase text-gray-700 bg-gray-50">
                        Category
                      </td>
                      {comparedProducts.map((p) => (
                        <td key={p.id} className="p-4 text-center font-medium text-gray-800">
                          {p.category}
                        </td>
                      ))}
                    </tr>

                    {/* Availability Row */}
                    <tr>
                      <td className="p-4 font-mono font-bold text-xs uppercase text-gray-700 bg-gray-50">
                        Stock Status
                      </td>
                      {comparedProducts.map((p) => (
                        <td key={p.id} className="p-4 text-center">
                          {p.inStock ? (
                            <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                              <Check className="w-3.5 h-3.5 text-green-600" /> In Stock
                            </span>
                          ) : (
                            <span className="font-mono text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                              Out of Stock
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Description & Features Row */}
                    <tr>
                      <td className="p-4 font-mono font-bold text-xs uppercase text-gray-700 bg-gray-50">
                        Key Specifications
                      </td>
                      {comparedProducts.map((p) => (
                        <td key={p.id} className="p-4 text-xs text-gray-600 leading-relaxed align-top">
                          {p.description}
                        </td>
                      ))}
                    </tr>

                    {/* Action Buttons Row */}
                    <tr>
                      <td className="p-4 font-mono font-bold text-xs uppercase text-gray-700 bg-gray-50">
                        Actions
                      </td>
                      {comparedProducts.map((p) => (
                        <td key={p.id} className="p-4">
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => {
                                addToCart(p);
                                setIsCompareOpen(false);
                              }}
                              className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-3 rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" /> Add to Bag
                            </button>
                            <button
                              onClick={() => {
                                openWhatsApp(buildProductInquiryMessage(p.name, p.itemNumber, p.price));
                              }}
                              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2 px-3 rounded-lg text-xs font-bold hover:bg-[#128C7E] transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" /> Inquire via WhatsApp
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
    </div>
  );
}
