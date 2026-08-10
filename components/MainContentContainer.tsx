"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { updateDocumentSEO } from "@/lib/seo";

export default function MainContentContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    updateDocumentSEO(pathname);
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="flex-grow w-full flex flex-col min-h-full"
    >
      {children}
    </motion.div>
  );
}
