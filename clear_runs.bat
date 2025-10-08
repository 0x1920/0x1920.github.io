@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

REM --- Ayarlar ---
SET USER=0x1920
SET REPO=0x1920.github.io

REM --- Tüm workflow run ID'lerini al ---
for /f "delims=" %%r in ('gh api repos/%USER%/%REPO%/actions/runs --paginate --jq ".workflow_runs[].id"') do (
    SET RUN_ID=%%r
    echo Deleting Run ID !RUN_ID!
    gh api repos/%USER%/%REPO%/actions/runs/!RUN_ID! -X DELETE >nul
)

ENDLOCAL
