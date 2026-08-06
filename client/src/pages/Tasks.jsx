import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import TaskFilters from "../components/TaskFilters";
import AddTaskModal from "../components/AddTaskModal";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";

import {
    getTasks,
    deleteTask,
    toggleTask,
    togglePin,
} from "../services/api";

function Tasks() {
    const [search, setSearch] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (err) {
                console.error(err);
            }
        }

        loadTasks();
    }, []);
    async function handleDelete(id) {
        try {
            await deleteTask(id);

            setTasks((prev) =>
                prev.filter((task) => task._id !== id)
            );
            toast.success("Task deleted");
        } catch (err) {
            console.error(err);
        }
    }

    async function handleToggle(id) {
        try {
            const updatedTask = await toggleTask(id);

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === id ? updatedTask : task
                )
            );
            toast.success(
                updatedTask.completed
                    ? "Task completed!"
                    : "Task reopened"
            );
        } catch (err) {
            console.error(err);
        }
    }
    async function handlePin(id) {
        try {
            const updatedTask = await togglePin(id);

            setTasks((prev) => {
                const newTasks = prev.map((task) =>
                    task._id === id ? updatedTask : task
                );

                return newTasks.sort((a, b) => {
                    // Completed tasks always last
                    if (a.completed !== b.completed) {
                        return a.completed - b.completed;
                    }

                    // Pinned tasks first
                    if (a.pinned !== b.pinned) {
                        return Number(b.pinned) - Number(a.pinned);
                    }

                    // Priority order
                    const order = {
                        High: 3,
                        Medium: 2,
                        Low: 1,
                    };

                    return order[b.priority] - order[a.priority];
                });
            });
        } catch (err) {
            console.error(err);
        }
    }
    const filteredTasks = tasks
        .filter((task) =>
            task.title
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        .filter((task) =>
            priorityFilter === "All"
                ? true
                : task.priority === priorityFilter
        )
        .filter((task) => {
            if (statusFilter === "Completed")
                return task.completed;

            if (statusFilter === "Pending")
                return !task.completed;

            return true;
        });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTasks = filteredTasks.filter((task) => {
        if (task.completed || task.pinned) return false;

        if (!task.dueDate) return true;

        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);

        return due <= today;
    });

    const upcomingTasks = filteredTasks.filter((task) => {
        if (task.completed || task.pinned) return false;

        if (!task.dueDate) return false;

        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);

        return due > today;
    });

    const completedTasksList = filteredTasks.filter(
        (task) => task.completed
    );
    return (
        <Layout>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-5xl font-bold">
                        My Tasks
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage all your tasks here.
                    </p>

                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
                >
                    + New Task
                </button>
            </div>
            <div className="mt-8">

                <TaskFilters
                    search={search}
                    setSearch={setSearch}
                    priorityFilter={priorityFilter}
                    setPriorityFilter={setPriorityFilter}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />
            </div>
            <div className="space-y-10">

                <section>

                    <h2 className="text-2xl font-bold mb-5">
                        📌 Pinned
                    </h2>

                    <div className="space-y-4">

                        {filteredTasks
                            .filter(task => task.pinned && !task.completed)
                            .map(task => (
                                <TaskCard
                                    key={task._id}
                                    {...task}
                                    id={task._id}
                                    dueDate={
                                        task.dueDate
                                            ? new Date(task.dueDate).toLocaleDateString()
                                            : "No due date"
                                    }
                                    onDelete={handleDelete}
                                    onToggle={handleToggle}
                                    onPin={handlePin}
                                    onEdit={() => {
                                        setEditingTask(task);
                                        setShowModal(true);
                                    }}
                                />
                            ))}

                    </div>

                </section>
                <section>

                    <h2 className="text-2xl font-bold mb-5">
                        Today
                    </h2>

                    <div className="space-y-4">

                        {todayTasks.length === 0 ? (

                            <EmptyState
                                title="Nothing due today!"
                                subtitle="You're all caught up."
                            />

                        ) : (

                            todayTasks.map(task => (

                                <TaskCard
                                    key={task._id}
                                    {...task}
                                    id={task._id}
                                    dueDate={
                                        task.dueDate
                                            ? new Date(task.dueDate).toLocaleDateString()
                                            : "No due date"
                                    }
                                    onDelete={handleDelete}
                                    onToggle={handleToggle}
                                    onPin={handlePin}
                                    onEdit={() => {
                                        setEditingTask(task);
                                        setShowModal(true);
                                    }}
                                />

                            ))

                        )}

                    </div>

                </section>
                <section>

                    <h2 className="text-2xl font-bold mb-5">
                        Upcoming
                    </h2>

                    <div className="space-y-4">

                        {upcomingTasks.length === 0 ? (

                            <EmptyState
                                title="No upcoming tasks"
                                subtitle="Nothing scheduled yet."
                            />

                        ) : (

                            upcomingTasks.map((task) => (

                                <TaskCard
                                    key={task._id}
                                    {...task}
                                    id={task._id}
                                    dueDate={new Date(task.dueDate).toLocaleDateString()}
                                    onDelete={handleDelete}
                                    onToggle={handleToggle}
                                    onPin={handlePin}
                                    onEdit={() => {
                                        setEditingTask(task);
                                        setShowModal(true);
                                    }}
                                />

                            ))

                        )}

                    </div>

                </section>
                <section>

                    <h2 className="text-2xl font-bold mb-5">
                        Completed
                    </h2>

                    <div className="space-y-4">

                        {completedTasksList.length === 0 ? (

                            <EmptyState
                                title="No completed tasks"
                                subtitle="Complete your first task!"
                            />

                        ) : (

                            completedTasksList.map((task) => (

                                <TaskCard
                                    key={task._id}
                                    {...task}
                                    id={task._id}
                                    dueDate={
                                        task.dueDate
                                            ? new Date(task.dueDate).toLocaleDateString()
                                            : "No due date"
                                    }
                                    onDelete={handleDelete}
                                    onToggle={handleToggle}
                                    onPin={handlePin}
                                    onEdit={() => {
                                        setEditingTask(task);
                                        setShowModal(true);
                                    }}
                                />

                            ))

                        )}

                    </div>

                </section>

            </div>



            <AddTaskModal
                isOpen={showModal}
                editingTask={editingTask}
                onClose={() => {
                    setShowModal(false);
                    setEditingTask(null);
                }}
                onTaskCreated={(task) => {

                    if (editingTask) {

                        setTasks((prev) =>
                            prev.map((t) =>
                                t._id === task._id ? task : t
                            )
                        );

                    } else {

                        setTasks((prev) => [task, ...prev]);

                    }

                }}
            />
        </Layout>
    );
}

export default Tasks;