import React from 'react';
import { Card } from './ui/card';

export const RecyclingBins: React.FC = () => {
  const bins = [
    {
      title: 'PLASTICS\n& METALS',
      color: 'bg-eco-plastic',
      textColor: 'text-white',
      icon: '♻️',
      arrow: '↙️'
    },
    {
      title: 'GLASS\n& PAPER',
      color: 'bg-eco-glass',
      textColor: 'text-white',
      icon: '♻️',
      arrow: '⬇️'
    },
    {
      title: 'ORGANICS',
      color: 'bg-eco-organic',
      textColor: 'text-white',
      icon: '♻️',
      arrow: '↘️'
    }
  ];

  return (
    <div className="flex justify-center gap-8 mt-8">
      {bins.map((bin, index) => (
        <div key={bin.title} className="flex flex-col items-center">
          {/* Arrow */}
          <div className="text-4xl mb-2 animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
            {bin.arrow}
          </div>
          
          {/* Bin */}
          <Card className={`${bin.color} ${bin.textColor} p-6 min-w-32 text-center shadow-xl`}>
            <div className="text-3xl mb-2">{bin.icon}</div>
            <div className="text-sm font-bold whitespace-pre-line leading-tight">
              {bin.title}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};