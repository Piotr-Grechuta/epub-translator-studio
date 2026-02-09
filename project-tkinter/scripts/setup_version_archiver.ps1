param(
    [string]$RepoRoot = "",
    [string]$ArchiveRoot = "d:\Github\epub-translator-studio-versions",
    [int]$Keep = 40
)

$ErrorActionPreference = "Stop"

if (-not $RepoRoot) {
    $RepoRoot = (& git rev-parse --show-toplevel).Trim()
}
if (-not $RepoRoot) {
    throw "Cannot resolve repo root."
}

$repoPath = (Resolve-Path $RepoRoot).Path
$hookPath = Join-Path $repoPath ".git\hooks\post-commit"
$archiveScript = Join-Path $repoPath "project-tkinter\scripts\archive_repo_version.ps1"

if (-not (Test-Path $archiveScript)) {
    throw "Missing archive script: $archiveScript"
}

New-Item -ItemType Directory -Path (Join-Path $ArchiveRoot "archives") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $ArchiveRoot "meta") -Force | Out-Null

$content = @"
#!/bin/sh
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$archiveScript" -RepoRoot "$repoPath" -ArchiveRoot "$ArchiveRoot" -Keep $Keep >/dev/null 2>&1
"@

Set-Content -Path $hookPath -Value $content -Encoding ASCII
Write-Output "HOOK_INSTALLED: $hookPath"
