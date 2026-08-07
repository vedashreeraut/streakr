import {
  UserPlus,
  Flame,
} from "lucide-react";

function FriendCard({
  name,
  level,
  streak,
  xp,
}) {
  return (
    <div className="rounded-[30px] bg-white p-7 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition">

      <div className="flex justify-between">

        <div className="flex gap-4">

          <img
            src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${name}`}
            className="h-16 w-16 rounded-full"
          />

          <div>

            <h2 className="text-xl font-bold">
              {name}
            </h2>

            <p className="text-slate-500">
              Level {level}
            </p>

          </div>

        </div>

        <button className="rounded-xl bg-orange-100 p-3 hover:bg-orange-500 hover:text-white transition">
          <UserPlus size={18}/>
        </button>

      </div>

      <div className="mt-6 flex justify-between">

        <div>

          <p className="text-sm text-slate-500">
            XP
          </p>

          <h3 className="font-bold text-2xl">
            {xp}
          </h3>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Streak
          </p>

          <h3 className="font-bold text-2xl flex items-center gap-1">

            <Flame
              size={18}
              className="text-orange-500"
            />

            {streak}

          </h3>

        </div>

      </div>

    </div>
  );
}

export default FriendCard;