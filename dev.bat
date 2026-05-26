@echo off
echo Loading VS Build Tools...
call "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvars64.bat" > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: VS Build Tools not found at expected path.
    echo Install: winget install --id Microsoft.VisualStudio.2022.BuildTools --silent --override "--wait --quiet --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"
    exit /b 1
)
echo Starting AgentLoft...
echo.
cargo tauri dev
