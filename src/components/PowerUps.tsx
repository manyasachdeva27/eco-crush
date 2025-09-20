import React from 'react';
import { Button } from './ui/button';

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
      {/* Biodegradable Waste Bin */}
      <div className="bg-blue-100 p-6 rounded-2xl shadow-lg border-2 border-blue-200">
        <div className="flex flex-col items-center">
          <div className="text-5xl mb-3">🗑️</div>
          <div className="text-sm font-black text-gray-800 mb-3" style={{
            fontFamily: 'Arial Black, sans-serif',
            textShadow: '1px 1px 0px rgba(0,0,0,0.1)'
          }}>
            BIODEGRADABLE
          </div>
          <div className="text-xs text-gray-600 mb-4 text-center">
            Organic waste that decomposes naturally
          </div>
          <Button
            size="sm"
            onClick={() => onUsePowerUp('compost')}
            disabled={compostBombs === 0}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-full text-xs"
            style={{
              fontFamily: 'Arial Black, sans-serif',
              textShadow: '1px 1px 0px rgba(0,0,0,0.2)'
            }}
          >
            Use ({compostBombs})
          </Button>
        </div>
      </div>

      {/* Non-Biodegradable Waste Bin */}
      <div className="bg-blue-100 p-6 rounded-2xl shadow-lg border-2 border-blue-200">
        <div className="flex flex-col items-center">
          <div className="text-5xl mb-3">🌍</div>
          <div className="text-sm font-black text-gray-800 mb-3" style={{
            fontFamily: 'Arial Black, sans-serif',
            textShadow: '1px 1px 0px rgba(0,0,0,0.1)'
          }}>
            NON-BIODEGRADABLE
          </div>
          <div className="text-xs text-gray-600 mb-4 text-center">
            Plastic, metal, glass that doesn't decompose
          </div>
          <Button
            size="sm"
            onClick={() => onUsePowerUp('recycle')}
            disabled={recyclingBoosts === 0}
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-full text-xs"
            style={{
              fontFamily: 'Arial Black, sans-serif',
              textShadow: '1px 1px 0px rgba(0,0,0,0.2)'
            }}
          >
            Use ({recyclingBoosts})
          </Button>
        </div>
      </div>
    </div>
  );
};