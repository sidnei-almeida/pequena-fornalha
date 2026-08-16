/**
 * Gera um cartão de prévia por produto em public/og/produtos/<slug>.png.
 *
 * É o que o WhatsApp mostra quando o cliente manda o link do produto pelo botão
 * "Fazer pedido": foto, nome e preço num cartão, em vez de um endereço solto.
 * Precisa ser PNG em endereço absoluto — SVG o WhatsApp descarta, e o cartão
 * fica sem imagem nenhuma.
 *
 * 1200×630 é a proporção que o WhatsApp e as redes recortam sem cortar nada.
 *
 * Mesmo esquema do scripts/gerar-icones.mjs: precisa de um Chrome/Chromium no
 * PATH, roda na mão e os PNGs vão versionados — o build da Vercel não tem
 * navegador. Rode de novo depois de mexer em preço, nome ou nas imagens:
 *
 *   node scripts/gerar-og-produtos.mjs
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { produtos, categorias } from '../src/data/produtos.ts';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publico = resolve(raiz, 'public');
const destino = resolve(publico, 'og/produtos');
mkdirSync(destino, { recursive: true });
const temp = mkdtempSync(join(tmpdir(), 'fornalha-og-'));

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

const CARVAO = '#27231F';
const CREME = '#F1EBD5';
const TERRACOTA = '#AB5F43';
const LINHO = '#E3D9BD';

/*
 * As fontes da marca vêm do node_modules em base64 e entram embutidas no HTML.
 * Chromium headless não enxerga fonte instalada no sistema de forma confiável,
 * e sem isto o cartão sai em Times New Roman.
 */
const fonte = (caminho) =>
  readFileSync(resolve(raiz, 'node_modules', caminho)).toString('base64');

const montserrat = fonte('@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2');
const garamond = fonte('@fontsource-variable/eb-garamond/files/eb-garamond-latin-wght-normal.woff2');

/**
 * O desenho do produto, embutido direto no HTML para não depender de rede.
 *
 * O arquivo vem com `width="800" height="1000"` fixos, e atributo ganha do CSS:
 * sem tirar isso o desenho fica do tamanho original no meio da coluna, com
 * tarja de fundo em volta. Trocando por `slice` ele preenche e é recortado
 * pelas laterais, que é o que a coluna 420×630 precisa.
 */
const arte = (slug) =>
  readFileSync(resolve(publico, 'images/produtos', `${slug}.svg`), 'utf8')
    .replace(/\s(width|height)="\d+"/g, '')
    .replace('<svg ', '<svg preserveAspectRatio="xMidYMid slice" ');

for (const produto of produtos) {
  const categoria = categorias.find((c) => c.id === produto.categoria);
  const arquivoHtml = join(temp, `${produto.slug}.html`);

  writeFileSync(
    arquivoHtml,
    `<!doctype html><meta charset="utf-8">
<style>
  @font-face{font-family:'Montserrat';src:url(data:font/woff2;base64,${montserrat}) format('woff2');font-weight:100 900}
  @font-face{font-family:'Garamond';src:url(data:font/woff2;base64,${garamond}) format('woff2');font-weight:100 900}
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1200px;height:630px;overflow:hidden}
  body{display:flex;background:${CREME};font-family:'Montserrat',sans-serif;color:${CARVAO}}

  /* A arte é 4:5 em pé; a coluna recorta pelas laterais em vez de deformar. */
  .arte{width:420px;height:630px;flex:none;overflow:hidden;background:${LINHO}}
  .arte svg{display:block;width:100%;height:100%}

  .texto{flex:1;padding:64px 68px;display:flex;flex-direction:column;justify-content:center}
  .eyebrow{font-size:19px;font-weight:600;letter-spacing:.28em;text-transform:uppercase}
  .categoria{color:${TERRACOTA}}
  .nome{margin-top:26px;font-size:${produto.nome.length > 22 ? 62 : 76}px;font-weight:700;
        line-height:.95;letter-spacing:-.02em;text-transform:uppercase}
  .preco{margin-top:34px;display:flex;align-items:baseline;gap:22px}
  .valor{font-size:40px;font-weight:600;color:${TERRACOTA}}
  .peso{font-size:19px;font-weight:600;letter-spacing:.28em;color:${CARVAO}99}
  .resumo{margin-top:30px;font-family:'Garamond',serif;font-size:28px;line-height:1.45;color:${CARVAO}cc}
  .rodape{margin-top:44px;padding-top:26px;border-top:1px solid ${CARVAO}26;
          display:flex;justify-content:space-between;color:${CARVAO}80}
</style>
<body>
  <div class="arte">${arte(produto.slug)}</div>
  <div class="texto">
    <div class="eyebrow categoria">${categoria?.nome ?? ''}</div>
    <div class="nome">${produto.nome}</div>
    <div class="preco">
      <span class="valor">${produto.preco}</span>
      <span class="peso">${produto.peso}</span>
    </div>
    <div class="resumo">${produto.descricao}</div>
    <div class="rodape">
      <span class="eyebrow">Pequena Fornalha</span>
      <span class="eyebrow">Caxias do Sul · RS</span>
    </div>
  </div>
</body>`,
  );

  execFileSync(
    navegador,
    [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--window-size=1200,630',
      `--screenshot=${resolve(destino, `${produto.slug}.png`)}`,
      '--virtual-time-budget=3000',
      `file://${arquivoHtml}`,
    ],
    { stdio: 'pipe' },
  );

  console.log(`gerado public/og/produtos/${produto.slug}.png`);
}

rmSync(temp, { recursive: true, force: true });
console.log(`\n${produtos.length} cartões prontos.`);
