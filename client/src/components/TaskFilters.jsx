function TaskFilters({
  search,
  setSearch,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="flex gap-4 mb-8">

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border rounded-xl px-4 py-2 bg-white"
      />

      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        className="border rounded-xl px-4 py-2 bg-white"
      >
        <option>All</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border rounded-xl px-4 py-2 bg-white"
      >
        <option>All</option>
        <option>Completed</option>
        <option>Pending</option>
      </select>

    </div>
  );
}

export default TaskFilters;