#!/bin/bash
# scripts/report.sh

# 1. Create a report file with today's date inside ./notes
mkdir -p ./notes
REPORT_FILE="./notes/report_$(date +%Y-%m-%d).txt"

# 2. Add the following info:
{
    # - Current username
    echo "Username: $(whoami)"
    
    # - Current path
    echo "Current Path: $(pwd)"
    
    # - Number of files inside ./data
    FILE_COUNT=$(ls ./data 2>/dev/null | wc -l)
    echo "File Count in ./data: $FILE_COUNT"
} > "$REPORT_FILE"

# 3. Print a success message at the end of execution
echo "Report created successfully: $REPORT_FILE"
