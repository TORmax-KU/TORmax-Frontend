# OWASP ZAP Baseline scan (DAST) of the running frontend.
# Prerequisite: the stack is up from the root folder (docker compose up -d --build).
# Usage (from TORment-Frontend):  .\security\zap\run-zap.ps1
# Output: security/zap/reports/zap-frontend-report.html (+ .json), gitignored.

$ErrorActionPreference = "Stop"
$zapDir = $PSScriptRoot
$compose = Join-Path $zapDir "..\..\..\docker-compose.yaml"

$frontend = docker compose -f $compose ps -q frontend
if (-not $frontend) { throw "Frontend container is not running. Run 'docker compose up -d --build' from the root folder first." }

New-Item -ItemType Directory -Force (Join-Path $zapDir "reports") | Out-Null

# --network container:<frontend> lets ZAP open the site as http://localhost:3000. Next.js 16 dev mode
# blocks dev resources requested from other hosts, such as host.docker.internal.
# The Baseline scan spiders the site and only checks responses passively, so it sends no attacks.
# ZAP logs to stderr; Windows PowerShell 5.1 would treat that as a fatal error under "Stop".
$ErrorActionPreference = "Continue"
docker run --rm `
  --network "container:$frontend" `
  -v "${zapDir}:/zap/wrk:rw" `
  ghcr.io/zaproxy/zaproxy:stable `
  zap-baseline.py `
  -t http://localhost:3000 `
  -m 2 `
  -r reports/zap-frontend-report.html `
  -J reports/zap-frontend-report.json `
  -I

# Exit codes: 0 = no alerts at FAIL level, 1 = FAIL alerts, 3 = ZAP error. Warnings never fail (-I).
Write-Host "ZAP exit code: $LASTEXITCODE"
Write-Host "Report: $(Join-Path $zapDir 'reports\zap-frontend-report.html')"
