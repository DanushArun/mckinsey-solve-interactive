import json
from datetime import datetime
from typing import List


class TelemetryService:
    def __init__(self, log_file: str = "telemetry_log.jsonl"):
        self.log_file = log_file

    def log_events(self, events: List[dict]) -> int:
        """Append telemetry events to JSONL file"""
        logged_count = 0
        try:
            with open(self.log_file, "a") as f:
                for event in events:
                    event["server_timestamp"] = datetime.utcnow().isoformat()
                    f.write(json.dumps(event) + "\n")
                    logged_count += 1
        except Exception as e:
            print(f"Error logging telemetry: {e}")

        return logged_count
