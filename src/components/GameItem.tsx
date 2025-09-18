import React from 'react';
import { cn } from '@/lib/utils';
import type { GameItem as GameItemType } from './EcoCrushGame';

interface GameItemProps {
  item: GameItemType;
  isSelected?: boolean;
}

const getItemIcon = (type: GameItemType['type']) => {
  switch (type) {
    case 'plastic':
      return '🧴'; // Plastic bottle
    case 'glass':
      return '🍶'; // Glass bottle
    case 'organic':
      return '🍌'; // Banana/organic waste
    case 'metal':
      return '🥤'; // Soda can
    case 'paper':
      return '📦'; // Cardboard box
    case 'can':
      return '🥫'; // Food can
    default:
      return '♻️';
  }
};

const getItemColor = (type: GameItemType['type']) => {
  switch (type) {
    case 'plastic':
      return 'text-eco-plastic';
    case 'glass':
      return 'text-eco-glass';
    case 'organic':
      return 'text-eco-organic';
    case 'metal':
      return 'text-eco-metal';
    case 'paper':
      return 'text-eco-paper';
    case 'can':
      return 'text-eco-metal';
    default:
      return 'text-eco-recycle';
  }
};

export const GameItem: React.FC<GameItemProps> = ({ item, isSelected = false }) => {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center text-3xl transition-all duration-300 relative",
        "hover:scale-125 cursor-pointer",
        isSelected && "animate-power-pulse scale-125 item-glow",
        item.isMatched && "animate-match-explode"
      )}
    >
      {/* Background glow effect */}
      {isSelected && (
        <div className="absolute inset-0 bg-eco-gold/30 rounded-2xl animate-pulse" />
      )}
      
      <span 
        className={cn(
          "drop-shadow-lg relative z-10 font-bold",
          getItemColor(item.type),
          isSelected && "animate-wiggle text-4xl",
          "hover:rotate-12 transition-transform duration-200"
        )}
        style={{
          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        }}
      >
        {getItemIcon(item.type)}
      </span>
      
      {/* Sparkle effects for special items */}
      {isSelected && (
        <>
          <div className="absolute top-1 right-1 text-xs animate-sparkle">✨</div>
          <div className="absolute bottom-1 left-1 text-xs animate-sparkle" style={{animationDelay: '0.5s'}}>⭐</div>
        </>
      )}
    </div>
  );
};