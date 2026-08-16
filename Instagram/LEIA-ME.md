# Kit de marca — Instagram

Gerado por `node scripts/gerar-kit-instagram.mjs`. Não edite os PNGs à mão:
mexa no script e rode de novo, senão a próxima geração sobrescreve tudo.

Cardápio, preços e horários saem de `src/data/`. Mudou no site, roda o script
e a arte acompanha.

---

## O plano da grade

O perfil é visto de três em três, não post a post. Por isso os posts alternam
**arte** e **foto** em xadrez:

```
  arte    foto    arte
  foto    arte    foto
  arte    foto    arte
```

Duas regras que sustentam isso:

1. **Nunca dois fundos iguais lado a lado nem um em cima do outro.** As cores
   giram na ordem creme → carvão → terracota → creme claro → sage → melaço.
2. **Nunca duas fotos seguidas na mesma linha.** Foto entra sempre com arte dos
   dois lados.

O arquivo `grade-exemplo.png` mostra como fica.

## Ritmo de postagem

Três posts por semana, cada um com um trabalho:

| Dia | Post | Arquivo base |
| --- | --- | --- |
| Segunda | Cardápio da semana | `post-03-cardapio.png` |
| Quinta | Foto do pão que sai na fornada | `post-07-foto-produto.png` |
| Sábado | Bastidor: massa, forno, bancada | `post-08-foto-bancada.png` |

Uma vez por mês, um carrossel de processo (os três `carrossel-*`) e um post
de recado quando a fornada mudar (`post-06-aviso.png`).

Stories são livres, mas todo story de fornada usa `story-2-fornada.png` para o
seguidor reconhecer sem ler.

## Legenda

Fórmula de três linhas, sempre nesta ordem:

1. **O que é**, em uma frase. `Sourdough clássico, 24 horas de fermentação.`
2. **O que fazer**, em uma frase. `Encomendas até quarta pelo WhatsApp.`
3. **Onde**, sempre igual. `Retirada no Bairro Jardim América, Caxias do Sul.`

Sem bloco de hashtag no fim. Três ou quatro dentro do texto bastam:
#fermentaçãonatural #paoartesanal #caxiasdosul

---

## Arquivos

### Perfil
| Arquivo | Medida |
| --- | --- |
| `perfil-carvao.png` | 1080×1080 |
| `perfil-creme.png` | 1080×1080 |
| `perfil-terracota.png` | 1080×1080 |

Use `perfil-carvao.png`. O Instagram recorta em círculo e o fundo escuro
destaca mais na busca.

### Posts (1080×1350)
| Arquivo | Medida |
| --- | --- |
| `post-01-marca.png` | 1080×1350 |
| `post-02-frase.png` | 1080×1350 |
| `post-03-cardapio.png` | 1080×1350 |
| `post-04-horarios.png` | 1080×1350 |
| `post-05-encomendas.png` | 1080×1350 |
| `post-06-aviso.png` | 1080×1350 |
| `post-07-foto-produto.png` | 1080×1350 |
| `post-08-foto-bancada.png` | 1080×1350 |
| `post-09-foto-forno.png` | 1080×1350 |
| `post-10-foto-cestos.png` | 1080×1350 |
| `carrossel-1-capa.png` | 1080×1350 |
| `carrossel-2-miolo.png` | 1080×1350 |
| `carrossel-3-fecho.png` | 1080×1350 |

O 4:5 ocupa mais tela no feed que o quadrado. Não corte para 1:1.

Os `post-07`, `08` e `09` são o gabarito de foto: foto sangrando em cima,
tarja com nome e assinatura embaixo. Troque a imagem mantendo a tarja.

### Stories (1080×1920)
| Arquivo | Medida |
| --- | --- |
| `story-1-marca.png` | 1080×1920 |
| `story-2-fornada.png` | 1080×1920 |
| `story-3-modelo-foto.png` | 1080×1920 |

Deixe texto longe dos 250px do topo e do rodapé: é onde ficam o nome do perfil
e a caixa de resposta.

### Destaques (1080×1080)
| Arquivo | Medida |
| --- | --- |
| `destaque-paes.png` | 1080×1080 |
| `destaque-encomendas.png` | 1080×1080 |
| `destaque-horarios.png` | 1080×1080 |
| `destaque-bastidores.png` | 1080×1080 |

A capa é recortada em círculo, então traz só o símbolo. O nome do destaque você
escreve no Instagram. Uma cor por assunto.

### Referência
| Arquivo | Medida |
| --- | --- |
| `paleta.png` | 1080×1350 |
| `grade-exemplo.png` | 1092×1092 |

## Se for criar arte nova

- Margem de 88px em todos os lados, sem exceção.
- Rótulo em caixa alta espaçada no topo, assinatura embaixo.
- Tamanhos de texto: rotulo 22px, corpo 30px, serifa 44px, titulo 82px, tituloGrande 118px.
- Fontes: Montserrat (títulos e rótulos) e EB Garamond (frases e nomes).
- Uma ideia por post. Se precisou de dois títulos, são dois posts.
