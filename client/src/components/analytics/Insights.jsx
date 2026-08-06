function Insights({ tasks }) {

  const completed = tasks.filter(
    t => t.completed
  ).length;

  const pending =
    tasks.length - completed;

  const high =
    tasks.filter(
      t => t.priority==="High"
    ).length;

  return (

    <div className="bg-white rounded-2xl p-6 shadow">

      <h2 className="text-2xl font-bold mb-6">
        Productivity Insights
      </h2>

      <div className="space-y-5">

        <div>

          ✅ Completed

          <div className="font-bold text-3xl">
            {completed}
          </div>

        </div>

        <div>

          ⏳ Pending

          <div className="font-bold text-3xl">
            {pending}
          </div>

        </div>

        <div>

          🔥 High Priority

          <div className="font-bold text-3xl">
            {high}
          </div>

        </div>

      </div>

    </div>

  );

}

export default Insights;