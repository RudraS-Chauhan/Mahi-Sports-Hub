"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";
import { toast } from "sonner";

interface CompareContextType {
  comparedProducts: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "mahi_sports_compare";

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comparedProducts, setComparedProducts] = useState<Product[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.slice(0, 3);
      }
    } catch {
      // Ignore errors
    }
    return [];
  });

  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(comparedProducts));
    } catch (e) {
      console.error("Failed to save comparison list", e);
    }
  }, [comparedProducts]);

  const addToCompare = (product: Product) => {
    if (comparedProducts.some((p) => p.id === product.id)) {
      toast.info(`${product.name} is already in comparison.`);
      setIsCompareOpen(true);
      return;
    }

    if (comparedProducts.length >= 3) {
      toast.warning("Comparison matrix limit is 3 items. Replace an item or view current comparison.");
      setIsCompareOpen(true);
      return;
    }

    setComparedProducts((prev) => [...prev, product]);
    toast.success(`${product.name} added to Compare list!`);
    setIsCompareOpen(true);
  };

  const removeFromCompare = (productId: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== productId));
    toast.info("Item removed from comparison.");
  };

  const isInCompare = (productId: string) => {
    return comparedProducts.some((p) => p.id === productId);
  };

  const clearCompare = () => {
    setComparedProducts([]);
  };

  return (
    <CompareContext.Provider
      value={{
        comparedProducts,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};
