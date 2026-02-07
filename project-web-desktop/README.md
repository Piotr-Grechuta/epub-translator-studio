# Translator Studio Desktop (Web)

Projekt web/desktop (Electron + FastAPI) z funkcjonalnoscia operacyjna zblizona do wersji Tkinter:
- konfiguracja parametrow runu,
- tryb `translate` / `edit` z oddzielnymi sciezkami output/prompt/cache,
- zarzadzanie projektami (nowy, zapis, wybor, usuniecie),
- zarzadzanie profilami krokow (zapis i wczytanie),
- kolejka projektow (`pending`, uruchom nastepny, run-all pending),
- historia runow per projekt,
- start tlumaczenia i walidacji EPUB,
- stop procesu,
- status procesu i log live,
- zapis/odczyt konfiguracji,
- pobieranie list modeli (Ollama/Google),
- pickery plikow z poziomu okna desktop (bez recznego wpisywania sciezek).

## Struktura
- `backend/` API + runner procesu
- `backend/engine/` lokalna kopia `tlumacz_ollama.py`
- `desktop/` aplikacja Electron

## Szybki start
W katalogu `project-web-desktop`:

1. Backend:
```powershell
.\run-backend.ps1
```

2. Desktop:
```powershell
.\run-desktop.ps1
```

## Parametry
Frontend zapisuje config do `backend/ui_state.json`.
Domyślna baza TM: `backend/translator_studio.db`.

## Wersjonowanie
- Jedno zrodlo wersji: `project-web-desktop/VERSION`
- Backend API zwraca wersje pod `GET /version`
- Desktop UI pokazuje te sama wersje w topbar (przez `preload.js`)
- `desktop/package.json` i `desktop/package-lock.json` sa trzymane w tej samej wersji semver

## Uwagi
To jest aktywnie rozwijany wariant webowy. Obecna wersja pokrywa glowny workflow projektu (projekt/profil/kolejka/run/log).
Zakladki QA/TM/Studio Tools z Tkinter nadal wymagaja osobnej migracji.

## Wariant 0 (wspolny core)
Backend webowy korzysta ze wspolnego modułu runtime z `project-tkinter/runtime_core.py`.
Priorytet translacji:
1. `project-tkinter/tlumacz_ollama.py` (kanoniczny),
2. fallback: `project-web-desktop/backend/engine/tlumacz_ollama.py`.

To oznacza, ze poprawki w logice uruchomienia/translacji z wariantu Tkinter są automatycznie widoczne w wariancie web-desktop.

## Wsparcie projektu
- Sponsor: https://github.com/sponsors/piotrgrechuta-web
- Link jest tez dostepny w topbar aplikacji desktop (`Wesprzyj projekt`).
