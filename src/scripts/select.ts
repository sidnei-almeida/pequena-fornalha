/**
 * Substitui o <select> nativo por uma lista com o tema do site.
 *
 * A lista aberta de um <select> é desenhada pelo sistema operacional, e nenhum
 * CSS alcança ela. A saída é montar a nossa: o <select> original continua no
 * formulário guardando o valor (é dele que o FormData lê), e ganha por cima um
 * botão com uma lista de verdade.
 *
 * Sem JavaScript o campo nativo permanece visível e funcional.
 */
const selects = document.querySelectorAll<HTMLSelectElement>('select[data-select]');

selects.forEach((nativo) => {
  const rotulo = document.querySelector<HTMLLabelElement>(`label[for="${nativo.id}"]`);
  const idLista = `${nativo.id}-lista`;
  const idBotao = `${nativo.id}-botao`;

  // O nativo sai do fluxo visual, mas continua sendo o dono do valor.
  nativo.classList.add('sr-only');
  nativo.setAttribute('tabindex', '-1');
  nativo.setAttribute('aria-hidden', 'true');

  const caixa = document.createElement('div');
  caixa.className = 'select-caixa';

  const botao = document.createElement('button');
  botao.type = 'button';
  botao.id = idBotao;
  botao.className = 'select-botao';
  botao.setAttribute('aria-haspopup', 'listbox');
  botao.setAttribute('aria-expanded', 'false');
  botao.setAttribute('aria-controls', idLista);
  if (rotulo) botao.setAttribute('aria-labelledby', `${rotulo.id || (rotulo.id = `${nativo.id}-rotulo`)} ${idBotao}`);

  const texto = document.createElement('span');
  texto.textContent = nativo.options[nativo.selectedIndex]?.text ?? '';
  botao.append(texto);

  const seta = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  seta.setAttribute('viewBox', '0 0 16 16');
  seta.setAttribute('aria-hidden', 'true');
  seta.setAttribute('class', 'select-seta');
  seta.innerHTML = '<path d="m4 6.5 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>';
  botao.append(seta);

  const lista = document.createElement('ul');
  lista.id = idLista;
  lista.className = 'select-lista';
  lista.setAttribute('role', 'listbox');
  lista.hidden = true;

  const opcoes = Array.from(nativo.options).map((opcao, indice) => {
    const item = document.createElement('li');
    item.id = `${nativo.id}-opcao-${indice}`;
    item.className = 'select-opcao';
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', String(indice === nativo.selectedIndex));
    item.textContent = opcao.text;
    item.dataset.valor = opcao.value;
    lista.append(item);
    return item;
  });

  caixa.append(botao, lista);
  nativo.after(caixa);

  let aberto = false;
  let emFoco = nativo.selectedIndex;

  const marcar = (indice: number) => {
    emFoco = Math.max(0, Math.min(indice, opcoes.length - 1));
    opcoes.forEach((item, i) => item.classList.toggle('em-foco', i === emFoco));
    botao.setAttribute('aria-activedescendant', opcoes[emFoco].id);
    opcoes[emFoco].scrollIntoView({ block: 'nearest' });
  };

  const abrir = () => {
    aberto = true;
    lista.hidden = false;
    botao.setAttribute('aria-expanded', 'true');
    marcar(nativo.selectedIndex);
  };

  const fechar = (devolverFoco = true) => {
    aberto = false;
    lista.hidden = true;
    botao.setAttribute('aria-expanded', 'false');
    botao.removeAttribute('aria-activedescendant');
    if (devolverFoco) botao.focus();
  };

  const escolher = (indice: number) => {
    nativo.selectedIndex = indice;
    nativo.dispatchEvent(new Event('change', { bubbles: true }));
    texto.textContent = opcoes[indice].textContent;
    opcoes.forEach((item, i) => item.setAttribute('aria-selected', String(i === indice)));
    fechar();
  };

  botao.addEventListener('click', () => (aberto ? fechar() : abrir()));

  opcoes.forEach((item, indice) => {
    item.addEventListener('click', () => escolher(indice));
    item.addEventListener('mousemove', () => marcar(indice));
  });

  botao.addEventListener('keydown', (evento) => {
    switch (evento.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Enter':
      case ' ':
        evento.preventDefault();
        if (!aberto) return abrir();
        if (evento.key === 'ArrowDown') return marcar(emFoco + 1);
        if (evento.key === 'ArrowUp') return marcar(emFoco - 1);
        return escolher(emFoco);
      case 'Home':
        if (aberto) {
          evento.preventDefault();
          marcar(0);
        }
        return;
      case 'End':
        if (aberto) {
          evento.preventDefault();
          marcar(opcoes.length - 1);
        }
        return;
      case 'Escape':
        if (aberto) {
          evento.preventDefault();
          fechar();
        }
        return;
      case 'Tab':
        if (aberto) fechar(false);
        return;
      default:
        // Digitar uma letra pula para a primeira opção que começa com ela.
        if (evento.key.length === 1 && /\S/.test(evento.key)) {
          const alvo = opcoes.findIndex((item) =>
            item.textContent?.toLowerCase().startsWith(evento.key.toLowerCase()),
          );
          if (alvo >= 0) {
            if (!aberto) abrir();
            marcar(alvo);
          }
        }
    }
  });

  document.addEventListener('click', (evento) => {
    if (aberto && !caixa.contains(evento.target as Node)) fechar(false);
  });
});
