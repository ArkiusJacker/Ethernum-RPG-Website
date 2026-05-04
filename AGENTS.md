Você está trabalhando no repositório:

https://github.com/ArkiusJacker/Ethernum-RPG-Website

Objetivo:
Criar e integrar um ROADMAP técnico/narrativo para o futuro do Ethernum RPG Website, sem implementar todos os sistemas ainda. O objetivo desta tarefa é documentar, organizar e preparar o projeto para evolução futura.

Contexto do projeto:
Este site é a central oficial da mesa Ethernum RPG, publicado via GitHub Pages. Ele funciona como terminal operacional da Ethernum Company, com fichas de personagens, mecânicas, ferramentas, mundo, missões, painel do mestre e documentos da campanha.

O projeto usa HTML, CSS e JavaScript puro. Não migrar para framework.

IMPORTANTE:
- Não reescrever lore, fichas ou mecânicas já existentes.
- Não quebrar o deploy do GitHub Pages.
- Não alterar visual principal além do necessário para incluir links/documentação.
- Não implementar todos os sistemas do roadmap agora.
- Apenas criar a documentação, páginas-base e estrutura necessária para desenvolvimento futuro.
- Manter `index.html` na raiz.
- Usar nomes em minúsculo com hífen.
- Não usar espaços, acentos ou parênteses em nomes de arquivos.
- Não usar push --force.
- O Modo Mestre continua sendo bloqueio visual, não segurança real.

Tarefa principal:
Criar uma nova versão de organização futura chamada:

v3.8 — Roadmap Operacional

Essa versão deve transformar o roadmap futuro do site em documentação clara e em uma página acessível pelo site.

Arquivos a criar ou atualizar:

1. Criar `ROADMAP.md` na raiz
O arquivo deve conter o roadmap completo do projeto, organizado por versões futuras.

Estrutura sugerida:

# ROADMAP — Ethernum RPG Website

## Visão Geral

Explicar que o site deve evoluir de uma central de fichas para um sistema operacional da campanha Ethernum.

Ideia central:

Site atual = central de fichas e arquivos  
Próximo estágio = dashboard vivo da campanha  
Estágio final = terminal operacional da Ethernum Company

## v3.8 — Roadmap Operacional

Objetivo:
- Documentar o futuro do projeto.
- Criar página de roadmap no site.
- Preparar estrutura para novas páginas.
- Não implementar sistemas grandes ainda.

Entregas:
- ROADMAP.md.
- Página visual de roadmap.
- Link no index.
- Atualização do README.
- Atualização do CHANGELOG.

## v3.9 — Dashboard da Campanha

Objetivo:
Transformar o index em um painel vivo da mesa.

Funções previstas:
- Sessão atual.
- Data no mundo.
- Local atual.
- Missão Ethernum ativa.
- Rank da equipe.
- EP atual.
- Risco corporativo.
- Lista de operadores ativos.
- Próximo objetivo.
- Alertas da Ethernum.
- Transmissão da Companhia.

Exemplo de bloco:
CONTRATO ATIVO  
Missão: Varredura em Stone Sour  
Rank: 1 — Agentes de Campo Trainee  
EP previsto: +1  
Risco: Moderado  
Status: Em andamento  

## v4.0 — Sistema Modular de Personagens

Objetivo:
Transformar as fichas em um sistema modular alimentado por dados.

Funções previstas:
- Cards automáticos no index.
- Contador automático de fichas registradas.
- Filtro por personagem ativo, rascunho, NPC ou arquivado.
- Tags de mecânicas.
- Status: ativo, em teste, arquivado, NPC, segredo.
- Botão “abrir ficha completa”.
- Botão “abrir versão de combate”.
- Dados separados por personagem em `data/personagens/`.

Estrutura futura possível:
data/personagens/gyro.js  
data/personagens/cinerio.js  
data/personagens/pipping.js  
data/personagens/bayle.js  

## v4.1 — Ficha de Combate Rápida

Objetivo:
Criar páginas ou abas voltadas para uso durante combate.

Funções previstas:
- HP.
- CA.
- Salvamentos.
- Percepção.
- Ataques principais.
- Recursos restantes.
- Condições.
- Mecânica única.
- Botões de rolagem ou copiar macro.
- Versão mobile/celular.

Exemplos:
Cinério & Umbra:
- HP compartilhado.
- MAP compartilhado.
- Umbra manifestada.
- Ações conjuntas disponíveis.

Gyro:
- SP atual.
- IKON ativo.
- Palmas disponíveis.
- Ball Breaker bloqueado/desbloqueado.

## v4.2 — Enciclopédia de Mecânicas

Objetivo:
Criar uma área organizada para regras da mesa.

Páginas previstas:
- Momentum Fides.
- Fulgor Negro.
- Descansos.
- Projetos.
- EP e XP.
- Ranks Ethernum.
- Runas.
- Mecânicas únicas.
- Condições customizadas.
- Equipamentos especiais.

Funções previstas:
- Busca por mecânica.
- Tags: combate, descanso, progressão, Ethernum, mestre.
- Exemplos práticos.
- Botão “copiar regra”.
- Versão curta e versão completa.

## v4.3 — Sistema de Runas

Objetivo:
Criar um construtor de runas baseado na lógica:

Verbo + Substantivo + Fonte = Efeito

Funções previstas:
- Selecionar verbo.
- Selecionar substantivo.
- Selecionar fonte.
- Gerar combinação.
- Mostrar custo.
- Mostrar risco.
- Mostrar rank necessário.
- Mostrar efeito narrativo.
- Mostrar efeito mecânico.
- Salvar runas favoritas.
- Marcar runa como descoberta/não descoberta.
- Mostrar runas bloqueadas por Rank.

Exemplo:
DOMINAR + ÉTER + VISÃO

Resultado esperado:
- Nome da combinação.
- Risco.
- Custo.
- Rank necessário.
- Descrição narrativa.
- Efeito mecânico.
- Categoria.

## v4.4 — Arquivo Mundial de Stingol

Objetivo:
Criar um banco de dados corporativo do mundo.

Páginas previstas:
- Stingol.
- Erisia.
- Stone Sour.
- Nápole.
- Ducado de Nosso Senhor Z.
- Flore Aeternum.
- Sacrária.
- A Zona.
- Ethernum Company.
- Kron.
- Conselho da Colheita.

Funções previstas:
- Mapa clicável.
- Nações por dificuldade.
- Status político.
- Facções ativas.
- NPCs importantes.
- Rotas comerciais.
- Contratos disponíveis por região.

Exemplo de card:
STONE SOUR  
Dificuldade: 1  
Risco: Baixo/Moderado  
Status: Operacional  
Interesse Ethernum: Mineração, rotas comerciais, contenção local  

## v4.5 — Quadro de Missões Ethernum

Objetivo:
Criar uma área para contratos e missões da campanha.

Tipos de missão:
- Disponíveis.
- Em andamento.
- Concluídas.
- Fracassadas.
- Ocultas.

Cada missão deve ter:
- Nome.
- Rank necessário.
- EP.
- XP estimado.
- Local.
- Contratante.
- Objetivo.
- Risco.
- Recompensa.
- Penalidades.
- Status.

Exemplo:
CONTRATO #001 — VARREDURA LEVE  
Local: Stone Sour  
Rank: 1  
EP: +1  
Risco: Baixo  
Objetivo: limpar ameaça local e registrar anomalia etérea.  

## v4.6 — Painel do Mestre 2.0

Objetivo:
Evoluir o painel do mestre como ferramenta de sessão.

Funções previstas:
- Notas de sessão salvas em localStorage.
- NPCs ocultos.
- Rolagens secretas.
- Gerador de contratos.
- Gerador de nomes Ethernum.
- Controle de áudio.
- Controle de cenas.
- Ativar/desativar spoilers visuais.
- Modo apresentação.

Sistema de cena atual:
O mestre escolhe uma cena:
- Escritório da Ethernum.
- Campo de batalha.
- Ruínas.
- A Zona.
- Taverna.
- Trem/carruagem.

A cena pode alterar:
- Background.
- Áudio.
- Cor de interface.
- Texto de transmissão.

## v4.7 — Diário de Sessões

Objetivo:
Registrar o histórico da campanha.

Cada sessão deve ter:
- Resumo.
- Participantes.
- Local.
- Missão.
- NPCs encontrados.
- Itens recebidos.
- EP/XP ganhos.
- Consequências.
- Ganchos futuros.

Funções previstas:
- Linha do tempo da campanha.
- Filtro por personagem.
- Filtro por região.
- Filtro por missão.

## v4.8 — Inventário e Arsenal

Objetivo:
Criar um banco de dados de equipamentos, itens e linhas de armamento.

Categorias:
- Vulcan.
- Syntech.
- Esotech.
- Kroma.
- Primaltech.
- Consumíveis.
- Cartão corporativo.
- Itens especiais.

Funções previstas:
- Inventário por personagem.
- Item equipado/não equipado.
- Raridade.
- Preço.
- Origem.
- Rank necessário.
- Dano/efeito.
- Botão “copiar para ficha”.

Descrição das linhas:
- Vulcan: básico, industrial, comum.
- Syntech: rúnico, condutor, associado ao Runemaker.
- Esotech: operadores com afinidade ao éter.
- Kroma: forças especiais.
- Primaltech: protótipos instáveis de Kron.

## v5.0 — Terminal Ethernum Completo

Objetivo:
Transformar o site em um sistema operacional completo da campanha.

Funções previstas:
- Dashboard da campanha.
- Personagens modulares.
- Painel de combate.
- Missões.
- Mundo.
- Mecânicas.
- Runas.
- Inventário.
- Diário de sessões.
- Painel do mestre.
- Export/import de dados.

Função central:
Exportar/importar campanha em JSON.

Exemplo:
ethernum-campanha-save.json

Isso deve permitir salvar progresso localmente e carregar depois em outro navegador, mantendo o site estático no GitHub Pages.

## Ideias adicionais

### Modo Operador / Modo Mestre

Modo Operador:
- Fichas públicas.
- Mecânicas liberadas.
- Missões conhecidas.
- Mundo conhecido.

Modo Mestre:
- Spoilers visuais.
- Notas privadas locais.
- NPCs secretos.
- Mecânicas futuras.
- Missões ocultas.

Aviso:
Segredo real não deve estar no HTML público.

### Busca global

Buscar em:
- Personagens.
- Mecânicas.
- Missões.
- Locais.
- Itens.
- Runas.
- NPCs.

### Raridade corporativa

Categorias:
- Comum.
- Incomum.
- Restrito.
- Confidencial.
- Redacted.
- Apollyon.
- Horizonte de Eventos.

### Desbloqueio por Rank

Exemplo:
Rank 1 — disponível  
Rank 2 — bloqueado  
Rank 3 — protocolo de runas liberado  
Rank 4+ — acesso negado  

Texto visual:
[ACESSO NEGADO — AUTORIZAÇÃO RANK 3 NECESSÁRIA]

### Gerador de contratos

Gerar:
- Tipo de missão.
- Local.
- Risco.
- Recompensa.
- Complicação.
- Interesse oculto da empresa.

### Sistema de áudio por página

Exemplos:
- Index: tema corporativo.
- Gyro: western/rotação.
- Cinério: sombra/monge.
- Pipping: jazz sombrio/noite.
- Bayle: horror dracônico.
- Mundo: exploração.
- Mestre: terminal confidencial.

### Modo apresentação

Ocultar:
- Botões técnicos.
- Links de edição.
- Notas do mestre.
- Debug.
- Roadmap.

### Dossiês

Para NPCs e facções:
- Versão pública.
- Versão mestre.
- Versão redacted.

### Linha do tempo

Filtros:
- História do mundo.
- História da companhia.
- História da party.
- Eventos secretos.

### Bestiário / Ameaças

Categorias:
- Ameaças da Zona.
- Criaturas etéreas.
- Auditores Armados.
- Varredores.
- Espectros corporativos.
- Bosses.

Cada ameaça deve ter:
- Nível.
- Tipo.
- Fraquezas.
- Resistências.
- Comportamento.
- Região.
- Recompensas.

2. Criar uma página visual em `pages/sistema/roadmap.html`

Essa página deve apresentar o roadmap de forma bonita e navegável dentro da estética Ethernum.

Requisitos:
- Usar os CSS compartilhados existentes.
- Ter link para voltar ao index.
- Ter título: “Roadmap Operacional Ethernum”.
- Dividir por versões.
- Usar cards ou seções.
- Marcar as versões como:
  - Planejado
  - Em preparação
  - Futuro
  - Terminal final
- Não implementar a lógica dos sistemas ainda.
- Apenas exibir a documentação de forma organizada.

3. Atualizar `index.html`

Adicionar um link/botão visível para o roadmap.

Sugestão de texto:
ROADMAP OPERACIONAL

Descrição:
Próximas versões, sistemas planejados e futuro do Terminal Ethernum.

O link deve apontar para:
pages/sistema/roadmap.html

4. Atualizar `README.md`

Adicionar uma seção:

## Roadmap

Explicar que o roadmap completo está em:
- `ROADMAP.md`
- `pages/sistema/roadmap.html`

Também explicar que o projeto seguirá a ordem:

1. v3.8 — Roadmap Operacional
2. v3.9 — Dashboard da Campanha
3. v4.0 — Sistema Modular de Personagens
4. v4.1 — Ficha de Combate Rápida
5. v4.2 — Enciclopédia de Mecânicas
6. v4.3 — Sistema de Runas
7. v4.4 — Arquivo Mundial de Stingol
8. v4.5 — Quadro de Missões Ethernum
9. v4.6 — Painel do Mestre 2.0
10. v4.7 — Diário de Sessões
11. v4.8 — Inventário e Arsenal
12. v5.0 — Terminal Ethernum Completo

5. Atualizar `CHANGELOG.md`

Adicionar entrada:

## v3.8 — Roadmap Operacional

- Criado `ROADMAP.md`.
- Criada página visual `pages/sistema/roadmap.html`.
- Adicionado link para roadmap no index.
- Atualizado README com direção futura do projeto.
- Documentadas versões futuras até v5.0.

6. Atualizar selftest, se existir

Se `js/site-selftest.js` verificar rotas importantes, adicionar:
- `ROADMAP.md`
- `pages/sistema/roadmap.html`

Garantir que o selftest passe após a alteração.

7. Testes finais

Verificar:
- index.html abre normalmente.
- Link do roadmap funciona.
- Página `pages/sistema/roadmap.html` carrega CSS corretamente.
- Botão de voltar para o index funciona.
- README cita o roadmap.
- CHANGELOG cita v3.8.
- Selftest passa, se existir.

Não implementar agora:
- sistema real de missões;
- sistema real de runas;
- busca global;
- export/import JSON;
- dashboard dinâmico;
- ficha modular completa;
- painel do mestre 2.0.

Esses sistemas devem ficar apenas documentados para versões futuras.

Ao final, entregar:
- arquivos criados;
- arquivos alterados;
- resumo das mudanças;
- pendências;
- resultado do selftest.