import { useDrag } from 'react-dnd';
import { Species } from '../../types';

interface Props {
  species: Species;
}

export const SpeciesCard: React.FC<Props> = ({ species }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'SPECIES',
    item: { species },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`
        bg-white border-2 border-gray-300 rounded-lg p-3 mb-2 cursor-move
        hover:border-mckinsey-blue hover:shadow-md transition-all
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
    >
      <h3 className="font-bold text-mckinsey-blue text-sm">{species.name}</h3>
      <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
        <div>Provides: {species.calories_provided}</div>
        <div>Needs: {species.calories_needed}</div>
        <div className="col-span-2 text-gray-600">Depth: {species.depth_range}</div>
        <div className="col-span-2 text-gray-600">Temp: {species.temperature_range}</div>
      </div>
      {species.food_sources && (
        <div className="mt-2 text-xs text-gray-500">
          Eats: {species.food_sources}
        </div>
      )}
    </div>
  );
};
