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
      <div className="eco-gradient-board p-6 rounded-3xl game-board-glow">
        <div className="grid grid-cols-8 gap-2 bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
          {board.map((row, rowIndex) =>
            row.map((item, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-12 h-12 bg-card rounded-xl border-2 border-white/30 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => onItemClick(rowIndex, colIndex)}
              >
                {item && (
                  <GameItem
                    item={item}
                    isSelected={selectedItem?.row === rowIndex && selectedItem?.col === colIndex}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};