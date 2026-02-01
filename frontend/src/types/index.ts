export interface Species {
  name: string;
  calories_provided: number;
  calories_needed: number;
  depth_range: string;
  temperature_range: string;
  food_sources: string;
}

export interface Location {
  depth: number;
  temperature: number;
  salinity: number;
}

export interface ValidationResult {
  valid: boolean;
  reason?: string;
  food_chain?: Record<string, any>;
}

export interface TelemetryEvent {
  type: 'click' | 'mouse_move' | 'species_select' | 'species_remove' | 'location_change';
  timestamp: number;
  data?: any;
}
