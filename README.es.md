# EPUB Translator Studio

Idioma: [English](README.md) | [Polski](README.pl.md) | [Deutsch](README.de.md) | **Espanol** | [Francais](README.fr.md) | [Portugues](README.pt.md)

Kit de escritorio para traducir y editar archivos EPUB con IA.

Palabras clave: ver `KEYWORDS.es.txt`.

## Que hace
- Traduccion EPUB (`translate`) y post-edicion (`edit`)
- Validacion EPUB
- Translation Memory (TM) y cache de segmentos
- Flujo de QA findings y QA gate
- Operaciones EPUB: front card, quitar portada/imagenes, editor de segmentos
- Cola de proyectos (`pending`, `run all`)

## Variantes
- `project-tkinter/` (variante principal, Python + Tkinter)
- `project-web-desktop/` (Electron + FastAPI)
- `legacy/` (scripts raiz archivados, no recomendado)

## Inicio rapido

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

## Documentacion
- Manual de usuario (PL): `project-tkinter/MANUAL_PL.md`
- Flujo Git (PL): `project-tkinter/GIT_WORKFLOW_PL.md`
- Soporte (PL): `SUPPORT_PL.md`

## Licencia
- Licencia: `PolyForm Noncommercial 1.0.0` (`LICENSE`)
- Puedes copiar y modificar solo para fines no comerciales.
- Mantener atribucion del autor y Required Notice (`NOTICE`, `AUTHORS`).
- Ejemplos practicos (ES): `LICENSE_GUIDE_ES.md`

