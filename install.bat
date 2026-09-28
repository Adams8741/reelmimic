@echo off
rem ReelMimic - one-time setup: Python packages, web app, UI build, environment check.
cd /d "%~dp0"
if "%PYTHON%"=="" set PYTHON=python
echo == Python packages
%PYTHON% -m pip install -r requirements.txt || goto :err
echo == Web app
cd app
call npm install || goto :err
call npm run build || goto :err
echo == Environment check
node scripts\doctor.mjs
echo.
echo Next: install and log in to Claude Code (npm i -g @anthropic-ai/claude-code, then run claude) or Codex (npm i -g @openai/codex, then codex login),
echo optional keys in %USERPROFILE%\.reelmimic\secrets.json, then double-click start.bat
pause
exit /b 0
:err
echo Setup failed - see the messages above.
pause
exit /b 1
