@echo off
echo Starting Backend Server...
start cmd /k "cd backend && node server.js"

echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting... You can close this window.
