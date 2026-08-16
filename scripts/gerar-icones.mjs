/**
 * Gera os PNGs da marca para os lugares que não aceitam SVG:
 *
 * - public/apple-touch-icon.png (180×180) — atalho na tela inicial do iPhone
 * - public/favicon-32.png (32×32)         — navegador antigo sem suporte a SVG
 * - public/og.png (1200×630)              — prévia de link no WhatsApp e redes
 *
 * A logo do site continua sendo SVG. Isto aqui é só o espelho em bitmap.
 * Rode manualmente depois de mexer na logo:
 *
 *   node scripts/gerar-icones.mjs
 *
 * Precisa de um Chrome/Chromium instalado (não roda no build da Vercel — os
 * PNGs vão versionados no repositório).
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publico = resolve(raiz, 'public');
const temp = mkdtempSync(join(tmpdir(), 'fornalha-icones-'));

const navegador = ['chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable'].find(
  (nome) => {
    try {
      execFileSync('which', [nome], { stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  },
);

if (!navegador) {
  console.error('Nenhum Chrome/Chromium encontrado no PATH. Instale um e rode de novo.');
  process.exit(1);
}

const TINTA_ESCURA = '#27231F';
const CREME = '#F1EBD5';

/**
 * A marca em SVG, na cor pedida. Mesmo desenho de src/components/Logomarca.astro.
 * O viewBox vem recortado na caixa do desenho para o símbolo encher o ícone.
 */
const marca = (cor) => `<svg viewBox="10.125 6.75 79.75 79.75" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <defs>
    <mask id="arco">
      <rect x="0" y="0" width="100" height="100" fill="#fff"/>
      <ellipse cx="50" cy="71.5" rx="29.3" ry="14.8" fill="#000"/>
    </mask>
    <mask id="pao">
      <ellipse cx="50" cy="71.5" rx="27.5" ry="13" fill="#fff"/>
      <path d="M36 68.5c4.2-4.4 9-7 14.4-8M53 64c4.4-2.4 9-3.8 13.8-4.2" stroke="#000" stroke-width="3.2" stroke-linecap="round"/>
    </mask>
  </defs>
  <path d="M24 75V40c0-14.4 11.6-26 26-26s26 11.6 26 26v35" stroke="${cor}" stroke-width="10.5" fill="none" mask="url(#arco)"/>
  <g transform="translate(50 58) scale(1.12) translate(-50 -58)" fill="${cor}">
    <path d="M50 26c6 7.5 9.2 11.4 9.2 17.3 0 5.2-4.1 9.2-9.2 9.2s-9.2-4-9.2-9.2c0-3.9 2-6.4 3.9-8.9.8 3.7 2.2 5.5 3.9 6.2-1.7-5.2-1-10.2 1.4-14.6Z"/>
    <path d="M41.6 33.8c-1 3.4-.8 6.2.6 8.6-3-1.4-4.6-4-4.2-7 .3-2.2 1.6-4.3 4-6.3-.5 1.6-.6 3.1-.4 4.7Z"/>
  </g>
  <ellipse cx="50" cy="71.5" rx="27.5" ry="13" fill="${cor}" mask="url(#pao)"/>
</svg>`;

const captura = ({ nome, largura, altura, html, transparente = false }) => {
  const arquivoHtml = join(temp, `${nome}.html`);
  writeFileSync(
    arquivoHtml,
    `<!doctype html><meta charset="utf-8">
     <style>*{margin:0;padding:0;box-sizing:border-box}
     html,body{width:${largura}px;height:${altura}px;overflow:hidden}</style>${html}`,
  );

  execFileSync(
    navegador,
    [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      ...(transparente ? ['--default-background-color=00000000'] : []),
      `--window-size=${largura},${altura}`,
      `--screenshot=${resolve(publico, `${nome}.png`)}`,
      '--virtual-time-budget=3000',
      `file://${arquivoHtml}`,
    ],
    { stdio: 'pipe' },
  );

  console.log(`gerado public/${nome}.png (${largura}×${altura})`);
};

// Ícone do iPhone: fundo creme, porque atalho transparente fica feio na tela inicial.
captura({
  nome: 'apple-touch-icon',
  largura: 180,
  altura: 180,
  html: `<body style="background:${CREME};display:flex;align-items:center;justify-content:center">
    <div style="width:150px;height:150px">${marca(TINTA_ESCURA)}</div>
  </body>`,
});

// Favicon bitmap, fundo transparente.
captura({
  nome: 'favicon-32',
  largura: 32,
  altura: 32,
  transparente: true,
  html: `<body style="display:flex;align-items:center;justify-content:center">
    <div style="width:32px;height:32px">${marca(TINTA_ESCURA)}</div>
  </body>`,
});

// Prévia de link (WhatsApp, Instagram, Facebook).
captura({
  nome: 'og',
  largura: 1200,
  altura: 630,
  html: `<body style="background:${TINTA_ESCURA};color:${CREME};display:flex;align-items:center;justify-content:center;gap:56px;font-family:Helvetica,Arial,sans-serif">
    <div style="width:230px;height:230px">${marca(CREME)}</div>
    <div>
      <div style="font-size:74px;font-weight:700;letter-spacing:.1em;line-height:1.05">PEQUENA<br>FORNALHA</div>
      <div style="margin-top:26px;font-size:24px;letter-spacing:.26em;opacity:.7">PÃES ARTESANAIS DE FERMENTAÇÃO NATURAL</div>
      <div style="margin-top:16px;font-size:24px;letter-spacing:.26em;opacity:.5">CAXIAS DO SUL · RS</div>
    </div>
  </body>`,
});

rmSync(temp, { recursive: true, force: true });
