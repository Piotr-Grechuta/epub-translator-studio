# EPUB Translator Studio

Idioma: [English](README.md) | [Polski](README.pl.md) | [Deutsch](README.de.md) | [Espanol](README.es.md) | [Francais](README.fr.md) | **Portugues**

Kit desktop para traducao e edicao de arquivos EPUB com IA.

Palavras-chave: veja `KEYWORDS.pt.txt`.

## O que faz
- Traducao EPUB (`translate`) e pos-edicao (`edit`)
- Validacao EPUB
- Translation Memory (TM) e cache de segmentos
- Fluxo de QA findings e QA gate
- Operacoes EPUB: front card, remocao de capa/imagens, editor de segmentos
- Fila de projetos (`pending`, `run all`)

## Variantes
- `project-tkinter/` (variante principal, Python + Tkinter)
- `project-web-desktop/` (Electron + FastAPI)
- `legacy/` (scripts raiz arquivados, nao recomendado)

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

## Documentacao
- Manual do usuario (PL): `project-tkinter/MANUAL_PL.md`
- Workflow Git (PL): `project-tkinter/GIT_WORKFLOW_PL.md`
- Informacoes de suporte (PL): `SUPPORT_PL.md`

## Licenca
- Licenca: `PolyForm Noncommercial 1.0.0` (`LICENSE`)
- Voce pode copiar e modificar apenas para fins nao comerciais.
- Mantenha atribuicao do autor e Required Notice (`NOTICE`, `AUTHORS`).
- Exemplos praticos (PT): `LICENSE_GUIDE_PT.md`

