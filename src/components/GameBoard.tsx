import React from 'react';
import { GameItem } from './GameItem';
import type { GameItem as GameItemType } from './EcoCrushGame';

interface GameBoardProps {
  board: (GameItemType | null)[][];
  onItemClick: (row: number, col: number) => void;
  selectedItem: {row: number, col: number} | null;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onItemClick,
  selectedItem
}) => {
  return (
    <div className="flex justify-center">
      <div className="eco-gradient-board p-8 rounded-3xl game-board-glow border-4 border-white/30">
        <div className="grid grid-cols-8 gap-3 bg-white/30 p-6 rounded-2xl backdrop-blur-sm border-2 border-white/40">
          {board.map((row, rowIndex) =>
            row.map((item, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-14 h-14 bg-card rounded-2xl border-3 border-white/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
                onClick={() => onItemClick(rowIndex, colIndex)}
              >
                {/* Sparkle background for empty cells */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                
                {item && (
                  <GameItem
                    item={item}
                    isSelected={selectedItem?.row === rowIndex && selectedItem?.col === colIndex}
                  />
                )}
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-eco-gold/20 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-2xl" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};