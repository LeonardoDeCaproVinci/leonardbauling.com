param(
    [int]$Port = 5151,
    [string]$SiteName = "leonardbauling.com-local",
    [string]$HostName = "localhost"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Info($message) {
    Write-Host "[Deploy-LocalIIS] $message"
}

if (-not ([bool](net session 2>$null))) {
    throw "Run this script in an elevated PowerShell session (Administrator)."
}

Import-Module WebAdministration

$sourceRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$deployRoot = "C:\inetpub\$SiteName"

Write-Info "Source: $sourceRoot"
Write-Info "Deploy: $deployRoot"

New-Item -ItemType Directory -Path $deployRoot -Force | Out-Null

$exclude = @(".git", ".github")

Get-ChildItem -LiteralPath $sourceRoot -Force | ForEach-Object {
    if ($exclude -contains $_.Name) { return }
    $destination = Join-Path $deployRoot $_.Name
    Copy-Item -LiteralPath $_.FullName -Destination $destination -Recurse -Force
}

$appPoolName = "$SiteName-pool"
if (-not (Test-Path "IIS:\AppPools\$appPoolName")) {
    New-WebAppPool -Name $appPoolName | Out-Null
}
Set-ItemProperty "IIS:\AppPools\$appPoolName" -Name managedRuntimeVersion -Value ""

if (Get-Website -Name $SiteName -ErrorAction SilentlyContinue) {
    Remove-Website -Name $SiteName
}

New-Website -Name $SiteName -Port $Port -HostHeader $HostName -PhysicalPath $deployRoot -ApplicationPool $appPoolName | Out-Null

Write-Info "Local IIS site created."
Write-Info "URL: http://$HostName`:$Port/"
