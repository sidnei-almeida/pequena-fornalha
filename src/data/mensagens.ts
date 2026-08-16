/**
 * Textos que saem prontos no WhatsApp.
 *
 * Três regras que valem para todos os modelos daqui:
 *
 * 1. Quem envia é o cliente, não a padaria. Tudo em primeira pessoa, do lado de
 *    fora do balcão. Mensagem que começa com "Somos a Pequena Fornalha" chega
 *    na nossa própria caixa de entrada e não faz sentido nenhum.
 *
 * 2. Campos em branco no fim são de propósito. O cliente completa antes de
 *    enviar e a primeira mensagem já vem com o que a gente precisa para
 *    responder — sem as três rodadas de "para qual dia?", "quantos?".
 *
 * 3. O link do produto vai no corpo porque o WhatsApp monta a prévia do
 *    primeiro endereço que encontra: chega com foto, nome e preço num cartão.
 *    É o mais perto de "mandar a imagem do produto" que um link wa.me alcança —
 *    o parâmetro `text` só aceita texto puro, anexo não passa por ali. Para a
 *    prévia aparecer, a página do produto precisa da própria og:image em PNG
 *    (veja scripts/gerar-og-produtos.mjs); SVG o WhatsApp ignora.
 *
 * O WhatsApp entende *negrito*, _itálico_ e ~riscado~ no texto recebido.
 */

import type { Produto } from './produtos';
import { site } from './site';

/** Abertura comum: diz de onde a pessoa veio antes de qualquer outra coisa. */
const ABERTURA = `Olá! Vim pelo site da ${site.name}`;

/**
 * Junta as linhas e limpa sobra no começo e no fim.
 *
 * O filtro tira `undefined` (linha que não se aplica àquele produto) mas
 * preserva a string vazia: ela é a linha em branco que separa os blocos, e é o
 * que faz a mensagem chegar arejada em vez de um parágrafo só.
 */
const montar = (...linhas: (string | undefined)[]) =>
  linhas.filter((linha) => linha !== undefined).join('\n').trim();

/** Pedido genérico — o botão do topo, do rodapé e do bloco de horários. */
export const msgPedido = () =>
  montar(
    `${ABERTURA} e gostaria de fazer um pedido.`,
    '',
    '*O que eu quero:*',
    '*Para qual dia:*',
  );

/** Página da fornada da semana: a pergunta é o que saiu do forno. */
export const msgFornada = () =>
  montar(
    `${ABERTURA}.`,
    '',
    'Queria saber o que tem na fornada desta semana e até que horas dá para retirar.',
  );

/** Página de encomendas: lembra o prazo para a conversa já começar realista. */
export const msgEncomenda = () =>
  montar(
    `${ABERTURA} e gostaria de fazer uma *encomenda*.`,
    '',
    '*Item:*',
    '*Quantidade:*',
    '*Retirada (dia):*',
    '',
    `Sei que a encomenda pede ${site.prazoPadrao} de antecedência.`,
  );

/** Perguntas frequentes: deixa claro que a pessoa já leu a página. */
export const msgDuvida = () =>
  montar(
    `${ABERTURA}.`,
    '',
    'Li as perguntas frequentes e fiquei com uma dúvida:',
    '',
  );

/**
 * Produto específico. `url` tem que ser absoluta (https://…): o WhatsApp só
 * monta a prévia com endereço completo, caminho relativo vira texto solto.
 */
export const msgProduto = (produto: Produto, url: string) => {
  const soEncomenda = produto.disponibilidade === 'encomenda';
  const verbo = soEncomenda ? 'encomendar' : 'reservar';

  // Bolo é vendido por fatia, e "quantidade" ali não diz nada — ninguém
  // encomenda dois bolos, encomenda um bolo para tantas pessoas. Serve tanto
  // para o de festa quanto para o de cenoura de domingo, então nada de
  // perguntar "ocasião" ou "data da festa".
  const porFatia = produto.peso.includes('fatia');

  const campos = porFatia
    ? ['*Para quando:*', '*Quantas pessoas:*']
    : ['*Quantidade:*', '*Retirada (dia):*'];

  return montar(
    `${ABERTURA}.`,
    '',
    `Gostaria de *${verbo}*:`,
    '',
    `*${produto.nome}*`,
    `${produto.preco} · ${produto.peso}`,
    url,
    '',
    ...campos,
    // O prazo só existe em item de encomenda; em pão de fornada não vem nada.
    ...(produto.prazo ? ['', `Antecedência: ${produto.prazo}.`] : []),
  );
};

/** Formulário da página de contato, montado no navegador com o que a pessoa digitou. */
export const msgContato = (dados: { nome: string; assunto: string; mensagem: string }) =>
  montar(
    `Olá! Sou ${dados.nome.trim()} e vim pelo site da ${site.name}.`,
    '',
    `*Assunto:* ${dados.assunto}`,
    '',
    dados.mensagem.trim(),
  );
