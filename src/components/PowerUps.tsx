import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface PowerUpsProps {
  compostBombs: number;
  recyclingBoosts: number;
  onUsePowerUp: (type: 'compost' | 'recycle') => void;
}

export const PowerUps: React.FC<PowerUpsProps> = ({
  compostBombs,
  recyclingBoosts,
  onUsePowerUp
}) => {
  return (
    <div className="flex justify-center gap-8 mb-8">
      {/* Compost Bomb */}
      <Card className="p-6 bg-white/20 border-4 border-eco-compost/50 hover:bg-white/30 transition-all duration-300 rounded-3xl shadow-2xl hover:scale-105 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 eco-gradient-organic rounded-full flex items-center justify-center mb-4 shadow-xl border-4 border-white/30 animate-float">
            <span className="text-4xl">💣</span>
          </div>
          <div className="text-lg font-fredoka font-bold text-eco-compost mb-2 text-center">
            COMPOST BOMB
          </div>
          <div className="text-sm text-center text-foreground mb-4 max-w-32 font-nunito font-semibold bg-white/30 px-3 py-1 rounded-full">
            💥 Clears 3x3 area
          </div>
          <Button
            size="sm"
            onClick={() => onUsePowerUp('compost')}
            disabled={compostBombs === 0}
            className="eco-gradient-organic hover:scale-110 text-white font-nunito font-bold px-4 py-2 rounded-2xl shadow-lg transition-all duration-300 border-2 border-white/30"
          >
            🚀 Use ({compostBombs})
          </Button>
        </div>
      </Card>

      {/* Recycling Boost */}
      <Card className="p-6 bg-white/20 border-4 border-eco-recycle/50 hover:bg-white/30 transition-all duration-300 rounded-3xl shadow-2xl hover:scale-105 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 eco-gradient-recycle rounded-full flex items-center justify-center mb-4 shadow-xl border-4 border-white/30 animate-power-pulse power-glow">
            <span className="text-4xl">🌍</span>
          </div>
          <div className="text-lg font-fredoka font-bold text-eco-recycle mb-2 text-center">
            RECYCLING BOOST
          </div>
          <div className="text-sm text-center text-foreground mb-4 max-w-32 font-nunito font-semibold bg-white/30 px-3 py-1 rounded-full">
            ⚡ Double points
          </div>
          <Button
            size="sm"
            onClick={() => onUsePowerUp('recycle')}
            disabled={recyclingBoosts === 0}
            className="eco-gradient-recycle hover:scale-110 text-white font-nunito font-bold px-4 py-2 rounded-2xl shadow-lg transition-all duration-300 border-2 border-white/30"
          >
            ⭐ Use ({recyclingBoosts})
          </Button>
        </div>
      </Card>
    </div>
  );
};