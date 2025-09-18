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
        "w-full h-full flex items-center justify-center text-2xl transition-all duration-200",
        "hover:scale-110 cursor-pointer",
        isSelected && "animate-power-pulse scale-110",
        item.isMatched && "animate-match-explode"
      )}
    >
      <span 
        className={cn(
          "drop-shadow-sm",
          getItemColor(item.type),
          isSelected && "animate-bounce"
        )}
      >
        {getItemIcon(item.type)}
      </span>
    </div>
  );
};