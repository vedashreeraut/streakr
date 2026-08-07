import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createTask, updateTask } from "../services/api";

function AddTaskModal({ isOpen, onClose, onTaskCreated, editingTask, }) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");
    const [isPrivate, setIsPrivate] = useState(true);
    const [repeat, setRepeat] = useState("Never");
    const [hasDueDate, setHasDueDate] = useState(false);
    useEffect(() => {
        if (!editingTask) return;

        setTitle(editingTask.title);
        setPriority(editingTask.priority);
        setIsPrivate(editingTask.isPrivate);
        setRepeat(editingTask.repeat || "Never");

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
                    repeat,
                    isPrivate,
                });
            } else {
                task = await createTask({
                    title,
                    priority,
                    dueDate,
                    repeat,
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
            setRepeat("Never");
            onClose();
        } catch (err) {
            console.error(err);
        }
    }
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="w-[560px] rounded-[32px] border border-white/40 bg-white/80 backdrop-blur-xl p-8 shadow-2xl">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-3xl font-bold">
                        {editingTask ? "Edit Task" : "New Task"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="h-10 w-10 rounded-3xl hover:bg-slate-100 transition"
                    >
                        <X />
                    </button>

                </div>

                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4.5 mb-5 outline-none focus:border-orange-400 focus:bg-white transition"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4.5 mb-5 outline-none focus:border-orange-400 focus:bg-white transition"
                >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                </select>
                <select
                    value={repeat}
                    onChange={(e) => setRepeat(e.target.value)}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 mb-5 outline-none focus:border-orange-400 focus:bg-white transition"
                >
                    <option value="Never">Never Repeat</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
                <label className="flex items-center gap-3 rounded-3xl bg-slate-50 px-4 py-3 mb-4">
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
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4.5 mb-5 outline-none focus:border-orange-400 focus:bg-white transition"
                    />
                )}
                <label className="flex items-center gap-3 rounded-3xl bg-slate-50 px-4 py-3 mb-6">
                    <input
                        type="checkbox"
                        checked={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.checked)}
                    />

                    Private Task
                </label>

                <button
                    onClick={handleCreate}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-400 shadow-xl hover:scale-[1.02] hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
                >
                    {editingTask ? "Save Changes" : "Create Task"}
                </button>

            </div>

        </div>
    );
}

export default AddTaskModal;