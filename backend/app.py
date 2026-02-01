from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
from typing import List

from models import ValidationRequest, ValidationResponse
from services.solver_service import SolverService
from services.telemetry_service import TelemetryService

app = FastAPI(
    title="McKinsey Solve Game API",
    description="Backend API for McKinsey Solve Game Interactive System",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
solver_service = SolverService()
telemetry_service = TelemetryService()


@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "McKinsey Solve Game API",
        "version": "1.0.0",
        "endpoints": {
            "species": "/api/species",
            "validate": "/api/validate",
            "telemetry": "/api/telemetry",
            "docs": "/docs"
        }
    }


@app.get("/api/species")
def get_species():
    """Load all 39 species from CSV"""
    try:
        # Load species from the mckinseysolvegame package
        species_csv_path = os.path.join(
            os.path.dirname(__file__),
            "../mckinseysolvegame/species.csv"
        )

        if not os.path.exists(species_csv_path):
            raise HTTPException(
                status_code=500,
                detail=f"Species CSV not found at {species_csv_path}"
            )

        df = pd.read_csv(species_csv_path)

        # Convert to list of dictionaries
        species_list = df.to_dict(orient="records")

        return {
            "count": len(species_list),
            "species": species_list
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading species: {str(e)}")


@app.post("/api/validate", response_model=ValidationResponse)
def validate_selection(request: ValidationRequest):
    """Validate species selection and location"""
    try:
        # Convert Pydantic models to dictionaries
        species_dicts = [s.model_dump() for s in request.species]
        location_dict = request.location.model_dump()

        # Validate
        result = solver_service.validate_selection(species_dicts, location_dict)

        return ValidationResponse(**result)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Validation error: {str(e)}"
        )


@app.post("/api/telemetry")
def log_telemetry(events: List[dict]):
    """Log telemetry events"""
    try:
        logged_count = telemetry_service.log_events(events)
        return {
            "status": "ok",
            "logged": logged_count
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Telemetry logging error: {str(e)}"
        )


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
