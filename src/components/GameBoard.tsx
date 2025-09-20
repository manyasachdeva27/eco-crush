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
      <div className="eco-gradient-board p-6 rounded-2xl shadow-lg">
        <div className="grid grid-cols-8 gap-2 bg-white/20 p-4 rounded-xl">
          {board.map((row, rowIndex) =>
            row.map((item, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-16 h-16 bg-card rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
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