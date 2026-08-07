function AchievementCard({
    icon,
    title,
    description,
    unlocked,
    current = null,
    target = null,
}) {
    return (
        <div
            className={`rounded-2xl p-6 shadow transition
      ${unlocked
                    ? "bg-green-100 border-2 border-green-400"
                    : "bg-gray-100 border border-gray-200 opacity-70"
                }`}
        >
            <div className="text-4xl mb-4">
                {icon}
            </div>

            <h2 className="font-bold text-xl">
                {title}
            </h2>

            <p className="text-gray-600 mt-2">
                {description}
            </p>
            {!unlocked && current !== null && target !== null && (

                <div className="mt-5">

                    <div className="flex justify-between text-sm mb-2">

                        <span>
                            Progress
                        </span>

                        <span>
                            {current}/{target}
                        </span>

                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">

                        <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{
                                width: `${Math.min(
                                    (current / target) * 100,
                                    100
                                )}%`,
                            }}
                        ></div>

                    </div>

                </div>

            )}

            <div className="mt-5">

                {unlocked ? (
                    <span className="text-green-700 font-semibold">
                        ✅ Unlocked
                    </span>
                ) : (
                    <span className="text-gray-500">
                        🔒 Locked
                    </span>
                )}

            </div>
        </div>
    );
}

export default AchievementCard;