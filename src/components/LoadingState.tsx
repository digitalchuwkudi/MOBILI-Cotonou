export const LoadingState = ({ variant = 'grid' }: { variant?: 'grid' | 'page' | 'detail' }) => {
  if (variant === 'page') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#EDE7DC] border-t-[#C6922E] rounded-full animate-spin"></div>
        <p className="text-xs uppercase font-bold tracking-widest text-[#102A43]/60 animate-pulse">
          Mobili Cotonou...
        </p>
      </div>
    );
  }

  if (variant === 'detail') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-pulse">
        <div className="aspect-[21/9] bg-[#EDE7DC]/40 rounded-3xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 bg-[#EDE7DC]/40 rounded-lg w-1/3"></div>
            <div className="h-4 bg-[#EDE7DC]/40 rounded-lg w-2/3"></div>
            <div className="h-24 bg-[#EDE7DC]/40 rounded-xl"></div>
          </div>
          <div className="bg-[#EDE7DC]/40 h-96 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((n) => (
        <div key={n} className="bg-white rounded-2xl border border-[#EDE7DC]/60 overflow-hidden shadow-sm p-4 space-y-4 animate-pulse">
          <div className="aspect-[4/3] bg-[#EDE7DC]/30 rounded-xl"></div>
          <div className="space-y-2">
            <div className="h-4 bg-[#EDE7DC]/30 rounded w-1/4"></div>
            <div className="h-6 bg-[#EDE7DC]/30 rounded w-3/4"></div>
            <div className="h-4 bg-[#EDE7DC]/30 rounded w-5/6"></div>
          </div>
          <div className="h-10 bg-[#EDE7DC]/20 rounded-xl"></div>
        </div>
      ))}
    </div>
  );
};
