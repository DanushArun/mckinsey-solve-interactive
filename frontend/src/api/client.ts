import axios from 'axios';
import { Species, Location, ValidationResult, TelemetryEvent } from '../types';

const api = axios.create({
  baseURL: '/api',
});

export const speciesApi = {
  getAll: () => api.get<{ count: number; species: Species[] }>('/species'),
};

export const validationApi = {
  validate: (species: Species[], location: Location) =>
    api.post<ValidationResult>('/validate', { species, location }),
};

export const telemetryApi = {
  log: (events: TelemetryEvent[]) =>
    api.post('/telemetry', events),
};
