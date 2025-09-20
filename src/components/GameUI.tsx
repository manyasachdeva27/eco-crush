import React from 'react';

interface GameUIProps {
  score: number;
  level: number;
  moves: number;
  maxMoves: number;
  targetScore?: number;
}

export const GameUI: React.FC<GameUIProps> = ({
  score,
  level,
  moves,
  maxMoves,
  targetScore
}) => {
  return (
    <div className="flex justify-center items-center gap-6 mb-6">
      {/* Score */}
      <div className="eco-gradient-organic text-white px-6 py-3 rounded-xl shadow-md">
        <div className="text-xs font-nunito font-bold opacity-90 mb-1">SCORE</div>
        <div className="text-2xl font-nunito font-black">{score.toLocaleString()}</div>
        {targetScore && (
          <div className="text-xs font-nunito font-bold opacity-80 mt-1">
            Target: {targetScore.toLocaleString()}
          </div>
        )}
      </div>

      {/* Level */}
      <div className="bg-white/20 px-6 py-3 rounded-xl shadow-md">
        <div className="text-xs font-nunito font-bold text-foreground mb-1">LEVEL</div>
        <div className="text-2xl font-nunito font-black text-foreground">{level}</div>
      </div>

      {/* Moves */}
      <div className="eco-gradient-plastic text-white px-6 py-3 rounded-xl shadow-md">
        <div className="text-xs font-nunito font-bold opacity-90 mb-1">MOVES</div>
        <div className="text-2xl font-nunito font-black">{moves}</div>
      </div>
    </div>
  );
};