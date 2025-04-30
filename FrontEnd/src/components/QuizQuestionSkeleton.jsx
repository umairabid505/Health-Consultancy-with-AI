const QuizSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 animate-pulse">
      {/* Header */}
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>

      {/* Question */}
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>

      {/* Options */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center space-x-2 mb-3">
          <div className="w-4 h-4 rounded-full bg-gray-300"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      ))}

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <div className="w-24 h-10 bg-gray-300 rounded"></div>
        <div className="w-24 h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default QuizSkeleton;
