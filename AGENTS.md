Você está trabalhando no repositório:

https://github.com/ArkiusJacker/Ethernum-RPG-Website

Contexto:
Este é um site estático (com potencial para ser animado depois) da mesa Ethernum RPG, publicado via GitHub Pages. O site funciona como uma central da campanha, com personagens, fichas especiais, mecânicas, mundo, ferramentas e documentos. O projeto usa HTML, CSS e JavaScript puro. Não migrar para React, Vue, Vite, Astro ou qualquer framework por enquanto.

Objetivo desta tarefa:
Criar a versão v2.8 do projeto, focada em organização estrutural, manutenção e preparação para crescimento. Não adicionar personagens novos e não reescrever a identidade visual do site. A prioridade é limpar a arquitetura, padronizar nomes, mover arquivos para pastas corretas, atualizar links relativos e deixar o projeto mais fácil de manter.

IMPORTANTE:
- Não quebre o deploy no GitHub Pages.
- Mantenha o `index.html` na raiz.
- Não use caminhos absolutos locais.
- Não remova conteúdo funcional.
- Não apague páginas antigas sem garantir que os links foram atualizados.
- Não use `git push --force`.
- Não coloque segredos reais, senhas ou conteúdo privado dentro do HTML público.
- O Modo Mestre pode continuar existindo, mas deve ser tratado como bloqueio visual, não como segurança real.
- Depois de mover arquivos, revise todos os links de CSS, JS, imagens, áudio, PDFs e links entre páginas.
- Faça alterações de forma conservadora e testável.

Tarefas principais:

1. Inspecionar o projeto atual
- Listar a estrutura atual dos arquivos.
- Identificar arquivos HTML, CSS, JS, imagens, mídia, favicons e PDFs.
- Identificar links quebráveis antes de mover qualquer coisa.
- Identificar arquivos com nomes perigosos para URL, como espaços, parênteses, acentos e underscores excessivos.

2. Criar ou atualizar `AGENTS.md` na raiz
Criar um `AGENTS.md` com instruções permanentes para futuros agentes trabalharem no projeto.

O conteúdo deve explicar:
- O projeto é um site estático do Ethernum RPG.
- O deploy usa GitHub Pages.
- `index.html` deve permanecer na raiz.
- Usar HTML, CSS e JavaScript puro.
- Preferir arquivos em minúsculo e com hífen.
- Evitar acentos, espaços e parênteses em nomes de arquivo.
- Separar CSS em `/css`.
- Separar JS em `/js`.
- Separar imagens, backgrounds, áudio e favicons em `/assets`.
- Separar páginas em `/pages`.
- Separar dados reutilizáveis em `/data`.
- Manter estética de terminal corporativo distópico, Ethernum Company, steampunk/fantasy industrial, Bioshock/Fallout e documento confidencial.

3. Reorganizar estrutura de pastas
Reestruturar o projeto para algo próximo disso:

Ethernum-RPG-Website/
├─ index.html
├─ README.md
├─ AGENTS.md
├─ CHANGELOG.md
├─ FINAL-CHECKLIST.md
├─ IMPROVEMENTS.md
├─ css/
│  ├─ ethernum-shared.css
│  ├─ styles-extended.css
│  └─ pages/
├─ js/
│  ├─ app.js
│  ├─ ethernum-shared.js
│  ├─ site-selftest.js
│  └─ api-reference.js
├─ assets/
│  ├─ images/
│  ├─ backgrounds/
│  ├─ audio/
│  └─ favicons/
├─ pages/
│  ├─ personagens/
│  ├─ ferramentas/
│  ├─ mundo/
│  ├─ mecanicas/
│  └─ sistema/
├─ data/
│  ├─ characters.js
│  ├─ mechanics.js
│  └─ world.js
└─ pdfs/

Se já existirem pastas parecidas, reaproveitar e adaptar sem duplicar.

4. Renomear arquivos HTML principais
Renomear arquivos de personagem e ferramenta para nomes limpos, minúsculos e com hífen.

Sugestão:
- `gyro_zeppeli.html` → `pages/personagens/gyro-zeppeli.html`
- `cinerio_umbra_visual.html` → `pages/personagens/cinerio-umbra.html`
- `pipping-expressao-da-noite.html` → `pages/personagens/pipping-baldwin-black.html`
- `bayle_draconico (1).html` ou similar → `pages/personagens/bayle-o-horror.html`
- `mestre-panel.html` → `pages/ferramentas/mestre-panel.html`
- `audio-config.html` → `pages/ferramentas/audio-config.html`
- `TESTS.html` → `pages/ferramentas/tests.html`

Caso os nomes reais sejam diferentes, adapte mantendo a intenção.

5. Mover assets
Mover arquivos de mídia para:
- imagens comuns → `assets/images/`
- backgrounds → `assets/backgrounds/`
- áudio/vídeo → `assets/audio/` ou `assets/media/`, escolhendo uma convenção clara
- favicons → `assets/favicons/`
- PDFs → `pdfs/`

Depois atualizar todos os caminhos relativos nos HTML/CSS/JS.

6. Mover scripts e estilos
Mover:
- `app.js` → `js/app.js`
- `API-REFERENCE.js` → `js/api-reference.js`
- `ethernum-shared.js` → `js/ethernum-shared.js`
- `site-selftest.js` → `js/site-selftest.js`
- `styles-extended.css` → `css/styles-extended.css`
- `ethernum-shared.css` → `css/ethernum-shared.css`

Atualizar os `<script src="">` e `<link rel="stylesheet">` em todas as páginas.

7. Criar `data/characters.js`
Extrair ou consolidar os dados reutilizáveis dos personagens em `data/characters.js`.

A estrutura pode seguir este padrão:

export const characters = [
  {
    id: 'gyro',
    name: 'Gyro Zeppeli',
    file: 'pages/personagens/gyro-zeppeli.html',
    status: 'Ativo',
    role: 'Operador / Rotação',
    tags: ['Rotação', 'IKONs', 'Cadáver Santo']
  },
  {
    id: 'cinerio',
    name: 'Cinério & Umbra',
    file: 'pages/personagens/cinerio-umbra.html',
    status: 'Ativo',
    role: 'Monge / Sombra Cooperativa',
    tags: ['Umbra', 'Combate conjunto', 'MAP compartilhado']
  },
  {
    id: 'pipping',
    name: 'Pipping Baldwin Black',
    file: 'pages/personagens/pipping-baldwin-black.html',
    status: 'Ativo',
    role: 'Bardo / Noite viva',
    tags: ['Véu', 'Vazio', 'Voz']
  },
  {
    id: 'bayle',
    name: 'Bayle, o Horror',
    file: 'pages/personagens/bayle-o-horror.html',
    status: 'Ativo',
    role: 'Manifestação dracônica',
    tags: ['Dracônico', 'Horror', 'Estágios']
  }
];

Se o projeto ainda não usa módulos ES, avaliar a compatibilidade antes. Se for mais seguro, expor os dados em `window.ETHERNNUM_CHARACTERS` ou `window.ETHERNUM_CHARACTERS`. Corrigir qualquer typo caso exista.

8. Melhorar o `index.html` sem reescrever tudo
Transformar o index em um dashboard mais claro, mantendo a estética atual.

Adicionar ou preparar blocos para:
- Status da Campanha
- Sessão atual
- Local atual
- Missão Ethernum ativa
- Rank da equipe
- EP atual
- Risco corporativo
- Links rápidos para personagens
- Links rápidos para mecânicas
- Links rápidos para ferramentas

Caso não existam dados reais, usar placeholders seguros como:
- "Sessão atual: a definir"
- "Missão ativa: aguardando contrato"
- "Rank: 1 — Agentes de Campo Trainee"
- "EP: a definir"

9. Padronizar estrutura das páginas de personagem
Sem refazer todo o conteúdo, garantir que cada página de personagem tenha, quando possível, seções equivalentes:

- Visão Geral
- Ficha PF2e
- Mecânica Única
- Progressão
- Inventário / Recursos
- Segredos do Mestre
- Changelog do Personagem

Se alguma seção ainda não tiver conteúdo, criar apenas um bloco placeholder discreto, sem inventar lore nova.

10. Formatar arquivos
Formatar HTML, CSS e JS para legibilidade.
Se houver package.json ou Prettier disponível, usar Prettier.
Se não houver, formatar manualmente ou com ferramentas seguras do ambiente.

Critério:
- Evitar JS minificado em uma linha gigante.
- Indentação consistente.
- Não alterar lógica sem necessidade.
- Não alterar textos narrativos sem solicitação.

11. Atualizar README.md
Atualizar o README para refletir a estrutura nova.

O README deve conter:
- Nome do projeto
- Link do site publicado
- Descrição curta
- Estrutura de pastas
- Como rodar localmente
- Como adicionar personagem novo
- Como fazer deploy via GitHub Pages
- Convenções de nome
- Aviso sobre Modo Mestre não ser segurança real
- Roadmap v2.8, v2.9 e v3.0

12. Atualizar CHANGELOG.md
Adicionar entrada:

## v2.8 — Organização e Fundação
- Reorganização de pastas.
- Padronização de nomes de arquivos.
- Separação de assets, CSS, JS, páginas e dados.
- Criação/atualização do AGENTS.md.
- Atualização do README.
- Preparação do index como dashboard da mesa.
- Revisão de links relativos para GitHub Pages.

13. Verificações finais
Antes de finalizar:
- Confirmar que `index.html` carrega CSS e JS.
- Confirmar que os cards do index apontam para as páginas corretas.
- Confirmar que as páginas de personagem carregam seus estilos.
- Confirmar que imagens e backgrounds aparecem.
- Confirmar que áudio/configurações não quebraram.
- Confirmar que PDFs continuam acessíveis.
- Procurar links antigos quebrados usando busca textual por nomes antigos:
  - `gyro_zeppeli.html`
  - `cinerio_umbra_visual.html`
  - `bayle_draconico`
  - `mestre-panel.html`
  - `audio-config.html`
  - `styles-extended.css`
  - `app.js`
- Atualizar todos os links encontrados.

14. Resultado esperado
Ao final, entregar:
- Resumo objetivo das mudanças feitas.
- Lista de arquivos movidos/renomeados.
- Lista de arquivos criados.
- Observações sobre qualquer ponto que não pôde ser concluído.
- Instruções para testar localmente.
- Instruções para commitar e enviar:

git status
git add .
git commit -m "refactor: organiza estrutura v2.8 do site Ethernum"
git push origin main

Não executar push forçado.


após isso

Revise a refatoração v2.8 que você acabou de fazer.

Procure especificamente:
- links quebrados;
- imports errados;
- caminhos relativos incorretos;
- imagens que deixaram de carregar;
- scripts ainda apontando para a raiz;
- CSS ainda apontando para a raiz;
- nomes antigos de arquivos ainda referenciados;
- páginas HTML sem link de volta para o index;
- problemas com GitHub Pages;
- conteúdo secreto exposto indevidamente no HTML público;
- arquivos duplicados que podem ser removidos com segurança.

Não faça grandes mudanças visuais.
Não invente novas mecânicas ou lore.
Corrija apenas problemas técnicos e inconsistências de organização.

Ao final, me entregue:
1. problemas encontrados;
2. correções feitas;
3. problemas restantes;
4. checklist de teste manual.