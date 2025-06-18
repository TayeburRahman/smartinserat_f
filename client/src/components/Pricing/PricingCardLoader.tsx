import React from "react";

const PricingCardLoader: React.FC = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl border border-gray-200 shadow-md p-6 w-full max-w-sm mx-auto">
      <div className="h-5 bg-gray-300 rounded w-1/2 mx-auto mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto mb-4" />
      <div className="h-8 bg-gray-400 rounded w-1/2 mx-auto mb-4" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-6" />

      <ul className="space-y-2 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="h-3 bg-gray-200 rounded w-3/4 mx-auto" />
        ))}
      </ul>

      <div className="h-10 bg-purple-300 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-2/3 mx-auto mt-3" />
    </div>
  );
};

export default PricingCardLoader;
