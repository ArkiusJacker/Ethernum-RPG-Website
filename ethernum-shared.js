(function () {
  const MASTER_KEY = 'ethernum-master-authenticated';
  const DEFAULT_PASSWORD = 'ethernum-master';

  const characters = {
    gyro: {
      label: 'Gyro Zeppeli',
      file: 'gyro_zeppeli.html',
      klass: 'Gunslinger',
      level: '3',
      ancestry: 'Humano',
      sheet: ['SP 9', 'Rotacao Sagrada', 'IKONs / Palmas', 'Ball Breaker']
    },
    cinerio: {
      label: 'Cinerio & Umbra',
      file: 'cinerio_umbra_visual.html',
      klass: 'Ficha Especial',
      level: '-',
      ancestry: 'Dupla',
      sheet: ['Vinculo Umbra', 'Contrato', 'Risco', 'Arquivo Visual']
    },
    pipping: {
      label: 'Pipping Baldwin Black',
      file: 'pipping-expressao-da-noite.html',
      klass: 'Bardo',
      level: '3',
      ancestry: 'Fetchling',
      sheet: ['PS 6', 'Expressao da Noite', 'Heranca Vampirica', 'Profecia']
    },
    bayle: {
      label: 'Bayle, O Horror',
      file: 'bayle_draconico (1).html',
      klass: 'Barbarian',
      level: '3',
      ancestry: 'Draconico',
      sheet: ['Ardor Draconico', 'Estagios', 'Fragmentos', 'Arquivista']
    }
  };

  function pageCharacter() {
    const file = location.pathname.split('/').pop().toLowerCase();
    if (file.includes('gyro')) return 'gyro';
    if (file.includes('cinerio')) return 'cinerio';
    if (file.includes('pipping')) return 'pipping';
    if (file.includes('bayle')) return 'bayle';
    return document.body.dataset.character || '';
  }

  function passwordValue() {
    return localStorage.getItem('ethernum-master-password') || DEFAULT_PASSWORD;
  }

  function isMaster() {
    return localStorage.getItem(MASTER_KEY) === 'true';
  }

  function requestMaster() {
    if (isMaster()) return true;
    const value = window.prompt('Senha do modo mestre:');
    if (value === passwordValue()) {
      localStorage.setItem(MASTER_KEY, 'true');
      localStorage.setItem('masterMode', 'true');
      document.dispatchEvent(new CustomEvent('ethernum:master-change', { detail: { enabled: true } }));
      return true;
    }
    if (value !== null) window.alert('Senha incorreta.');
    return false;
  }

  function leaveMaster() {
    localStorage.removeItem(MASTER_KEY);
    localStorage.setItem('masterMode', 'false');
    document.dispatchEvent(new CustomEvent('ethernum:master-change', { detail: { enabled: false } }));
  }

  function ensureShell() {
    if (document.querySelector('.ethernum-shell-nav')) return;
    const nav = document.createElement('div');
    nav.className = 'ethernum-shell-nav';
    nav.innerHTML = `
      <div class="ethernum-shell-brand">Ethernum Company</div>
      <div class="ethernum-shell-links">
        <a href="INDEX.html">Index</a>
        <a href="mestre-panel.html">Painel Mestre</a>
        <button type="button" class="ethernum-master-btn">${isMaster() ? 'Sair Mestre' : 'Modo Mestre'}</button>
      </div>`;
    document.body.prepend(nav);
    nav.querySelector('.ethernum-master-btn').addEventListener('click', (event) => {
      if (isMaster()) leaveMaster();
      else requestMaster();
      event.currentTarget.textContent = isMaster() ? 'Sair Mestre' : 'Modo Mestre';
      event.currentTarget.classList.toggle('is-active', isMaster());
      applyMasterLocks();
    });
  }

  function applyMasterLocks() {
    const enabled = isMaster();
    document.querySelectorAll('[data-master-only], .secret-seal, .secret-block, .arquivista-box').forEach((el) => {
      el.classList.toggle('ethernum-master-locked', !enabled);
      el.classList.toggle('ethernum-secret', !enabled);
    });
  }

  function addPf2Sheet(characterId) {
    if (!characterId || document.querySelector('.ethernum-pf2-sheet')) return;
    const data = characters[characterId];
    if (!data) return;
    const sheet = document.createElement('section');
    sheet.className = 'ethernum-pf2-sheet';
    sheet.id = 'ethernum-pf2-sheet';
    sheet.innerHTML = `
      <h2>Ficha Pathfinder 2e</h2>
      <div class="ethernum-pf2-grid">
        <div class="ethernum-pf2-field"><span>Personagem</span><strong>${data.label}</strong></div>
        <div class="ethernum-pf2-field"><span>Classe</span><strong>${data.klass}</strong></div>
        <div class="ethernum-pf2-field"><span>Nivel</span><strong>${data.level}</strong></div>
        <div class="ethernum-pf2-field"><span>Ancestralidade</span><strong>${data.ancestry}</strong></div>
        <div class="ethernum-pf2-box"><span>Recursos principais</span><p>${data.sheet.slice(0, 2).join(' · ')}</p></div>
        <div class="ethernum-pf2-box"><span>Observacoes de mesa</span><p>${data.sheet.slice(2).join(' · ')}</p></div>
      </div>`;
    const host = document.querySelector('main') || document.querySelector('.container') || document.querySelector('.page') || document.body;
    host.appendChild(sheet);
  }

  function makePippingTabs() {
    if (!location.pathname.toLowerCase().includes('pipping') || document.querySelector('.ethernum-tabs')) return;
    const hero = document.querySelector('.hero');
    const tabs = document.createElement('div');
    tabs.className = 'ethernum-tabs';
    tabs.innerHTML = `
      <button class="ethernum-tab-btn is-active" data-filter="all">Tudo</button>
      <button class="ethernum-tab-btn" data-filter="sheet">Ficha</button>
      <button class="ethernum-tab-btn" data-filter="tiers">Habilidades</button>
      <button class="ethernum-tab-btn" data-filter="progression">Progressao</button>`;
    hero.insertAdjacentElement('afterend', tabs);
    tabs.addEventListener('click', (event) => {
      const btn = event.target.closest('.ethernum-tab-btn');
      if (!btn) return;
      tabs.querySelectorAll('.ethernum-tab-btn').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.pulso-box, .tier-section, .progression, .footer-quote, .ethernum-pf2-sheet').forEach((el) => {
        const isSheet = el.classList.contains('ethernum-pf2-sheet');
        const isTier = el.classList.contains('tier-section') || el.classList.contains('pulso-box');
        const isProgress = el.classList.contains('progression') || el.classList.contains('footer-quote');
        el.style.display = filter === 'all' || (filter === 'sheet' && isSheet) || (filter === 'tiers' && isTier) || (filter === 'progression' && isProgress) ? '' : 'none';
      });
    });
  }

  function addGyroSheetTab() {
    if (!location.pathname.toLowerCase().includes('gyro')) return;
    const navInner = document.querySelector('.nav-inner');
    if (navInner && !document.querySelector('[data-ethernum-sheet-tab]')) {
      const btn = document.createElement('button');
      btn.className = 'nav-btn';
      btn.dataset.ethernumSheetTab = 'true';
      btn.textContent = 'Ficha PF2e';
      btn.addEventListener('click', () => {
        document.querySelectorAll('.section').forEach((s) => s.classList.remove('on'));
        document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('on'));
        document.getElementById('ethernum-pf2-sheet')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        btn.classList.add('on');
      });
      navInner.appendChild(btn);
    }
  }

  function addBayleSheetTab() {
    if (!location.pathname.toLowerCase().includes('bayle') || document.getElementById('tab-ficha')) return;
    const nav = document.querySelector('.tabs-nav');
    const body = document.querySelector('.tabs-body');
    if (!nav || !body) return;
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.textContent = 'Ficha PF2e';
    btn.onclick = () => {
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
      document.getElementById('tab-ficha').classList.add('active');
      btn.classList.add('active');
    };
    nav.appendChild(btn);
    const panel = document.createElement('div');
    panel.className = 'tab-panel';
    panel.id = 'tab-ficha';
    body.appendChild(panel);
    panel.appendChild(document.getElementById('ethernum-pf2-sheet'));
  }

  function exposeApi(characterId) {
    window.EthernumShared = {
      characters,
      currentCharacter: characterId,
      isMaster,
      requestMaster,
      leaveMaster
    };
    window.EthernumAPI = window.EthernumAPI || {
      getCurrentSection: () => document.querySelector('.tab-panel.active, .section.on, section.active')?.id || 'initial',
      switchSection: (sectionId) => routeSection(sectionId),
      getEditMode: () => false,
      setMasterMode: (value) => value ? requestMaster() : (leaveMaster(), false),
      toggleSound: () => null,
      playSound: () => null,
      getCharacterData: () => ({
        name: characters[characterId]?.label || document.title,
        level: characters[characterId]?.level || '-',
        masterMode: isMaster(),
        currentSection: document.querySelector('.tab-panel.active, .section.on, section.active')?.id || 'initial'
      })
    };
  }

  function routeSection(sectionId) {
    if (sectionId === 'ethernum-pf2-sheet' || sectionId === 's-ficha') {
      document.getElementById('ethernum-pf2-sheet')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const pippingMap = {
      's-sp': 'sheet',
      's-tecnicas': 'tiers',
      's-prog': 'progression',
      's-quest': 'progression'
    };
    const pippingButton = document.querySelector(`.ethernum-tab-btn[data-filter="${pippingMap[sectionId] || 'all'}"]`);
    if (pippingButton) {
      pippingButton.click();
      return;
    }
    const bayleMap = {
      's-sp': 'visao',
      's-tecnicas': 'estagios',
      's-prog': 'humanidade',
      's-npcs': 'arquivista',
      's-quest': 'arquivista',
      's-ficha': 'ficha'
    };
    const bayleTarget = bayleMap[sectionId];
    if (bayleTarget && typeof window.switchTab === 'function') {
      const indexMap = { visao: 0, estagios: 1, humanidade: 2, arquivista: 3, ficha: 4 };
      const btn = Array.from(document.querySelectorAll('.tab-btn'))[indexMap[bayleTarget]];
      btn?.click();
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const characterId = pageCharacter();
    if (characterId) ensureShell();
    addPf2Sheet(characterId);
    makePippingTabs();
    addGyroSheetTab();
    addBayleSheetTab();
    applyMasterLocks();
    exposeApi(characterId);
    document.addEventListener('ethernum:master-change', applyMasterLocks);
    window.addEventListener('message', (event) => {
      if (event.data?.action === 'TOGGLE_MASTER') {
        if (event.data.value) requestMaster();
        else leaveMaster();
        applyMasterLocks();
      }
      if (event.data?.action === 'SWITCH_SECTION') routeSection(event.data.sectionId);
    });
  });
})();
