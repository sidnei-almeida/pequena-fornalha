/** Conteúdo da página de perguntas frequentes, separado por grupo. */

export type Pergunta = { pergunta: string; resposta: string };
export type GrupoFaq = { id: string; titulo: string; perguntas: Pergunta[] };

export const gruposFaq: GrupoFaq[] = [
  {
    id: 'retirada',
    titulo: 'Visita e retirada',
    perguntas: [
      {
        pergunta: 'Vocês têm loja para entrar e comprar?',
        resposta:
          'Não. A Pequena Fornalha funciona na garagem de casa e só abre nos horários de retirada. Você chega, pega o pedido no balcão da porta e vai embora. Não temos mesas nem consumo no local.',
      },
      {
        pergunta: 'Preciso encomendar ou posso chegar e comprar?',
        resposta:
          'Nos horários de retirada sempre sobram pães da fornada do dia, então dá para chegar e levar o que tiver. Mas a fornada é pequena: quem encomenda tem o pão garantido, quem não encomenda leva o que sobrou.',
      },
      {
        pergunta: 'Qual o melhor horário para chegar?',
        resposta:
          'Quinta e sexta a fornada sai por volta das 16h, e nas duas primeiras horas tem de tudo. Sábado o movimento é maior e o pão caseiro, as cucas e os sonhos costumam acabar antes das 11h.',
      },
      {
        pergunta: 'Como pago?',
        resposta:
          'Pix na hora da retirada, de preferência. Também aceitamos dinheiro e cartão de débito. Encomendas acima de R$ 150 pedem 50% de sinal por Pix na confirmação.',
      },
      {
        pergunta: 'Vocês entregam?',
        // TODO: confirmar bairros atendidos, taxa, dias e pedido mínimo.
        resposta:
          'Entregamos. A área atendida, a taxa e o dia da entrega são combinados pelo WhatsApp na hora do pedido.',
      },
    ],
  },
  {
    id: 'encomendas',
    titulo: 'Encomendas',
    perguntas: [
      {
        pergunta: 'Como faço uma encomenda?',
        resposta:
          'Pelo WhatsApp. Diga o que quer, a quantidade e para qual dia. A gente responde com o total e o horário de retirada, e a encomenda só está confirmada depois dessa resposta.',
      },
      {
        pergunta: 'Com quanta antecedência preciso pedir?',
        resposta:
          'Pães e itens da fornada: até quarta-feira, às 20h, para a fornada da semana. Bolos e itens especiais: 3 dias de antecedência. Bolo de festa: 5 dias.',
      },
      {
        pergunta: 'Dá para encomendar para o mesmo dia?',
        resposta:
          'Não. A massa precisa de 24 horas só de fermentação, e o forno tem tamanho fixo. O que entra na fornada é definido no dia anterior.',
      },
      {
        pergunta: 'Posso cancelar ou mudar a encomenda?',
        resposta:
          'Dá para mudar ou cancelar até 48 horas antes da retirada, sem custo. Depois disso os ingredientes já foram comprados e a massa iniciada, então o sinal não é devolvido.',
      },
      {
        pergunta: 'Vocês fazem encomenda grande para evento?',
        resposta:
          'Fazemos, dentro do tamanho do forno. Para mais de 20 pães ou bolos de festa, chame no WhatsApp com pelo menos uma semana de antecedência para a gente ver se cabe na semana.',
      },
      {
        pergunta: 'E se eu não retirar no horário combinado?',
        resposta:
          'Guardamos o pedido até o fim do horário de retirada daquele dia. Se não der para você vir, avise que a gente tenta remarcar para a próxima fornada, mas pão fresco não espera três dias.',
      },
    ],
  },
  {
    id: 'produtos',
    titulo: 'Sobre os produtos',
    perguntas: [
      {
        pergunta: 'O que é fermentação natural?',
        resposta:
          'É pão levedado só com levain, uma mistura viva de farinha e água que fermenta sozinha, sem fermento biológico industrial. Leva muito mais tempo, dá mais sabor e costuma cair melhor no estômago.',
      },
      {
        pergunta: 'Quanto tempo o pão dura?',
        resposta:
          'Embrulhado em pano de algodão, o sourdough dura de 4 a 5 dias e só melhora torrado. Nada de saco plástico: ele amolece a casca. Também dá para fatiar e congelar assim que esfriar.',
      },
      {
        pergunta: 'Vocês têm opção sem glúten?',
        resposta:
          'Não. Trabalhamos com farinha de trigo e centeio na mesma bancada e no mesmo forno, então não temos como garantir ausência de contaminação cruzada.',
      },
      {
        pergunta: 'Tem opção vegana?',
        resposta:
          'Sim, na linha de fermentação natural: o Sourdough Clássico, o Integral Rústico de Levain e o Centeio com Sementes não levam ingrediente de origem animal. Os pães coloniais levam leite, ovos e banha. Os itens veganos estão marcados no cardápio.',
      },
      {
        pergunta: 'Onde vejo os alérgenos?',
        resposta:
          'Cada produto tem a lista de alérgenos e a lista de ingredientes na sua própria página. O resumo geral está em Políticas e alérgenos.',
      },
    ],
  },
];
