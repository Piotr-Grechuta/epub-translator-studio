# Regula archiwizacji wersji (lokalnie)

Foldery:
- repo glowny: `d:\Github\epub-translator-studio`
- repo testowy: `d:\Github\epub-translator-studio-test`
- archiwum wersji: `d:\Github\epub-translator-studio-versions`

Regula:
1. Kazdy lokalny `git commit` w repo glownym automatycznie odkłada archiwum ZIP kodu do:
- `d:\Github\epub-translator-studio-versions\archives`
2. Dla kazdego ZIP tworzony jest plik metadanych JSON w:
- `d:\Github\epub-translator-studio-versions\meta`
3. Nazwa pliku:
- `ets_YYYYMMDD-HHMMSS_<branch>_<shortsha>.zip`
4. Retencja:
- trzymane jest ostatnie `40` archiwow, starsze sa usuwane automatycznie.

Skrypty:
- instalacja hooka: `project-tkinter/scripts/setup_version_archiver.ps1`
- reczne utworzenie archiwum: `project-tkinter/scripts/archive_repo_version.ps1`
