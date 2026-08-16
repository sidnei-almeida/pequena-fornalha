/**
 * Kit de marca para o Instagram.
 *
 * Não é uma pilha de imagens soltas: é um sistema. Todo post nasce de um
 * gabarito com a mesma margem, a mesma escala tipográfica e a assinatura no
 * mesmo lugar, e as cores giram numa ordem fixa para a grade do perfil ficar
 * em xadrez (arte, foto, arte / foto, arte, foto).
 *
 * Tamanhos:
 *   perfil     1080×1080
 *   post 4:5   1080×1350  (ocupa mais tela no feed que o quadrado)
 *   story      1080×1920
 *   destaque   1080×1080  (a capa é recortada em círculo)
 *
 * Rode com:  node scripts/gerar-kit-instagram.mjs
 * Precisa de Chrome/Chromium. Os arquivos ficam em Instagram/ e não vão para o site.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CORES, marca, grao } from './marca.mjs';
import { site, schedule } from '../src/data/site.ts';
import { naFornada, produtos } from '../src/data/produtos.ts';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destino = resolve(raiz, 'Instagram');
mkdirSync(destino, { recursive: true });
const temp = mkdtempSync(join(tmpdir(), 'fornalha-instagram-'));

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
  console.error('Nenhum Chrome/Chromium encontrado no PATH.');
  process.exit(1);
}

// ── Sistema ────────────────────────────────────────────────────────────────

/** Uma margem só, em todos os formatos. É o que dá unidade à grade. */
const MARGEM = 88;

/** Escala tipográfica fixa: nada de tamanho inventado por peça. */
const ESCALA = {
  rotulo: 22,
  corpo: 30,
  serifa: 44,
  titulo: 82,
  tituloGrande: 118,
};

/**
 * Ordem das cores. Post novo entra sempre na próxima cor da fila, e a grade
 * se mantém alternada sozinha.
 */
const RODIZIO = [
  { fundo: CORES.creme, tinta: CORES.carvao, apoio: CORES.terracota },
  { fundo: CORES.carvao, tinta: CORES.creme, apoio: CORES.terracota },
  { fundo: CORES.terracota, tinta: CORES.creme, apoio: CORES.creme },
  { fundo: CORES.cremeClaro, tinta: CORES.carvao, apoio: CORES.terracota },
  { fundo: CORES.sage, tinta: CORES.creme, apoio: CORES.creme },
  { fundo: CORES.melaco, tinta: CORES.creme, apoio: CORES.linho },
];

const fonte = (arquivo) => `file://${resolve(raiz, 'node_modules/@fontsource-variable', arquivo)}`;

/** Imagem local vira data URI: o Chromium headless lê sem servidor. */
const imagemEmbutida = (caminhoRelativo, tipo = 'image/svg+xml') => {
  const dados = readFileSync(resolve(raiz, caminhoRelativo)).toString('base64');
  return `data:${tipo};base64,${dados}`;
};

const ESTILO_BASE = `
  @font-face {
    font-family: 'Montserrat';
    src: url('${fonte('montserrat/files/montserrat-latin-wght-normal.woff2')}') format('woff2');
    font-weight: 100 900;
  }
  @font-face {
    font-family: 'Garamond';
    src: url('${fonte('eb-garamond/files/eb-garamond-latin-wght-normal.woff2')}') format('woff2');
    font-weight: 400 800;
  }
  @font-face {
    font-family: 'Garamond';
    src: url('${fonte('eb-garamond/files/eb-garamond-latin-wght-italic.woff2')}') format('woff2');
    font-weight: 400 800; font-style: italic;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Montserrat', sans-serif; -webkit-font-smoothing: antialiased; }
  .serif { font-family: 'Garamond', serif; }
  .rotulo { font-size: ${ESCALA.rotulo}px; font-weight: 600; letter-spacing: .28em; text-transform: uppercase; }
  .corpo { font-size: ${ESCALA.corpo}px; line-height: 1.45; }
  .titulo { font-weight: 700; letter-spacing: -.02em; text-transform: uppercase; line-height: .95; }
  .quadro { display: flex; flex-direction: column; width: 100%; height: 100%; position: relative; }
`;

const arquivos = [];

const gerar = ({ nome, largura, altura, corpo, grupo = 'outros' }) => {
  const html = join(temp, `${nome}.html`);
  writeFileSync(
    html,
    `<!doctype html><meta charset="utf-8"><style>${ESTILO_BASE}
     html, body { width: ${largura}px; height: ${altura}px; overflow: hidden; }</style>${corpo}`,
  );

  execFileSync(
    navegador,
    [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      `--window-size=${largura},${altura}`,
      `--screenshot=${resolve(destino, `${nome}.png`)}`,
      '--virtual-time-budget=4000',
      `file://${html}`,
    ],
    { stdio: 'pipe' },
  );

  arquivos.push({ nome: `${nome}.png`, medida: `${largura}×${altura}`, grupo });
  console.log(`Instagram/${nome}.png (${largura}×${altura})`);
};

/** Ruído sutil: sem isso o fundo chapado denuncia que é arte gerada. */
const textura = (cor, opacidade = 0.06) => `
  <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" xmlns="http://www.w3.org/2000/svg">
    <filter id="ruido"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3"/>
      <feColorMatrix type="saturate" values="0"/></filter>
    <rect width="100%" height="100%" filter="url(#ruido)" opacity="${opacidade}" fill="${cor}"/>
  </svg>`;

let idAssinatura = 0;
const assinatura = (cor, tamanho = 74) => {
  idAssinatura += 1;
  return `
  <div style="display:flex;align-items:center;gap:20px;color:${cor}">
    <div style="width:${tamanho}px;height:${tamanho}px">${marca(cor, `as${idAssinatura}`)}</div>
    <div style="line-height:1.05">
      <div style="font-size:24px;font-weight:700;letter-spacing:.16em">PEQUENA</div>
      <div style="font-size:24px;font-weight:700;letter-spacing:.16em">FORNALHA</div>
    </div>
  </div>`;
};

/**
 * Zona segura vertical. A miniatura do perfil corta o 4:5 em quadrado, tirando
 * 135px de cima e de baixo — o rótulo e a assinatura precisam ficar dentro
 * disso, senão somem na grade.
 */
const MARGEM_VERTICAL = 150;

/**
 * Gabarito único dos posts: rótulo em cima, conteúdo no meio, assinatura
 * embaixo. Todos os posts passam por aqui.
 */
const post = ({ nome, cor, rotulo, conteudo, rodape = true }) =>
  gerar({
    nome,
    largura: 1080,
    altura: 1350,
    grupo: 'post',
    corpo: `<body style="background:${cor.fundo};color:${cor.tinta}">
      ${textura(cor.tinta)}
      <div class="quadro" style="padding:${MARGEM_VERTICAL}px ${MARGEM}px;gap:40px">
        <div class="rotulo" style="color:${cor.apoio};opacity:.9">${rotulo}</div>
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0">
          ${conteudo}
        </div>
        ${rodape ? assinatura(cor.tinta) : ''}
      </div>
    </body>`,
  });

// ── Perfil ─────────────────────────────────────────────────────────────────
const perfil = (nome, fundo, tinta) =>
  gerar({
    nome,
    largura: 1080,
    altura: 1080,
    grupo: 'perfil',
    corpo: `<body style="background:${fundo}">
      ${textura(tinta)}
      <div class="quadro" style="align-items:center;justify-content:center">
        <div style="width:620px;height:620px">${marca(tinta, nome)}</div>
      </div>
    </body>`,
  });

perfil('perfil-carvao', CORES.carvao, CORES.creme);
perfil('perfil-creme', CORES.creme, CORES.carvao);
perfil('perfil-terracota', CORES.terracota, CORES.creme);

// ── Posts de arte ──────────────────────────────────────────────────────────
post({
  nome: 'post-01-marca',
  cor: RODIZIO[1],
  rotulo: `${site.city} ${grao(CORES.terracota)} ${site.state}`,
  conteudo: `
    <div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:52px">
      <div style="width:340px;height:340px">${marca(CORES.creme, 'pm')}</div>
      <div>
        <div class="titulo" style="font-size:88px">PEQUENA<br>FORNALHA</div>
        <div class="rotulo" style="margin-top:30px;opacity:.6">Fermentação natural</div>
      </div>
    </div>`,
  rodape: false,
});

post({
  nome: 'post-02-frase',
  cor: RODIZIO[0],
  rotulo: 'Desde 2024',
  conteudo: `
    <div class="titulo" style="font-size:${ESCALA.tituloGrande}px">
      FEITO<br>DEVAGAR,<br>FEITO À MÃO,
      <div class="serif" style="font-style:italic;text-transform:none;font-weight:500;
                                color:${CORES.terracota};letter-spacing:0;margin-top:14px">
        feito pra você.
      </div>
    </div>`,
});

post({
  nome: 'post-03-cardapio',
  cor: RODIZIO[3],
  rotulo: 'A fornada da semana',
  conteudo: `
    <div class="titulo" style="font-size:${ESCALA.titulo}px;margin-bottom:44px">O QUE SAI<br>DO FORNO</div>
    <div style="display:flex;flex-direction:column;gap:24px">
      ${naFornada
        .slice(0, 7)
        .map(
          (produto) => `
        <div style="display:flex;align-items:baseline;gap:20px">
          <div class="serif" style="font-size:${ESCALA.serifa}px;white-space:nowrap">${produto.nome}</div>
          <div style="flex:1;border-bottom:2px dotted rgba(39,35,31,.25);transform:translateY(-8px)"></div>
          <div style="font-size:${ESCALA.corpo}px;font-weight:600;color:${CORES.terracota}">${produto.preco}</div>
        </div>`,
        )
        .join('')}
    </div>`,
});

post({
  nome: 'post-04-horarios',
  cor: RODIZIO[4],
  rotulo: 'Onde e quando',
  conteudo: `
    <div class="titulo" style="font-size:${ESCALA.titulo}px;margin-bottom:40px">HORÁRIOS<br>DE RETIRADA</div>
    <div>
      ${schedule
        .map(
          (item) => `
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:24px;
                    padding:22px 0;border-bottom:1px solid rgba(241,235,213,.25)">
          <div class="serif" style="font-size:${ESCALA.serifa}px">${item.day}</div>
          <div style="font-size:26px;opacity:.85">${item.hours}</div>
        </div>`,
        )
        .join('')}
    </div>
    <div class="serif" style="font-size:34px;margin-top:36px;opacity:.9">
      ${site.neighborhood}, ${site.city}/${site.state}
    </div>`,
});

post({
  nome: 'post-05-encomendas',
  cor: RODIZIO[2],
  rotulo: 'Como pedir',
  conteudo: `
    <div class="titulo" style="font-size:${ESCALA.titulo}px;margin-bottom:44px">ENCOMENDE<br>PELO ZAP</div>
    <div style="display:flex;flex-direction:column;gap:34px">
      ${[
        ['01', 'Chame no WhatsApp', 'Diga o que quer e para qual dia.'],
        ['02', 'A gente confirma', 'Respondemos com o total e o horário.'],
        ['03', 'Retirada ou entrega', 'Você busca na garagem, ou a gente leva.'],
      ]
        .map(
          ([n, titulo, texto]) => `
        <div style="display:flex;gap:28px;align-items:flex-start;
                    border-top:1px solid rgba(241,235,213,.3);padding-top:22px">
          <div class="rotulo" style="opacity:.7;padding-top:8px">${n}</div>
          <div>
            <div class="serif" style="font-size:48px;line-height:1.1">${titulo}</div>
            <div class="corpo" style="opacity:.85;margin-top:8px">${texto}</div>
          </div>
        </div>`,
        )
        .join('')}
    </div>`,
});

post({
  nome: 'post-06-aviso',
  cor: RODIZIO[5],
  rotulo: 'Recado',
  conteudo: `
    <div class="titulo" style="font-size:${ESCALA.tituloGrande}px">HOJE<br>TEM<br>FORNADA</div>
    <div class="serif" style="font-size:46px;line-height:1.35;margin-top:40px;opacity:.85">
      Retirada das ${schedule[1].hours}.<br>Enquanto durar.
    </div>`,
});

// ── Posts com foto ─────────────────────────────────────────────────────────
/**
 * Foto sangrando com uma tarja embaixo. É o formato de todo post de produto:
 * troque só o arquivo e o texto.
 */
const postFoto = ({ nome, cor, imagem, titulo, apoio }) =>
  gerar({
    nome,
    largura: 1080,
    altura: 1350,
    grupo: 'post',
    corpo: `<body style="background:${cor.fundo};color:${cor.tinta}">
      <div class="quadro">
        <img src="${imagemEmbutida(imagem)}" style="width:100%;height:900px;object-fit:cover;display:block">
        <div style="flex:1;display:flex;align-items:center;justify-content:space-between;
                    gap:32px;padding:0 ${MARGEM}px">
          <div>
            <div class="serif" style="font-size:56px;line-height:1.1">${titulo}</div>
            <div class="rotulo" style="margin-top:14px;color:${cor.apoio};opacity:.9">${apoio}</div>
          </div>
          <div style="width:76px;height:76px;flex:none">${marca(cor.tinta, nome)}</div>
        </div>
      </div>
    </body>`,
  });

const carroChefe = produtos.find((p) => p.tag === 'Carro-chefe') ?? produtos[0];

postFoto({
  nome: 'post-07-foto-produto',
  cor: RODIZIO[0],
  imagem: `public/images/produtos/${carroChefe.slug}.svg`,
  titulo: carroChefe.nome,
  apoio: `${carroChefe.peso} ${grao(CORES.terracota)} ${carroChefe.preco}`,
});

postFoto({
  nome: 'post-08-foto-bancada',
  cor: RODIZIO[1],
  imagem: 'public/images/preparo-bancada.svg',
  titulo: 'A massa do dia',
  apoio: 'Nos bastidores',
});

postFoto({
  nome: 'post-09-foto-forno',
  cor: RODIZIO[3],
  imagem: 'public/images/preparo-forno.svg',
  titulo: 'Última fornada',
  apoio: 'Quinta, sexta e sábado',
});

postFoto({
  nome: 'post-10-foto-cestos',
  cor: RODIZIO[4],
  imagem: 'public/images/preparo-cestos.svg',
  titulo: 'Descansando',
  apoio: '24 horas de fermentação',
});

// ── Carrossel ──────────────────────────────────────────────────────────────
post({
  nome: 'carrossel-1-capa',
  cor: RODIZIO[1],
  rotulo: 'Arraste para o lado',
  conteudo: `
    <div class="titulo" style="font-size:${ESCALA.tituloGrande}px">POR QUE<br>DEMORA<br>4 DIAS?</div>`,
});

post({
  nome: 'carrossel-2-miolo',
  cor: RODIZIO[0],
  rotulo: 'O processo',
  conteudo: `
    <div style="display:flex;flex-direction:column;gap:38px">
      ${[
        ['01', 'Levain alimentado todo dia'],
        ['02', '24 horas de fermentação a frio'],
        ['03', 'Modelagem à mão, um a um'],
        ['04', 'Forno a 250 °C com vapor'],
      ]
        .map(
          ([n, texto]) => `
        <div style="display:flex;gap:26px;align-items:baseline;
                    border-top:1px solid rgba(39,35,31,.18);padding-top:22px">
          <div class="rotulo" style="color:${CORES.terracota}">${n}</div>
          <div class="serif" style="font-size:52px;line-height:1.15">${texto}</div>
        </div>`,
        )
        .join('')}
    </div>`,
});

post({
  nome: 'carrossel-3-fecho',
  cor: RODIZIO[2],
  rotulo: 'Encomendas',
  conteudo: `
    <div class="titulo" style="font-size:${ESCALA.titulo}px">PEÇA<br>PELO ZAP</div>
    <div class="serif" style="font-size:46px;line-height:1.35;margin-top:36px;opacity:.9">
      Link na bio, ou chame direto no WhatsApp.
    </div>`,
});

// ── Stories ────────────────────────────────────────────────────────────────
const story = ({ nome, cor, corpo }) =>
  gerar({ nome, largura: 1080, altura: 1920, grupo: 'story', corpo });

story({
  nome: 'story-1-marca',
  cor: RODIZIO[1],
  corpo: `<body style="background:${CORES.carvao};color:${CORES.creme}">
    ${textura(CORES.creme)}
    <div class="quadro" style="align-items:center;justify-content:center;gap:60px;padding:140px">
      <div style="width:400px;height:400px">${marca(CORES.creme, 's1')}</div>
      <div style="text-align:center">
        <div class="titulo" style="font-size:100px">PEQUENA<br>FORNALHA</div>
        <div class="rotulo" style="margin-top:36px;opacity:.6">Fermentação natural</div>
      </div>
    </div>
  </body>`,
});

story({
  nome: 'story-2-fornada',
  cor: RODIZIO[0],
  corpo: `<body style="background:${CORES.creme};color:${CORES.carvao}">
    ${textura(CORES.carvao, 0.05)}
    <div class="quadro" style="justify-content:space-between;padding:280px 100px 200px">
      <div class="rotulo" style="color:${CORES.terracota}">Hoje tem fornada</div>
      <div>
        <div class="titulo" style="font-size:132px">SAIU<br>DO<br>FORNO</div>
        <div class="serif" style="font-size:46px;line-height:1.4;margin-top:44px;opacity:.8">
          Retirada das ${schedule[1].hours},<br>enquanto durar.
        </div>
      </div>
      ${assinatura(CORES.carvao)}
    </div>
  </body>`,
});

story({
  nome: 'story-3-modelo-foto',
  cor: RODIZIO[0],
  corpo: `<body style="background:${CORES.linho};color:${CORES.carvao}">
    ${textura(CORES.carvao, 0.05)}
    <div class="quadro" style="justify-content:space-between;padding:280px 90px 200px">
      <div class="rotulo" style="opacity:.45">Foto por cima desta área</div>
      <div style="flex:1;margin:50px 0;border:3px dashed rgba(39,35,31,.28);
                  display:flex;align-items:center;justify-content:center">
        <div class="rotulo" style="opacity:.35">área livre</div>
      </div>
      ${assinatura(CORES.carvao)}
    </div>
  </body>`,
});

// ── Destaques ──────────────────────────────────────────────────────────────
const destaque = (nome, fundo, tinta) =>
  gerar({
    nome: `destaque-${nome}`,
    largura: 1080,
    altura: 1080,
    grupo: 'destaque',
    corpo: `<body style="background:${fundo};color:${tinta}">
      ${textura(tinta)}
      <div class="quadro" style="align-items:center;justify-content:center">
        <div style="width:420px;height:420px">${marca(tinta, nome)}</div>
      </div>
    </body>`,
  });

destaque('paes', CORES.creme, CORES.carvao);
destaque('encomendas', CORES.terracota, CORES.creme);
destaque('horarios', CORES.sage, CORES.creme);
destaque('bastidores', CORES.carvao, CORES.creme);

// ── Paleta ─────────────────────────────────────────────────────────────────
gerar({
  nome: 'paleta',
  largura: 1080,
  altura: 1350,
  grupo: 'referência',
  corpo: `<body style="background:${CORES.creme};color:${CORES.carvao}">
    <div class="quadro" style="padding:${MARGEM}px;gap:44px">
      <div>
        <div class="rotulo" style="color:${CORES.terracota}">Paleta</div>
        <div class="titulo" style="font-size:76px;margin-top:18px">CORES<br>DA CASA</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;gap:20px">
        ${[
          ['Carvão', CORES.carvao, CORES.creme],
          ['Creme', CORES.creme, CORES.carvao],
          ['Terracota', CORES.terracota, CORES.creme],
          ['Melaço', CORES.melaco, CORES.creme],
          ['Sage', CORES.sage, CORES.creme],
          ['Linho', CORES.linho, CORES.carvao],
        ]
          .map(
            ([nome, hex, texto]) => `
          <div style="flex:1;background:${hex};color:${texto};display:flex;align-items:center;
                      justify-content:space-between;padding:0 40px;border:1px solid rgba(39,35,31,.12)">
            <div class="serif" style="font-size:${ESCALA.serifa}px">${nome}</div>
            <div class="rotulo">${hex.toUpperCase()}</div>
          </div>`,
          )
          .join('')}
      </div>
    </div>
  </body>`,
});

// ── Prévia da grade do perfil ──────────────────────────────────────────────
/**
 * Como os nove últimos posts aparecem no perfil. O Instagram corta a miniatura
 * em quadrado, então a prévia corta igual: serve para conferir o xadrez antes
 * de publicar.
 */
const grade = [
  'post-02-frase',
  'post-07-foto-produto',
  'post-04-horarios',
  'post-08-foto-bancada',
  'post-03-cardapio',
  'post-09-foto-forno',
  'post-05-encomendas',
  'post-10-foto-cestos',
  'post-06-aviso',
];

const CELULA = 360;
const FALHA = 6;

gerar({
  nome: 'grade-exemplo',
  largura: CELULA * 3 + FALHA * 2,
  altura: CELULA * 3 + FALHA * 2,
  grupo: 'referência',
  corpo: `<body style="background:#fff">
    <div style="display:grid;grid-template-columns:repeat(3,${CELULA}px);gap:${FALHA}px">
      ${grade
        .map(
          (nome) =>
            `<img src="${imagemEmbutida(`Instagram/${nome}.png`, 'image/png')}"
                  style="width:${CELULA}px;height:${CELULA}px;object-fit:cover;display:block">`,
        )
        .join('')}
    </div>
  </body>`,
});

rmSync(temp, { recursive: true, force: true });

// ── Guia da pasta ──────────────────────────────────────────────────────────
const porGrupo = (grupo) => arquivos.filter((a) => a.grupo === grupo);
const tabela = (grupo) =>
  porGrupo(grupo)
    .map((a) => `| \`${a.nome}\` | ${a.medida} |`)
    .join('\n');

writeFileSync(
  resolve(destino, 'LEIA-ME.md'),
  `# Kit de marca — Instagram

Gerado por \`node scripts/gerar-kit-instagram.mjs\`. Não edite os PNGs à mão:
mexa no script e rode de novo, senão a próxima geração sobrescreve tudo.

Cardápio, preços e horários saem de \`src/data/\`. Mudou no site, roda o script
e a arte acompanha.

---

## O plano da grade

O perfil é visto de três em três, não post a post. Por isso os posts alternam
**arte** e **foto** em xadrez:

\`\`\`
  arte    foto    arte
  foto    arte    foto
  arte    foto    arte
\`\`\`

Duas regras que sustentam isso:

1. **Nunca dois fundos iguais lado a lado nem um em cima do outro.** As cores
   giram na ordem creme → carvão → terracota → creme claro → sage → melaço.
2. **Nunca duas fotos seguidas na mesma linha.** Foto entra sempre com arte dos
   dois lados.

O arquivo \`grade-exemplo.png\` mostra como fica.

## Ritmo de postagem

Três posts por semana, cada um com um trabalho:

| Dia | Post | Arquivo base |
| --- | --- | --- |
| Segunda | Cardápio da semana | \`post-03-cardapio.png\` |
| Quinta | Foto do pão que sai na fornada | \`post-07-foto-produto.png\` |
| Sábado | Bastidor: massa, forno, bancada | \`post-08-foto-bancada.png\` |

Uma vez por mês, um carrossel de processo (os três \`carrossel-*\`) e um post
de recado quando a fornada mudar (\`post-06-aviso.png\`).

Stories são livres, mas todo story de fornada usa \`story-2-fornada.png\` para o
seguidor reconhecer sem ler.

## Legenda

Fórmula de três linhas, sempre nesta ordem:

1. **O que é**, em uma frase. \`Sourdough clássico, 24 horas de fermentação.\`
2. **O que fazer**, em uma frase. \`Encomendas até quarta pelo WhatsApp.\`
3. **Onde**, sempre igual. \`Retirada no ${site.neighborhood}, ${site.city}.\`

Sem bloco de hashtag no fim. Três ou quatro dentro do texto bastam:
#fermentaçãonatural #paoartesanal #${site.city.toLowerCase().replace(/ /g, '')}

---

## Arquivos

### Perfil
| Arquivo | Medida |
| --- | --- |
${tabela('perfil')}

Use \`perfil-carvao.png\`. O Instagram recorta em círculo e o fundo escuro
destaca mais na busca.

### Posts (1080×1350)
| Arquivo | Medida |
| --- | --- |
${tabela('post')}

O 4:5 ocupa mais tela no feed que o quadrado. Não corte para 1:1.

Os \`post-07\`, \`08\` e \`09\` são o gabarito de foto: foto sangrando em cima,
tarja com nome e assinatura embaixo. Troque a imagem mantendo a tarja.

### Stories (1080×1920)
| Arquivo | Medida |
| --- | --- |
${tabela('story')}

Deixe texto longe dos 250px do topo e do rodapé: é onde ficam o nome do perfil
e a caixa de resposta.

### Destaques (1080×1080)
| Arquivo | Medida |
| --- | --- |
${tabela('destaque')}

A capa é recortada em círculo, então traz só o símbolo. O nome do destaque você
escreve no Instagram. Uma cor por assunto.

### Referência
| Arquivo | Medida |
| --- | --- |
${tabela('referência')}

## Se for criar arte nova

- Margem de ${MARGEM}px em todos os lados, sem exceção.
- Rótulo em caixa alta espaçada no topo, assinatura embaixo.
- Tamanhos de texto: ${Object.entries(ESCALA)
    .map(([k, v]) => `${k} ${v}px`)
    .join(', ')}.
- Fontes: Montserrat (títulos e rótulos) e EB Garamond (frases e nomes).
- Uma ideia por post. Se precisou de dois títulos, são dois posts.
`,
);

console.log(`\n${arquivos.length} arquivos em Instagram/`);
