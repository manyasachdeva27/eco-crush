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
    <div className="flex justify-center gap-6 mb-6">
      {/* Compost Bomb */}
      <Card className="p-4 bg-eco-compost/10 border-eco-compost/30 hover:bg-eco-compost/20 transition-colors">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-eco-compost rounded-full flex items-center justify-center mb-2 shadow-lg">
            <span className="text-2xl">💣</span>
          </div>
          <div className="text-sm font-bold text-eco-compost mb-1">COMPOST BOMB</div>
          <div className="text-xs text-center text-muted-foreground mb-3 max-w-24">
            Clears 3x3 area
          </div>
          <Button
            size="sm"
            onClick={() => onUsePowerUp('compost')}
            disabled={compostBombs === 0}
            className="bg-eco-compost hover:bg-eco-compost/80 text-white"
          >
            Use ({compostBombs})
          </Button>
        </div>
      </Card>

      {/* Recycling Boost */}
      <Card className="p-4 bg-eco-recycle/10 border-eco-recycle/30 hover:bg-eco-recycle/20 transition-colors">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-eco-recycle rounded-full flex items-center justify-center mb-2 shadow-lg animate-power-pulse">
            <span className="text-2xl">🌍</span>
          </div>
          <div className="text-sm font-bold text-eco-recycle mb-1">RECYCLING</div>
          <div className="text-sm font-bold text-eco-recycle mb-1">BOOST</div>
          <div className="text-xs text-center text-muted-foreground mb-3 max-w-24">
            Double points
          </div>
          <Button
            size="sm"
            onClick={() => onUsePowerUp('recycle')}
            disabled={recyclingBoosts === 0}
            className="eco-gradient-recycle hover:opacity-80 text-white"
          >
            Use ({recyclingBoosts})
          </Button>
        </div>
      </Card>
    </div>
  );
};