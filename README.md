# 🎯 ETHERNUM — Sistema Interativo de Ficha de Personagem

Uma aplicação web imersiva para RPG com recursos avançados de navegação, edição em tempo real, controle de acesso e efeitos sonoros.

## 🚀 Features Implementadas

### 1. **Parallax Hero Dinâmico**
- A imagem do hero se transforma em background ao descer a página
- Opacidade ajustável automaticamente baseada no scroll
- Aparece na lateral com efeito de profundidade

```javascript
// Automático ao carregar
window.ethernum.setupHeroParallax();
```

### 2. **Edição em Tempo Real (Modo Mestre)**
- **Atalho:** `Ctrl+E` (ou `Cmd+E` no Mac)
- Apenas mestres podem editar conteúdo
- Elementos editáveis: títulos, descrições, stats
- Conteúdo salvo automaticamente em `localStorage`

**Para habilitar Modo Mestre:**
```
https://seusite.com/gyro_zeppeli.html?master=true
```

Ou via console:
```javascript
window.ethernum.masterMode = true;
localStorage.setItem('masterMode', 'true');
window.ethernum.setupEditMode();
```

### 3. **Controle de Acesso (Lock de Conteúdo)**
- Seções restritas ficam desfocadas e com aviso
- Apenas mestres veem conteúdo bloqueado (NPCs, etc)
- Sistema automático baseado em `masterMode`

**Adicionar lock a elemento:**
```html
<div id="s-npcs" class="section">
  <!-- Conteúdo será automaticamente lockado se não for mestre -->
</div>
```

### 4. **Sistema de Sons Avançado**
- **Cliques:** Som de tiro de velho oeste sintético
- **Trilha sonora:** Loop ambient automático
- **Atalho:** `Ctrl+M` para ativar/desativar sons
- **Botão:** Ícone de speaker fixo no canto inferior direito

```javascript
// Controlar sons
window.ethernum.playClickSound();
window.ethernum.toggleSound();
```

### 5. **Transições Suaves Entre Abas**
- Fade-in/out ao trocar seções
- Animação de stagger nos cards (delay progressivo)
- Hover effects aprimorados
- Ripple effect nos botões

**CSS de transição:**
```css
@keyframes fadeInSection {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### 6. **Integração Multi-Site**
Comunique com outros sites/iframes facilmente:

**Exemplo - Integrar com site de Mestre:**
```html
<!-- Site 1: Página do Jogador -->
<iframe id="player-sheet" src="gyro_zeppeli.html"></iframe>

<!-- Site 2: Controladora do Mestre -->
<script>
  // Sincronizar modo mestre
  const playerFrame = document.getElementById('player-sheet');
  
  playerFrame.contentWindow.postMessage({
    action: 'TOGGLE_MASTER',
    value: true
  }, '*');
  
  // Mudar seção do jogador remotamente
  playerFrame.contentWindow.postMessage({
    action: 'SWITCH_SECTION',
    sectionId: 's-npcs'
  }, '*');
</script>
```

**API Exposta (window.EthernumAPI):**
```javascript
// Use qualquer um desses métodos
EthernumAPI.getCurrentSection()      // Retorna ID da seção atual
EthernumAPI.switchSection('s-ikons') // Muda para a seção
EthernumAPI.getEditMode()            // Booleano
EthernumAPI.setMasterMode(true)      // Define modo mestre
EthernumAPI.toggleSound()            // Ativa/desativa sons
EthernumAPI.playSound()              // Toca som de clique
EthernumAPI.getCharacterData()       // Retorna dados do personagem
```

## 📁 Estrutura de Arquivos

```
ETHERNUM/
├── gyro_zeppeli.html        # Ficha do Gyro Zeppeli
├── cinerio_umbra_visual.html # Ficha do Cinério & Umbra
├── mestre-panel.html        # Painel de controle do Mestre
├── audio-config.html        # Configurador de música (NOVO!)
├── styles-extended.css      # Animações, transições, parallax
├── app.js                   # Lógica principal
├── audio/                   # Pasta para músicas (crie se necessário)
│  ├── background-music.mp3
│  └── other-tracks.mp3
└── README.md               # Este arquivo
```

## ⚙️ Instalação & Uso

### 1. **Setup Local**
```bash
# Clonar/baixar os arquivos
cd ETHERNUM

# Abrir no navegador (pode ser local)
# Abra gyro_zeppeli.html em qualquer navegador moderno
```

### 2. **Modo Mestre**
Adicione `?master=true` à URL:
```
file:///C:/Users/Titan/Desktop/ETHERNUM/gyro_zeppeli.html?master=true
```

### 3. **Integração com Outro Site**
Copie os 3 arquivos para o mesmo diretório e reference o HTML em um iframe:
```html
<iframe src="gyro_zeppeli.html" width="100%" height="100%"></iframe>
```

## � Sistema de Áudio Customizado (NOVO!)

### Como Usar Música de Fundo Personalizada

#### **Opção 1: Via Página de Configuração (Recomendado)**
1. Abra `audio-config.html` (página de configurações)
2. Escolha um dos presets (Ambient, Piano, etc) OU
3. Passe a URL da música: `./audio/background-music.mp3` ou `https://...`
4. Clique em "Testar Áudio" para ouvir
5. Clique em "Salvar Configuração"
6. Abra o personagem - a música já estará ativa!

#### **Opção 2: Via localStorage (Avançado)**
```javascript
// Armazenar URL da música
localStorage.setItem('ethernum-music-url', './audio/minha-musica.mp3');

// Permitir múltiplos cards abertos
localStorage.setItem('ethernum-allow-multiple', 'true');

// Ativar áudio customizado
localStorage.setItem('ethernum-enable-custom', 'true');

// Recarregar a página
window.location.reload();
```

#### **Opção 3: Inicializar com Config**
```javascript
// Antes de criar a instância
const app = new EthernumApp({
  character: 'gyro',
  backgroundMusicUrl: './audio/desert-wind.mp3',
  enableCustomAudio: true,
  allowMultipleOpenCards: true
});
```

### Formatos Suportados
- **MP3** ✅ (melhor compatibilidade)
- **WAV** ✅
- **OGG** ✅
- **Base64 Data URI** ✅ (de upload)

### Localização das Músicas
Se usar URL local (recomendado para offline):
```
ETHERNUM/
├── audio/
│  ├── background-music.mp3
│  ├── ambient-synth.mp3
│  └── desert-wind.mp3
├── gyro_zeppeli.html
└── app.js
```

Então use: `./audio/background-music.mp3`

### Controlar Música via Painel do Mestre
1. Abra o Painel do Mestre (`mestre-panel.html`)
2. Clique no botão "⚙️ Configurar Música"
3. Configure a URL ou upload um arquivo
4. Salve - a música será sincronizada

## 🎴 Múltiplos Cards Abertos (NOVO!)

### Como Habilitar
**Via localStorage:**
```javascript
localStorage.setItem('ethernum-allow-multiple', 'true');
```

**Via config:**
```javascript
new EthernumApp({ allowMultipleOpenCards: true });
```

### Comportamento
- **Desativado** (padrão): Abre apenas 1 card por vez
- **Ativado**: Abra múltiplos cards e permaneçam abertos

### Visual
Quando ativado, aparece um indicador nas seções:
- "🔒 Lock Single" - apenas 1 aberto
- "🔓 Lock Multiple" - múltiplos abertos
| Clique em aba | Mudar seção + som |
| Scroll | Parallax hero automático |

## 💾 Dados Armazenados

Todos os dados são salvos em `localStorage`:
- `masterMode` — Booleano, indica se é mestre
- `soundEnabled` — Booleano, efeitos sonoros ativados
- `edit-{selector}-{index}` — Conteúdo editado

Para limpar tudo:
```javascript
localStorage.clear();
location.reload();
```

## 🎨 Customização

### Mudar cores da paleta
Edite as CSS variables no `gyro_zeppeli.html`:
```css
:root {
  --gold: #c8a84b;
  --gold-light: #e8cc7a;
  --green-bright: #4a9e4e;
  /* ... */
}
```

### Ajustar sons
No `app.js`, método `playClickSound()`:
```javascript
osc.frequency.setValueAtTime(150, now);  // Frequência inicial
osc.frequency.exponentialRampToValueAtTime(50, now + 0.1); // Final
```

### Adicionar Nova Seção Editável
```html
<div class="hero-title contenteditable="false"">Seu Texto</div>
```

No `app.js`, adicione ao array `editableSelectors`:
```javascript
const editableSelectors = [
  '.hero-title',
  '.seu-novo-elemento'  // Adicione aqui
];
```

## 🔗 Exemplo de Integração Multi-Site Completa

**site-mestre.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Controladora do Mestre</title>
  <style>
    body { display: flex; gap: 20px; }
    .mestre-panel { flex: 1; }
    .player-view { flex: 2; }
  </style>
</head>
<body>
  <div class="mestre-panel">
    <h2>Painel do Mestre</h2>
    <button onclick="revelarNPCs()">Revelar NPCs para Jogador</button>
    <button onclick="mudarSessao('s-risco')">Vai pra Execução & Risco</button>
  </div>

  <div class="player-view">
    <iframe id="player" src="gyro_zeppeli.html?master=false" width="100%" height="800"></iframe>
  </div>

  <script>
    const playerFrame = document.getElementById('player');

    function revelarNPCs() {
      playerFrame.contentWindow.postMessage({
        action: 'TOGGLE_MASTER',
        value: true
      }, '*');
      alert('✓ NPCs revelados!');
    }

    function mudarSessao(sectionId) {
      playerFrame.contentWindow.postMessage({
        action: 'SWITCH_SECTION',
        sectionId: sectionId
      }, '*');
    }
  </script>
</body>
</html>
```

## 🐛 Troubleshooting

### Sons não funcionam
- Verifique se o navegador permite Web Audio API
- Alguns navegadores mobile precisam de interação do usuário primeiro

### Edição não salva
- Certifique-se de que localStorage está habilitado
- Pressione `Ctrl+E` novamente para sair do modo edição

### Integração não funciona
- Use `postMessage` com `'*'` ou um origin específico
- Verifique console (F12) para erros

## 📊 Performance

- **Parallax:** GPU-acelerado (use `transform` apenas)
- **Sounds:** Web Audio API (síntese, não download)
- **Transições:** CSS transitions + requestAnimationFrame
- **Storage:** Apenas localStorage (< 5MB)

## 🎬 Roadmap Futuro

- [ ] Suporte para WebRTC (áudio/vídeo multi-site)
- [ ] Banco de dados backend (salvar edições permanentemente)
- [ ] Dark mode / Light mode
- [ ] Exportar PDF da ficha
- [ ] Sistema de níveis/progressão visual
- [ ] Integração com D&D Beyond API

## 📝 Licença

Para uso pessoal e em mesas caseiras. Respeite os direitos de JoJo's Bizarre Adventure.

---

**Desenvolvido com ❤️ para campanhas épicas**

Dúvidas? Abra um issue no repositório ou teste no console:
```javascript
console.log(window.EthernumAPI);
```
