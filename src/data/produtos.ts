/**
 * Catálogo da Pequena Fornalha.
 *
 * Um item pode aparecer na fornada da semana (pronta entrega), só por
 * encomenda, ou nos dois — é o campo `disponibilidade` que decide em quais
 * páginas ele entra.
 *
 * As imagens são geradas por `scripts/gerar-placeholders.mjs` a partir do
 * `slug` e da `forma`. Ao receber as fotos reais, basta trocar o arquivo em
 * `public/images/produtos/<slug>.svg` por `<slug>.jpg` e ajustar `imagem`.
 */

export type Categoria = 'paes' | 'doces' | 'salgados' | 'bolos';
export type Disponibilidade = 'fornada' | 'encomenda' | 'ambos';
export type Forma = 'pao' | 'boule' | 'forma' | 'bun' | 'folhado' | 'bolo';

export type Produto = {
  slug: string;
  nome: string;
  categoria: Categoria;
  disponibilidade: Disponibilidade;
  /** Resumo curto, usado nos cards. */
  descricao: string;
  /** Texto completo da página do produto. */
  descricaoLonga: string;
  preco: string;
  peso: string;
  forma: Forma;
  /** Selo opcional no card. */
  tag?: string;
  /** Prazo mínimo — só faz sentido em item de encomenda. */
  prazo?: string;
  alergenos: string[];
  restricoes?: string[];
  ingredientes: string;
};

export const categorias: { id: Categoria; nome: string; descricao: string }[] = [
  {
    id: 'paes',
    nome: 'Pães',
    descricao: 'Fermentação natural, farinha moída na pedra e casca de forno quente.',
  },
  {
    id: 'doces',
    nome: 'Doces & pastelaria',
    descricao: 'Massas levedadas com levain, manteiga de verdade e fruta da estação.',
  },
  {
    id: 'salgados',
    nome: 'Salgados',
    descricao: 'Folhados e recheados feitos com queijo e embutidos da serra.',
  },
  {
    id: 'bolos',
    nome: 'Bolos de encomenda',
    descricao: 'Bolos inteiros para aniversário, café da tarde e data especial.',
  },
];

export const produtos: Produto[] = [
  // ── Pães ────────────────────────────────────────────────────────────────
  {
    slug: 'sourdough-classico',
    nome: 'Sourdough Clássico',
    categoria: 'paes',
    disponibilidade: 'ambos',
    descricao: 'Farinha, água, sal e tempo. Casca escura, miolo alveolado.',
    descricaoLonga:
      'O pão que começou tudo. Massa de 78% de hidratação, fermentada por 24 horas a frio, modelada à mão e assada com vapor até a casca ficar quase escura. Miolo alveolado, aroma de trigo tostado e uma acidez discreta que aparece no fim.',
    preco: 'R$ 32',
    peso: '900 g',
    forma: 'boule',
    tag: 'Carro-chefe',
    alergenos: ['Glúten (trigo)'],
    restricoes: ['Vegano'],
    ingredientes: 'Farinha de trigo, água, levain, sal marinho.',
  },
  {
    slug: 'integral-rustico',
    nome: 'Integral Rústico',
    categoria: 'paes',
    disponibilidade: 'ambos',
    descricao: 'Metade integral moída na pedra, metade branca. Sabor de castanha.',
    descricaoLonga:
      'Cinquenta por cento de farinha integral moída na pedra, o resto farinha branca de moagem lenta. Miolo mais denso e úmido, sabor de castanha, ótimo para torrar. Aguenta bem a semana inteira embrulhado em pano.',
    preco: 'R$ 36',
    peso: '900 g',
    forma: 'pao',
    alergenos: ['Glúten (trigo)'],
    restricoes: ['Vegano'],
    ingredientes: 'Farinha de trigo integral, farinha de trigo branca, água, levain, sal marinho.',
  },
  {
    slug: 'centeio-sementes',
    nome: 'Centeio com Sementes',
    categoria: 'paes',
    disponibilidade: 'ambos',
    descricao: 'Centeio escuro coberto de girassol, linhaça e gergelim.',
    descricaoLonga:
      'Pão de centeio escuro no estilo dinamarquês, com sementes hidratadas na massa e mais uma camada por fora. Encorpado, quase úmido, feito para fatia fina com manteiga, queijo curado ou conserva.',
    preco: 'R$ 38',
    peso: '850 g',
    forma: 'pao',
    alergenos: ['Glúten (trigo, centeio)', 'Gergelim'],
    restricoes: ['Vegano'],
    ingredientes:
      'Farinha de centeio, farinha de trigo, água, levain, sementes de girassol, linhaça, gergelim, sal marinho.',
  },
  {
    slug: 'ciabatta',
    nome: 'Ciabatta',
    categoria: 'paes',
    disponibilidade: 'fornada',
    descricao: 'Miolo aberto e casca fina. Feita para rasgar com a mão.',
    descricaoLonga:
      'Massa de alta hidratação com longa maturação a frio. Casca fina e crocante, miolo cheio de buraco. Sai do forno já pensando em sanduíche, ou em azeite e sal, ainda morna.',
    preco: 'R$ 26',
    peso: '450 g',
    forma: 'pao',
    alergenos: ['Glúten (trigo)'],
    restricoes: ['Vegano'],
    ingredientes: 'Farinha de trigo, água, levain, azeite de oliva, sal marinho.',
  },
  {
    slug: 'pao-de-forma',
    nome: 'Pão de Forma de Levain',
    categoria: 'paes',
    disponibilidade: 'ambos',
    descricao: 'Miolo macio e fatia certinha, sem conservante nenhum.',
    descricaoLonga:
      'O pão de forma da casa: miolo macio, fatia regular, feito só com levain e um pouco de leite. Dura três dias no pano e vira a melhor torrada da sua vida no quarto.',
    preco: 'R$ 30',
    peso: '700 g',
    forma: 'forma',
    alergenos: ['Glúten (trigo)', 'Leite'],
    ingredientes: 'Farinha de trigo, água, leite, levain, manteiga, açúcar mascavo, sal marinho.',
  },
  {
    slug: 'focaccia-alecrim',
    nome: 'Focaccia de Alecrim',
    categoria: 'paes',
    disponibilidade: 'fornada',
    descricao: 'Azeite extravirgem, alecrim fresco e flor de sal.',
    descricaoLonga:
      'Massa de altíssima hidratação, descansada em azeite e furada com a ponta dos dedos antes de ir ao forno. Sai dourada, crocante embaixo e macia por dentro. Sai só aos sábados, e costuma acabar cedo.',
    preco: 'R$ 28',
    peso: '500 g',
    forma: 'forma',
    tag: 'Só aos sábados',
    alergenos: ['Glúten (trigo)'],
    restricoes: ['Vegano'],
    ingredientes: 'Farinha de trigo, água, levain, azeite extravirgem, alecrim, flor de sal.',
  },

  // ── Doces & pastelaria ──────────────────────────────────────────────────
  {
    slug: 'brioche-de-levain',
    nome: 'Brioche de Levain',
    categoria: 'doces',
    disponibilidade: 'ambos',
    descricao: 'Manteiga de verdade e ovos caipiras, levedado com fermento natural.',
    descricaoLonga:
      'Brioche fermentado só com levain, o que leva o dobro do tempo e dá o dobro de sabor. Manteiga em quantidade indecente, ovos caipiras da colônia e uma pincelada de gema por cima. Doce na medida, macio por dias.',
    preco: 'R$ 42',
    peso: '700 g',
    forma: 'bun',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Farinha de trigo, ovos caipiras, manteiga, leite, levain, açúcar, sal marinho.',
  },
  {
    slug: 'rosca-de-canela',
    nome: 'Rosca de Canela',
    categoria: 'doces',
    disponibilidade: 'fornada',
    descricao: 'Massa de brioche enrolada com canela e açúcar mascavo.',
    descricaoLonga:
      'A massa de brioche aberta fina, coberta de manteiga, canela do Ceilão e açúcar mascavo, enrolada e trançada. Assada até caramelizar nas beiradas. Vendida por unidade, mas ninguém leva só uma.',
    preco: 'R$ 12',
    peso: '120 g',
    forma: 'bun',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Farinha de trigo, ovos, manteiga, leite, levain, açúcar mascavo, canela.',
  },
  {
    slug: 'cuca-de-banana',
    nome: 'Cuca de Banana',
    categoria: 'doces',
    disponibilidade: 'ambos',
    descricao: 'Farofa doce por cima, banana da estação por dentro.',
    descricaoLonga:
      'Receita de colônia, do jeito que se faz aqui na serra: massa levedada, banana em rodela e uma camada generosa de farofa de manteiga por cima. Assada em forma retangular e vendida inteira.',
    preco: 'R$ 45',
    peso: '1,1 kg',
    forma: 'forma',
    prazo: '2 dias',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Farinha de trigo, banana, manteiga, ovos, leite, levain, açúcar, canela.',
  },
  {
    slug: 'cookie-de-chocolate',
    nome: 'Cookie de Chocolate 70%',
    categoria: 'doces',
    disponibilidade: 'fornada',
    descricao: 'Massa maturada 48h, chocolate em pedaço e flor de sal.',
    descricaoLonga:
      'Massa descansada 48 horas na geladeira, chocolate 70% quebrado à faca (nada de gotas) e flor de sal por cima. Borda crocante, meio ainda molinho. Sai da fornada em quantidade limitada.',
    preco: 'R$ 14',
    peso: '110 g',
    forma: 'bun',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos', 'Soja'],
    ingredientes: 'Farinha de trigo, manteiga, ovos, açúcar mascavo, chocolate 70%, flor de sal.',
  },

  // ── Salgados ────────────────────────────────────────────────────────────
  {
    slug: 'folhado-de-queijo-colonial',
    nome: 'Folhado de Queijo Colonial',
    categoria: 'salgados',
    disponibilidade: 'fornada',
    descricao: 'Massa folhada de manteiga com queijo colonial da serra.',
    descricaoLonga:
      'Massa folhada laminada com manteiga, recheada de queijo colonial curado comprado de um produtor aqui da região. Assada até o queijo escapar pelas bordas e virar aquela crosta que todo mundo disputa.',
    preco: 'R$ 16',
    peso: '140 g',
    forma: 'folhado',
    alergenos: ['Glúten (trigo)', 'Leite'],
    ingredientes: 'Farinha de trigo, manteiga, queijo colonial, ovos, sal marinho.',
  },
  {
    slug: 'croissant-de-ervas',
    nome: 'Croissant Integral de Ervas',
    categoria: 'salgados',
    disponibilidade: 'fornada',
    descricao: 'Folhado integral com ervas do quintal e azeite.',
    descricaoLonga:
      'Croissant com parte de farinha integral na laminação, pincelado com azeite de ervas: alecrim, tomilho e orégano do vaso da janela. Menos doce que o croissant tradicional, ótimo para abrir e rechear.',
    preco: 'R$ 15',
    peso: '110 g',
    forma: 'folhado',
    alergenos: ['Glúten (trigo)', 'Leite'],
    ingredientes: 'Farinha de trigo, farinha integral, manteiga, levain, ervas frescas, sal marinho.',
  },
  {
    slug: 'pao-recheado-de-linguica',
    nome: 'Pão Recheado de Linguiça',
    categoria: 'salgados',
    disponibilidade: 'encomenda',
    descricao: 'Pão de levain recheado de linguiça artesanal e queijo.',
    descricaoLonga:
      'Massa de sourdough aberta e enrolada com linguiça artesanal da colônia, queijo e cebola caramelizada. Vai inteiro para a mesa e se corta em fatia grossa. Feito só por encomenda, para a fornada de sábado.',
    preco: 'R$ 58',
    peso: '1,2 kg',
    forma: 'pao',
    prazo: '3 dias',
    alergenos: ['Glúten (trigo)', 'Leite'],
    ingredientes: 'Farinha de trigo, água, levain, linguiça artesanal, queijo, cebola, sal marinho.',
  },

  // ── Bolos de encomenda ──────────────────────────────────────────────────
  {
    slug: 'bolo-de-chocolate',
    nome: 'Bolo de Chocolate',
    categoria: 'bolos',
    disponibilidade: 'encomenda',
    descricao: 'Três camadas de massa de cacau com ganache meio amargo.',
    descricaoLonga:
      'Três camadas de massa de cacau alcalino, recheio e cobertura de ganache 60%. Aro de 20 cm, serve de 10 a 14 pessoas. Pode ir com granulado de chocolate ou liso, é só avisar.',
    preco: 'R$ 180',
    peso: 'Aro 20 cm · 10 a 14 fatias',
    forma: 'bolo',
    prazo: '3 dias',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos', 'Soja'],
    ingredientes: 'Farinha de trigo, cacau, ovos, manteiga, creme de leite, chocolate 60%, açúcar.',
  },
  {
    slug: 'bolo-de-cenoura',
    nome: 'Bolo de Cenoura da Casa',
    categoria: 'bolos',
    disponibilidade: 'encomenda',
    descricao: 'Massa úmida de cenoura com calda de chocolate por cima.',
    descricaoLonga:
      'Cenoura batida na hora, massa bem úmida e a calda de chocolate grossa que endurece um pouco em cima. Aro de 20 cm, serve de 10 a 14 pessoas. O bolo de domingo, sem invenção.',
    preco: 'R$ 145',
    peso: 'Aro 20 cm · 10 a 14 fatias',
    forma: 'bolo',
    prazo: '3 dias',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Cenoura, farinha de trigo, ovos, óleo, açúcar, chocolate em pó, manteiga.',
  },
  {
    slug: 'bolo-de-festa',
    nome: 'Bolo de Festa',
    categoria: 'bolos',
    disponibilidade: 'encomenda',
    descricao: 'Recheio e cobertura combinados por WhatsApp. Aro 24 cm.',
    descricaoLonga:
      'Bolo de aniversário montado do seu jeito: massa branca ou de cacau, recheio a combinar (doce de leite, brigadeiro, frutas vermelhas ou limão) e acabamento em chantili ou ganache. Aro de 24 cm, serve de 20 a 25 pessoas. Combinamos tudo pelo WhatsApp antes de confirmar.',
    preco: 'A partir de R$ 240',
    peso: 'Aro 24 cm · 20 a 25 fatias',
    forma: 'bolo',
    tag: 'Sob medida',
    prazo: '5 dias',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Combinados conforme o recheio escolhido.',
  },
];

/** Caminho da imagem do produto (placeholder ou foto real). */
export const imagemProduto = (produto: Produto) => `/images/produtos/${produto.slug}.svg`;

export const produtoPorSlug = (slug: string) => produtos.find((p) => p.slug === slug);

export const naFornada = produtos.filter(
  (p) => p.disponibilidade === 'fornada' || p.disponibilidade === 'ambos',
);

export const paraEncomenda = produtos.filter(
  (p) => p.disponibilidade === 'encomenda' || p.disponibilidade === 'ambos',
);

export const porCategoria = (lista: Produto[], categoria: Categoria) =>
  lista.filter((p) => p.categoria === categoria);

/** Todos os alérgenos citados no catálogo, sem repetição. */
export const alergenosDoCatalogo = [...new Set(produtos.flatMap((p) => p.alergenos))].sort();
