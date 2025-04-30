import React from "react";

const Loader = () => {
  return (
    <>
      <div className="animate-pulse p-4 space-y-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-20 bg-gray-300 rounded "></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;