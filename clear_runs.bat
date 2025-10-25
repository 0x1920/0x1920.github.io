@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

REM --- Ayarlar ---
SET USER=0x1920
SET REPO=0x1920.github.io

REM --- Workflow run ID'lerini sil ---
echo =========================================
echo Workflow gecmisi temizleniyor...
echo =========================================

for /f "delims=" %%r in ('gh api repos/%USER%/%REPO%/actions/runs --paginate --jq ".workflow_runs[].id"') do (
    SET RUN_ID=%%r
    echo Siliniyor: Workflow Run ID !RUN_ID!
    gh api repos/%USER%/%REPO%/actions/runs/!RUN_ID! -X DELETE
    echo -----------------------------------------
)

echo =========================================
echo Deployment gecmisi temizleniyor...
echo =========================================

for /f "delims=" %%d in ('gh api repos/%USER%/%REPO%/deployments --paginate --jq ".[].id"') do (
    SET DEPLOY_ID=%%d
    echo Siliniyor: Deployment ID !DEPLOY_ID!
    gh api repos/%USER%/%REPO%/deployments/!DEPLOY_ID! -X DELETE
    echo -----------------------------------------
)

echo =========================================
echo Tum gecmis basariyla temizlendi!
echo =========================================

ENDLOCAL
pause
