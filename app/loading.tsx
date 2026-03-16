export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-white/20 border-t-white animate-spin" />
        <p className="text-sm font-medium">Loading…</p>
      </div>
    </div>
  );
}
