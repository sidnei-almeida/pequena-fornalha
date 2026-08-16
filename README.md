# Pequena Fornalha

Site da Pequena Fornalha — padaria artesanal de fermentação natural em Caxias do
Sul, RS. Site estático, sem carrinho: todos os pedidos são fechados pelo
WhatsApp.

## Páginas

| Rota | O que é |
| --- | --- |
| `/` | A padaria: história da casa e as duas portas de entrada do catálogo |
| `/pronta-entrega` | O que sai na fornada da semana e fica no balcão, sem encomenda |
| `/encomendas` | Catálogo de encomenda, prazos e regras |
| `/produto/<slug>` | Página de cada item: descrição, ingredientes e alérgenos |
| `/perguntas-frequentes` | FAQ em três blocos (retirada, encomendas, produtos) |
| `/contato` | Canais, horários e formulário que monta a mensagem do WhatsApp |
| `/politicas` | Alérgenos, prazos, cancelamento, pagamento, conservação e privacidade |

A arquitetura segue a da TOAD Bakery (`in-store menu` / `order for pickup` /
`FAQs` / `contact` / `policies`), adaptada para uma operação que fecha pedido no
WhatsApp em vez de checkout online.

## Stack

- [Astro](https://astro.build) (saída 100% estática)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- Fontes auto-hospedadas: Montserrat Variable (títulos) e EB Garamond Variable (textos)
- Deploy na Vercel

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview  # serve o dist/
```

## O que mexer no dia a dia

| O quê | Onde |
| --- | --- |
| Número do WhatsApp, e-mail, Instagram, endereço | `src/data/site.ts` |
| Horários de retirada | `src/data/site.ts` (`schedule`) |
| Menu do topo e links do rodapé | `src/data/site.ts` (`navLinks`, `footerLinks`) |
| Produtos, preços, categorias, alérgenos | `src/data/produtos.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| Políticas | `src/pages/politicas.astro` |
| Cores da marca e fontes | `src/styles/global.css` (bloco `@theme`) |

Em `src/data/produtos.ts`, o campo `disponibilidade` decide onde o item aparece:
`fornada` (só em `/pronta-entrega`), `encomenda` (só em `/encomendas`) ou
`ambos`. O campo `forma` só serve para escolher o desenho do placeholder.

> O `WHATSAPP_NUMBER` em `src/data/site.ts` alimenta todos os botões do site de
> uma vez. Formato: `55` + DDD + número, só dígitos.

## Logo e ícones

A logo vive em `src/components/Logomarca.astro`, em SVG — vetor, sem resolução
fixa, herda a cor do container via `currentColor`. Não existe versão bitmap dela
no site.

Os PNGs em `public/` são só para onde SVG não funciona, e são gerados a partir
do mesmo desenho:

```bash
node scripts/gerar-icones.mjs   # precisa de Chrome/Chromium local
```

| Arquivo | Para quê |
| --- | --- |
| `apple-touch-icon.png` (180×180) | atalho na tela inicial do iPhone |
| `favicon-32.png` (32×32) | navegador sem suporte a favicon SVG |
| `og.png` (1200×630) | prévia do link no WhatsApp, Instagram e Facebook |

Mexeu na logo? Rode o script de novo e commite os PNGs — eles vão versionados,
porque o build da Vercel não tem navegador para gerá-los.

## Vídeo do hero

O hero já está pronto para receber o vídeo da fornada. Quando a filmagem
existir:

1. Exporte em dois formatos e coloque em `public/video/`:
   `fornada.webm` (VP9/AV1) e `fornada.mp4` (H.264, para Safari).
2. Mire em ~10–20 s em loop, **sem áudio**, 1920×1080, alguns MB no máximo —
   o vídeo carrega junto com a página.
3. Em `src/data/site.ts`, vire `heroVideo.ativo` para `true`.

Enquanto `ativo` for `false`, o hero mostra só o poster (`heroVideo.poster`) e
nenhum arquivo de vídeo é requisitado. O vídeo entra mudo, em loop e sem
controles; quem tem "reduzir movimento" ligado no sistema fica com o poster.

## Fotos de preparo

A seção de bastidores (`src/components/Bastidores.astro`) usa três imagens de
produção — bancada, cestos de fermentação e forno. Os placeholders estão em
`public/images/preparo-*.svg`; troque pelos arquivos reais mantendo as
proporções: `preparo-bancada` (16:9 ou 4:3), `preparo-cestos` (4:5, retrato) e
`preparo-forno` (4:3).

## Fotos dos pães

Enquanto não há fotos, `public/images/produtos/<slug>.svg` traz um placeholder
por produto, gerado por `scripts/gerar-placeholders.mjs` a partir do catálogo.
Para usar fotos reais:

1. Coloque os arquivos em `public/images/produtos/` (proporção 4:5, ex.: 1000×1250).
2. Ajuste a função `imagemProduto` em `src/data/produtos.ts` para a extensão nova.
3. Troque `public/images/hero.svg` e `oficina.svg` pelas fotos largas correspondentes.
4. Apague `scripts/gerar-placeholders.mjs` quando não precisar mais dele.

## Kit de Instagram

```bash
node scripts/gerar-kit-instagram.mjs   # precisa de Chrome/Chromium local
```

Gera 25 artes em `Instagram/`: perfil, posts 4:5, stories, capas de destaque,
paleta e uma prévia da grade do perfil. Cardápio, preços e horários saem de
`src/data/`, então mudou no site, roda o script e a arte acompanha.

O plano de grade, o ritmo de postagem e a fórmula de legenda estão em
`Instagram/LEIA-ME.md`.

## Paleta (manual da marca)

| Cor | Hex | Uso |
| --- | --- | --- |
| Primary Dark | `#27231F` | fundos escuros, texto |
| Text Cream | `#F1EBD5` | fundo principal, texto sobre escuro |
| Terracotta Sourdough | `#AB5F43` | botões, destaques |
| Deep Molasses | `#683E32` | hover dos botões |
| Sage Earth | `#6B6B57` | fundos de apoio |

Guarde os arquivos originais da marca (logo e manual do Gemini) em `brand/`.
A pasta não é usada pelo build e fica fora do deploy.

## Deploy na Vercel

O repositório já está pronto: `vercel.json` (build, cache e headers),
`.vercelignore`, `.nvmrc`, `engines` no `package.json` e `package-lock.json`
commitado.

1. Suba tudo para o GitHub.
2. Na Vercel, **Add New → Project**, importe o repositório e confirme. Não
   precisa mexer em nenhuma configuração: o framework é detectado como Astro,
   com `npm run build` e saída em `dist`.
3. Não há variável de ambiente para configurar. O site é estático e o WhatsApp
   é link direto.
4. Depois do primeiro deploy, troque o domínio em dois lugares e publique de
   novo:
   - `site` em `astro.config.mjs` (alimenta canonical, sitemap e as prévias de
     link);
   - `Sitemap:` em `public/robots.txt`.

Só `public/`, `src/` e os arquivos de configuração sobem. `Instagram/`,
`brand/` e `scripts/` ficam de fora pelo `.vercelignore` — são material de
trabalho, não do site.

### Antes de publicar

- [ ] Rua e número reais em `src/data/site.ts` (hoje é `Rua da Fornalha, 000`)
- [ ] Instagram e e-mail reais em `src/data/site.ts`
- [ ] Área, taxa e dias da entrega (os `TODO` em `src/data/faq.ts` e
      `src/pages/politicas.astro`)
- [ ] Horários e preços conferidos
- [ ] Um clique de teste no botão do WhatsApp
