const API = 'http://127.0.0.1:8765';
const SUPPORT_URL = 'https://github.com/sponsors/piotrgrechuta-web';
const REPO_URL = 'https://github.com/piotrgrechuta-web/epu2pl';

const ids = [
  'provider','model','input_epub','output_epub','prompt','glossary','cache','ollama_host','google_api_key',
  'source_lang','target_lang','timeout','attempts','backoff','batch_max_segs','batch_max_chars','sleep',
  'temperature','num_ctx','num_predict','tags','use_cache','use_glossary'
];

const verEl = document.getElementById('ver');
const msgEl = document.getElementById('msg');
const statusEl = document.getElementById('status');
const logEl = document.getElementById('log');
const setupWinEl = document.getElementById('setup-win');
const setupLinuxEl = document.getElementById('setup-linux');
const setupMacEl = document.getElementById('setup-macos');
const setupHintEl = document.getElementById('os-hint');

verEl.textContent = `${window.appInfo.name} v${window.appInfo.version}`;

const setupCommands = {
  windows: [
    '# Ollama (lokalnie)',
    'winget install Ollama.Ollama',
    'ollama pull llama3.1:8b',
    '',
    '# API key (provider online, np. Google Gemini)',
    'setx GOOGLE_API_KEY "<TWOJ_KLUCZ>"',
  ],
  linux: [
    '# Ollama (lokalnie)',
    'curl -fsSL https://ollama.com/install.sh | sh',
    'ollama pull llama3.1:8b',
    '',
    '# API key (provider online, np. Google Gemini)',
    'export GOOGLE_API_KEY="<TWOJ_KLUCZ>"',
  ],
  macos: [
    '# Ollama (lokalnie)',
    'brew install ollama',
    'ollama pull llama3.1:8b',
    '',
    '# API key (provider online, np. Google Gemini)',
    'export GOOGLE_API_KEY="<TWOJ_KLUCZ>"',
  ],
};

function normalizePlatform() {
  const p = String(window.appInfo?.platform || '').toLowerCase();
  if (p.startsWith('win')) return 'windows';
  if (p === 'darwin') return 'macos';
  return 'linux';
}

function setupGuideText() {
  return [
    'Windows (PowerShell):',
    ...setupCommands.windows,
    '',
    'Linux:',
    ...setupCommands.linux,
    '',
    'macOS:',
    ...setupCommands.macos,
  ].join('\n');
}

async function copySetupGuide() {
  const text = setupGuideText();
  try {
    await navigator.clipboard.writeText(text);
    message('Skopiowano instrukcje pierwszego uruchomienia.');
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    message('Skopiowano instrukcje pierwszego uruchomienia.');
  }
}

function renderSetupGuide() {
  setupWinEl.textContent = setupCommands.windows.join('\n');
  setupLinuxEl.textContent = setupCommands.linux.join('\n');
  setupMacEl.textContent = setupCommands.macos.join('\n');
  const current = normalizePlatform();
  const label = current === 'windows' ? 'Windows' : (current === 'macos' ? 'macOS' : 'Linux');
  setupHintEl.textContent = `Wykryty system: ${label}`;
}

function val(id) {
  const el = document.getElementById(id);
  if (el.type === 'checkbox') return !!el.checked;
  return el.value;
}

function setVal(id, v) {
  const el = document.getElementById(id);
  if (el.type === 'checkbox') el.checked = !!v;
  else el.value = v ?? '';
}

function collectState() {
  const out = {};
  for (const id of ids) out[id] = val(id);
  out.debug_dir = 'debug';
  out.checkpoint = '0';
  out.tm_db = 'translator_studio.db';
  out.tm_project_id = null;
  return out;
}

async function api(path, opts = {}) {
  const r = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  const body = await r.text();
  let data = {};
  try { data = JSON.parse(body); } catch {}
  if (!r.ok) {
    throw new Error(data.detail || body || `HTTP ${r.status}`);
  }
  return data;
}

function message(text, isErr = false) {
  msgEl.textContent = text;
  msgEl.className = isErr ? 'msg err' : 'msg ok';
}

async function openExternal(url) {
  const u = (url || '').trim();
  if (!u) return;
  try {
    if (window.desktopApi && typeof window.desktopApi.openExternal === 'function') {
      await window.desktopApi.openExternal(u);
      return;
    }
  } catch {}
  window.open(u, '_blank', 'noopener,noreferrer');
}

async function loadConfig() {
  try {
    const cfg = await api('/config');
    for (const id of ids) setVal(id, cfg[id]);
    message('Config zaladowany.');
  } catch (e) {
    message(`Blad load config: ${e.message}`, true);
  }
}

async function saveConfig() {
  try {
    await api('/config', { method: 'POST', body: JSON.stringify(collectState()) });
    message('Config zapisany.');
  } catch (e) {
    message(`Blad save config: ${e.message}`, true);
  }
}

async function startRun() {
  try {
    await api('/run/start', { method: 'POST', body: JSON.stringify({ state: collectState() }) });
    message('Start run OK.');
  } catch (e) {
    message(`Blad start: ${e.message}`, true);
  }
}

async function validateRun() {
  const epub = val('output_epub') || val('input_epub');
  if (!epub) {
    message('Podaj output_epub lub input_epub.', true);
    return;
  }
  try {
    await api('/run/validate', { method: 'POST', body: JSON.stringify({ epub_path: epub, tags: val('tags') }) });
    message('Start walidacji OK.');
  } catch (e) {
    message(`Blad walidacji: ${e.message}`, true);
  }
}

async function stopRun() {
  try {
    await api('/run/stop', { method: 'POST', body: '{}' });
    message('Stop wyslany.');
  } catch (e) {
    message(`Blad stop: ${e.message}`, true);
  }
}

async function fetchModels() {
  try {
    const provider = val('provider');
    if (provider === 'ollama') {
      const data = await api(`/models/ollama?host=${encodeURIComponent(val('ollama_host'))}`);
      if (data.models && data.models.length) {
        setVal('model', data.models[0]);
      }
      message(`Modele ollama: ${data.models.length}`);
      return;
    }
    const key = val('google_api_key');
    const data = await api(`/models/google?api_key=${encodeURIComponent(key)}`);
    if (data.models && data.models.length) {
      setVal('model', data.models[0]);
    }
    message(`Modele google: ${data.models.length}`);
  } catch (e) {
    message(`Blad modeli: ${e.message}`, true);
  }
}

async function pollStatus() {
  try {
    const s = await api('/run/status');
    statusEl.textContent = `Status: ${s.running ? 'RUNNING' : 'IDLE'} | mode=${s.mode} | exit=${s.exit_code ?? '--'}`;
    logEl.textContent = s.log || '';
    logEl.scrollTop = logEl.scrollHeight;
  } catch (e) {
    statusEl.textContent = `Status: backend offline (${e.message})`;
  }
}

document.getElementById('save-btn').addEventListener('click', saveConfig);
document.getElementById('start-btn').addEventListener('click', startRun);
document.getElementById('validate-btn').addEventListener('click', validateRun);
document.getElementById('stop-btn').addEventListener('click', stopRun);
document.getElementById('models-btn').addEventListener('click', fetchModels);
document.getElementById('support-link').addEventListener('click', () => openExternal(SUPPORT_URL));
document.getElementById('repo-link').addEventListener('click', () => openExternal(REPO_URL));
document.getElementById('copy-setup-btn').addEventListener('click', copySetupGuide);

renderSetupGuide();
loadConfig();
pollStatus();
setInterval(pollStatus, 1200);
