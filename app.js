/**
 * ETHERNUM v3.2 - Interactive Character Sheet System (Enhanced)
 * Features: Multi-character support, Custom audio, Better transitions, Improved editing
 */

function detectEthernumCharacter() {
  const sharedCharacter = window.EthernumShared?.currentCharacter;
  if (sharedCharacter) return sharedCharacter;
  const file = window.location.pathname.toLowerCase();
  if (file.includes('pipping')) return 'pipping';
  if (file.includes('bayle')) return 'bayle';
  if (file.includes('cinerio')) return 'cinerio';
  if (file.includes('gyro')) return 'gyro';
  if (file.includes('index')) return 'index';
  return 'gyro';
}

const ETHERNUM_DEFAULT_AUDIO = 'media/audio/audio%20%5Bmusic%5D.mp3';
const ETHERNUM_LEGACY_AUDIO_PATHS = [
  './audio/ambient-synth.mp3',
  './audio/piano-classical.mp3',
  './audio/orchestral-bg.mp3',
  './audio/desert-wind.mp3',
  'audio/ambient-synth.mp3',
  'audio/piano-classical.mp3',
  'audio/orchestral-bg.mp3',
  'audio/desert-wind.mp3',
];

function normalizeEthernumAudioUrl(url) {
  const value = (url || '').trim();
  if (ETHERNUM_LEGACY_AUDIO_PATHS.includes(value)) return ETHERNUM_DEFAULT_AUDIO;
  return value;
}

const ETHERNUM_EDITABLE_SELECTORS = [
  '.hero-title',
  '.hero-sub',
  '.hero-tag',
  '.sec-title',
  '.rank-name',
  '.rank-body',
  '.bb-card-name',
  '.bb-desc',
  '.ikon-name',
  '.ikon-sub',
  '.ikon-row',
  '.ikon-section-lbl',
  '.ikon-cost',
  '.ikon-trans-name',
  '.ikon-trans-cost',
  '.ikon-trans-body',
  '.palma-name',
  '.tec-name',
  '.prog-title',
  '.prog-body',
  '.rank-cell',
  '.palma-block-text',
  '.palma-reward-text',
  '.tec-desc',
  '.bb-detail',
  '.sec-note',
  '.card p',
  '.card td',
  '.card li',
];

class EthernumApp {
  constructor(config = {}) {
    const character = config.character || detectEthernumCharacter();
    const storedAudio = localStorage.getItem(`ethernum-music-url-${character}`) || (character === 'gyro' ? localStorage.getItem('ethernum-music-url') : '');
    this.config = {
      character,
      backgroundMusicUrl: normalizeEthernumAudioUrl(config.backgroundMusicUrl || storedAudio || (character === 'gyro' ? ETHERNUM_DEFAULT_AUDIO : '')),
      enableCustomAudio: config.enableCustomAudio !== false,
      allowMultipleOpenCards: config.allowMultipleOpenCards || (localStorage.getItem('ethernum-allow-multiple') === 'true'),
      ...config
    };

    this.isEditMode = false;
    this.isSoundEnabled = true;
    this.masterMode = this.detectMasterMode();
    this.contentStates = new Map();
    this.currentSection = 's-sp';
    this.openCards = new Set();
    this.bgAudio = null;
    this.bgTrack = null;

    this.initAudio();
    this.init();
  }

  init() {
    this.setupHeroParallax();
    this.setupTabNavigation();
    this.setupEditMode();
    this.setupSoundToggle();
    this.setupLockedContent();
    this.setupBackgroundTrack();
    this.addScrollAnimations();
    this.setupMultiSiteIntegration();
    this.setupCardToggle();
    this.setupEditableElements();
    
    console.log('🎯 ETHERNUM v3.2 initialized', {
      character: this.config.character,
      masterMode: this.masterMode,
      soundEnabled: this.isSoundEnabled,
      multipleOpenCards: this.config.allowMultipleOpenCards
    });
  }

  /* ───────────────────────────────────────── AUDIO SYSTEM ───────────────────────────────────────── */

  initAudio() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Master gain
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.28;

      // Click sound
      this.clickGain = this.audioContext.createGain();
      this.clickGain.connect(this.masterGain);

      // Background music gain (baixo, conforme pedido)
      this.bgGain = this.audioContext.createGain();
      this.bgGain.connect(this.masterGain);
      this.bgGain.gain.value = 0.05;
    } catch (e) {
      console.warn('⚠️ Web Audio API não suportado:', e);
    }
  }

  /**
   * Play custom sound or use Web Audio synthesis
   */
  playSound(soundFile = null) {
    if (!this.isSoundEnabled) return;

    if (soundFile && this.config.enableCustomAudio) {
      this.playCustomSound(soundFile);
    } else {
      this.playClickSound();
    }
  }

  /**
   * Play custom audio file
   */
  async playCustomSound(url) {
    try {
      if (!this.audioContext) return;

      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.clickGain);
      source.start(0);
    } catch (e) {
      console.warn('⚠️ Erro ao tocar som custom:', e);
      this.playClickSound();
    }
  }

  playClickSound() {
    if (!this.isSoundEnabled) return;

    try {
      const now = this.audioContext.currentTime;
      const osc = this.audioContext.createOscillator();
      const envelope = this.audioContext.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);

      envelope.gain.setValueAtTime(0.3, now);
      envelope.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.connect(envelope);
      envelope.connect(this.clickGain);

      osc.start(now);
      osc.stop(now + 0.15);

      // Add reverb-like secondary sound
      const osc2 = this.audioContext.createOscillator();
      const env2 = this.audioContext.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(100, now + 0.08);
      osc2.frequency.exponentialRampToValueAtTime(30, now + 0.3);
      env2.gain.setValueAtTime(0, now + 0.08);
      env2.gain.linearRampToValueAtTime(0.15, now + 0.12);
      env2.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc2.connect(env2);
      env2.connect(this.clickGain);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.3);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  setupBackgroundTrack() {
    if (!this.config.enableCustomAudio || localStorage.getItem('ethernum-enable-custom') === 'false') {
      return;
    }
    if (!this.config.backgroundMusicUrl) {
      return;
    }

    try {
      if (!this.audioContext) return;

      const audio = new Audio();
      audio.src = this.config.backgroundMusicUrl;
      audio.loop = true;
      audio.volume = 0.05;
      audio.addEventListener('error', () => {
        if (!audio.src.includes('audio%20%5Bmusic%5D.mp3') && !audio.src.includes('audio%20[music].mp3')) {
          audio.src = ETHERNUM_DEFAULT_AUDIO;
          audio.load();
        }
      }, { once: true });

      const source = this.audioContext.createMediaElementAudioSource(audio);
      source.connect(this.bgGain);
      
      this.bgAudio = audio;
      
      document.addEventListener('click', async () => {
        if (this.isSoundEnabled && this.bgAudio && this.bgAudio.paused) {
          if (this.audioContext?.state === 'suspended') await this.audioContext.resume();
          this.bgAudio.play().catch(e => console.log('Audio play failed:', e));
        }
      }, { once: true });
    } catch (e) {
      console.warn('⚠️ Erro ao carregar música de fundo:', e);
      this.createAmbientLoop();
    }
  }

  createAmbientLoop() {
    if (!this.audioContext) return;

    const playNote = (freq, startTime, duration) => {
      const osc = this.audioContext.createOscillator();
      const env = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      env.gain.setValueAtTime(0, startTime);
      env.gain.linearRampToValueAtTime(0.08, startTime + 0.1);
      env.gain.linearRampToValueAtTime(0, startTime + duration - 0.1);

      osc.connect(env);
      env.connect(this.bgGain);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const scale = [110, 130, 146.8, 164.8, 196, 220, 246.9];
    let time = this.audioContext.currentTime;

    const loop = () => {
      if (!this.isSoundEnabled) {
        setTimeout(loop, 8000);
        return;
      }

      time = this.audioContext.currentTime;
      for (let i = 0; i < 4; i++) {
        const noteIdx = (i * 2) % scale.length;
        playNote(scale[noteIdx], time + i * 2, 1.8);
      }

      setTimeout(loop, 8000);
    };

    if (this.isSoundEnabled) {
      loop();
    }
  }

  /* ───────────────────────────────────────── HERO PARALLAX ───────────────────────────────────────── */

  setupHeroParallax() {
    const heroContainer = document.querySelector('.hero-image-container');
    if (!heroContainer) return;

    // Create background element
    const bgElement = document.createElement('div');
    bgElement.className = 'hero-scroll-bg';
    const img = heroContainer.querySelector('img');
    if (img && img.src) {
      bgElement.style.backgroundImage = `url("${img.src}")`;
      document.body.appendChild(bgElement);
      document.body.classList.add('has-hero-scroll-bg');
    }

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;

      if (scrolled > 0) {
        const opacity = Math.min(scrolled / (heroHeight * 0.5), 0.16);
        bgElement.style.opacity = opacity;
        bgElement.classList.add('active');
        
        // Move background slightly for parallax
        bgElement.style.transform = `translateY(${scrolled * 0.12}px)`;
      } else {
        bgElement.classList.remove('active');
      }
    });
  }

  /* ───────────────────────────────────────── TAB NAVIGATION ───────────────────────────────────────── */

  setupTabNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');

    navButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.playSound();
        
        const sectionId = this.formatSectionId(e.target.textContent);

        // Remove active state
        navButtons.forEach((b) => b.classList.remove('on'));
        document.querySelectorAll('.section').forEach((s) => s.classList.remove('on'));

        // Add active state with animation
        btn.classList.add('on');
        const section = document.getElementById(sectionId);
        if (section) {
          section.classList.add('on');
          this.currentSection = sectionId;
          this.contentStates.set(sectionId, true);
        }
      });
    });
  }

  formatSectionId(text) {
    const sectionMap = {
      'Sistema SP': 's-sp',
      'IKONs': 's-ikons',
      'Palmas do Diabo': 's-palmas',
      'Técnicas': 's-tecnicas',
      'Ranking Rotação': 's-ranking',
      'Execução & Risco': 's-risco',
      'Ball Breaker': 's-bb',
      'Progressão': 's-prog',
      'NPCs': 's-npcs',
      'Questline': 's-quest',
      'Ficha PF2e': 's-ficha',
    };
    return sectionMap[text] || 's-sp';
  }

  /* ───────────────────────────────────────── EDIT MODE ───────────────────────────────────────── */

  setupEditMode() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        this.toggleEditMode();
      }
    });
    document.addEventListener('ethernum:toggle-edit', () => this.toggleEditMode());
  }

  setupEditableElements() {
    const editableSelectors = ETHERNUM_EDITABLE_SELECTORS;

    editableSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener('click', (e) => {
          if (this.isEditMode && !el.closest('[data-master-only], .ethernum-master-locked')) {
            e.stopPropagation();
            el.contentEditable = 'true';
            el.focus();
            el.style.outline = '2px solid var(--gold)';
            el.style.outlineOffset = '2px';
            el.style.background = 'rgba(200, 168, 75, 0.1)';
            
            el.addEventListener('blur', () => {
              el.contentEditable = 'false';
              el.style.outline = 'none';
              el.style.background = 'none';
              this.saveEditState();
            }, { once: true });
          }
        });
      });
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    
    const indicator = document.querySelector('.edit-mode-indicator');
    if (!indicator) {
      const newIndicator = document.createElement('div');
      newIndicator.className = 'edit-mode-indicator active';
            newIndicator.innerHTML = this.isEditMode ? '✎ Edição de Jogador Ativa' : 'Modo Visualização';
      document.body.appendChild(newIndicator);
    } else {
      indicator.classList.toggle('active');
      indicator.innerHTML = this.isEditMode ? '✎ Edição de Jogador Ativa' : 'Modo Visualização';
    }
    document.body.classList.toggle('ethernum-edit-mode', this.isEditMode);
    document.querySelector('.ethernum-edit-btn')?.classList.toggle('is-active', this.isEditMode);

    console.log(this.isEditMode ? '✎ Modo edição ativado' : '🔒 Modo visualização');
    this.saveEditState();
  }

  saveEditState() {
    const editableSelectors = ETHERNUM_EDITABLE_SELECTORS;

    editableSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el, idx) => {
        const key = `edit-${this.config.character}-${selector}-${idx}`;
        localStorage.setItem(key, el.innerText);
      });
    });
  }

  loadEditState() {
    const editableSelectors = ETHERNUM_EDITABLE_SELECTORS;

    editableSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el, idx) => {
        const key = `edit-${this.config.character}-${selector}-${idx}`;
        const saved = localStorage.getItem(key);
        if (saved) {
          el.innerText = saved;
        }
      });
    });
  }

  /* ═══════════════════════════════════════ CARD TOGGLE (Multiple Open) ═══════════════════════════════════════ */

  setupCardToggle() {
    document.addEventListener('click', (e) => {
      const ikonHead = e.target.closest('.ikon-head');
      if (ikonHead) {
        const ikonCard = ikonHead.closest('.ikon-card');
        if (ikonCard && !ikonCard.dataset.localToggle) {
          this.toggleCard(ikonCard, 'ikon-card', this.config.allowMultipleOpenCards);
          this.playSound();
        }
      }

      const palmaHead = e.target.closest('.palma-head');
      if (palmaHead) {
        const palmaCard = palmaHead.closest('.palma-card');
        if (palmaCard && !palmaCard.dataset.localToggle) {
          this.toggleCard(palmaCard, 'palma-card', this.config.allowMultipleOpenCards);
          this.playSound();
        }
      }

      const tecHead = e.target.closest('.tec-head');
      if (tecHead) {
        const tecCard = tecHead.closest('.tec-card');
        if (tecCard && !tecCard.dataset.localToggle) {
          this.toggleCard(tecCard, 'tec-card', this.config.allowMultipleOpenCards);
          this.playSound();
        }
      }

      const progHead = e.target.closest('.prog-head');
      if (progHead) {
        const progCard = progHead.closest('.prog-card');
        if (progCard && !progCard.dataset.localToggle) {
          this.toggleCard(progCard, 'prog-card', this.config.allowMultipleOpenCards);
          this.playSound();
        }
      }
    });
  }

  toggleCard(card, selector, allowMultiple) {
    const wasOpen = card.classList.contains('open');

    if (!allowMultiple) {
      document.querySelectorAll('.' + selector).forEach(c => {
        c.classList.remove('open');
      });
    }

    if (!wasOpen) {
      card.classList.add('open');
    } else if (allowMultiple) {
      card.classList.remove('open');
    }
  }

  /* ───────────────────────────────────────── LOCKED CONTENT ───────────────────────────────────────── */

  setupLockedContent() {
    const lockedSelectors = ['#s-npcs'];

    lockedSelectors.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element && !this.masterMode) {
        element.classList.add('content-locked');
        
        const badge = document.createElement('div');
        badge.className = 'lock-badge';
        badge.innerHTML = '🔒 Apenas Mestre';
        element.style.position = 'relative';
        element.appendChild(badge);
      } else if (element && this.masterMode) {
        element.classList.remove('content-locked');
        const badge = element.querySelector('.lock-badge');
        if (badge) badge.remove();
      }
    });
  }

  detectMasterMode() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('master') === 'true') {
      if (window.EthernumShared?.requestMaster) {
        return window.EthernumShared.requestMaster();
      }
      const password = localStorage.getItem('ethernum-master-password') || 'ethernum-master';
      const value = window.prompt('Senha do modo mestre:');
      const allowed = value === password;
      localStorage.setItem('masterMode', allowed ? 'true' : 'false');
      localStorage.setItem('ethernum-master-authenticated', allowed ? 'true' : 'false');
      if (!allowed && value !== null) window.alert('Senha incorreta.');
      return allowed;
    }
    return localStorage.getItem('ethernum-master-authenticated') === 'true';
  }

  /* ───────────────────────────────────────── SOUND TOGGLE ───────────────────────────────────────── */

  setupSoundToggle() {
    const toggle = document.querySelector('.sound-toggle');
    if (!toggle) {
      const btn = document.createElement('button');
      btn.className = 'sound-toggle';
      btn.innerHTML = '🔊';
      btn.title = 'Toggle Sound (Ctrl+M)';
      document.body.appendChild(btn);

      btn.addEventListener('click', () => {
        this.toggleSound();
        this.playClickSound();
      });

      // Keyboard shortcut
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
          e.preventDefault();
          this.toggleSound();
        }
      });
    }
  }

  toggleSound() {
    this.isSoundEnabled = !this.isSoundEnabled;
    const btn = document.querySelector('.sound-toggle');
    btn.innerHTML = this.isSoundEnabled ? '🔊' : '🔇';
    btn.classList.toggle('muted');
    localStorage.setItem('soundEnabled', this.isSoundEnabled);

    if (this.isSoundEnabled && this.bgAudio) {
      this.bgAudio.play().catch(e => console.log('Audio play failed:', e));
    } else if (!this.isSoundEnabled && this.bgAudio) {
      this.bgAudio.pause();
    }
  }

  /* ───────────────────────────────────────── SCROLL ANIMATIONS ───────────────────────────────────── */

  addScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.section').forEach((section) => {
      observer.observe(section);
    });

    // Add animation to cards
    document.querySelectorAll('.ikon-card, .rank-card, .prog-card').forEach((card) => {
      observer.observe(card);
    });
  }

  /* ───────────────────────────────────────── MULTI-SITE INTEGRATION ───────────────────────────────── */

  setupMultiSiteIntegration() {
    // Export API for integration with other sites
    window.EthernumAPI = {
      getCurrentSection: () => this.currentSection,
      switchSection: (sectionId) => this.switchSection(sectionId),
      getEditMode: () => this.isEditMode,
      setMasterMode: (value) => {
        if (value && window.EthernumShared?.requestMaster && !window.EthernumShared.isMaster()) {
          if (!window.EthernumShared.requestMaster()) return false;
        }
        localStorage.setItem('masterMode', value ? 'true' : 'false');
        if (!value) localStorage.removeItem('ethernum-master-authenticated');
        this.masterMode = value && localStorage.getItem('ethernum-master-authenticated') === 'true';
        this.setupLockedContent();
        return this.masterMode;
      },
      toggleSound: () => this.toggleSound(),
      playSound: () => this.playClickSound(),
      getCharacterData: () => this.getCharacterData(),
    };

    // Listen for messages from other windows/iframes
    window.addEventListener('message', (event) => {
      if (event.data.action === 'SWITCH_SECTION') {
        this.switchSection(event.data.sectionId);
      }
      if (event.data.action === 'TOGGLE_MASTER') {
        if (event.data.value && window.EthernumShared?.requestMaster && !window.EthernumShared.isMaster()) {
          if (!window.EthernumShared.requestMaster()) return;
        }
        this.masterMode = Boolean(event.data.value) && localStorage.getItem('ethernum-master-authenticated') === 'true';
        localStorage.setItem('masterMode', this.masterMode ? 'true' : 'false');
        this.setupLockedContent();
      }
      if (event.data.action === 'TOGGLE_SOUND') {
        this.isSoundEnabled = Boolean(event.data.enabled);
        if (this.bgAudio) {
          if (this.isSoundEnabled) {
            if (this.audioContext?.state === 'suspended') this.audioContext.resume().catch(() => null);
            this.bgAudio.play().catch(() => null);
          }
          else this.bgAudio.pause();
        }
      }
      if (event.data.action === 'APPLY_LOCKS') {
        window.EthernumShared?.applySectionLocks?.(this.config.character);
      }
    });

    console.log('🔗 Multi-site integration ready');
  }

  switchSection(sectionId) {
    if (window.EthernumShared?.sectionDefinitions?.[this.config.character]?.some((section) => section.id === sectionId)) {
      window.EthernumShared?.applySectionLocks?.(this.config.character);
    }
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.add('on');
      document.querySelectorAll('.section').forEach((s) => {
        if (s.id !== sectionId) s.classList.remove('on');
      });
      this.currentSection = sectionId;
      this.playClickSound();
    }
  }

  getCharacterData() {
    return {
      name: document.querySelector('.hero-title')?.innerText || window.EthernumShared?.characters?.[this.config.character]?.label || 'Ethernum',
      level: window.EthernumShared?.characters?.[this.config.character]?.level || '-',
      masterMode: this.masterMode,
      currentSection: this.currentSection,
    };
  }

  /* ───────────────────────────────────────── UTILITY ───────────────────────────────────────── */

  loadSavedState() {
    this.isSoundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    this.loadEditState();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.ethernum = new EthernumApp();
  window.ethernum.loadSavedState();
});

// Fallback initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.ethernum) {
      window.ethernum = new EthernumApp();
    }
  });
}
