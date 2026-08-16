/**
 * Desenho da marca em SVG, compartilhado pelos geradores de imagem.
 * É o mesmo traçado de src/components/Logomarca.astro: mexeu lá, replique aqui
 * (e rode os dois scripts de novo).
 */

export const CORES = {
  carvao: '#27231F',
  creme: '#F1EBD5',
  cremeClaro: '#F8F4E6',
  terracota: '#AB5F43',
  melaco: '#683E32',
  sage: '#6B6B57',
  linho: '#E3D9BD',
};

/**
 * @param {string} cor  cor da tinta
 * @param {string} sufixo  sufixo dos ids, para não colidir quando houver várias
 *                         marcas na mesma página
 */
export const marca = (cor, sufixo = '') => `<svg viewBox="10.125 6.75 79.75 79.75" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">
  <defs>
    <mask id="arco${sufixo}">
      <rect x="0" y="0" width="100" height="100" fill="#fff"/>
      <ellipse cx="50" cy="71.5" rx="29.3" ry="14.8" fill="#000"/>
    </mask>
    <mask id="pao${sufixo}">
      <ellipse cx="50" cy="71.5" rx="27.5" ry="13" fill="#fff"/>
      <path d="M36 68.5c4.2-4.4 9-7 14.4-8M53 64c4.4-2.4 9-3.8 13.8-4.2" stroke="#000" stroke-width="3.2" stroke-linecap="round"/>
    </mask>
  </defs>
  <path d="M24 75V40c0-14.4 11.6-26 26-26s26 11.6 26 26v35" stroke="${cor}" stroke-width="10.5" fill="none" mask="url(#arco${sufixo})"/>
  <g transform="translate(50 58) scale(1.12) translate(-50 -58)" fill="${cor}">
    <path d="M50 26c6 7.5 9.2 11.4 9.2 17.3 0 5.2-4.1 9.2-9.2 9.2s-9.2-4-9.2-9.2c0-3.9 2-6.4 3.9-8.9.8 3.7 2.2 5.5 3.9 6.2-1.7-5.2-1-10.2 1.4-14.6Z"/>
    <path d="M41.6 33.8c-1 3.4-.8 6.2.6 8.6-3-1.4-4.6-4-4.2-7 .3-2.2 1.6-4.3 4-6.3-.5 1.6-.6 3.1-.4 4.7Z"/>
  </g>
  <ellipse cx="50" cy="71.5" rx="27.5" ry="13" fill="${cor}" mask="url(#pao${sufixo})"/>
</svg>`;

/** Grão de trigo usado como separador, igual ao do site. */
export const grao = (cor) =>
  `<svg viewBox="0 0 12 12" fill="${cor}" style="width:.45em;height:.45em;display:inline-block;vertical-align:baseline"><path d="M6 1c2.7 2.4 2.7 7.6 0 10C3.3 8.6 3.3 3.4 6 1Z"/></svg>`;
