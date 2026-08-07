function StatCard({ icon, title, value }) {
  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-[30px]
      border border-white/40
      bg-white/70
      backdrop-blur-xl
      p-7
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-2
      hover:scale-[1.03]
      hover:shadow-2xl
      "
    >
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-orange-200/40 blur-3xl group-hover:scale-125 transition duration-500"></div>

      <div className="relative">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-400 text-3xl shadow-lg">
          {icon}
        </div>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          {title}
        </p>

        <h2 className="mt-2 text-4xl font-black text-slate-800">
          {value}
        </h2>

      </div>

    </div>
  );
}

export default StatCard;