# Ethernum RPG Website

Site estático da mesa Ethernum RPG, publicado via GitHub Pages. A central reúne dashboard da campanha, páginas de personagens, fichas PF2e, ferramentas do mestre, configuração de áudio e testes manuais.

## Estrutura

```text
index.html
css/
js/
assets/
pages/
  personagens/
  ferramentas/
  mundo/
  mecanicas/
  sistema/
data/
pdfs/
```

## Rodar Localmente

Abra `index.html` diretamente no navegador ou rode um servidor estático simples:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000/`.

## Páginas Principais

- `index.html`: dashboard da Ethernum Company.
- `pages/personagens/gyro-zeppeli.html`: ficha do Gyro.
- `pages/personagens/cinerio-umbra.html`: ficha do Cinerio & Umbra.
- `pages/personagens/pipping-baldwin-black.html`: ficha do Pipping.
- `pages/personagens/bayle-o-horror.html`: ficha do Bayle.
- `pages/mundo/campanha.html`: status da campanha.
- `pages/ferramentas/mestre-panel.html`: painel privado do mestre, sem link na navegação pública.
- `pages/ferramentas/audio-config.html`: configurações gerais e áudio para o fluxo privado.
- `pages/ferramentas/tests.html`: bateria manual de testes.
- `pages/sistema/roadmap.html`: roadmap visual do Terminal Ethernum.

## Adicionar Personagem

1. Crie a página em `pages/personagens/nome-do-personagem.html`.
2. Coloque imagens em `assets/images/characters/nome-do-personagem/`.
3. Reaproveite `css/ethernum-shared.css` e, se necessário, `js/ethernum-shared.js`.
4. Atualize `data/characters.js`.
5. Adicione link no dashboard do `index.html`.
6. Rode `node js/site-selftest.js`.

## Convenções

- Use nomes em minúsculo, com hífen e sem acentos, espaços ou parênteses.
- Não use caminhos absolutos locais.
- Prefira caminhos relativos compatíveis com GitHub Pages.
- Mantenha `index.html` na raiz.
- O painel privado é apenas separação de fluxo; não coloque segredos reais no HTML público.
- `pages/personagens/yu-rage-in-the-flesh.html` é rascunho visual de referência, não personagem ativo.

## Deploy GitHub Pages

O Pages deve publicar a partir da branch configurada no repositório. Como o site é estático, basta manter `index.html` na raiz e evitar caminhos locais.

## Roadmap

O roadmap completo esta em:

- `ROADMAP.md`
- `pages/sistema/roadmap.html`

A ordem planejada e:

1. v3.8.1 - Roadmap Operacional
2. v3.9 - Dashboard da Campanha
3. v4.0 - Sistema Modular de Personagens
4. v4.1 - Ficha de Combate Rapida
5. v4.2 - Enciclopedia de Mecanicas
6. v4.3 - Sistema de Runas
7. v4.4 - Arquivo Mundial de Stingol
8. v4.5 - Quadro de Missoes Ethernum
9. v4.6 - Painel do Mestre 2.0
10. v4.7 - Diario de Sessoes
11. v4.8 - Inventario e Arsenal
12. v5.0 - Terminal Ethernum Completo

Observacao: a linha principal continua estatica em HTML, CSS e JavaScript puro. Uma futura versao em framework deve ser feita em branch separada para nao interromper o deploy GitHub Pages.
