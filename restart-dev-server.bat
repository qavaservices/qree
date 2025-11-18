@echo off
echo Finding process on port 5174...
netstat -ano | findstr :5174 | findstr LISTENING
echo.
echo Killing process on port 5174...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5174 ^| findstr LISTENING') do (
    echo Killing PID %%a
    taskkill /PID %%a /F
)
echo.
echo Starting dev server...
npm run dev

