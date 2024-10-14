const LoadingSpinner = () => {
  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="border-2 border-emerald-200 h-20 rounded-full w-20" />
        <div className="absolute animate-spin border-emerald-500 border-t-2 h-20 left-0 rounded-full top-0 w-20" />
        <div className="sr-only">
          Loading
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
