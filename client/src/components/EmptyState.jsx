function EmptyState({
  title = "Nothing here yet",
  subtitle = "Create a task or adjust your filters.",
}) {
  return (
    <div className="rounded-[32px] border-2 border-dashed border-orange-200 bg-gradient-to-br from-orange-50 to-white p-14 text-center shadow-sm">

      <div className="mb-6 text-6xl">
        📋
      </div>

      <h3 className="text-3xl font-bold text-slate-800">
        {title}
      </h3>

      <p className="mt-3 text-slate-500">
        {subtitle}
      </p>

    </div>
  );
}

export default EmptyState;