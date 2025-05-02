#!/bin/bash

LOG_FILE="/tmp/backend-install.log"

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$LOG_FILE"
}

log "=== Installing backend dependencies ==="

cd /home/ec2-user/fastkart/backend || {
  log "Failed to cd into backend directory"
  exit 1
}

npm install >> "$LOG_FILE" 2>&1

log "npm install completed."
