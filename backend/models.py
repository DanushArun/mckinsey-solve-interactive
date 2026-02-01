from pydantic import BaseModel
from typing import List, Optional


class SpeciesModel(BaseModel):
    name: str
    calories_provided: int
    calories_needed: int
    depth_range: str
    temperature_range: str
    food_sources: str  # Semicolon-separated


class LocationModel(BaseModel):
    depth: int
    temperature: float
    salinity: float


class ValidationRequest(BaseModel):
    species: List[SpeciesModel]
    location: LocationModel


class ValidationResponse(BaseModel):
    valid: bool
    reason: Optional[str] = None
    food_chain: Optional[dict] = None
