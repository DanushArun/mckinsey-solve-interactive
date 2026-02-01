import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Location } from '../../types';

const PRESET_LOCATIONS: Location[] = [
  { depth: 5, temperature: 27.0, salinity: 33 },
  { depth: 25, temperature: 26.0, salinity: 35 },
  { depth: 35, temperature: 25.5, salinity: 34 },
];

export const EnvironmentPanel: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const setLocation = useGameStore(state => state.setLocation);
  const validationResult = useGameStore(state => state.validationResult);

  const handleLocationSelect = (idx: number) => {
    setSelectedIdx(idx);
    setLocation(PRESET_LOCATIONS[idx]);
  };

  return (
    <div className="h-full p-4 bg-gray-50 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-mckinsey-blue">Environment</h2>

      <div className="space-y-3">
        {PRESET_LOCATIONS.map((loc, idx) => (
          <button
            key={idx}
            onClick={() => handleLocationSelect(idx)}
            className={`
              w-full p-4 rounded-lg text-left border-2 transition-all
              ${selectedIdx === idx
                ? 'border-mckinsey-blue bg-mckinsey-light'
                : 'border-gray-300 bg-white hover:border-gray-400'
              }
            `}
          >
            <div className="font-semibold mb-2">Location {idx + 1}</div>
            <div className="text-sm space-y-1">
              <div>Depth: {loc.depth}m</div>
              <div>Temp: {loc.temperature}°C</div>
              <div>Salinity: {loc.salinity} ppt</div>
            </div>
          </button>
        ))}
      </div>

      {validationResult && (
        <div className={`
          mt-6 p-4 rounded-lg
          ${validationResult.valid ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'}
        `}>
          <div className="font-bold mb-2">
            {validationResult.valid ? '✓ Valid Ecosystem' : '✗ Invalid'}
          </div>
          {validationResult.reason && (
            <div className="text-sm">{validationResult.reason}</div>
          )}
        </div>
      )}
    </div>
  );
};
