import React, { useState } from 'react';
import { Button } from './ui/button';

interface GameMapProps {
  onLevelSelect: (level: number) => void;
  currentLevel: number;
  unlockedLevels: number;
}

export const GameMap: React.FC<GameMapProps> = ({ onLevelSelect, currentLevel, unlockedLevels }) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(currentLevel);

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

  const levels = [
    { id: 1, name: "Forest Start", icon: "🌲", description: `Score: ${levelScoreTargets[1].toLocaleString()}` },
    { id: 2, name: "Recycle Basic", icon: "♻️", description: `Score: ${levelScoreTargets[2].toLocaleString()}` },
    { id: 3, name: "Ocean Clean", icon: "🌊", description: `Score: ${levelScoreTargets[3].toLocaleString()}` },
    { id: 4, name: "Garden Growth", icon: "🌱", description: `Score: ${levelScoreTargets[4].toLocaleString()}` },
    { id: 5, name: "Solar Power", icon: "☀️", description: `Score: ${levelScoreTargets[5].toLocaleString()}` },
    { id: 6, name: "Plastic Crisis", icon: "🥤", description: `Score: ${levelScoreTargets[6].toLocaleString()}` },
    { id: 7, name: "Paper Rescue", icon: "📄", description: `Score: ${levelScoreTargets[7].toLocaleString()}` },
    { id: 8, name: "Metal Mania", icon: "⚡", description: `Score: ${levelScoreTargets[8].toLocaleString()}` },
  ];

  const handleLevelClick = (levelId: number) => {
    if (levelId <= unlockedLevels) {
      setSelectedLevel(levelId);
    }
  };

  const handlePlay = () => {
    if (selectedLevel) {
      onLevelSelect(selectedLevel);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-green-300 to-blue-400 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2" style={{
            fontFamily: '"Press Start 2P", monospace',
            color: '#000',
            textShadow: '2px 2px 0px #000'
          }}>
            ECO CRUSH
          </h1>
        </div>

        {/* Level Path */}
        <div className="relative">
          {/* Zigzag Path Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {levels.map((level, index) => {
              if (index === levels.length - 1) return null;
              
              const isLeft = index % 2 === 0;
              const currentY = index * 140 + 70;
              const nextY = (index + 1) * 140 + 70;
              
              // Calculate positions
              const currentX = isLeft ? 50 : 25; // percentage
              const nextX = isLeft ? 25 : 50; // percentage
              
              return (
                <g key={`path-${index}`}>
                  {/* Horizontal line from current level */}
                  <line
                    x1={`${currentX}%`}
                    y1={currentY}
                    x2={`${isLeft ? 75 : 25}%`}
                    y2={currentY}
                    stroke="#9ca3af"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                  />
                  
                  {/* Vertical line down */}
                  <line
                    x1={`${isLeft ? 75 : 25}%`}
                    y1={currentY}
                    x2={`${isLeft ? 75 : 25}%`}
                    y2={nextY - 60}
                    stroke="#9ca3af"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                  />
                  
                  {/* Horizontal line to next level */}
                  <line
                    x1={`${isLeft ? 75 : 25}%`}
                    y1={nextY - 60}
                    x2={`${nextX}%`}
                    y2={nextY - 60}
                    stroke="#9ca3af"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                  />
                </g>
              );
            })}
          </svg>

          {/* Level Nodes */}
          <div className="space-y-12">
            {levels.map((level, index) => {
              const isUnlocked = level.id <= unlockedLevels;
              const isSelected = selectedLevel === level.id;
              const isCurrent = level.id === currentLevel;
              const isLeft = index % 2 === 0;
              
              return (
                <div key={level.id} className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
                  {/* Level Node */}
                  <div
                    className={`relative w-28 h-28 cursor-pointer transition-all duration-300 ${
                      isUnlocked
                        ? isSelected || isCurrent
                          ? 'shadow-2xl scale-110'
                          : 'shadow-lg hover:scale-105'
                        : 'cursor-not-allowed opacity-50'
                    }`}
                    style={{
                      background: isUnlocked 
                        ? (isSelected || isCurrent 
                          ? 'linear-gradient(135deg, #4ade80, #fbbf24)' 
                          : 'linear-gradient(135deg, #22c55e, #16a34a)')
                        : '#e5e7eb',
                      borderRadius: '12px',
                      border: '3px solid #000',
                      boxShadow: isUnlocked 
                        ? '4px 4px 0px #000, 8px 8px 0px rgba(0,0,0,0.2)' 
                        : '2px 2px 0px #000',
                      marginLeft: isLeft ? '0' : 'auto',
                      marginRight: isLeft ? 'auto' : '0'
                    }}
                    onClick={() => handleLevelClick(level.id)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl" style={{
                        filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))'
                      }}>{level.icon}</span>
                    </div>
                    
                    {/* Lock Icon for locked levels */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-500 text-4xl">🔒</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Level Info */}
                  <div className={`absolute ${isLeft ? 'left-0' : 'right-0'} top-32 text-center w-32`}>
                    <h3 className="font-black text-black text-xs mb-1" style={{
                      textShadow: '1px 1px 0px rgba(255,255,255,0.8)',
                      fontFamily: '"Press Start 2P", monospace',
                      lineHeight: '1.2'
                    }}>{level.name}</h3>
                    <p className="text-xs text-black/70 font-semibold leading-tight" style={{
                      textShadow: '1px 1px 0px rgba(255,255,255,0.6)',
                      fontFamily: '"Press Start 2P", monospace',
                      lineHeight: '1.1'
                    }}>{level.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Play Button */}
        {selectedLevel && (
          <div className="text-center mt-12">
            <Button
              onClick={handlePlay}
              className="text-white font-black px-8 py-4 hover:scale-105 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '8px',
                border: '3px solid #000',
                boxShadow: '4px 4px 0px #000, 8px 8px 0px rgba(0,0,0,0.2)',
                textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                fontFamily: 'Arial Black, sans-serif',
                letterSpacing: '1px'
              }}
            >
              ▶️ PLAY NOW
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
