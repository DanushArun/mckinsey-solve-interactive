import { create } from 'zustand';
import { Species, Location, ValidationResult, TelemetryEvent } from '../types';
import { validationApi } from '../api/client';

interface GameState {
  // State
  allSpecies: Species[];
  selectedSpecies: Species[];
  currentLocation: Location | null;
  validationResult: ValidationResult | null;
  telemetryEvents: TelemetryEvent[];
  timeRemaining: number; // seconds

  // Actions
  setAllSpecies: (species: Species[]) => void;
  addSpecies: (species: Species) => void;
  removeSpecies: (speciesName: string) => void;
  setLocation: (location: Location) => void;
  validateSelection: () => Promise<void>;
  trackEvent: (event: TelemetryEvent) => void;
  decrementTimer: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  allSpecies: [],
  selectedSpecies: [],
  currentLocation: null,
  validationResult: null,
  telemetryEvents: [],
  timeRemaining: 35 * 60, // 35 minutes in seconds

  setAllSpecies: (species) => set({ allSpecies: species }),

  addSpecies: (species) => {
    const { selectedSpecies } = get();
    if (selectedSpecies.length < 8 && !selectedSpecies.find(s => s.name === species.name)) {
      set({ selectedSpecies: [...selectedSpecies, species] });
      get().trackEvent({
        type: 'species_select',
        timestamp: Date.now(),
        data: { species: species.name },
      });
      get().validateSelection();
    }
  },

  removeSpecies: (speciesName) => {
    set({ selectedSpecies: get().selectedSpecies.filter(s => s.name !== speciesName) });
    get().trackEvent({
      type: 'species_remove',
      timestamp: Date.now(),
      data: { species: speciesName },
    });
    get().validateSelection();
  },

  setLocation: (location) => {
    set({ currentLocation: location });
    get().trackEvent({
      type: 'location_change',
      timestamp: Date.now(),
      data: location,
    });
    get().validateSelection();
  },

  validateSelection: async () => {
    const { selectedSpecies, currentLocation } = get();
    if (selectedSpecies.length === 8 && currentLocation) {
      try {
        const response = await validationApi.validate(selectedSpecies, currentLocation);
        set({ validationResult: response.data });
      } catch (error) {
        console.error('Validation error:', error);
        set({ validationResult: { valid: false, reason: 'Validation failed' } });
      }
    } else {
      set({ validationResult: null });
    }
  },

  trackEvent: (event) => {
    set({ telemetryEvents: [...get().telemetryEvents, event] });
  },

  decrementTimer: () => {
    const timeRemaining = get().timeRemaining - 1;
    set({ timeRemaining: Math.max(0, timeRemaining) });
  },
}));
