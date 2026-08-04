import { Calendar, Circle, CheckCircle2 } from "lucide-react";

function TaskCard({ title, priority, dueDate, completed }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex justify-between items-center hover:shadow-md transition">
      <div className="flex items-start gap-4">
        {completed ? (
          <CheckCircle2 className="text-green-500" />
        ) : (
          <Circle className="text-gray-400" />
        )}

        <div>
          <h3
            className={`font-semibold text-lg ${
              completed ? "line-through text-gray-400" : ""
            }`}
          >
            {title}
          </h3>

          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <span>{priority}</span>

            <span className="flex items-center gap-1">
              <Calendar size={15} />
              {dueDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;