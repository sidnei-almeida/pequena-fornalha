/**
 * Configuração central do site.
 * Praticamente tudo que muda com frequência (telefone, horários, textos de
 * contato) está aqui — não precisa caçar nos componentes.
 */

/** Código do país + DDD + número, só dígitos (formato exigido pelo link wa.me). */
export const WHATSAPP_NUMBER = '5554936185585';

/** O mesmo número, formatado para leitura na tela. */
export const WHATSAPP_DISPLAY = '+55 54 93618-5585';

/**
 * Monta o link do WhatsApp com a mensagem já escrita.
 *
 * A mensagem é obrigatória e sai toda de src/data/mensagens.ts. Sem texto
 * padrão aqui de propósito: um botão novo que esquecesse de escolher o modelo
 * abriria a conversa com a mensagem errada, e ninguém ia perceber.
 */
export const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const site = {
  name: 'Pequena Fornalha',
  tagline: 'Pães coloniais e fermentação natural',
  description:
    'Padaria caseira em Caxias do Sul, RS. Pão colonial, cuca, sonho e pães de fermentação natural, assados em pequenas fornadas. Retirada na garagem, pedidos pelo WhatsApp.',
  city: 'Caxias do Sul',
  state: 'RS',
  neighborhood: 'Bairro Jardim América',
  // TODO: rua e número reais.
  street: 'Rua da Fornalha, 000',
  addressNote: 'Retirada na garagem. O endereço completo vai na confirmação do pedido.',
  instagram: 'https://instagram.com/pequenafornalha',
  instagramHandle: '@pequenafornalha',
  email: 'contato@pequenafornalha.com.br',
  /** Prazo mínimo padrão para encomendas. */
  prazoPadrao: '3 dias',
} as const;

/**
 * Vídeo de fundo do hero.
 * Loop de 22s montado a partir de três cenas (peneirar a farinha, a massa indo
 * pra forma, a farofa sendo feita à mão), com um tratamento de cor quente e
 * fosco para casar com a paleta. Sem áudio. `ativo: false` deixa só o poster.
 */
export const heroVideo = {
  ativo: true,
  mp4: '/video/fornada.mp4',
  webm: '/video/fornada.webm',
  poster: '/images/hero-poster.jpg',
} as const;

export const schedule = [
  { day: 'Segunda a quarta', hours: 'Fornada em descanso' },
  { day: 'Quinta-feira', hours: '16h às 19h' },
  { day: 'Sexta-feira', hours: '16h às 19h' },
  { day: 'Sábado', hours: '9h às 13h' },
  { day: 'Domingo', hours: 'Fechado' },
] as const;

export const navLinks = [
  { href: '/pronta-entrega', label: 'Pronta entrega' },
  { href: '/encomendas', label: 'Encomendas' },
  { href: '/perguntas-frequentes', label: 'Perguntas' },
  { href: '/contato', label: 'Contato' },
] as const;

export const footerLinks = [
  { href: '/', label: 'A padaria' },
  { href: '/pronta-entrega', label: 'Pronta entrega' },
  { href: '/encomendas', label: 'Encomendas' },
  { href: '/perguntas-frequentes', label: 'Perguntas frequentes' },
  { href: '/contato', label: 'Contato' },
  { href: '/politicas', label: 'Políticas e alérgenos' },
] as const;
