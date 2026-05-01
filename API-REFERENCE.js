/* 
 * ETHERNUM API — Quick Reference Guide
 * Adicione este arquivo num comentário do seu site para referência rápida
 */

// ════════════════════════════════════════════════════════════════════
// 1. INICIALIZAR EM TEMPO REAL
// ════════════════════════════════════════════════════════════════════

// Verificar se ETHERNUM está carregado
if (window.ethernum) {
  console.log('✓ ETHERNUM carregado');
} else {
  console.warn('✗ ETHERNUM não encontrado');
}

// Acessar a API pública
const API = window.EthernumAPI;

// ════════════════════════════════════════════════════════════════════
// 2. OPERAÇÕES BÁSICAS
// ════════════════════════════════════════════════════════════════════

// Obter seção atual
const currentSection = API.getCurrentSection(); // Retorna 's-ikons', etc

// Mudar de seção
API.switchSection('s-npcs');
API.switchSection('s-tecnicas');
API.switchSection('s-ranking');

// Obter status de edição
const isEditing = API.getEditMode(); // true/false

// Reproduzir som de clique
API.playSound();

// Alternar sons
API.toggleSound();

// ════════════════════════════════════════════════════════════════════
// 3. MODO MESTRE
// ════════════════════════════════════════════════════════════════════

// Ativar modo mestre
API.setMasterMode(true);

// Obter dados do personagem
const characterData = API.getCharacterData();
/*
Retorna:
{
  name: "Gyro Zeppeli",
  level: 3,
  masterMode: true,
  currentSection: "s-sp"
}
*/

// ════════════════════════════════════════════════════════════════════
// 4. INTEGRAÇÃO COM IFRAME
// ════════════════════════════════════════════════════════════════════

// HTML
<iframe id="character-sheet" src="pipping-expressao-da-noite.html"></iframe>

// JavaScript
const sheetFrame = document.getElementById('character-sheet');

// Enviar mensagens para o iframe
sheetFrame.contentWindow.postMessage({
  action: 'TOGGLE_MASTER',
  value: true
}, '*');

// Trocar seção do personagem remotamente
sheetFrame.contentWindow.postMessage({
  action: 'SWITCH_SECTION',
  sectionId: 's-npcs'
}, '*');

// Receber mensagens do iframe
window.addEventListener('message', (event) => {
  if (event.data.type === 'PLAYER_UPDATE') {
    console.log('Jogador atualizou:', event.data);
  }
});

// ════════════════════════════════════════════════════════════════════
// 5. EXEMPLOS DE USO AVANÇADO
// ════════════════════════════════════════════════════════════════════

// Exemplo 1: Painel de Controle do Mestre
function criarPainelMestre() {
  const btnRevelarNPCs = document.createElement('button');
  btnRevelarNPCs.textContent = 'Revelar NPCs';
  btnRevelarNPCs.onclick = () => {
    API.setMasterMode(true);
    API.switchSection('s-npcs');
    console.log('✓ NPCs revelados para o mestre');
  };

  const btnOcultarJogador = document.createElement('button');
  btnOcultarJogador.textContent = 'Modo Jogador';
  btnOcultarJogador.onclick = () => {
    API.setMasterMode(false);
    API.switchSection('s-sp');
    console.log('✓ Jogador em modo restrito');
  };

  document.body.appendChild(btnRevelarNPCs);
  document.body.appendChild(btnOcultarJogador);
}

// Exemplo 2: Sistema de Navegação Automática
function automatizarNavegacao(sequencia) {
  let index = 0;

  const navigate = () => {
    if (index < sequencia.length) {
      API.switchSection(sequencia[index]);
      index++;
      setTimeout(navigate, 3000); // 3 segundos entre cada transição
    }
  };

  navigate();
}

// Usar:
// automatizarNavegacao(['s-sp', 's-ikons', 's-tecnicas', 's-ranking']);

// Exemplo 3: Monitorar Mudanças de Seção
setInterval(() => {
  const section = API.getCurrentSection();
  console.log('Seção atual:', section);
}, 1000);

// Exemplo 4: Integração com Chat
function enviarStatusParaChat() {
  const data = API.getCharacterData();
  const mensagem = `📊 ${data.name} (Nível ${data.level}) está em: ${data.currentSection}`;
  console.log(mensagem);
  // Envie para seu sistema de chat
}

// ════════════════════════════════════════════════════════════════════
// 6. ARMAZENAMENTO LOCAL (localStorage)
// ════════════════════════════════════════════════════════════════════

// Salvar preferências
localStorage.setItem('masterMode', 'true');
localStorage.setItem('soundEnabled', 'true');

// Recuperar
const wasMaster = localStorage.getItem('masterMode') === 'true';
const hasSounds = localStorage.getItem('soundEnabled') === 'true';

// Limpar tudo (reset)
localStorage.clear();

// ════════════════════════════════════════════════════════════════════
// 7. URL PARAMETERS (Atalhos)
// ════════════════════════════════════════════════════════════════════

// Modo Mestre automático agora pede senha:
// https://seu-site.com/mestre-panel.html?character=pipping

// Você pode adicionar mais parâmetros:
// https://seu-site.com/mestre-panel.html?character=bayle&section=s-npcs&sound=false

// Parse no seu código:
const params = new URLSearchParams(window.location.search);
const masterMode = params.get('master') === 'true';
const initialSection = params.get('section') || 's-sp';
const soundEnabled = params.get('sound') !== 'false';

// ════════════════════════════════════════════════════════════════════
// 8. EVENTOS E LISTENERS
// ════════════════════════════════════════════════════════════════════

// Detectar clique em elementos do ETHERNUM
document.addEventListener('click', (e) => {
  if (e.target.closest('.nav-btn')) {
    console.log('Usuário clicou em uma aba');
    API.playSound();
  }
});

// Detectar scroll parallax
window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / window.innerHeight) * 100;
  if (scrollPercent > 30) {
    console.log('Parallax ativado:', scrollPercent + '%');
  }
});

// ════════════════════════════════════════════════════════════════════
// 9. CUSTOMIZAR COMPORTAMENTO
// ════════════════════════════════════════════════════════════════════

// Adicionar evento customizado ao inicializar
if (window.ethernum) {
  // Executar função após init
  const originalInit = window.ethernum.init;
  window.ethernum.init = function() {
    originalInit.call(this);
    console.log('✓ ETHERNUM inicializado com customizações');
    
    // Seu código aqui
    API.setMasterMode(true);
    API.playSound();
  };
}

// ════════════════════════════════════════════════════════════════════
// 10. DEPURAÇÃO
// ════════════════════════════════════════════════════════════════════

// Abra no console (F12):
console.log(window.ethernum);        // Objeto completo
console.log(window.EthernumAPI);     // API pública
console.log(localStorage);           // Dados salvos

// Limpar localStorage
localStorage.clear(); location.reload();

// Forçar modo mestre
localStorage.setItem('masterMode', 'true'); location.reload();

// Desativar sons
localStorage.setItem('soundEnabled', 'false'); location.reload();

// ════════════════════════════════════════════════════════════════════
// ESTRUTURA DE SEÇÕES
// ════════════════════════════════════════════════════════════════════

const SECTIONS = {
  'Sistema SP': 's-sp',
  'IKONs': 's-ikons',
  'Palmas do Diabo': 's-palmas',
  'Técnicas': 's-tecnicas',
  'Ranking': 's-ranking',
  'Execução & Risco': 's-risco',
  'Ball Breaker': 's-bb',
  'Progressão': 's-prog',
  'NPCs': 's-npcs',
  'Questline': 's-quest'
};

// Usar:
Object.entries(SECTIONS).forEach(([name, id]) => {
  console.log(name, '→', id);
});

// ════════════════════════════════════════════════════════════════════
// Fim do arquivo de referência
// ════════════════════════════════════════════════════════════════════
