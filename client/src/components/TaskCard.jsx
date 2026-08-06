import {
  Calendar,
  Circle,
  CheckCircle2,
  Trash2,
  Pencil,
  Star,
} from "lucide-react";

function TaskCard({
  id,
  title,
  priority,
  dueDate,
  completed,
  onDelete,
  onToggle,
  onEdit,
  pinned,
  onPin,
}) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 p-5 flex justify-between items-center transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5
  ${completed
          ? "bg-gray-50 opacity-70"
          : "bg-white"
        }`}
    >
      <div className="flex items-start gap-4">
        <button onClick={() => onToggle(id)}>
          {completed ? (
            <CheckCircle2 className="text-green-500" />
          ) : (
            <Circle className="text-gray-400" />
          )}
        </button>

        <div>
          <h3
            className={`font-semibold text-lg ${completed ? "line-through text-gray-400" : ""
              }`}
          >
            {title}
          </h3>

          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold
    ${priority === "High"
                  ? "bg-red-100 text-red-600"
                  : priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-600"
                }`}
            >
              {priority}
            </span>

            <div className="flex items-center gap-2">

              <Calendar size={15} />

              <span
                className={
                  dueDate !== "No due date" &&
                    !completed &&
                    new Date(dueDate) < new Date()
                    ? "text-red-500 font-medium"
                    : ""
                }
              >
                {dueDate}
              </span>

              {dueDate !== "No due date" &&
                !completed &&
                new Date(dueDate) < new Date() && (

                  <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                    Overdue
                  </span>

                )}

            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">

        <button
          onClick={onEdit}
          className="text-gray-500 hover:text-orange-500 transition"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onPin(id)}
        >

          <Star
            size={18}
            fill={pinned ? "#f59e0b" : "none"}
            className={
              pinned
                ? "text-yellow-500"
                : "text-gray-400"
            }
          />

        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 transition"
        >
          <Trash2 size={18} />
        </button>

      </div>
    </div>
  );
}

export default TaskCard;