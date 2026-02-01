import { useDrop } from 'react-dnd';
import { useGameStore } from '../../store/gameStore';
import { Species } from '../../types';

export const EcosystemMap: React.FC = () => {
  const selectedSpecies = useGameStore(state => state.selectedSpecies);
  const addSpecies = useGameStore(state => state.addSpecies);
  const removeSpecies = useGameStore(state => state.removeSpecies);

  const [{ isOver }, drop] = useDrop({
    accept: 'SPECIES',
    drop: (item: { species: Species }) => {
      addSpecies(item.species);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`
        h-full p-6 border-4 border-dashed rounded-lg
        ${isOver ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'}
        transition-colors
      `}
    >
      <h2 className="text-xl font-bold mb-4 text-mckinsey-blue">Ecosystem Map</h2>
      <p className="text-sm text-gray-600 mb-4">
        Selected: {selectedSpecies.length} / 8 species
      </p>

      <div className="grid grid-cols-2 gap-3">
        {selectedSpecies.map(species => (
          <div
            key={species.name}
            className="bg-mckinsey-light border border-mckinsey-blue rounded p-3 relative"
          >
            <div className="flex justify-between items-start">
              <span className="font-semibold text-sm pr-6">{species.name}</span>
              <button
                onClick={() => removeSpecies(species.name)}
                className="text-red-500 hover:text-red-700 font-bold absolute top-2 right-2"
              >
                ✕
              </button>
            </div>
            <div className="text-xs mt-2">
              <div>Provides: {species.calories_provided}</div>
              <div>Needs: {species.calories_needed}</div>
            </div>
          </div>
        ))}
      </div>

      {selectedSpecies.length === 0 && (
        <div className="text-center text-gray-400 mt-20 text-lg">
          Drop species here to build your ecosystem
        </div>
      )}
    </div>
  );
};
