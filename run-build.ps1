Set-Location "D:\code\vue\mudu-dossier"
npx vite build 2>&1 | Out-File "D:\code\vue\mudu-dossier\build-check.txt" -Encoding utf8
"EXIT=$LASTEXITCODE" | Out-File "D:\code\vue\mudu-dossier\build-exit.txt" -Encoding utf8
