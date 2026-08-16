/**
 * Catálogo da Pequena Fornalha.
 *
 * O eixo é a padaria colonial da Serra Gaúcha: pão caseiro, cuca, sonho,
 * grostoli e os salgados com queijo e salame da colônia. A fermentação natural
 * é uma linha da casa, não o cardápio inteiro.
 *
 * Um item pode aparecer na fornada da semana (pronta entrega), só por
 * encomenda, ou nos dois — é o campo `disponibilidade` que decide em quais
 * páginas ele entra.
 *
 * TODO: nomes, pesos e preços ainda são proposta. Confira item a item antes de
 * publicar.
 */

export type Categoria = 'paes' | 'levain' | 'doces' | 'salgados' | 'bolos';
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
    nome: 'Pães da casa',
    descricao: 'O pão de todo dia, do jeito que se faz na colônia: massa simples e forno quente.',
  },
  {
    id: 'doces',
    nome: 'Cucas e doces',
    descricao: 'Farofa por cima, fruta da estação por dentro. O café da tarde da Serra.',
  },
  {
    id: 'salgados',
    nome: 'Salgados',
    descricao: 'Queijo e salame coloniais comprados de produtor daqui da região.',
  },
  {
    id: 'levain',
    nome: 'Fermentação natural',
    descricao: 'A linha de levain da casa: 24 horas de fermentação, sem fermento industrial.',
  },
  {
    id: 'bolos',
    nome: 'Bolos de encomenda',
    descricao: 'Bolos inteiros para aniversário, café da tarde e data especial.',
  },
];

export const produtos: Produto[] = [
  // ── Pães da casa ────────────────────────────────────────────────────────
  {
    slug: 'pao-caseiro-colonial',
    nome: 'Pão Caseiro Colonial',
    categoria: 'paes',
    disponibilidade: 'ambos',
    descricao: 'Miolo macio, casca fina e o cheiro que toma a casa inteira.',
    descricaoLonga:
      'O pão da colônia, do jeito que sempre se fez aqui: farinha, leite, ovo, banha e tempo. Miolo macio que desfia na mão, casca fina e dourada. Sai da forma ainda pelando e some no mesmo dia. É o pão que mais vende, e o motivo é simples: é o que todo mundo cresceu comendo.',
    preco: 'R$ 22',
    peso: '750 g',
    forma: 'forma',
    tag: 'Carro-chefe',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Farinha de trigo, leite, ovos, banha, açúcar, fermento, sal.',
  },
  {
    slug: 'pao-de-milho',
    nome: 'Pão de Milho',
    categoria: 'paes',
    disponibilidade: 'ambos',
    descricao: 'Fubá moído na pedra e erva-doce. Amarelo por dentro.',
    descricaoLonga:
      'Metade fubá moído na pedra, metade farinha de trigo, com um tanto de erva-doce que decide o cheiro. Miolo amarelo e úmido, ótimo com manteiga e melhor ainda com queijo colonial. Torra sem esfarelar.',
    preco: 'R$ 24',
    peso: '700 g',
    forma: 'forma',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Fubá, farinha de trigo, leite, ovos, erva-doce, açúcar, fermento, sal.',
  },
  {
    slug: 'pao-integral-caseiro',
    nome: 'Pão Integral Caseiro',
    categoria: 'paes',
    disponibilidade: 'ambos',
    descricao: 'Trigo integral e mel, sem açúcar refinado.',
    descricaoLonga:
      'Feito com farinha integral, adoçado só com mel e enriquecido com aveia. Miolo denso do jeito certo, sem virar tijolo. É o caseiro para quem quer pão integral de verdade, não pão branco pintado de marrom.',
    preco: 'R$ 26',
    peso: '750 g',
    forma: 'forma',
    alergenos: ['Glúten (trigo, aveia)', 'Leite'],
    ingredientes: 'Farinha de trigo integral, farinha branca, aveia, leite, mel, fermento, sal.',
  },
  {
    slug: 'rosca-colonial',
    nome: 'Rosca Colonial',
    categoria: 'paes',
    disponibilidade: 'fornada',
    descricao: 'Massa doce trançada, com erva-doce e açúcar cristal.',
    descricaoLonga:
      'A rosca do café da manhã de domingo: massa doce trançada à mão, erva-doce na massa e açúcar cristal por cima, que estala no dente. Aguenta bem dois dias, se sobrar.',
    preco: 'R$ 20',
    peso: '500 g',
    forma: 'pao',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Farinha de trigo, leite, ovos, manteiga, açúcar, erva-doce, fermento, sal.',
  },

  // ── Cucas e doces ───────────────────────────────────────────────────────
  {
    slug: 'cuca-de-uva',
    nome: 'Cuca de Uva',
    categoria: 'doces',
    disponibilidade: 'ambos',
    descricao: 'Uva da safra e farofa grossa de manteiga por cima.',
    descricaoLonga:
      'Massa levedada macia, uva da safra espalhada por cima e uma camada generosa de farofa de manteiga que fica crocante no forno. Na época da colheita usamos uva daqui mesmo; fora dela, a fruta muda e a gente avisa.',
    preco: 'R$ 42',
    peso: '1,1 kg',
    forma: 'forma',
    tag: 'A mais pedida',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Farinha de trigo, uva, manteiga, ovos, leite, açúcar, fermento.',
  },
  {
    slug: 'cuca-de-nata',
    nome: 'Cuca de Nata',
    categoria: 'doces',
    disponibilidade: 'ambos',
    descricao: 'Creme de nata no meio, farofa fina por cima.',
    descricaoLonga:
      'A cuca mais rica da mesa: massa levedada com uma camada de creme de nata assada junto, farofa fina por cima e açúcar de confeiteiro depois de fria. Come-se de colher.',
    preco: 'R$ 48',
    peso: '1,1 kg',
    forma: 'forma',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Farinha de trigo, nata, manteiga, ovos, leite, açúcar, fermento.',
  },
  {
    slug: 'cuca-de-banana',
    nome: 'Cuca de Banana',
    categoria: 'doces',
    disponibilidade: 'ambos',
    descricao: 'Banana em rodela, canela e farofa doce.',
    descricaoLonga:
      'Massa levedada, banana em rodela grossa, canela e farofa de manteiga por cima. A cuca de sempre, a que resolve visita de última hora.',
    preco: 'R$ 40',
    peso: '1,1 kg',
    forma: 'forma',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Farinha de trigo, banana, manteiga, ovos, leite, açúcar, canela, fermento.',
  },
  {
    slug: 'sonho',
    nome: 'Sonho de Creme',
    categoria: 'doces',
    disponibilidade: 'fornada',
    descricao: 'Frito na hora, recheado de creme e passado no açúcar.',
    descricaoLonga:
      'Massa levedada frita no dia, recheada de creme de baunilha feito na panela e passada no açúcar com canela ainda morna. Não sobrevive à tarde. Vendido por unidade.',
    preco: 'R$ 9',
    peso: '120 g',
    forma: 'bun',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Farinha de trigo, leite, ovos, manteiga, açúcar, baunilha, canela, fermento.',
  },
  {
    slug: 'grostoli',
    nome: 'Grostoli',
    categoria: 'doces',
    disponibilidade: 'ambos',
    descricao: 'Massa fina frita e açúcar de confeiteiro. Pacote de 300 g.',
    descricaoLonga:
      'Cueca virada, grostoli, crostoli — o nome muda de família para família, a receita não: massa fina com um dedo de graspa, frita rápido e coberta de açúcar de confeiteiro. Vai em pacote de 300 g.',
    preco: 'R$ 28',
    peso: '300 g',
    forma: 'folhado',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Farinha de trigo, ovos, manteiga, açúcar, graspa, açúcar de confeiteiro.',
  },
  {
    slug: 'torta-de-nata',
    nome: 'Torta de Nata',
    categoria: 'doces',
    disponibilidade: 'encomenda',
    descricao: 'Massa amanteigada, creme de nata e canela.',
    descricaoLonga:
      'Base de massa amanteigada, recheio de nata e ovos que assa até firmar tremendo, canela por cima. Serve de 8 a 10 pessoas. Sai só por encomenda, porque ocupa o forno inteiro.',
    preco: 'R$ 65',
    peso: 'Aro 24 cm · 8 a 10 fatias',
    forma: 'bolo',
    prazo: '3 dias',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Farinha de trigo, nata, ovos, manteiga, açúcar, canela.',
  },

  // ── Salgados ────────────────────────────────────────────────────────────
  {
    slug: 'folhado-de-queijo-colonial',
    nome: 'Folhado de Queijo Colonial',
    categoria: 'salgados',
    disponibilidade: 'fornada',
    descricao: 'Massa folhada de manteiga com queijo colonial curado.',
    descricaoLonga:
      'Massa folhada laminada com manteiga, recheada de queijo colonial curado de produtor daqui da região. Assada até o queijo escapar pelas bordas e virar aquela crosta que todo mundo disputa.',
    preco: 'R$ 16',
    peso: '140 g',
    forma: 'folhado',
    alergenos: ['Glúten (trigo)', 'Leite'],
    ingredientes: 'Farinha de trigo, manteiga, queijo colonial, ovos, sal.',
  },
  {
    slug: 'folhado-de-salame',
    nome: 'Folhado de Salame',
    categoria: 'salgados',
    disponibilidade: 'fornada',
    descricao: 'Salame colonial e queijo dentro da massa folhada.',
    descricaoLonga:
      'O mesmo folhado de manteiga, recheado de salame colonial fatiado fino e queijo. Sai da fornada da tarde e costuma acabar primeiro que o de queijo puro.',
    preco: 'R$ 18',
    peso: '150 g',
    forma: 'folhado',
    alergenos: ['Glúten (trigo)', 'Leite'],
    ingredientes: 'Farinha de trigo, manteiga, salame colonial, queijo, ovos, sal.',
  },
  {
    slug: 'pao-recheado-de-linguica',
    nome: 'Pão Recheado de Linguiça',
    categoria: 'salgados',
    disponibilidade: 'encomenda',
    descricao: 'Pão caseiro recheado de linguiça artesanal e queijo.',
    descricaoLonga:
      'Massa de pão caseiro aberta e enrolada com linguiça artesanal da colônia, queijo e cebola caramelizada. Vai inteiro para a mesa e se corta em fatia grossa. Feito por encomenda, para a fornada de sábado.',
    preco: 'R$ 58',
    peso: '1,2 kg',
    forma: 'pao',
    prazo: '3 dias',
    alergenos: ['Glúten (trigo)', 'Leite', 'Ovos'],
    ingredientes: 'Farinha de trigo, leite, ovos, linguiça artesanal, queijo, cebola, fermento, sal.',
  },

  // ── Fermentação natural ─────────────────────────────────────────────────
  {
    slug: 'sourdough-classico',
    nome: 'Sourdough Clássico',
    categoria: 'levain',
    disponibilidade: 'ambos',
    descricao: 'Farinha, água, sal e tempo. Casca escura, miolo alveolado.',
    descricaoLonga:
      'Massa fermentada por 24 horas só com levain, modelada à mão e assada com vapor até a casca ficar quase escura. Miolo alveolado e acidez discreta. É o pão da linha de fermentação natural, e não precisa de manteiga para se explicar.',
    preco: 'R$ 32',
    peso: '900 g',
    forma: 'boule',
    alergenos: ['Glúten (trigo)'],
    restricoes: ['Vegano'],
    ingredientes: 'Farinha de trigo, água, levain, sal marinho.',
  },
  {
    slug: 'integral-rustico',
    nome: 'Integral Rústico de Levain',
    categoria: 'levain',
    disponibilidade: 'ambos',
    descricao: 'Metade integral moída na pedra. Sabor de castanha.',
    descricaoLonga:
      'Cinquenta por cento de farinha integral moída na pedra, o resto branca. Miolo mais denso e úmido, sabor de castanha, ótimo para torrar. Aguenta a semana embrulhado em pano.',
    preco: 'R$ 36',
    peso: '900 g',
    forma: 'pao',
    alergenos: ['Glúten (trigo)'],
    restricoes: ['Vegano'],
    ingredientes: 'Farinha de trigo integral, farinha branca, água, levain, sal marinho.',
  },
  {
    slug: 'centeio-sementes',
    nome: 'Centeio com Sementes',
    categoria: 'levain',
    disponibilidade: 'ambos',
    descricao: 'Centeio escuro coberto de girassol, linhaça e gergelim.',
    descricaoLonga:
      'Pão de centeio escuro com sementes hidratadas na massa e mais uma camada por fora. Encorpado, quase úmido, feito para fatia fina com queijo curado ou conserva.',
    preco: 'R$ 38',
    peso: '850 g',
    forma: 'pao',
    alergenos: ['Glúten (trigo, centeio)', 'Gergelim'],
    restricoes: ['Vegano'],
    ingredientes:
      'Farinha de centeio, farinha de trigo, água, levain, girassol, linhaça, gergelim, sal marinho.',
  },

  // ── Bolos de encomenda ──────────────────────────────────────────────────
  {
    slug: 'bolo-de-chocolate',
    nome: 'Bolo de Chocolate',
    categoria: 'bolos',
    disponibilidade: 'encomenda',
    descricao: 'Três camadas de massa de cacau com ganache meio amargo.',
    descricaoLonga:
      'Três camadas de massa de cacau, recheio e cobertura de ganache 60%. Aro de 20 cm, serve de 10 a 14 pessoas. Pode ir com granulado ou liso, é só avisar.',
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
