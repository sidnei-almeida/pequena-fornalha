/**
 * Gera os placeholders SVG em public/images/.
 *
 * - Um arquivo por produto, em public/images/produtos/<slug>.svg, desenhado
 *   conforme a `forma` declarada em src/data/produtos.ts.
 * - Duas cenas largas (hero e oficina) para as páginas.
 *
 * Rode com `node scripts/gerar-placeholders.mjs`. Apague este arquivo quando
 * as fotos reais entrarem no lugar.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { produtos } from '../src/data/produtos.ts';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destino = resolve(raiz, 'public/images');
const destinoProdutos = resolve(destino, 'produtos');
mkdirSync(destinoProdutos, { recursive: true });

const paletas = [
  { fundo: '#e3d9bd', massa: '#ab5f43', casca: '#683e32' },
  { fundo: '#d9cfae', massa: '#8f5137', casca: '#5a3429' },
  { fundo: '#cfd0bc', massa: '#6b6b57', casca: '#4b4b3d' },
  { fundo: '#eadfbf', massa: '#c07249', casca: '#7b4632' },
  { fundo: '#dad3b6', massa: '#a05a3e', casca: '#623a2c' },
  { fundo: '#cec7ac', massa: '#7d6a4e', casca: '#4f4335' },
];

/** Desenhos por forma, todos ancorados em torno de (400, 540). */
const formas = {
  pao: (id, fundo) => `
    <ellipse cx="400" cy="700" rx="280" ry="38" fill="#27231f" opacity="0.14"/>
    <ellipse cx="400" cy="580" rx="285" ry="180" fill="url(#m${id})"/>
    <g stroke="${fundo}" stroke-opacity="0.5" stroke-width="10" stroke-linecap="round" fill="none">
      <path d="M210 570q70-35 150-60"/>
      <path d="M250 655q70-35 150-60"/>
      <path d="M290 740q70-35 150-60" opacity="0.9"/>
    </g>`,
  boule: (id, fundo) => `
    <ellipse cx="400" cy="740" rx="250" ry="36" fill="#27231f" opacity="0.14"/>
    <circle cx="400" cy="560" r="225" fill="url(#m${id})"/>
    <g stroke="${fundo}" stroke-opacity="0.5" stroke-width="11" stroke-linecap="round" fill="none">
      <path d="M285 470q115 40 230 0"/>
      <path d="M300 560q100 34 200 0"/>
      <path d="M320 650q80 28 160 0"/>
    </g>`,
  forma: (id, fundo) => `
    <ellipse cx="400" cy="745" rx="245" ry="34" fill="#27231f" opacity="0.14"/>
    <path d="M175 730V520c0-95 100-150 225-150s225 55 225 150v210Z" fill="url(#m${id})"/>
    <g stroke="${fundo}" stroke-opacity="0.45" stroke-width="9" stroke-linecap="round" fill="none">
      <path d="M235 470q165-55 330 0"/>
      <path d="M215 585h370"/>
    </g>`,
  bun: (id, fundo) => `
    <ellipse cx="400" cy="700" rx="205" ry="32" fill="#27231f" opacity="0.14"/>
    <ellipse cx="400" cy="580" rx="195" ry="140" fill="url(#m${id})"/>
    <g stroke="${fundo}" stroke-opacity="0.5" stroke-width="11" stroke-linecap="round" fill="none">
      <path d="M400 490c-50 0-90 40-90 90s40 90 90 90 70-30 70-65-25-55-55-55-45 18-45 38"/>
    </g>`,
  folhado: (id, fundo) => `
    <ellipse cx="400" cy="700" rx="230" ry="32" fill="#27231f" opacity="0.14"/>
    <path d="M155 640c30-160 150-265 300-280-25 150-135 255-300 280Z" fill="url(#m${id})"/>
    <path d="M645 640c-30-160-150-265-300-280 25 150 135 255 300 280Z" fill="url(#m${id})"/>
    <ellipse cx="400" cy="565" rx="120" ry="105" fill="url(#m${id})"/>
    <g stroke="${fundo}" stroke-opacity="0.45" stroke-width="8" stroke-linecap="round" fill="none">
      <path d="M330 520q70 45 140 0"/>
      <path d="M320 590q80 50 160 0"/>
    </g>`,
  bolo: (id, fundo) => `
    <ellipse cx="400" cy="760" rx="245" ry="36" fill="#27231f" opacity="0.14"/>
    <path d="M190 430h420v290a30 30 0 0 1-30 30H220a30 30 0 0 1-30-30Z" fill="url(#m${id})"/>
    <ellipse cx="400" cy="430" rx="210" ry="66" fill="${fundo}" fill-opacity="0.35"/>
    <ellipse cx="400" cy="430" rx="210" ry="66" fill="url(#m${id})" fill-opacity="0.55"/>
    <g stroke="${fundo}" stroke-opacity="0.4" stroke-width="9" fill="none">
      <path d="M190 560h420"/>
      <path d="M190 650h420"/>
    </g>
    <g fill="${fundo}" fill-opacity="0.5">
      <circle cx="330" cy="415" r="16"/>
      <circle cx="400" cy="400" r="16"/>
      <circle cx="470" cy="415" r="16"/>
    </g>`,
};

const cartao = (produto, i) => {
  const { fundo, massa, casca } = paletas[i % paletas.length];
  const id = i + 1;
  const desenho = (formas[produto.forma] ?? formas.pao)(id, fundo);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000" role="img" aria-label="${produto.nome} — foto em breve">
  <defs>
    <linearGradient id="f${id}" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="${fundo}"/>
      <stop offset="1" stop-color="#27231f" stop-opacity="0.18"/>
    </linearGradient>
    <radialGradient id="m${id}" cx="0.38" cy="0.3" r="0.85">
      <stop offset="0" stop-color="${massa}"/>
      <stop offset="1" stop-color="${casca}"/>
    </radialGradient>
    <filter id="g${id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.16"/></feComponentTransfer>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  </defs>

  <rect width="800" height="1000" fill="url(#f${id})"/>
  ${desenho}
  <rect width="800" height="1000" filter="url(#g${id})" fill="#27231f" opacity="0.5"/>

  <text x="400" y="920" text-anchor="middle" font-family="Montserrat, Helvetica, Arial, sans-serif"
        font-size="24" letter-spacing="7" fill="#27231f" fill-opacity="0.5">FOTO EM BREVE</text>
</svg>
`;
};

produtos.forEach((produto, i) => {
  writeFileSync(resolve(destinoProdutos, `${produto.slug}.svg`), cartao(produto, i));
});
console.log(`gerados ${produtos.length} placeholders em public/images/produtos/`);

/** Cenas largas: hero e oficina. */
const cena = ({ fundo, massa, casca }, legenda, selo = true) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1100" width="1600" height="1100" role="img" aria-label="${legenda}">
  <defs>
    <linearGradient id="bg" x1="0.1" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="${fundo}"/>
      <stop offset="1" stop-color="${casca}"/>
    </linearGradient>
    <radialGradient id="brasa" cx="0.5" cy="0.55" r="0.5">
      <stop offset="0" stop-color="#e8a765"/>
      <stop offset="0.55" stop-color="${massa}"/>
      <stop offset="1" stop-color="${casca}" stop-opacity="0"/>
    </radialGradient>
    <filter id="grao">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.2"/></feComponentTransfer>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  </defs>

  <rect width="1600" height="1100" fill="url(#bg)"/>

  <g fill="#27231f" opacity="0.1">
    ${Array.from({ length: 9 }, (_, l) =>
      Array.from(
        { length: 11 },
        (_, c) =>
          `<rect x="${c * 150 + (l % 2 ? -75 : 0)}" y="${l * 122}" width="138" height="110" rx="6"/>`,
      ).join(''),
    ).join('')}
  </g>

  <g transform="translate(800 620)">
    <path d="M-300 300V-40c0-166 134-300 300-300S300-206 300-40v340Z" fill="#27231f" opacity="0.82"/>
    <ellipse cx="0" cy="120" rx="215" ry="170" fill="url(#brasa)" opacity="0.85"/>
    <ellipse cx="0" cy="250" rx="250" ry="46" fill="#27231f" opacity="0.5"/>
  </g>

  <rect width="1600" height="1100" filter="url(#grao)" fill="#27231f" opacity="0.55"/>
  ${
    selo
      ? `<text x="800" y="1035" text-anchor="middle" font-family="Montserrat, Helvetica, Arial, sans-serif"
        font-size="26" letter-spacing="9" fill="#f1ebd5" fill-opacity="0.6">FOTO EM BREVE</text>`
      : ''
  }
</svg>
`;

// O hero é fundo: sem o selo "foto em breve" por cima do título.
writeFileSync(
  resolve(destino, 'hero.svg'),
  cena({ fundo: '#c88a5e', massa: '#ab5f43', casca: '#3a2a20' }, 'Forno aceso da Pequena Fornalha', false),
);
writeFileSync(
  resolve(destino, 'oficina.svg'),
  cena({ fundo: '#a9a68c', massa: '#6b6b57', casca: '#2f2b25' }, 'Bancada de trabalho da padaria'),
);
console.log('geradas as cenas hero.svg e oficina.svg');

/**
 * Cenas de preparo (bastidores). Composições abstratas na paleta da marca,
 * pensadas para serem trocadas por fotos reais de produção.
 */
const molduraCena = (largura, altura, id, { fundo, massa, casca }, conteudo, legenda) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${largura} ${altura}" width="${largura}" height="${altura}" role="img" aria-label="${legenda}">
  <defs>
    <linearGradient id="parede${id}" x1="0.1" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="${fundo}"/>
      <stop offset="1" stop-color="${casca}"/>
    </linearGradient>
    <radialGradient id="massa${id}" cx="0.35" cy="0.3" r="0.8">
      <stop offset="0" stop-color="${massa}"/>
      <stop offset="1" stop-color="${casca}"/>
    </radialGradient>
    <filter id="poeira${id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.22"/></feComponentTransfer>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  </defs>
  <rect width="${largura}" height="${altura}" fill="url(#parede${id})"/>
  ${conteudo}
  <rect width="${largura}" height="${altura}" filter="url(#poeira${id})" fill="#f1ebd5" opacity="0.5"/>
  <text x="${largura / 2}" y="${altura - 46}" text-anchor="middle"
        font-family="Montserrat, Helvetica, Arial, sans-serif"
        font-size="${Math.round(largura / 58)}" letter-spacing="8" fill="#f1ebd5" fill-opacity="0.65">FOTO EM BREVE</text>
</svg>
`;

/** Bancada vista de frente: massa dividida, raspador e porções. */
const cenaBancada = (paleta) => {
  const { fundo } = paleta;
  const conteudo = `
  <rect y="640" width="1600" height="460" fill="#27231f" opacity="0.28"/>
  <rect y="632" width="1600" height="16" fill="${fundo}" opacity="0.35"/>
  <g opacity="0.16" fill="#f1ebd5">
    ${Array.from({ length: 90 }, (_, i) => {
      const x = (i * 137) % 1560 + 20;
      const y = 660 + ((i * 61) % 400);
      return `<circle cx="${x}" cy="${y}" r="${2 + (i % 3)}"/>`;
    }).join('')}
  </g>
  <rect x="240" y="700" width="620" height="240" rx="42" fill="url(#massa1)"/>
  <g stroke="${fundo}" stroke-opacity="0.4" stroke-width="7" stroke-linecap="round">
    <path d="M430 706v228"/><path d="M620 706v228"/>
  </g>
  <g fill="url(#massa1)">
    <ellipse cx="1010" cy="820" rx="110" ry="86"/>
    <ellipse cx="1240" cy="800" rx="96" ry="76"/>
    <ellipse cx="1420" cy="850" rx="120" ry="92"/>
  </g>
  <g fill="#27231f" opacity="0.22">
    <ellipse cx="1010" cy="906" rx="112" ry="18"/>
    <ellipse cx="1240" cy="878" rx="98" ry="16"/>
    <ellipse cx="1420" cy="944" rx="122" ry="20"/>
  </g>
  <g transform="rotate(-14 980 560)">
    <rect x="900" y="470" width="180" height="130" rx="10" fill="#f1ebd5" opacity="0.55"/>
    <rect x="900" y="440" width="180" height="36" rx="14" fill="#27231f" opacity="0.55"/>
  </g>`;
  return molduraCena(1600, 1100, 1, paleta, conteudo, 'Massa sendo dividida na bancada');
};

/** Cestos de fermentação empilhados, em formato retrato. */
const cenaCestos = (paleta) => {
  const { fundo } = paleta;
  const anel = (cx, cy, rx, ry) => `
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#massa2)"/>
    ${Array.from({ length: 5 }, (_, i) =>
      `<ellipse cx="${cx}" cy="${cy}" rx="${rx - 18 - i * 26}" ry="${ry - 8 - i * 12}" fill="none" stroke="${fundo}" stroke-opacity="0.28" stroke-width="6"/>`,
    ).join('')}`;

  const conteudo = `
  <g opacity="0.2" stroke="#f1ebd5" stroke-width="6">
    <path d="M0 300h1000M0 720h1000"/>
  </g>
  <g fill="#27231f" opacity="0.25">
    <ellipse cx="500" cy="1120" rx="330" ry="42"/>
  </g>
  ${anel(500, 1010, 300, 110)}
  ${anel(470, 830, 265, 96)}
  ${anel(520, 660, 225, 82)}
  <ellipse cx="520" cy="640" rx="150" ry="52" fill="#f1ebd5" opacity="0.45"/>`;
  return molduraCena(1000, 1250, 2, paleta, conteudo, 'Cestos de fermentação empilhados');
};

/** Pães entrando no forno na pá do padeiro. */
const cenaForno = (paleta) => {
  const { fundo } = paleta;
  const conteudo = `
  <g transform="translate(1080 560)">
    <path d="M-330 320V-30c0-170 148-310 330-310s330 140 330 310v350Z" fill="#27231f" opacity="0.86"/>
    <ellipse cx="0" cy="150" rx="250" ry="150" fill="${fundo}" opacity="0.28"/>
  </g>
  <g transform="rotate(-8 620 700)">
    <rect x="60" y="690" width="760" height="34" rx="17" fill="#27231f" opacity="0.6"/>
    <rect x="620" y="600" width="420" height="210" rx="20" fill="#f1ebd5" opacity="0.28"/>
    <g fill="url(#massa3)">
      <ellipse cx="740" cy="690" rx="96" ry="66"/>
      <ellipse cx="920" cy="690" rx="96" ry="66"/>
    </g>
    <g stroke="${fundo}" stroke-opacity="0.45" stroke-width="7" stroke-linecap="round" fill="none">
      <path d="M690 676q46-22 100-34"/>
      <path d="M870 676q46-22 100-34"/>
    </g>
  </g>`;
  return molduraCena(1600, 1100, 3, paleta, conteudo, 'Pães entrando no forno');
};

/** Pães esfriando na grade. */
const cenaResfriamento = (paleta) => {
  const { fundo } = paleta;
  const pao = (cx, cy, rx, ry) => `
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#massa4)"/>
    <g stroke="${fundo}" stroke-opacity="0.45" stroke-width="6" stroke-linecap="round" fill="none">
      <path d="M${cx - rx * 0.6} ${cy - ry * 0.1}q${rx * 0.5} -${ry * 0.5} ${rx * 1.1} -${ry * 0.75}"/>
    </g>`;

  const conteudo = `
  <g stroke="#f1ebd5" stroke-opacity="0.35" stroke-width="7">
    <path d="M60 470h880M60 900h880"/>
    ${Array.from({ length: 15 }, (_, i) => `<path d="M${90 + i * 58} 440v60"/>`).join('')}
    ${Array.from({ length: 15 }, (_, i) => `<path d="M${90 + i * 58} 870v60"/>`).join('')}
  </g>
  ${pao(280, 420, 150, 62)}
  ${pao(640, 405, 140, 58)}
  ${pao(320, 850, 155, 64)}
  ${pao(690, 862, 145, 60)}`;
  return molduraCena(1000, 1250, 4, paleta, conteudo, 'Pães esfriando na grade');
};

writeFileSync(
  resolve(destino, 'preparo-bancada.svg'),
  cenaBancada({ fundo: '#cbbf9e', massa: '#c08a63', casca: '#4a3a2c' }),
);
writeFileSync(
  resolve(destino, 'preparo-resfriamento.svg'),
  cenaResfriamento({ fundo: '#d8cdb0', massa: '#a8663f', casca: '#4a3226' }),
);
writeFileSync(
  resolve(destino, 'preparo-cestos.svg'),
  cenaCestos({ fundo: '#c9cbb4', massa: '#8d8a6f', casca: '#3a3830' }),
);
writeFileSync(
  resolve(destino, 'preparo-forno.svg'),
  cenaForno({ fundo: '#d2a071', massa: '#b06a44', casca: '#3a2a20' }),
);
console.log('geradas as cenas de preparo (bancada, cestos, forno)');
