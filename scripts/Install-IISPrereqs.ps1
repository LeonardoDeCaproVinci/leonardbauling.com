Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Info($message) {
    Write-Host "[Install-IISPrereqs] $message"
}

if (-not ([bool](net session 2>$null))) {
    throw "Run this script in an elevated PowerShell session (Administrator)."
}

$features = @(
    "IIS-WebServerRole",
    "IIS-WebServer",
    "IIS-CommonHttpFeatures",
    "IIS-StaticContent",
    "IIS-DefaultDocument",
    "IIS-HttpErrors",
    "IIS-HealthAndDiagnostics",
    "IIS-HttpLogging",
    "IIS-Performance",
    "IIS-HttpCompressionStatic",
    "IIS-Security",
    "IIS-RequestFiltering",
    "IIS-ManagementConsole"
)

Write-Info "Enabling IIS features..."
Enable-WindowsOptionalFeature -Online -FeatureName $features -All -NoRestart | Out-Null

Write-Info "IIS prerequisite installation complete."
Write-Info "If prompted by Windows in your environment, restart before running Deploy-LocalIIS.ps1."
