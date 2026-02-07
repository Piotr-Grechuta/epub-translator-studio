# EPUB Translator Studio

Langue: [English](README.md) | [Polski](README.pl.md) | [Deutsch](README.de.md) | [Espanol](README.es.md) | **Francais** | [Portugues](README.pt.md)

Boite a outils desktop pour traduire et editer des fichiers EPUB avec IA.

Mots-cles: voir `KEYWORDS.fr.txt`.

## Fonctions
- Traduction EPUB (`translate`) et post-edition (`edit`)
- Validation EPUB
- Translation Memory (TM) et cache de segments
- Workflow QA findings et QA gate
- Operations EPUB: front card, suppression couverture/images, editeur de segments
- File de projets (`pending`, `run all`)

## Variantes
- `project-tkinter/` (variante principale, Python + Tkinter)
- `project-web-desktop/` (Electron + FastAPI)
- `legacy/` (scripts racine archives, non recommande)

## Demarrage rapide

### Tkinter
```powershell
cd project-tkinter
python start.py
```

### Web Desktop
```powershell
cd project-web-desktop
.\run-backend.ps1
.\run-desktop.ps1
```

## Documentation
- Manuel utilisateur (PL): `project-tkinter/MANUAL_PL.md`
- Workflow Git (PL): `project-tkinter/GIT_WORKFLOW_PL.md`
- Infos support (PL): `SUPPORT_PL.md`

## Licence
- Licence: `PolyForm Noncommercial 1.0.0` (`LICENSE`)
- Copie et modification autorisees uniquement pour usage non commercial.
- Conserver attribution auteur et Required Notice (`NOTICE`, `AUTHORS`).
- Exemples pratiques (FR): `LICENSE_GUIDE_FR.md`

