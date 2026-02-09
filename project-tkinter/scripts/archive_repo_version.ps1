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
$archivesDir = Join-Path $ArchiveRoot "archives"
$metaDir = Join-Path $ArchiveRoot "meta"
New-Item -ItemType Directory -Path $archivesDir -Force | Out-Null
New-Item -ItemType Directory -Path $metaDir -Force | Out-Null

$shortSha = (& git -C $repoPath rev-parse --short HEAD).Trim()
$fullSha = (& git -C $repoPath rev-parse HEAD).Trim()
$branch = (& git -C $repoPath rev-parse --abbrev-ref HEAD).Trim()
$branchSafe = ($branch -replace "[^a-zA-Z0-9._-]", "_")
$timestamp = [DateTime]::UtcNow.ToString("yyyyMMdd-HHmmss")
$baseName = "ets_${timestamp}_${branchSafe}_${shortSha}"

$tmpZip = Join-Path $repoPath ".git\$baseName.tmp.zip"
$finalZip = Join-Path $archivesDir "$baseName.zip"
$metaFile = Join-Path $metaDir "$baseName.json"

if (Test-Path $tmpZip) {
    Remove-Item -Force $tmpZip
}

& git -C $repoPath archive --format=zip --output=$tmpZip HEAD
if ($LASTEXITCODE -ne 0) {
    throw "git archive failed."
}

Move-Item -Path $tmpZip -Destination $finalZip -Force

$meta = [ordered]@{
    created_utc = [DateTime]::UtcNow.ToString("o")
    repo_root = $repoPath
    branch = $branch
    commit = $fullSha
    commit_short = $shortSha
    archive_zip = $finalZip
}
$meta | ConvertTo-Json -Depth 4 | Set-Content -Path $metaFile -Encoding UTF8

$zipFiles = Get-ChildItem -Path $archivesDir -File -Filter "*.zip" | Sort-Object LastWriteTime -Descending
if ($zipFiles.Count -gt $Keep) {
    $toDelete = $zipFiles | Select-Object -Skip $Keep
    foreach ($f in $toDelete) {
        $json = Join-Path $metaDir ([System.IO.Path]::GetFileNameWithoutExtension($f.Name) + ".json")
        Remove-Item -Force $f.FullName -ErrorAction SilentlyContinue
        Remove-Item -Force $json -ErrorAction SilentlyContinue
    }
}

Write-Output "ARCHIVED: $finalZip"
