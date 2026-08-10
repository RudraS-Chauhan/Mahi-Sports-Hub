import { ShopPageSkeleton } from "@/components/Skeletons";

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-pulse">
          <div className="w-40 h-4 bg-gray-800 rounded mx-auto mb-2" />
          <div className="w-80 h-10 bg-gray-800 rounded mx-auto mb-4" />
          <div className="w-96 h-5 bg-gray-800 rounded mx-auto" />
        </div>
      </div>
      <ShopPageSkeleton />
    </div>
  );
}
