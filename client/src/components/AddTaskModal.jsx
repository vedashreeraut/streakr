import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createTask, updateTask } from "../services/api";

function AddTaskModal({ isOpen, onClose, onTaskCreated, editingTask, }) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Medium");
const [dueDate, setDueDate] = useState("");
const [isPrivate, setIsPrivate] = useState(true);
const [hasDueDate, setHasDueDate] = useState(false);
useEffect(() => {
  if (!editingTask) return;

  setTitle(editingTask.title);
  setPriority(editingTask.priority);
  setIsPrivate(editingTask.isPrivate);

  if (editingTask.dueDate) {
    setHasDueDate(true);
    setDueDate(editingTask.dueDate.split("T")[0]);
  } else {
    setHasDueDate(false);
    setDueDate("");
  }
}, [editingTask]);
    async function handleCreate() {
  if (!title.trim()) return;

  try {
    let task;

if (editingTask) {
  task = await updateTask(editingTask._id, {
    title,
    priority,
    dueDate,
    isPrivate,
  });
} else {
  task = await createTask({
    title,
    priority,
    dueDate,
    isPrivate,
  });
}

onTaskCreated(task);

    setTitle("");

    setTitle("");
setPriority("Medium");
setDueDate("");
setHasDueDate(false);
setIsPrivate(true);
    onClose();
  } catch (err) {
    console.error(err);
  }
}
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-[450px] p-7 shadow-xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {editingTask ? "Edit Task" : "New Task"}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <input
  type="text"
  placeholder="Task title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="w-full border rounded-xl px-4 py-3 mb-4"
    />
    <select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  className="w-full border rounded-xl px-4 py-3 mb-4"
>
  <option value="Low">Low Priority</option>
  <option value="Medium">Medium Priority</option>
  <option value="High">High Priority</option>
</select>
<label className="flex items-center gap-2 mb-4">
  <input
    type="checkbox"
    checked={hasDueDate}
    onChange={(e) => {
      setHasDueDate(e.target.checked);

      if (!e.target.checked) {
        setDueDate("");
      }
    }}
  />

  Set a due date
</label>

{hasDueDate && (
  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
    className="w-full border rounded-xl px-4 py-3 mb-4"
  />
)}
<label className="flex items-center gap-2 mb-6">
  <input
    type="checkbox"
    checked={isPrivate}
    onChange={(e) => setIsPrivate(e.target.checked)}
  />

  Private Task
</label>

        <button
  onClick={handleCreate}
  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
>
  {editingTask ? "Save Changes" : "Create Task"}
</button>

      </div>

    </div>
  );
}

export default AddTaskModal;