# ROADMAP - Ethernum RPG Website

## Visao Geral

O Ethernum RPG Website deve evoluir de uma central estatica de fichas e arquivos para um terminal operacional da campanha. A linha atual continua sendo HTML, CSS e JavaScript puro, publicada via GitHub Pages, com foco em estabilidade e organizacao antes de qualquer migracao futura.

Evolucao prevista:

- Site atual: central de fichas, arquivos, ferramentas e painel privado visual.
- Proximo estagio: dashboard vivo da campanha, com informacoes de sessao e contratos.
- Estagio final: terminal operacional da Ethernum Company, com dados importaveis/exportaveis.

## v3.8.1 - Roadmap Operacional

Objetivo:

- Documentar o futuro do projeto.
- Criar uma pagina visual de roadmap.
- Preparar estrutura para novas paginas.
- Evitar implementar sistemas grandes nesta etapa.
- Manter o site estatico e compativel com GitHub Pages.

Entregas:

- `ROADMAP.md`.
- `pages/sistema/roadmap.html`.
- Link publico no index.
- README atualizado.
- CHANGELOG atualizado.
- Selftest cobrindo os arquivos do roadmap.

## v3.9 - Dashboard da Campanha

Objetivo: transformar o index em um painel vivo da mesa.

Funcoes previstas:

- Sessao atual.
- Data no mundo.
- Local atual.
- Missao Ethernum ativa.
- Rank da equipe.
- EP atual.
- Risco corporativo.
- Lista de operadores ativos.
- Proximo objetivo.
- Alertas da Ethernum.
- Transmissao da Companhia.

Exemplo de bloco:

```text
CONTRATO ATIVO
Missao: Varredura em Stone Sour
Rank: 1 - Agentes de Campo Trainee
EP previsto: +1
Risco: Moderado
Status: Em andamento
```

## v4.0 - Sistema Modular de Personagens

Objetivo: transformar as fichas em um sistema modular alimentado por dados.

Funcoes previstas:

- Cards automaticos no index.
- Contador automatico de fichas registradas.
- Filtro por personagem ativo, rascunho, NPC ou arquivado.
- Tags de mecanicas.
- Status: ativo, em teste, arquivado, NPC, segredo.
- Botao para abrir ficha completa.
- Botao para abrir versao de combate.
- Dados separados por personagem em `data/personagens/`.

Estrutura futura possivel:

```text
data/personagens/gyro.js
data/personagens/cinerio.js
data/personagens/pipping.js
data/personagens/bayle.js
data/personagens/kaitake.js
data/personagens/ailan.js
```

## v4.1 - Ficha de Combate Rapida

Objetivo: criar paginas ou abas voltadas para uso durante combate.

Funcoes previstas:

- HP.
- CA.
- Salvamentos.
- Percepcao.
- Ataques principais.
- Recursos restantes.
- Condicoes.
- Mecanica unica.
- Botoes de rolagem ou copiar macro.
- Versao mobile.

Exemplos:

Cinério & Umbra:

- HP compartilhado.
- MAP compartilhado.
- Umbra manifestada.
- Acoes conjuntas disponiveis.

Gyro:

- SP atual.
- IKON ativo.
- Palmas disponiveis.
- Ball Breaker bloqueado/desbloqueado.

## v4.2 - Enciclopedia de Mecanicas

Objetivo: criar uma area organizada para regras da mesa.

Paginas previstas:

- Momentum Fides.
- Fulgor Negro.
- Descansos.
- Projetos.
- EP e XP.
- Ranks Ethernum.
- Runas.
- Mecanicas unicas.
- Condicoes customizadas.
- Equipamentos especiais.

Funcoes previstas:

- Busca por mecanica.
- Tags por combate, descanso, progressao, Ethernum e mestre.
- Exemplos praticos.
- Botao para copiar regra.
- Versao curta e versao completa.

## v4.3 - Sistema de Runas

Objetivo: criar um construtor de runas baseado na logica:

```text
Verbo + Substantivo + Fonte = Efeito
```

Funcoes previstas:

- Selecionar verbo.
- Selecionar substantivo.
- Selecionar fonte.
- Gerar combinacao.
- Mostrar custo.
- Mostrar risco.
- Mostrar rank necessario.
- Mostrar efeito narrativo.
- Mostrar efeito mecanico.
- Salvar runas favoritas.
- Marcar runa como descoberta ou nao descoberta.
- Mostrar runas bloqueadas por rank.

Exemplo:

```text
DOMINAR + ETER + VISAO
```

Resultado esperado:

- Nome da combinacao.
- Risco.
- Custo.
- Rank necessario.
- Descricao narrativa.
- Efeito mecanico.
- Categoria.

## v4.4 - Arquivo Mundial de Stingol

Objetivo: criar um banco de dados corporativo do mundo.

Paginas previstas:

- Stingol.
- Erisia.
- Stone Sour.
- Napole.
- Ducado de Nosso Senhor Z.
- Flore Aeternum.
- Sacraria.
- A Zona.
- Ethernum Company.
- Kron.
- Conselho da Colheita.

Funcoes previstas:

- Mapa clicavel.
- Nacoes por dificuldade.
- Status politico.
- Faccoes ativas.
- NPCs importantes.
- Rotas comerciais.
- Contratos disponiveis por regiao.

## v4.5 - Quadro de Missoes Ethernum

Objetivo: criar uma area para contratos e missoes da campanha.

Tipos de missao:

- Disponiveis.
- Em andamento.
- Concluidas.
- Fracassadas.
- Ocultas.

Cada missao deve ter:

- Nome.
- Rank necessario.
- EP.
- XP estimado.
- Local.
- Contratante.
- Objetivo.
- Risco.
- Recompensa.
- Penalidades.
- Status.

## v4.6 - Painel do Mestre 2.0

Objetivo: evoluir o painel do mestre como ferramenta de sessao.

Funcoes previstas:

- Notas de sessao salvas em localStorage.
- NPCs ocultos.
- Rolagens secretas.
- Gerador de contratos.
- Gerador de nomes Ethernum.
- Controle de audio.
- Controle de cenas.
- Ativar ou desativar spoilers visuais.
- Modo apresentacao.

Sistema de cena previsto:

- Escritorio da Ethernum.
- Campo de batalha.
- Ruinas.
- A Zona.
- Taverna.
- Trem ou carruagem.

## v4.7 - Diario de Sessoes

Objetivo: registrar o historico da campanha.

Cada sessao deve ter:

- Resumo.
- Participantes.
- Local.
- Missao.
- NPCs encontrados.
- Itens recebidos.
- EP ou XP ganhos.
- Consequencias.
- Ganchos futuros.

Funcoes previstas:

- Linha do tempo da campanha.
- Filtro por personagem.
- Filtro por regiao.
- Filtro por missao.

## v4.8 - Inventario e Arsenal

Objetivo: criar um banco de dados de equipamentos, itens e linhas de armamento.

Categorias:

- Vulcan.
- Syntech.
- Esotech.
- Kroma.
- Primaltech.
- Consumiveis.
- Cartao corporativo.
- Itens especiais.

Funcoes previstas:

- Inventario por personagem.
- Item equipado ou nao equipado.
- Raridade.
- Preco.
- Origem.
- Rank necessario.
- Dano ou efeito.
- Botao para copiar para ficha.

## v5.0 - Terminal Ethernum Completo

Objetivo: transformar o site em um sistema operacional completo da campanha.

Funcoes previstas:

- Dashboard da campanha.
- Personagens modulares.
- Painel de combate.
- Missoes.
- Mundo.
- Mecanicas.
- Runas.
- Inventario.
- Diario de sessoes.
- Painel do mestre.
- Exportacao e importacao de dados.

Funcao central:

```text
ethernum-campanha-save.json
```

O arquivo deve permitir salvar progresso localmente e carregar depois em outro navegador, mantendo o site estatico no GitHub Pages.

## Ideias Adicionais

### Modo Operador / Modo Mestre

Modo Operador:

- Fichas publicas.
- Mecanicas liberadas.
- Missoes conhecidas.
- Mundo conhecido.

Modo Mestre:

- Spoilers visuais.
- Notas privadas locais.
- NPCs secretos.
- Mecanicas futuras.
- Missoes ocultas.

Aviso: segredo real nao deve estar no HTML publico.

### Busca Global

Buscar em:

- Personagens.
- Mecanicas.
- Missoes.
- Locais.
- Itens.
- Runas.
- NPCs.

### Raridade Corporativa

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

```text
Rank 1 - disponivel
Rank 2 - bloqueado
Rank 3 - protocolo de runas liberado
Rank 4+ - acesso negado
```

Texto visual:

```text
[ACESSO NEGADO - AUTORIZACAO RANK 3 NECESSARIA]
```

### Gerador de Contratos

Gerar:

- Tipo de missao.
- Local.
- Risco.
- Recompensa.
- Complicacao.
- Interesse oculto da empresa.

### Sistema de Audio por Pagina

Exemplos:

- Index: tema corporativo.
- Gyro: western e rotacao.
- Cinério: sombra e monge.
- Pipping: jazz sombrio e noite.
- Bayle: horror draconico.
- Mundo: exploracao.
- Mestre: terminal confidencial.

### Modo Apresentacao

Ocultar:

- Botoes tecnicos.
- Links de edicao.
- Notas do mestre.
- Debug.
- Roadmap.

### Dossies

Para NPCs e faccoes:

- Versao publica.
- Versao mestre.
- Versao redacted.

### Linha do Tempo

Filtros:

- Historia do mundo.
- Historia da companhia.
- Historia da party.
- Eventos secretos.

### Bestiario / Ameacas

Categorias:

- Ameacas da Zona.
- Criaturas etereas.
- Auditores Armados.
- Varredores.
- Espectros corporativos.
- Bosses.

Cada ameaca deve ter:

- Nivel.
- Tipo.
- Fraquezas.
- Resistencias.
- Comportamento.
- Regiao.
- Recompensas.

## Nota de Arquitetura

A linha principal permanece estatica por enquanto. Uma futura versao em framework deve ser trabalhada em branch separada, consumindo dados extraidos deste site, sem interromper o deploy GitHub Pages atual.
