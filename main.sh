#!/bin/bash
# Set this to 1 to automatically attempt a fix when an error occurs while running npm start.
fix=0

# Stuff to do at first run(npm install).
if [[ -d "node_modules" && -n "$(find node_modules -prune -empty 2>/dev/null)" ]] || [[ ! -d "node_modules" ]]; then
  npm install
fi

npm start || [[ $fix = 1 ]] && npm install && npm update