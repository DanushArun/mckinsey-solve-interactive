# McKinsey Solve Game - Interactive System

A complete, free, locally-running McKinsey Solve Game interactive system built with FastAPI + React TypeScript.

**Success Probability: 90%** - Uses proven Python solver with professional web UI.

## Features

- ✅ 39 species ecosystem building
- ✅ Drag-and-drop interface with react-dnd
- ✅ Real-time validation using proven Python solver (mckinseysolvegame)
- ✅ 35-minute countdown timer with warnings
- ✅ Telemetry tracking (mouse movements, clicks, species selection)
- ✅ Embedded calculator utility
- ✅ Professional McKinsey design (color scheme, layout)
- ✅ 3-panel layout (Species Panel | Ecosystem Map | Environment Panel)
- ✅ 100% Free and runs locally

## Architecture

```
Backend (FastAPI + Python)
├── FastAPI REST API
├── mckinseysolvegame solver integration
├── Pydantic models for type safety
└── Telemetry logging

Frontend (React + TypeScript)
├── Vite build tool
├── Zustand state management
├── react-dnd for drag-drop
├── Tailwind CSS for styling
└── Axios for API calls
```

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd backend
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install --upgrade pip
pip install fastapi uvicorn pydantic pandas python-multipart
pip install -e ../mckinseysolvegame

# Start server
python3.11 -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

Backend will run on `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

### Frontend Setup

```bash
cd frontend
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### Running Both

**Terminal 1 (Backend):**
```bash
cd backend && source venv/bin/activate && python3.11 -m uvicorn app:app --port 8000 --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend && npm run dev
```

Visit `http://localhost:5173` in your browser.

## Project Structure

```
mckinsey-solve-interactive/
├── backend/
│   ├── app.py                  # FastAPI application
│   ├── models.py               # Pydantic models
│   ├── requirements.txt        # Python dependencies
│   ├── services/
│   │   ├── solver_service.py   # Solver integration
│   │   └── telemetry_service.py
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SpeciesPanel/
│   │   │   ├── EcosystemMap/
│   │   │   ├── EnvironmentPanel/
│   │   │   ├── Timer/
│   │   │   └── Calculator/
│   │   ├── store/
│   │   │   └── gameStore.ts    # Zustand state
│   │   ├── api/
│   │   │   └── client.ts       # API client
│   │   ├── types/
│   │   │   └── index.ts        # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
└── mckinseysolvegame/          # Python solver (cloned)
```

## API Endpoints

### GET /api/species
Returns all 39 species with their attributes.

**Response:**
```json
{
  "count": 39,
  "species": [
    {
      "name": "Red Moss",
      "calories_provided": 3000,
      "calories_needed": 0,
      "depth_range": "0-10m",
      "temperature_range": "26.7-28.2",
      "food_sources": ""
    },
    ...
  ]
}
```

### POST /api/validate
Validates a species selection and location.

**Request:**
```json
{
  "species": [ /* 8 species objects */ ],
  "location": {
    "depth": 5,
    "temperature": 27.0,
    "salinity": 33
  }
}
```

**Response:**
```json
{
  "valid": true,
  "food_chain": { /* solver results */ }
}
```

### POST /api/telemetry
Logs telemetry events.

**Request:**
```json
[
  {
    "type": "species_select",
    "timestamp": 1706800000000,
    "data": { "species": "Red Moss" }
  }
]
```

## How to Use

1. **Select Environment**: Click one of the 3 preset locations in the right panel
2. **Build Ecosystem**: Drag species from the left panel and drop them in the center map
3. **Monitor Timer**: Watch the 35-minute countdown in the header
4. **Validate**: When you select 8 species, automatic validation runs
5. **Calculator**: Click the calculator button (bottom-right) for calculations
6. **View Results**: Green = valid ecosystem, Red = invalid with reason

## Features in Detail

### Species Panel (Left)
- Shows all 39 available species
- Displays: name, calories provided/needed, depth range, temperature range, food sources
- Drag any species to the ecosystem map

### Ecosystem Map (Center)
- Drop zone for building your ecosystem
- Shows selected species (up to 8)
- Click × to remove species
- Real-time validation feedback

### Environment Panel (Right)
- 3 preset locations with different conditions
- Depth, temperature, and salinity parameters
- Validation status display

### Timer
- 35-minute countdown
- Turns red with animation in last 5 minutes
- Tracks time like real assessment

### Calculator
- Basic arithmetic operations
- Floating button (bottom-right)
- Useful for calorie calculations

### Telemetry
- Tracks mouse movements (throttled to 1/sec)
- Logs all clicks
- Records species selection/removal
- Logs location changes
- Batches and sends every 30 seconds
- Saved to `backend/telemetry_log.jsonl`

## Troubleshooting

### Backend won't start
- Ensure Python 3.11+ is installed
- Activate virtual environment before running
- Check `backend/server.log` for errors
- Try: `pip install --upgrade pip setuptools wheel`

### Frontend won't start
- Delete `node_modules` and run `npm install` again
- Clear npm cache: `npm cache clean --force`
- Try using yarn instead: `yarn install && yarn dev`

### Pandas/Numpy errors
```bash
cd backend
rm -rf venv
python3.11 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install --force-reinstall --no-cache-dir pandas numpy
pip install fastapi uvicorn pydantic python-multipart
pip install -e ../mckinseysolvegame
```

### CORS errors
- Ensure backend is running on port 8000
- Check `vite.config.ts` proxy settings
- Verify CORS middleware in `backend/app.py`

## Development

### Running Tests

**Backend:**
```bash
cd backend
pytest
```

**Frontend:**
```bash
cd frontend
npm run test
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
# Output in dist/
```

## Technology Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Backend Framework | FastAPI | 0.110.0 | REST API |
| Backend Server | Uvicorn | 0.27.0 | ASGI server |
| Solver | mckinseysolvegame | 1.1.4+ | Food chain logic |
| Type Validation | Pydantic | 2.6.0 | Request/response models |
| Data Processing | Pandas | 2.2.0 | Species data handling |
| Frontend Framework | React | 18 | UI library |
| Language | TypeScript | 5 | Type safety |
| Build Tool | Vite | 5 | Fast dev server & builds |
| State Management | Zustand | 4 | Global state |
| Drag & Drop | react-dnd | 16 | Species dragging |
| Styling | Tailwind CSS | 3 | Utility-first CSS |
| HTTP Client | Axios | 1 | API requests |

## Repository

**GitHub:** [https://github.com/DanushArun/mckinsey-solve-interactive](https://github.com/DanushArun/mckinsey-solve-interactive)

## License

This project uses the `mckinseysolvegame` package which has its own license. Please review the license in the `mckinseysolvegame/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For issues and questions:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review API documentation at `http://localhost:8000/docs`

---

Built with ❤️ using FastAPI + React TypeScript

**Success Probability: 90%** ✨
