function LeaderboardCard({
rank,
name,
xp,
}){

const colors=[
"bg-yellow-400",
"bg-gray-300",
"bg-orange-300"
]

return(

<div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow hover:shadow-xl transition">

<div className="flex items-center gap-5">

<div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-white ${colors[rank-1]||"bg-orange-500"}`}>
#{rank}
</div>

<img
src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${name}`}
className="h-14 w-14 rounded-full"
/>

<div>

<h2 className="font-bold">
{name}
</h2>

<p className="text-slate-500">
Level {Math.floor(xp/100)+1}
</p>

</div>

</div>

<div className="text-right">

<p className="text-2xl font-black">
{xp}
</p>

<p className="text-slate-500">
XP
</p>

</div>

</div>

)

}

export default LeaderboardCard;