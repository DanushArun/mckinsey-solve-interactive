# Ecosystem Practice — Architecture and implementation

This guide follows the tracked implementation. Proposed work is identified separately.

## The problem and the system boundary

Ecosystem practice involves choosing compatible species while tracking food and environmental
constraints. This interface combines a visual selection canvas, timer and calculator with a solver
adapter, so selections can be inspected through feedback rather than a static worksheet.

## Processing path

```mermaid
flowchart LR
    N0["Species selection"]
    N1["Environment checks"]
    N2["External solver"]
    N3["Validation UI"]
    N0 --> N1
    N1 --> N2
    N2 --> N3
```

## End-to-end behavior

### 1. Load the catalog

The frontend asks the species endpoint for selectable records. Verify the backend and its external
solver dependency before judging UI completeness.

### 2. Choose the environment

Inspect the selected depth, temperature and salinity conditions; the adapter applies environmental
checks to the candidate species.

### 3. Assemble the ecosystem

Drag species into the map and inspect automatic validation feedback. The timer and calculator
support practice, not official assessment scoring.

### 4. Read validation and telemetry

Inspect the food-chain result and local event logging. A valid practice selection is not a
measured probability of success in an official assessment.

## Design choices and consequences

### Separate UI and solver

The interface delegates food-chain reasoning to a Python service.

### Environment checks are explicit

Location compatibility is distinct from calorie feasibility.

### No invented success percentage

Repository source cannot establish assessment success probability.

## Source entry points

### [backend/app.py](../backend/app.py)

- `root` — Root endpoint
- `get_species` — Load all 39 species from CSV
- `validate_selection` — Validate species selection and location
- `log_telemetry` — Log telemetry events
- `health_check` — Health check endpoint

### [backend/services/solver_service.py](../backend/services/solver_service.py)

- `SolverService` — Implementation entry; inspect source for its exact behavior.
- `__init__` — Implementation entry; inspect source for its exact behavior.
- `solve_food_chain` — Call mckinseysolvegame solver
- `validate_selection` — Validate 8-species selection
- `_check_environment` — Check if species can survive in location

### [backend/services/telemetry_service.py](../backend/services/telemetry_service.py)

- `TelemetryService` — Implementation entry; inspect source for its exact behavior.
- `__init__` — Implementation entry; inspect source for its exact behavior.
- `log_events` — Append telemetry events to JSONL file

### [frontend/src/store/gameStore.ts](../frontend/src/store/gameStore.ts)

This file is part of the reviewed path described above. Follow its imports and calls
for the exact interface rather than inferring behavior from the filename.

###
[EcosystemMap.tsx](../frontend/src/components/EcosystemMap/EcosystemMap.tsx)

This file is part of the reviewed path described above. Follow its imports and calls
for the exact interface rather than inferring behavior from the filename.

## Implementation state

| State | Evidence boundary |
| --- | --- |
| Present | Species/environment UI, timer and calculator |
| Present | Validation/telemetry adapter source |
| Missing dependency | mckinseysolvegame installation in this checkout |
| Not measured | Official assessment outcomes or end-to-end reliability |

“Present” means tracked source or assets exist. It does not mean a production or domain
validation has passed. See [Evaluation](EVALUATION.md) for reproducible checks and limits.
