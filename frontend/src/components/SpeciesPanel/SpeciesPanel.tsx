import { useGameStore } from '../../store/gameStore';
import { SpeciesCard } from './SpeciesCard';

export const SpeciesPanel: React.FC = () => {
  const allSpecies = useGameStore(state => state.allSpecies);

  return (
    <div className="h-full overflow-y-auto p-4 bg-gray-50">
      <h2 className="text-lg font-bold mb-3 text-mckinsey-blue">Species Database</h2>
      <p className="text-xs text-gray-600 mb-4">Drag species to the ecosystem map (select 8)</p>

      <div className="space-y-1">
        {allSpecies.map(species => (
          <SpeciesCard key={species.name} species={species} />
        ))}
      </div>
    </div>
  );
};
