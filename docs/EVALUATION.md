# Ecosystem Practice — Evaluation guide

Start with the smallest path that exercises the project. Distinguish source inspection,
syntax/build checks, functional behavior and domain validation when recording a result.

## Guided reading and demonstration

1. **Load the catalog.** The frontend asks the species endpoint for selectable records. Verify the
backend and its external solver dependency before judging UI completeness.

2. **Choose the environment.** Inspect the selected depth, temperature and salinity conditions;
the adapter applies environmental checks to the candidate species.

3. **Assemble the ecosystem.** Drag species into the map and inspect automatic validation
feedback. The timer and calculator support practice, not official assessment scoring.

4. **Read validation and telemetry.** Inspect the food-chain result and local event logging. A
valid practice selection is not a measured probability of success in an official assessment.

## Declared checks

These commands/checks describe the intended verification path. Their presence in this
guide does not claim that they passed. See the dated evidence below and the README for setup.

```text
cd backend && pytest
cd frontend && npm run build
```

## Evidence levels

| Level | What it establishes | What it does not establish |
| --- | --- | --- |
| Source review | A path exists in tracked code | Successful runtime behavior |
| Syntax/build | Parser/compiler accepts that path | End-to-end correctness |
| Behavioral check | A specific input/output case passed | Generalization beyond cases |
| Domain evaluation | Performance on a stated target setting | Other users/data/environments |

## What to record

- Commit, environment, dependency versions and date.
- Input provenance and whether data is synthetic, public or privately supplied.
- Absolute pass/fail/skip counts; keep failed cases and their root causes.
- Whether external services, hardware or a production deployment were actually exercised.
- Expected output and an artifact showing the observation.

## Review scenarios

- **Separate UI and solver:** The interface delegates food-chain reasoning to a Python service.

- **Environment checks are explicit:** Location compatibility is distinct from calorie feasibility.

- **No invented success percentage:** Repository source cannot establish assessment success
probability.

## Documentation inspection — 7 October 2026

The documentation was traced to committed source and checked for local links, balanced
code fences and supported implementation claims. Historical notebook outputs remain labeled
as historical. Live provider access, private databases and hardware behavior are not inferred
from configuration or dependency files. Any fresh run is recorded separately in the README.

## Next evidence to collect

- Supply and pin the compatible solver dependency.
- Run API tests and record fixture-based validation results.
- Verify interaction and timer behavior in the browser.
