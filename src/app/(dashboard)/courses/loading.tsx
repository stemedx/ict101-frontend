export default function CoursesLoading() {
  return (
    <div className="pt-24 pb-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      {/* Header */}
      <div className="h-10 bg-white/10 rounded-lg w-1/3 mb-3" />
      <div className="h-5 bg-white/10 rounded-lg w-1/2 mb-10" />

      {/* Course grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white/10 rounded-2xl overflow-hidden">
            <div className="w-full h-48 bg-white/10" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-white/10 rounded w-3/4" />
              <div className="h-4 bg-white/10 rounded w-full" />
              <div className="h-4 bg-white/10 rounded w-2/3" />
              <div className="h-9 bg-white/10 rounded-lg mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
