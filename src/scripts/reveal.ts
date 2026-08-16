/**
 * Animações de entrada.
 *
 * São três gestos, todos ligados ao ofício:
 *   [data-reveal]        sobe e aparece — o gesto básico
 *   [data-crescer]       cada linha sobe de dentro de um corte, como massa
 *                        crescendo na forma
 *   [data-fornada]       uma cortina sai de cima da imagem, como quem abre a
 *                        boca do forno
 *
 * A marca `anima` só entra no <html> quando há JavaScript e o sistema não pede
 * menos movimento. Sem ela, o CSS não esconde nada e a página aparece pronta —
 * ninguém fica olhando para o vazio se um script falhar.
 */
const raiz = document.documentElement;
const querMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const suportado = 'IntersectionObserver' in window;

if (querMenosMovimento || !suportado) {
  raiz.classList.add('anima-pronto');
} else {
  raiz.classList.add('anima');

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;

        const alvo = entrada.target as HTMLElement;
        const atraso = Number(alvo.dataset.revealDelay ?? 0);
        window.setTimeout(() => alvo.classList.add('is-visible'), atraso);
        observador.unobserve(alvo);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
  );

  const alvos = document.querySelectorAll<HTMLElement>('[data-reveal], [data-crescer], [data-fornada]');

  // Cada linha do texto que "cresce" recebe seu próprio atraso, em cascata.
  document.querySelectorAll<HTMLElement>('[data-crescer]').forEach((bloco) => {
    bloco.querySelectorAll<HTMLElement>(':scope > *').forEach((linha, indice) => {
      linha.style.setProperty('--atraso-linha', `${indice * 90}ms`);
    });
  });

  alvos.forEach((alvo) => observador.observe(alvo));
}
