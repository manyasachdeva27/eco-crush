import React, { useState, useEffect, useCallback } from 'react';
import { GameBoard } from './GameBoard';
import { GameUI } from './GameUI';
import { RecyclingBins } from './RecyclingBins';
import { PowerUps } from './PowerUps';
import { Button } from './ui/button';

export type ItemType = 'plastic' | 'glass' | 'organic' | 'metal' | 'paper' | 'can';

export interface GameItem {
  id: string;
  type: ItemType;
  row: number;
  col: number;
  isMatched?: boolean;
  isSelected?: boolean;
}

export interface GameState {
  board: (GameItem | null)[][];
  score: number;
  level: number;
  moves: number;
  maxMoves: number;
  powerUps: {
    compostBombs: number;
    recyclingBoosts: number;
  };
}

const BOARD_SIZE = 8;
const ITEM_TYPES: ItemType[] = ['plastic', 'glass', 'organic', 'metal', 'paper', 'can'];

export const EcoCrushGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: [],
    score: 1250,
    level: 7,
    moves: 25,
    maxMoves: 30,
    powerUps: {
      compostBombs: 2,
      recyclingBoosts: 1,
    },
  });

  const [selectedItem, setSelectedItem] = useState<{row: number, col: number} | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize board
  const initializeBoard = useCallback(() => {
    const newBoard: (GameItem | null)[][] = [];
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      newBoard[row] = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        const type = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
        newBoard[row][col] = {
          id: `${row}-${col}-${Date.now()}`,
          type,
          row,
          col,
        };
      }
    }
    
    setGameState(prev => ({ ...prev, board: newBoard }));
  }, []);

  // Check for matches
  const checkMatches = useCallback((board: (GameItem | null)[][]) => {
    const matches: {row: number, col: number}[] = [];
    
    // Check horizontal matches
    for (let row = 0; row < BOARD_SIZE; row++) {
      let count = 1;
      for (let col = 1; col < BOARD_SIZE; col++) {
        if (board[row][col] && board[row][col-1] && 
            board[row][col]?.type === board[row][col-1]?.type) {
          count++;
        } else {
          if (count >= 3) {
            for (let i = col - count; i < col; i++) {
              matches.push({row, col: i});
            }
          }
          count = 1;
        }
      }
      if (count >= 3) {
        for (let i = BOARD_SIZE - count; i < BOARD_SIZE; i++) {
          matches.push({row, col: i});
        }
      }
    }
    
    // Check vertical matches
    for (let col = 0; col < BOARD_SIZE; col++) {
      let count = 1;
      for (let row = 1; row < BOARD_SIZE; row++) {
        if (board[row][col] && board[row-1][col] && 
            board[row][col]?.type === board[row-1][col]?.type) {
          count++;
        } else {
          if (count >= 3) {
            for (let i = row - count; i < row; i++) {
              matches.push({row: i, col});
            }
          }
          count = 1;
        }
      }
      if (count >= 3) {
        for (let i = BOARD_SIZE - count; i < BOARD_SIZE; i++) {
          matches.push({row: i, col});
        }
      }
    }
    
    return matches;
  }, []);

  // Handle item selection and swapping
  const handleItemClick = useCallback((row: number, col: number) => {
    if (isAnimating) return;
    
    if (!selectedItem) {
      setSelectedItem({row, col});
      setGameState(prev => {
        const newBoard = prev.board.map(r => r.map(item => item ? {...item, isSelected: false} : null));
        if (newBoard[row][col]) {
          newBoard[row][col]!.isSelected = true;
        }
        return {...prev, board: newBoard};
      });
    } else {
      const isAdjacent = 
        (Math.abs(selectedItem.row - row) === 1 && selectedItem.col === col) ||
        (Math.abs(selectedItem.col - col) === 1 && selectedItem.row === row);
      
      if (isAdjacent) {
        // Swap items
        setGameState(prev => {
          const newBoard = prev.board.map(r => r.map(item => item ? {...item, isSelected: false} : null));
          const temp = newBoard[selectedItem.row][selectedItem.col];
          newBoard[selectedItem.row][selectedItem.col] = newBoard[row][col];
          newBoard[row][col] = temp;
          
          // Check for matches after swap
          const matches = checkMatches(newBoard);
          if (matches.length > 0) {
            setIsAnimating(true);
            setTimeout(() => {
              setGameState(current => {
                const updatedBoard = current.board.map(r => [...r]);
                matches.forEach(match => {
                  updatedBoard[match.row][match.col] = null;
                });
                
                return {
                  ...current,
                  board: updatedBoard,
                  score: current.score + matches.length * 100,
                  moves: current.moves - 1,
                };
              });
              setIsAnimating(false);
            }, 400);
          }
          
          return {...prev, board: newBoard, moves: matches.length > 0 ? prev.moves : prev.moves - 1};
        });
      }
      
      setSelectedItem(null);
    }
  }, [selectedItem, isAnimating, checkMatches]);

  // Use power-up
  const usePowerUp = useCallback((type: 'compost' | 'recycle') => {
    if (type === 'compost' && gameState.powerUps.compostBombs > 0) {
      setGameState(prev => ({
        ...prev,
        powerUps: {
          ...prev.powerUps,
          compostBombs: prev.powerUps.compostBombs - 1,
        },
      }));
      // Add compost bomb logic here
    } else if (type === 'recycle' && gameState.powerUps.recyclingBoosts > 0) {
      setGameState(prev => ({
        ...prev,
        powerUps: {
          ...prev.powerUps,
          recyclingBoosts: prev.powerUps.recyclingBoosts - 1,
        },
      }));
      // Add recycling boost logic here
    }
  }, [gameState.powerUps]);

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  return (
    <div className="min-h-screen eco-gradient-sky p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-8xl font-fredoka font-bold text-game-title mb-4 animate-float">
            ECO CRUSH
          </h1>
          <p className="text-xl font-nunito font-semibold text-foreground opacity-90 mb-2">
            🌍 Match waste items to save the planet! 🌱
          </p>
          <div className="flex justify-center gap-2 text-2xl animate-sparkle">
            ♻️✨🌿✨♻️
          </div>
        </div>

        {/* Game UI */}
        <GameUI 
          score={gameState.score}
          level={gameState.level}
          moves={gameState.moves}
          maxMoves={gameState.maxMoves}
        />

        {/* Game Board */}
        <div className="relative mb-6">
          <GameBoard 
            board={gameState.board}
            onItemClick={handleItemClick}
            selectedItem={selectedItem}
          />
        </div>

        {/* Power-ups */}
        <PowerUps 
          compostBombs={gameState.powerUps.compostBombs}
          recyclingBoosts={gameState.powerUps.recyclingBoosts}
          onUsePowerUp={usePowerUp}
        />

        {/* Recycling Bins */}
        <RecyclingBins />

        {/* Control Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <Button 
            variant="default" 
            size="lg" 
            className="eco-gradient-recycle text-white font-nunito font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 animate-power-pulse"
          >
            🎮 PLAY
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            className="eco-gradient-organic text-white font-nunito font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            ⚙️ OPTIONS
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            className="eco-gradient-gold text-white font-nunito font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 power-glow"
          >
            ⭐ DAILY CHALLENGE
          </Button>
        </div>
      </div>
    </div>
  );
};