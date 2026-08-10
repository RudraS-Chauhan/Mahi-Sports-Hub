"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { products } from "@/data/products";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const trimmedQuery = query.trim().toLowerCase();
  const suggestions = trimmedQuery.length > 0
    ? products.filter((p) => {
        const name = p.name.toLowerCase();
        const category = p.category.toLowerCase();
        const searchTerms = trimmedQuery.split(/\s+/);
        return searchTerms.every(term => name.includes(term) || category.includes(term));
      }).slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestionQuery: string) => {
    setQuery(suggestionQuery);
    setIsOpen(false);
    router.push(`/products?q=${encodeURIComponent(suggestionQuery)}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xs md:max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.trim().length > 0);
          }}
          onFocus={() => {
            if (query.trim().length > 0) setIsOpen(true);
          }}
          placeholder="Search products..."
          className="w-full bg-gray-900 text-white border border-gray-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors text-sm"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
          <ul className="max-h-64 overflow-y-auto py-2">
            {suggestions.map((product) => (
              <li key={product.id}>
                <button
                  onClick={() => handleSuggestionClick(product.name)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex flex-col"
                >
                  <span className="text-sm font-medium text-black truncate">{product.name}</span>
                  <span className="text-xs text-gray-500">{product.category}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
