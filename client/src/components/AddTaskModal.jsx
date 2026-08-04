import { X } from "lucide-react";
import { useState } from "react";
import { createTask } from "../services/api";

function AddTaskModal({ isOpen, onClose, onTaskCreated }) {
    const [title, setTitle] = useState("");
    async function handleCreate() {
  if (!title.trim()) return;

  try {
    const newTask = await createTask({
      title,
    });

    onTaskCreated(newTask);

    setTitle("");

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
            New Task
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

        <button
  onClick={handleCreate}
  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
>
  Create Task
</button>

      </div>

    </div>
  );
}

export default AddTaskModal;