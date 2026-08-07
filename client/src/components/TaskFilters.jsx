import { Search } from "lucide-react";

function TaskFilters({
  search,
  setSearch,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="flex flex-wrap gap-4 items-center">

      <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow">

        <Search
          size={18}
          className="text-slate-400"
        />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 outline-none"
        />

      </div>

      <select
        value={priorityFilter}
        onChange={(e) =>
          setPriorityFilter(e.target.value)
        }
        className="rounded-2xl bg-white px-5 py-3 shadow"
      >
        <option>All</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(e.target.value)
        }
        className="rounded-2xl bg-white px-5 py-3 shadow"
      >
        <option>All</option>
        <option>Completed</option>
        <option>Pending</option>
      </select>

    </div>
  );
}

export default TaskFilters;