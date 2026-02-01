import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SpeciesPanel } from './components/SpeciesPanel/SpeciesPanel';
import { EcosystemMap } from './components/EcosystemMap/EcosystemMap';
import { EnvironmentPanel } from './components/EnvironmentPanel/EnvironmentPanel';
import { Timer } from './components/Timer/Timer';
import { Calculator } from './components/Calculator/Calculator';
import { useGameStore } from './store/gameStore';
import { speciesApi, telemetryApi } from './api/client';

function App() {
  const setAllSpecies = useGameStore(state => state.setAllSpecies);
  const telemetryEvents = useGameStore(state => state.telemetryEvents);

  useEffect(() => {
    // Load species on mount
    speciesApi.getAll().then(response => {
      setAllSpecies(response.data.species);
    }).catch(error => {
      console.error('Failed to load species:', error);
    });
  }, [setAllSpecies]);

  // Batch send telemetry every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (telemetryEvents.length > 0) {
        telemetryApi.log(telemetryEvents).catch(error => {
          console.error('Failed to log telemetry:', error);
        });
        useGameStore.setState({ telemetryEvents: [] });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [telemetryEvents]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-100">
        {/* Header */}
        <div className="bg-mckinsey-blue text-white p-4 shadow-lg">
          <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
            <h1 className="text-2xl font-bold">McKinsey Solve - Ecosystem Building</h1>
            <Timer />
          </div>
        </div>

        {/* Main 3-panel layout */}
        <div className="flex-1 grid grid-cols-[280px_1fr_280px] gap-4 p-4 max-w-screen-2xl mx-auto w-full overflow-hidden">
          <SpeciesPanel />
          <EcosystemMap />
          <EnvironmentPanel />
        </div>

        {/* Calculator */}
        <Calculator />
      </div>
    </DndProvider>
  );
}

export default App;
