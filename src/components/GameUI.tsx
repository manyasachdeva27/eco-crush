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
    <div className="flex justify-center items-center gap-8 mb-8">
      {/* Score */}
      <div className="bg-eco-compost text-primary-foreground px-6 py-3 rounded-full shadow-lg">
        <div className="text-sm font-medium opacity-90">SCORE</div>
        <div className="text-2xl font-bold">{score.toLocaleString()}</div>
      </div>

      {/* Level Progress */}
      <div className="flex-1 max-w-md">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">LEVEL {level}</span>
          <div className="w-8 h-8 bg-eco-recycle rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">★</span>
          </div>
        </div>
        <Progress value={65} className="h-3 bg-white/30">
          <div className="h-full eco-gradient-recycle rounded-full transition-all duration-300" />
        </Progress>
      </div>

      {/* Moves */}
      <div className="bg-eco-organic text-primary-foreground px-6 py-3 rounded-full shadow-lg">
        <div className="text-sm font-medium opacity-90">MOVES</div>
        <div className="text-2xl font-bold">{moves}</div>
      </div>
    </div>
  );
};