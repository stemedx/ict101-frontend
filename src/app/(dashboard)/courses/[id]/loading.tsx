export default function CourseDetailLoading() {
  return (
    <div className="pt-24 pb-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      {/* Title */}
      <div className="h-9 bg-white/10 rounded-lg w-2/3 mb-4" />
      <div className="h-5 bg-white/10 rounded w-1/3 mb-10" />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="h-48 bg-white/10 rounded-2xl" />
          <div className="h-32 bg-white/10 rounded-2xl" />
          <div className="h-64 bg-white/10 rounded-2xl" />
        </div>
        {/* Right column */}
        <div className="space-y-4">
          <div className="h-64 bg-white/10 rounded-2xl" />
          <div className="h-12 bg-white/10 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
