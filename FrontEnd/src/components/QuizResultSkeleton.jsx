const ResultSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 animate-pulse">
      {/* Title */}
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>

      {/* Score */}
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>

      {/* Result Items */}
      {[...Array(5)].map((_, index) => (
        <div key={index} className="mb-4 p-4 border rounded shadow-sm">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div> {/* Question */}
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div> {/* User Answer */}
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div> {/* Correct/Incorrect */}
          <div className="h-3 bg-gray-200 rounded w-full mb-1"></div> {/* Explanation */}
          <div className="h-3 bg-gray-200 rounded w-2/3"></div> {/* Tip (if any) */}
        </div>
      ))}

      {/* Button */}
      <div className="mt-6 h-10 w-40 bg-gray-300 rounded"></div>
    </div>
  );
};

export default ResultSkeleton;
