# Ethernum Agent Guide

Consulte `AGENTS.md` para as instruções permanentes do projeto. Este arquivo existe apenas porque algumas ferramentas procuram `agents.md` em minúsculo.

Resumo rápido:
- `index.html` permanece na raiz.
- O site é estático, com HTML, CSS e JavaScript puro.
- CSS fica em `css/`, JS em `js/`, assets em `assets/`, páginas em `pages/` e dados em `data/`.
- Use nomes em minúsculo, com hífen, sem acentos, espaços ou parênteses.
- O painel privado fica fora da navegação pública; ainda assim, não trate HTML público como segurança real.
- Páginas públicas não devem mostrar botões de mestre, edição geral ou links diretos para o painel privado.
- A ficha PF2e pode seguir editável para jogadores; alterações narrativas e segredos ficam no fluxo privado.
- `pages/personagens/yu-rage-in-the-flesh.html` é rascunho visual de referência, não personagem ativo da campanha.
- Antes de finalizar, rode `node js/site-selftest.js`.
