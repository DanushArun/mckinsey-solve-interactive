from typing import List, Dict, Any
import pandas as pd
import sys
import os

# Add mckinseysolvegame to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../mckinseysolvegame'))

from mckinseysolvegame.services.optimization_service import OptimizationService


class SolverService:
    def __init__(self):
        self.solver = OptimizationService()

    def solve_food_chain(self, species_data: List[dict]) -> Dict[str, Any]:
        """Call mckinseysolvegame solver"""
        df = pd.DataFrame(species_data)

        # The OptimizationService expects specific column names
        # Ensure the dataframe has the correct format
        result = self.solver.solve(df)
        return result

    def validate_selection(self, species_list: List[dict], location: dict) -> Dict[str, Any]:
        """Validate 8-species selection"""
        # Check if we have exactly 8 species
        if len(species_list) != 8:
            return {
                "valid": False,
                "reason": f"Must select exactly 8 species (currently have {len(species_list)})"
            }

        # Check environment compatibility for each species
        for species in species_list:
            if not self._check_environment(species, location):
                return {
                    "valid": False,
                    "reason": f"{species['name']} is incompatible with the selected location environment"
                }

        # Check food chain sustainability
        try:
            result = self.solve_food_chain(species_list)

            # Check if solution was found
            if result and result.get('success'):
                return {
                    "valid": True,
                    "food_chain": result
                }
            else:
                return {
                    "valid": False,
                    "reason": "No sustainable food chain found with these species"
                }
        except Exception as e:
            return {
                "valid": False,
                "reason": f"Validation error: {str(e)}"
            }

    def _check_environment(self, species: dict, location: dict) -> bool:
        """Check if species can survive in location"""
        try:
            # Parse depth_range: "0-10m" -> [0, 10]
            depth_str = species["depth_range"].replace("m", "").replace(" ", "")
            if "-" in depth_str:
                depth_parts = depth_str.split("-")
                depth_min = int(depth_parts[0])
                depth_max = int(depth_parts[1])
            else:
                # Single value
                depth_min = depth_max = int(depth_str)

            if not (depth_min <= location["depth"] <= depth_max):
                return False

            # Parse temperature_range: "26.7-28.2" -> [26.7, 28.2]
            temp_str = species["temperature_range"].replace(" ", "")
            if "-" in temp_str:
                temp_parts = temp_str.split("-")
                temp_min = float(temp_parts[0])
                temp_max = float(temp_parts[1])
            else:
                # Single value
                temp_min = temp_max = float(temp_str)

            if not (temp_min <= location["temperature"] <= temp_max):
                return False

            return True
        except Exception as e:
            print(f"Error checking environment for {species.get('name', 'unknown')}: {e}")
            return False
