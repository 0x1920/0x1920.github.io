@echo off
REM === Git geçmişini sıfırla ===
git checkout --orphan temiz-gecmis

git add -A

git commit -m "Initial commit"

git branch -D main

git branch -m main

git push -f origin main

pause
