import React from 'react';
import { Progress } from './ui/progress';

interface GameUIProps {
  score: number;
  level: number;
  moves: number;
  maxMoves: number;
}

export const GameUI: React.FC<GameUIProps> = ({
  score,
  level,
  moves,
  maxMoves
}) => {
  const progressValue = ((maxMoves - moves) / maxMoves) * 100;

  return (
    <div className="flex justify-center items-center gap-8 mb-10">
      {/* Score */}
      <div className="eco-gradient-organic text-white px-8 py-4 rounded-2xl shadow-xl border-2 border-white/20 hover:scale-105 transition-all duration-300">
        <div className="text-sm font-nunito font-bold opacity-90 mb-1">🏆 SCORE</div>
        <div className="text-3xl font-nunito font-black text-game-score">{score.toLocaleString()}</div>
      </div>

      {/* Level Progress */}
      <div className="flex-1 max-w-md bg-white/20 p-4 rounded-2xl backdrop-blur-sm border-2 border-white/30">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-nunito font-bold text-foreground">🎯 LEVEL {level}</span>
          <div className="w-10 h-10 eco-gradient-gold rounded-full flex items-center justify-center animate-sparkle power-glow">
            <span className="text-white text-lg font-bold">⭐</span>
          </div>
        </div>
        <div className="relative">
          <Progress value={65} className="h-4 bg-white/40 rounded-full overflow-hidden">
            <div className="h-full eco-gradient-recycle rounded-full transition-all duration-500 relative">
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </Progress>
          <div className="absolute -top-1 left-0 w-full flex justify-between text-xs font-bold text-white pointer-events-none">
            <span className="drop-shadow-lg">🌱</span>
            <span className="drop-shadow-lg">♻️</span>
          </div>
        </div>
      </div>

      {/* Moves */}
      <div className="eco-gradient-plastic text-white px-8 py-4 rounded-2xl shadow-xl border-2 border-white/20 hover:scale-105 transition-all duration-300">
        <div className="text-sm font-nunito font-bold opacity-90 mb-1">⚡ MOVES</div>
        <div className="text-3xl font-nunito font-black text-game-score">{moves}</div>
      </div>
    </div>
  );
};