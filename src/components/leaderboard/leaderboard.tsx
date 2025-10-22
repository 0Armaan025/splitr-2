import React from "react";
import { Poppins } from "next/font/google";

const poppinsFont = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

interface LeaderboardProps {
  title?: string;
  players: {
    rank: number;
    name: string;
    score: number;
    avatar?: string;
  }[];
}

const Leaderboard = ({ title = "Leaderboard", players }: LeaderboardProps) => {
  return (
    <div className="wrapper ml-16 w-full max-w-4xl">
    <div
      className={`${poppinsFont.className} leaderboard w-auto mx-auto bg-white border-4 border-black rounded-xl p-6 shadow-[6px_6px_0_rgba(0,0,0,1)]`}
    >
      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">{title}</h3>

      <div className="grid grid-cols-12 gap-4 items-center py-2 border-b border-gray-300 font-semibold text-gray-800">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-2 text-center">Avatar</div>
        <div className="col-span-6">Name</div>
        <div className="col-span-3 text-right">Score</div>
      </div>

      <div className="max-h-72 overflow-y-auto">
        {players.map((player, index) => (
          <div
            key={`${player.rank}-${index}`}
            className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-gray-100 transition-all border-b border-gray-200"
          >
            <div className="col-span-1 text-center font-bold">{player.rank}</div>
            <div className="col-span-2 flex justify-center">
              {player.avatar ? (
                <img
                  src={player.avatar}
                  alt={player.name}
                  className="w-10 h-10 rounded-full border-2 border-black"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center font-bold">
                  {player.name[0].toUpperCase()}
                </div>
              )}
            </div>
            <div className="col-span-6">{player.name}</div>
            <div className="col-span-3 text-right font-semibold">{player.score}</div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Leaderboard;
