import {
  Calendar,
  Circle,
  CheckCircle2,
  Trash2,
  Pencil,
  Star,
  Lock,
  Repeat,
} from "lucide-react";

function TaskCard({
  id,
  title,
  priority,
  dueDate,
  completed,
  repeat,
  isPrivate,
  onDelete,
  onToggle,
  onEdit,
  pinned,
  onPin,
}) {
  const priorityColor = {
    High: "bg-red-100 text-red-600 border-red-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    Low: "bg-emerald-100 text-emerald-600 border-emerald-200",
  };

  const overdue =
    dueDate !== "No due date" &&
    !completed &&
    new Date(dueDate) < new Date();

  return (
    <div
      className={`
        group
        bg-white/70 backdrop-blur-xl border-white/40
        rounded-3xl
        border
        border-slate-200
        p-6
        shadow-sm
        transition-all duration-300 hover:scale-[1.015]
        hover:shadow-2xl
        hover:-translate-y-1.5
        ${
          completed
            ? "opacity-70 bg-slate-50"
            : ""
        }
      `}
    >
      <div className="flex justify-between">

        {/* LEFT */}

        <div className="flex gap-5 flex-1">

          <button
            onClick={() => onToggle(id)}
            className="mt-1"
          >
            {completed ? (
              <CheckCircle2
                size={24}
                className="text-green-500"
              />
            ) : (
              <Circle
                size={24}
                className="text-slate-400 group-hover:text-orange-500 transition"
              />
            )}
          </button>

          <div className="flex-1">

            <h3
              className={`text-xl font-bold ${
                completed
                  ? "line-through text-slate-400"
                  : "text-slate-800"
              }`}
            >
              {title}
            </h3>

            <div className="flex flex-wrap gap-2 mt-4">

              <span
                className={`px-3 py-1 rounded-full border text-xs font-semibold ${priorityColor[priority]}`}
              >
                {priority}
              </span>

              {repeat !== "Never" && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold border border-blue-200">
                  <Repeat size={12} />
                  {repeat}
                </span>
              )}

              {isPrivate && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-violet-100 text-violet-600 text-xs font-semibold border border-violet-200">
                  <Lock size={12} />
                  Private
                </span>
              )}

              <span
                className={`
                  flex
                  items-center
                  gap-1
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  border
                  ${
                    overdue
                      ? "bg-red-100 text-red-600 border-red-200"
                      : "bg-slate-100 text-slate-600 border-slate-200"
                  }
                `}
              >
                <Calendar size={12} />
                {dueDate}
              </span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-start gap-2">

          <button
            onClick={onEdit}
            className="h-10 w-10 rounded-xl hover:bg-orange-100 transition flex items-center justify-center"
          >
            <Pencil
              size={18}
              className="text-slate-500 hover:text-orange-500"
            />
          </button>

          <button
            onClick={() => onPin(id)}
            className="h-10 w-10 rounded-xl hover:bg-yellow-100 transition flex items-center justify-center"
          >
            <Star
              size={18}
              fill={pinned ? "#f59e0b" : "none"}
              className={
                pinned
                  ? "text-yellow-500"
                  : "text-slate-400"
              }
            />
          </button>

          <button
            onClick={() => onDelete(id)}
            className="h-10 w-10 rounded-xl hover:bg-red-100 transition flex items-center justify-center"
          >
            <Trash2
              size={18}
              className="text-red-500"
            />
          </button>

        </div>

      </div>
    </div>
  );
}

export default TaskCard;