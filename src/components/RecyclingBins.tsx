import React from 'react';
import { Card } from './ui/card';

export const RecyclingBins: React.FC = () => {
  const bins = [
    {
      title: 'PLASTICS\n& METALS',
      gradient: 'eco-gradient-plastic',
      textColor: 'text-white',
      icon: '🔵',
      arrow: '↙️',
      emoji: '🥤'
    },
    {
      title: 'GLASS\n& PAPER',
      gradient: 'eco-gradient-glass',
      textColor: 'text-white',
      icon: '🟢',
      arrow: '⬇️',
      emoji: '🍶'
    },
    {
      title: 'ORGANICS',
      gradient: 'eco-gradient-organic',
      textColor: 'text-white',
      icon: '🟤',
      arrow: '↘️',
      emoji: '🍌'
    }
  ];

  return (
    <div className="flex justify-center gap-12 mt-10">
      {bins.map((bin, index) => (
        <div key={bin.title} className="flex flex-col items-center">
          {/* Arrow */}
          <div className="text-6xl mb-4 animate-bounce drop-shadow-lg" style={{ animationDelay: `${index * 0.3}s` }}>
            {bin.arrow}
          </div>
          
          {/* Bin */}
          <Card className={`${bin.gradient} ${bin.textColor} p-8 min-w-40 text-center shadow-2xl border-4 border-white/30 rounded-3xl hover:scale-105 transition-all duration-300 relative overflow-hidden`}>
            {/* Background pattern */}
            <div className="absolute inset-0 bg-white/10 opacity-50" />
            
            <div className="relative z-10">
              <div className="text-5xl mb-3 animate-float">{bin.emoji}</div>
              <div className="text-4xl mb-3">{bin.icon}</div>
              <div className="text-sm font-nunito font-black whitespace-pre-line leading-tight tracking-wide drop-shadow-lg">
                {bin.title}
              </div>
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </Card>
        </div>
      ))}
    </div>
  );
};