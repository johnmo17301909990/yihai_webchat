import React from 'react';
import { Factor } from '../types';

interface FactorButtonProps {
  factorKey: string;
  factor: Factor;
  isSelected: boolean;
  onClick: () => void;
}

export function FactorButton({ factorKey, factor, isSelected, onClick }: FactorButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg transition-all ${
        isSelected ? `${factor.color} text-white` : 'bg-white hover:bg-gray-50'
      } shadow-sm`}
    >
      <h3 className="font-semibold">{factor.title}</h3>
      <p className={`text-sm mt-1 ${isSelected ? 'text-white' : 'text-gray-500'}`}>
        {factor.description}
      </p>
    </button>
  );
}