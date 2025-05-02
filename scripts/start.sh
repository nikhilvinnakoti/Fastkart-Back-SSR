#!/bin/bash

LOG_FILE="/tmp/backend-start.log"

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$LOG_FILE"
}

log "=== Starting backend server ==="

cd /home/ec2-user/fastkart/backend || {
  log "Failed to cd into backend directory"
  exit 1
}

npm start >> "$LOG_FILE" 2>&1 &

log "Backend server started."
