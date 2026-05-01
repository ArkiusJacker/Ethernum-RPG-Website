# AGENTS.md

## Projeto

Este repositório é o site oficial da mesa Ethernum RPG, um site estático publicado via GitHub Pages.

## Objetivo

Manter um site organizado para:
- personagens jogáveis;
- fichas especiais;
- mundo de Stingol;
- nações;
- mecânicas da mesa;
- documentos da Ethernum Company;
- arquivos de apoio para Pathfinder 2e.

## Estilo visual

A estética deve misturar:
- terminal corporativo distópico;
- ficha tática da Ethernum;
- steampunk/fantasy industrial;
- atmosfera Bioshock/Fallout;
- interface de companhia com arquivos confidenciais.

## Regras de código

- Usar HTML, CSS e JavaScript puro enquanto o projeto não migrar para framework.
- Não quebrar compatibilidade com GitHub Pages.
- Preferir nomes de arquivos em minúsculo e com hífen.
- Evitar acentos, espaços e caracteres especiais em nomes de arquivos.
- Manter index.html na raiz enquanto o GitHub Pages estiver publicando pela raiz.
- Separar dados reutilizáveis em /data.
- Separar páginas em /pages.
- Separar imagens, mídia e favicons em /assets.

## Estrutura desejada

- /css para estilos.
- /js para scripts.
- /assets/images para imagens comuns.
- /assets/backgrounds para planos de fundo.
- /assets/media para áudio e vídeo.
- /pages/personagens para personagens.
- /pages/mecanicas para regras e mecânicas.
- /pages/mundo para lore, regiões e nações.
- /pdfs para documentos auxiliares.
- /data para dados em JSON ou JS.

## Antes de alterar

- Verificar caminhos relativos de CSS, JS e imagens.
- Não mover arquivos sem atualizar os links.
- Testar localmente o index.html.
- Manter o site funcional no GitHub Pages.