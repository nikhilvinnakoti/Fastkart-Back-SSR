#!/bin/bash

LOG_FILE="/tmp/backend-stop.log"

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$LOG_FILE"
}

log "=== Stopping backend server ==="

BACKEND_PID=$(ps aux | grep 'node' | grep -v grep | awk '{print $2}')

if [ -n "$BACKEND_PID" ]; then
  log "Stopping backend process with PID: $BACKEND_PID"
  kill -9 "$BACKEND_PID"
  log "Backend process stopped."
else
  log "No backend process found."
fi
