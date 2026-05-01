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
      hp: '38 / 38',
      ac: '19',
      heroPoints: '1',
      speed: '25 ft',
      attributes: { STR: '+1', DEX: '+4', CON: '+2', INT: '+0', WIS: '+1', CHA: '+0' },
      sheet: ['SP 9', 'Rotacao Sagrada', 'IKONs / Palmas', 'Ball Breaker'],
      inventory: ['Esferas de Aco', 'Kit medico', 'Documentos Ethernum'],
      strikes: ['Esfera de Aco +10', 'Ricochete Espiral', 'Rotacao Medicinal'],
      proficiencies: ['Percepcao T', 'Fortitude T', 'Reflexos E', 'Vontade T', 'Armaduras leves T', 'Armas simples/marciais T']
    },
    cinerio: {
      label: 'Cinerio & Umbra',
      file: 'cinerio_umbra_visual.html',
      klass: 'Ficha Especial',
      level: '-',
      ancestry: 'Dupla',
      hp: '-- / --',
      ac: '--',
      heroPoints: '1',
      speed: '--',
      attributes: { STR: '+0', DEX: '+0', CON: '+0', INT: '+0', WIS: '+0', CHA: '+0' },
      sheet: ['Vinculo Umbra', 'Contrato', 'Risco', 'Arquivo Visual']
    },
    pipping: {
      label: 'Pipping Baldwin Black',
      file: 'pipping-expressao-da-noite.html',
      klass: 'Bardo',
      level: '3',
      ancestry: 'Fetchling',
      hp: '34 / 34',
      ac: '18',
      heroPoints: '1',
      speed: '25 ft',
      art: 'imagem/PBB.png',
      attributes: { STR: '+0', DEX: '+3', CON: '+2', INT: '+1', WIS: '+1', CHA: '+4' },
      sheet: ['PS 6', 'Expressao da Noite', 'Heranca Vampirica', 'Profecia'],
      inventory: ['Instrumento', 'Kit de disfarce', 'Diario Black', 'Adaga cerimonial'],
      strikes: ['Cantrip / composicao', 'Adaga +8', 'Voz do Abismo'],
      proficiencies: ['Percepcao T', 'Fortitude T', 'Reflexos T', 'Vontade E', 'Performance E', 'Ocultismo T']
    },
    bayle: {
      label: 'Bayle, O Horror',
      file: 'bayle_draconico (1).html',
      klass: 'Barbaro',
      level: '3',
      ancestry: 'Draconico',
      hp: '48 / 48',
      ac: '18',
      heroPoints: '1',
      speed: '25 ft',
      art: 'imagem/bayle.png',
      attributes: { STR: '+4', DEX: '+1', CON: '+3', INT: '+0', WIS: '+1', CHA: '+1' },
      sheet: ['Ardor Draconico', 'Estagios', 'Fragmentos', 'Arquivista'],
      inventory: ['Arma draconica', 'Amuleto chamuscado', 'Fragmentos recuperados'],
      strikes: ['Garras +10', 'Sopro de Bayle', 'Rugido'],
      proficiencies: ['Percepcao T', 'Fortitude E', 'Reflexos T', 'Vontade T', 'Armaduras medias T', 'Armas marciais T']
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
        <a href="index.html">Index</a>
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

  function editable(key, value, tag = 'strong') {
    return `<${tag} class="ethernum-editable" contenteditable="true" data-edit-key="${key}">${value}</${tag}>`;
  }

  function addPf2Sheet(characterId) {
    if (!characterId || document.querySelector('.ethernum-pf2-sheet')) return;
    const data = characters[characterId];
    if (!data) return;
    const sheet = document.createElement('section');
    sheet.className = 'ethernum-pf2-sheet';
    sheet.id = 'ethernum-pf2-sheet';
    const attrs = data.attributes || { STR: '+0', DEX: '+0', CON: '+0', INT: '+0', WIS: '+0', CHA: '+0' };
    const list = (items = []) => items.map((item, index) => `
      <tr>
        <td class="ethernum-editable" contenteditable="true" data-edit-key="inventory-${index}-item">${item}</td>
        <td class="ethernum-editable" contenteditable="true" data-edit-key="inventory-${index}-bulk"></td>
        <td class="ethernum-editable" contenteditable="true" data-edit-key="inventory-${index}-notes"></td>
      </tr>`).join('');
    sheet.innerHTML = `
      <h2>Ficha Pathfinder 2e</h2>
      <div class="ethernum-pf2-tabs">
        <button class="ethernum-pf2-tab is-active" data-pf2-tab="resumo">Resumo</button>
        <button class="ethernum-pf2-tab" data-pf2-tab="combate">Combate</button>
        <button class="ethernum-pf2-tab" data-pf2-tab="inventario">Inventario</button>
      </div>
      <div class="ethernum-pf2-panel is-active" data-pf2-panel="resumo">
        <div class="ethernum-pf2-grid">
          <div class="ethernum-pf2-field"><span>Personagem</span>${editable('name', data.label)}</div>
          <div class="ethernum-pf2-field"><span>Classe</span>${editable('class', data.klass)}</div>
          <div class="ethernum-pf2-field"><span>Nivel</span>${editable('level', data.level)}</div>
          <div class="ethernum-pf2-field"><span>Ancestralidade</span>${editable('ancestry', data.ancestry)}</div>
          <div class="ethernum-pf2-field"><span>Vida</span>${editable('hp', data.hp || '-- / --')}</div>
          <div class="ethernum-pf2-field"><span>Armadura / AC</span>${editable('ac', data.ac || '--')}</div>
          <div class="ethernum-pf2-field"><span>Hero Points</span>${editable('hero-points', data.heroPoints || '1')}</div>
          <div class="ethernum-pf2-field"><span>Deslocamento</span>${editable('speed', data.speed || '--')}</div>
          <div class="ethernum-pf2-box"><span>Recursos principais</span>${editable('resources', data.sheet.slice(0, 2).join(' · '), 'p')}</div>
          <div class="ethernum-pf2-box"><span>Observacoes de mesa</span>${editable('notes', data.sheet.slice(2).join(' · '), 'p')}</div>
        </div>
        <div class="ethernum-pf2-stat-grid" style="margin-top:12px">
          ${Object.entries(attrs).map(([name, value]) => `<div class="ethernum-pf2-stat"><span>${name}</span>${editable(`attr-${name}`, value)}</div>`).join('')}
        </div>
      </div>
      <div class="ethernum-pf2-panel" data-pf2-panel="combate">
        <div class="ethernum-pf2-grid">
          <div class="ethernum-pf2-box"><span>Proficiencias</span>${editable('proficiencies', (data.proficiencies || ['T/E/M/L conforme ficha']).join(' · '), 'p')}</div>
          <div class="ethernum-pf2-box"><span>Strikes / Acoes</span>${editable('strikes', (data.strikes || ['Ataque principal', 'Ataque secundario']).join(' · '), 'p')}</div>
        </div>
      </div>
      <div class="ethernum-pf2-panel" data-pf2-panel="inventario">
        <table class="ethernum-pf2-table">
          <thead><tr><th>Item</th><th>Bulk</th><th>Notas</th></tr></thead>
          <tbody>${list(data.inventory || ['Item', 'Item', 'Item'])}</tbody>
        </table>
      </div>`;
    sheet.addEventListener('click', (event) => {
      const tab = event.target.closest('.ethernum-pf2-tab');
      if (!tab) return;
      sheet.querySelectorAll('.ethernum-pf2-tab').forEach((btn) => btn.classList.remove('is-active'));
      sheet.querySelectorAll('.ethernum-pf2-panel').forEach((panel) => panel.classList.remove('is-active'));
      tab.classList.add('is-active');
      sheet.querySelector(`[data-pf2-panel="${tab.dataset.pf2Tab}"]`)?.classList.add('is-active');
    });
    sheet.querySelectorAll('[data-edit-key]').forEach((el) => {
      const key = `ethernum-pf2-${characterId}-${el.dataset.editKey}`;
      const saved = localStorage.getItem(key);
      if (saved !== null) el.textContent = saved;
      el.addEventListener('input', () => localStorage.setItem(key, el.textContent.trim()));
    });
    const host = document.querySelector('main') || document.querySelector('.container') || document.querySelector('.page') || document.body;
    host.appendChild(sheet);
  }

  function addCharacterArt(characterId) {
    const data = characters[characterId];
    if (!data?.art || document.querySelector('.ethernum-character-portrait')) return;
    const portrait = document.createElement('figure');
    portrait.className = 'ethernum-character-portrait';
    portrait.innerHTML = `<img src="${data.art}" alt="${data.label}">`;
    const anchor = document.querySelector('.hero, .site-header');
    if (anchor) anchor.insertAdjacentElement('afterend', portrait);
    else document.body.prepend(portrait);
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
    document.body.classList.add('ethernum-page-ready');
    if (characterId) ensureShell();
    addCharacterArt(characterId);
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
