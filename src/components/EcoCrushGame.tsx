import React, { useState, useEffect, useCallback } from 'react';
import { GameBoard } from './GameBoard';
import { GameUI } from './GameUI';
import { RecyclingBins } from './RecyclingBins';
import { PowerUps } from './PowerUps';
import { GameMap } from './GameMap';
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
  const [showMap, setShowMap] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [unlockedLevels, setUnlockedLevels] = useState(1);
  
  // Score targets for each level
  const levelScoreTargets = {
    1: 2500,
    2: 5000,
    3: 7500,
    4: 10000,
    5: 12500,
    6: 15000,
    7: 17500,
    8: 20000,
  };
  
  const [gameState, setGameState] = useState<GameState>({
    board: [],
    score: 0,
    level: 1,
    moves: 30,
    maxMoves: 30,
    powerUps: {
      compostBombs: 2,
      recyclingBoosts: 1,
    },
  });

  const [selectedItem, setSelectedItem] = useState<{row: number, col: number} | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activePowerUp, setActivePowerUp] = useState<null | 'compost' | 'recycle'>(null);
  const [doublePointsActive, setDoublePointsActive] = useState(false);

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

  // Fill empty spaces with new items
  const fillEmptySpaces = useCallback((board: (GameItem | null)[][]) => {
    const newBoard = board.map(row => [...row]);
    
    // Fill empty spaces from top to bottom
    for (let col = 0; col < BOARD_SIZE; col++) {
      for (let row = BOARD_SIZE - 1; row >= 0; row--) {
        if (newBoard[row][col] === null) {
          // Find the first non-null item above this position
          let foundItem = null;
          for (let checkRow = row - 1; checkRow >= 0; checkRow--) {
            if (newBoard[checkRow][col] !== null) {
              foundItem = newBoard[checkRow][col];
              newBoard[checkRow][col] = null;
              break;
            }
          }
          
          if (foundItem) {
            // Move the item down
            newBoard[row][col] = { ...foundItem, row, col };
          } else {
            // Generate new item
            const type = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
            newBoard[row][col] = {
              id: `${row}-${col}-${Date.now()}`,
              type,
              row,
              col,
            };
          }
        }
      }
    }
    
    return newBoard;
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

    // If a power-up target is active, apply it here
    if (activePowerUp === 'compost') {
      setActivePowerUp(null);
      setSelectedItem(null);
      setGameState(prev => {
        const updated = prev.board.map(r => r.map(c => (c ? { ...c } : null)));
        let cleared = 0;
        for (let r = row - 1; r <= row + 1; r++) {
          for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && updated[r][c]) {
              updated[r][c] = null;
              cleared++;
            }
          }
        }
        const gained = cleared * 100 * (doublePointsActive ? 2 : 1);
        if (doublePointsActive) setDoublePointsActive(false);
        
        // Fill empty spaces with new items
        const filledBoard = fillEmptySpaces(updated);
        
        return {
          ...prev,
          board: filledBoard,
          score: prev.score + gained,
          moves: prev.moves - 1,
        };
      });
      return;
    }

    if (activePowerUp === 'recycle') {
      setActivePowerUp(null);
      setDoublePointsActive(true);
      setSelectedItem(null);
      return;
    }
    
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
                
                // Fill empty spaces with new items
                const filledBoard = fillEmptySpaces(updatedBoard);
                
                return {
                  ...current,
                  board: filledBoard,
                  score: current.score + matches.length * 100 * (doublePointsActive ? 2 : 1),
                  moves: current.moves - 1,
                };
              });
              if (doublePointsActive) setDoublePointsActive(false);
              setIsAnimating(false);
            }, 400);
          }
          
          return {...prev, board: newBoard, moves: matches.length > 0 ? prev.moves : prev.moves - 1};
        });
      }
      
      setSelectedItem(null);
    }
  }, [selectedItem, isAnimating, checkMatches, activePowerUp, doublePointsActive]);

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
      setActivePowerUp('compost');
    } else if (type === 'recycle' && gameState.powerUps.recyclingBoosts > 0) {
      setGameState(prev => ({
        ...prev,
        powerUps: {
          ...prev.powerUps,
          recyclingBoosts: prev.powerUps.recyclingBoosts - 1,
        },
      }));
      setActivePowerUp('recycle');
    }
  }, [gameState.powerUps]);

  const handleLevelSelect = useCallback((level: number) => {
    setCurrentLevel(level);
    setShowMap(false);
    setSelectedItem(null);
    setActivePowerUp(null);
    setDoublePointsActive(false);
    setGameState(prev => ({
      ...prev,
      score: 0,
      level: level,
      moves: 30,
      maxMoves: 30,
    }));
    initializeBoard();
  }, [initializeBoard]);

  const handleBackToMap = useCallback(() => {
    setShowMap(true);
    setSelectedItem(null);
    setActivePowerUp(null);
    setDoublePointsActive(false);
  }, []);

  const handleLevelComplete = useCallback(() => {
    // Unlock next level
    if (currentLevel === unlockedLevels) {
      setUnlockedLevels(prev => Math.min(prev + 1, 8));
    }
    // Go back to map after level completion
    setTimeout(() => {
      setShowMap(true);
    }, 2000);
  }, [currentLevel, unlockedLevels]);

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  // Check for level completion based on score
  useEffect(() => {
    const targetScore = levelScoreTargets[currentLevel as keyof typeof levelScoreTargets];
    if (gameState.score >= targetScore) {
      // Level completed! Unlock next level and go back to map
      setTimeout(() => {
        if (currentLevel === unlockedLevels) {
          setUnlockedLevels(prev => Math.min(prev + 1, 8));
        }
        setShowMap(true);
      }, 1000);
    }
  }, [gameState.score, currentLevel, unlockedLevels, levelScoreTargets]);

  if (showMap) {
    return (
      <GameMap 
        onLevelSelect={handleLevelSelect}
        currentLevel={currentLevel}
        unlockedLevels={unlockedLevels}
      />
    );
  }

  return (
    <div className="min-h-screen eco-gradient-sky p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl mb-2" style={{
            fontFamily: '"Press Start 2P", monospace',
            color: '#333',
            textShadow: '2px 2px 0px #000'
          }}>
            ECO CRUSH
          </h1>
          <p className="text-lg font-nunito text-foreground opacity-80">
            Level {currentLevel} - Match waste items to save the planet
          </p>
        </div>

          {/* Game UI */}
          <GameUI 
            score={gameState.score}
            level={gameState.level}
            moves={gameState.moves}
            maxMoves={gameState.maxMoves}
            targetScore={levelScoreTargets[currentLevel as keyof typeof levelScoreTargets]}
          />

        {/* Game Board */}
        <div className="relative mb-4">
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

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button 
            variant="default" 
            size="lg" 
            className="eco-gradient-recycle text-white font-nunito font-bold text-lg px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-all duration-300"
            onClick={handleBackToMap}
          >
            🗺️ BACK TO MAP
          </Button>
        </div>
      </div>
    </div>
  );
};