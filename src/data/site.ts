/**
 * Configuração central do site.
 * Praticamente tudo que muda com frequência (telefone, horários, textos de
 * contato) está aqui — não precisa caçar nos componentes.
 */

/** Código do país + DDD + número, só dígitos (formato exigido pelo link wa.me). */
export const WHATSAPP_NUMBER = '5554936185585';

/** O mesmo número, formatado para leitura na tela. */
export const WHATSAPP_DISPLAY = '+55 54 93618-5585';

export const WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da Pequena Fornalha e gostaria de fazer um pedido.';

export const whatsappUrl = (message: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const site = {
  name: 'Pequena Fornalha',
  tagline: 'Pães artesanais de fermentação natural',
  description:
    'Padaria artesanal em Caxias do Sul, RS. Pães de fermentação natural, feitos à mão e assados em pequenas fornadas. Retirada na garagem, pedidos pelo WhatsApp.',
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
 * Enquanto não houver filmagem, `ativo: false` deixa só o poster no lugar —
 * é só colocar os arquivos em public/video/ e virar a chave.
 */
export const heroVideo = {
  ativo: false,
  mp4: '/video/fornada.mp4',
  webm: '/video/fornada.webm',
  poster: '/images/hero.svg',
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
