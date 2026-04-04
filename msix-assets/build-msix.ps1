#Requires -RunAsAdministrator
<#
.SYNOPSIS
    Build MSIX package for OpenClawForWindows from Electron output.
.DESCRIPTION
    This script takes the Electron packager output and creates an MSIX package
    ready for Microsoft Store submission.
.NOTES
    Requirements:
    - Windows 10/11
    - Windows SDK (for makeappx.exe and signtool.exe)
    - Run as Administrator
#>

param(
    [string]$ElectronDir = ".\OpenClawForWindows-win32-x64",
    [string]$OutputMsix = ".\OpenClawForWindows.msix",
    [string]$CertPath = "",
    [string]$CertPassword = ""
)

$ErrorActionPreference = "Stop"

# Find Windows SDK tools
$sdkPaths = @(
    "${env:ProgramFiles(x86)}\Windows Kits\10\bin\10.0.22621.0\x64",
    "${env:ProgramFiles(x86)}\Windows Kits\10\bin\10.0.19041.0\x64",
    "${env:ProgramFiles(x86)}\Windows Kits\10\bin\10.0.22000.0\x64"
)

$sdkBin = $sdkPaths | Where-Object { Test-Path "$_\makeappx.exe" } | Select-Object -First 1

if (-not $sdkBin) {
    Write-Error "Windows SDK not found. Install from: https://developer.microsoft.com/windows/downloads/windows-sdk/"
    exit 1
}

$makeappx = Join-Path $sdkBin "makeappx.exe"
$signtool = Join-Path $sdkBin "signtool.exe"

Write-Host "Using SDK tools from: $sdkBin" -ForegroundColor Cyan

# Step 1: Prepare staging directory
$stagingDir = ".\msix-staging"
if (Test-Path $stagingDir) { Remove-Item $stagingDir -Recurse -Force }
New-Item -ItemType Directory -Path $stagingDir | Out-Null

Write-Host "1/4 - Copying Electron app files..." -ForegroundColor Yellow
Copy-Item -Path "$ElectronDir\*" -Destination $stagingDir -Recurse

# Step 2: Copy MSIX assets (manifest + images)
Write-Host "2/4 - Adding MSIX manifest and assets..." -ForegroundColor Yellow
Copy-Item -Path ".\AppxManifest.xml" -Destination $stagingDir
Copy-Item -Path ".\Images" -Destination "$stagingDir\Images" -Recurse

# Step 3: Create MSIX
Write-Host "3/4 - Creating MSIX package..." -ForegroundColor Yellow
& $makeappx pack /d $stagingDir /p $OutputMsix /o
if ($LASTEXITCODE -ne 0) { Write-Error "makeappx failed"; exit 1 }

# Step 4: Sign (optional)
if ($CertPath -and (Test-Path $CertPath)) {
    Write-Host "4/4 - Signing package..." -ForegroundColor Yellow
    if ($CertPassword) {
        & $signtool sign /fd SHA256 /f $CertPath /p $CertPassword $OutputMsix
    } else {
        & $signtool sign /fd SHA256 /f $CertPath $OutputMsix
    }
    if ($LASTEXITCODE -ne 0) { Write-Error "Signing failed"; exit 1 }
    Write-Host "Package signed successfully!" -ForegroundColor Green
} else {
    Write-Host "4/4 - Skipping signing (no certificate provided)" -ForegroundColor DarkYellow
    Write-Host "  To sign: .\build-msix.ps1 -CertPath .\cert.pfx -CertPassword 'password'" -ForegroundColor DarkGray
}

# Cleanup
Remove-Item $stagingDir -Recurse -Force

Write-Host ""
Write-Host "MSIX package created: $OutputMsix" -ForegroundColor Green
Write-Host "Upload this file to Microsoft Partner Center." -ForegroundColor Cyan
