#!/usr/bin/env python3.11
"""Quick test script for the FastAPI backend"""

import sys
import pandas as pd
from services.solver_service import SolverService

# Test loading species
species_csv = "../mckinseysolvegame/species.csv"
df = pd.read_csv(species_csv)
print(f"Loaded {len(df)} species")
print(df.head())

# Test solver service
solver = SolverService()

# Get first 8 species as test
test_species = df.head(8).to_dict(orient='records')
print(f"\nTesting with {len(test_species)} species...")

# Test location - compatible with 0-10m depth range
test_location = {
    "depth": 5,
    "temperature": 27.0,
    "salinity": 33
}

# Validate
result = solver.validate_selection(test_species, test_location)
print(f"\nValidation result: {result}")
