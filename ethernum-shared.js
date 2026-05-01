(function () {
  const MASTER_KEY = 'ethernum-master-authenticated';
  const DEFAULT_PASSWORD = 'ethernum-master';
  const LOCK_PREFIX = 'ethernum-section-locks-';
  const DEFAULT_AUDIO = 'media/audio/audio%20%5Bmusic%5D.mp3';
  const LEGACY_AUDIO_PATHS = new Set([
    './audio/ambient-synth.mp3',
    './audio/piano-classical.mp3',
    './audio/orchestral-bg.mp3',
    './audio/desert-wind.mp3',
    'audio/ambient-synth.mp3',
    'audio/piano-classical.mp3',
    'audio/orchestral-bg.mp3',
    'audio/desert-wind.mp3'
  ]);

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
      art: 'backgrounds/gyro-placeholder.svg',
      overview: {
        line: 'Mecanica unica - Rotacao Sagrada',
        first: 'Gyro',
        last: 'Zeppeli',
        sub: 'Gunslinger 3 · Nexus · agente de campo',
        tags: ['Rotacao', 'IKONs', 'Palmas', 'Ball Breaker', 'SP 9'],
        origin: 'Origem ainda em registro. Use este espaco para marcar familia, trauma, patronos, promessa inicial e o evento que colocou Gyro na rota da Ethernum.',
        path: 'Caminho em aberto. Registre aqui escolhas de mesa, votos, perdas, rivalidades e como a Rotacao Sagrada muda quando a campanha avanca.'
      },
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
      overview: {
        line: 'Arquivo especial - Vinculo Umbra',
        first: 'Cinerio',
        last: 'Umbra',
        sub: 'Dupla vinculada · ficha especial · contrato em observacao',
        tags: ['Vinculo', 'Sombras', 'Contrato', 'Arquivo Visual'],
        origin: 'Origem ainda em registro. Use este espaco para separar o que pertence a Cinerio, o que pertence a Umbra e o que nenhum dos dois admite.',
        path: 'Caminho em aberto. Marque quando o vinculo protege, quando cobra preco e quando a sombra passa a desejar algo proprio.'
      },
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
      overview: {
        line: 'Mecanica unica - Expressao da Noite',
        first: 'Pipping',
        last: 'Black',
        sub: 'Bardo 3 · Fetchling · heranca vampirica',
        tags: ['Pulso Sombrio', 'Performance', 'Ocultismo', 'PS 6'],
        origin: 'Origem ainda em registro. Use este espaco para a familia Black, a heranca vampirica, a profecia e a primeira noite em que Pipping entendeu o palco.',
        path: 'Caminho em aberto. Registre cancoes, pactos, testemunhas, marcas da noite e escolhas que aproximam ou afastam Pipping da profecia.'
      },
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
      overview: {
        line: 'Mecanica unica - Ardor Draconico',
        first: 'Bayle',
        last: 'O Horror',
        sub: 'Barbaro 3 · Draconico · humanidade em risco',
        tags: ['Ardor', 'Estagios', 'Fragmentos', 'Arquivista'],
        origin: 'Origem ainda em registro. Use este espaco para a Porta, a perda de memoria, o primeiro fragmento e o motivo de Bayle ainda insistir em ser humano.',
        path: 'Caminho em aberto. Registre cada fragmento, cada aparicao do Arquivista e cada escolha em que Bayle vence ou cede ao horror.'
      },
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

  function normalizeAudioUrl(url) {
    const value = (url || '').trim();
    if (!value || LEGACY_AUDIO_PATHS.has(value)) return DEFAULT_AUDIO;
    return value;
  }

  const sectionDefinitions = {
    gyro: [
      { id: 's-sp', label: 'SP' },
      { id: 's-ikons', label: 'IKONs' },
      { id: 's-palmas', label: 'Palmas' },
      { id: 's-tecnicas', label: 'Tecnicas' },
      { id: 's-ranking', label: 'Ranking' },
      { id: 's-risco', label: 'Execucao' },
      { id: 's-bb', label: 'Ball Breaker' },
      { id: 's-prog', label: 'Progressao' },
      { id: 's-ficha', label: 'Ficha PF2e' },
      { id: 's-npcs', label: 'NPCs' },
      { id: 's-quest', label: 'Quest' }
    ],
    cinerio: [
      { id: 'fundacao', label: 'Fundacao' },
      { id: 'recursos', label: 'Recursos' },
      { id: 'tecnicas', label: 'Tecnicas' },
      { id: 'sombras', label: 'Sombras' },
      { id: 'progressao', label: 'Progressao' }
    ],
    pipping: [
      { id: 'sheet', label: 'Ficha' },
      { id: 'tiers', label: 'Habilidades' },
      { id: 'progression', label: 'Progressao' }
    ],
    bayle: [
      { id: 'visao', label: 'Visao Geral' },
      { id: 'estagios', label: 'Estagios' },
      { id: 'humanidade', label: 'Humanidade' },
      { id: 'arquivista', label: 'Arquivista' },
      { id: 'ficha', label: 'Ficha PF2e' }
    ]
  };

  function lockKey(characterId) {
    return `${LOCK_PREFIX}${characterId || pageCharacter()}`;
  }

  function getSectionLocks(characterId = pageCharacter()) {
    try {
      return JSON.parse(localStorage.getItem(lockKey(characterId)) || '{}') || {};
    } catch {
      return {};
    }
  }

  function setSectionLock(characterId, sectionId, locked) {
    const locks = getSectionLocks(characterId);
    if (locked) locks[sectionId] = true;
    else delete locks[sectionId];
    localStorage.setItem(lockKey(characterId), JSON.stringify(locks));
    applySectionLocks(characterId);
    return locks;
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
    const characterId = pageCharacter();
    const panelHref = characterId ? `mestre-panel.html?character=${encodeURIComponent(characterId)}` : 'mestre-panel.html';
    const nav = document.createElement('div');
    nav.className = 'ethernum-shell-nav';
    nav.innerHTML = `
      <div class="ethernum-shell-brand">Ethernum Company</div>
      <div class="ethernum-shell-links">
        <a href="index.html" target="_top">Index</a>
        <a href="${panelHref}" target="_top">Painel Mestre</a>
        <button type="button" class="ethernum-edit-btn">Modo Edicao</button>
        <button type="button" class="ethernum-master-btn">${isMaster() ? 'Sair Mestre' : 'Modo Mestre'}</button>
      </div>`;
    document.body.prepend(nav);
    nav.querySelector('.ethernum-edit-btn').addEventListener('click', (event) => {
      document.dispatchEvent(new CustomEvent('ethernum:toggle-edit'));
      event.currentTarget.classList.toggle('is-active', document.body.classList.contains('ethernum-edit-mode'));
    });
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

  function sectionElements(characterId, sectionId) {
    if (characterId === 'gyro') {
      return [
        document.getElementById(sectionId),
        ...Array.from(document.querySelectorAll(`.nav-btn[onclick*="'${sectionId.replace('s-', '')}'"]`)),
        ...(sectionId === 's-ficha' ? Array.from(document.querySelectorAll('[data-ethernum-sheet-tab]')) : [])
      ].filter(Boolean);
    }
    if (characterId === 'pipping') {
      const selectors = {
        sheet: '.ethernum-pf2-sheet',
        tiers: '.pulso-box, .tier-section',
        progression: '.progression, .footer-quote'
      };
      return [
        ...(selectors[sectionId] ? Array.from(document.querySelectorAll(selectors[sectionId])) : []),
        ...Array.from(document.querySelectorAll(`.ethernum-tab-btn[data-filter="${sectionId}"]`))
      ];
    }
    if (characterId === 'bayle') {
      const indexMap = { visao: 0, estagios: 1, humanidade: 2, arquivista: 3, ficha: 4 };
      const tabButton = Array.from(document.querySelectorAll('.tab-btn'))[indexMap[sectionId]];
      return [
        document.getElementById(`tab-${sectionId}`),
        tabButton
      ].filter(Boolean);
    }
    if (characterId === 'cinerio') {
      return [
        ...Array.from(document.querySelectorAll(`[data-t="${sectionId}"], [data-panel="${sectionId}"], #${sectionId}`))
      ];
    }
    return [];
  }

  function chooseFirstVisible(characterId) {
    const defs = sectionDefinitions[characterId] || [];
    const first = defs.find((section) => !getSectionLocks(characterId)[section.id]);
    if (first) routeSection(first.id);
  }

  function applySectionLocks(characterId = pageCharacter()) {
    const defs = sectionDefinitions[characterId] || [];
    const locks = getSectionLocks(characterId);
    defs.forEach((section) => {
      const hidden = !isMaster() && Boolean(locks[section.id]);
      sectionElements(characterId, section.id).forEach((el) => {
        el.classList.toggle('ethernum-player-hidden', hidden);
        if (hidden) el.setAttribute('aria-hidden', 'true');
        else el.removeAttribute('aria-hidden');
      });
    });

    if (isMaster()) return;
    const active = document.querySelector('.section.on, .tab-panel.active, .ethernum-tab-btn.is-active');
    if (active?.classList.contains('ethernum-player-hidden') || active?.closest('.ethernum-player-hidden')) {
      chooseFirstVisible(characterId);
    }
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
    sheet.id = characterId === 'gyro' ? 's-ficha' : 'ethernum-pf2-sheet';
    sheet.dataset.pf2Sheet = 'true';
    if (characterId === 'gyro') sheet.classList.add('section');
    const attrs = data.attributes || { STR: '+0', DEX: '+0', CON: '+0', INT: '+0', WIS: '+0', CHA: '+0' };
    const inventoryKey = `ethernum-pf2-${characterId}-inventory-count`;
    const baseInventory = data.inventory || ['Item', 'Item', 'Item'];
    const inventoryCount = Math.max(baseInventory.length, Number(localStorage.getItem(inventoryKey) || baseInventory.length));
    const inventoryRows = Array.from({ length: inventoryCount }, (_, index) => baseInventory[index] || '');
    const list = (items = []) => items.map((item, index) => `
      <tr>
        <td class="ethernum-editable" contenteditable="true" data-edit-key="inventory-${index}-item">${item}</td>
        <td class="ethernum-editable" contenteditable="true" data-edit-key="inventory-${index}-type">Geral</td>
        <td class="ethernum-editable" contenteditable="true" data-edit-key="inventory-${index}-effect">-</td>
        <td class="ethernum-editable" contenteditable="true" data-edit-key="inventory-${index}-bulk"></td>
        <td class="ethernum-editable" contenteditable="true" data-edit-key="inventory-${index}-notes"></td>
      </tr>`).join('');
    sheet.innerHTML = `
      <h2>Ficha Pathfinder 2e</h2>
      <div class="ethernum-pf2-tabs">
        <button class="ethernum-pf2-tab is-active" data-pf2-tab="resumo">Resumo</button>
        <button class="ethernum-pf2-tab" data-pf2-tab="combate">Combate</button>
        <button class="ethernum-pf2-tab" data-pf2-tab="saberes">Saberes</button>
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
      <div class="ethernum-pf2-panel" data-pf2-panel="saberes">
        <div class="ethernum-pf2-grid">
          <div class="ethernum-pf2-box"><span>Saberes / Lores</span>${editable('lores', 'Saber da Campanha · Saber de Cidade · Saber de Monstros', 'p')}</div>
          <div class="ethernum-pf2-box"><span>Pericias de conhecimento</span>${editable('knowledge-skills', 'Arcana · Natureza · Ocultismo · Religiao · Sociedade', 'p')}</div>
          <div class="ethernum-pf2-box"><span>Notas de investigacao</span>${editable('investigation-notes', 'Pistas, contatos, idiomas e informacoes permanentes.', 'p')}</div>
          <div class="ethernum-pf2-box"><span>Treinamentos</span>${editable('training-notes', 'Destreinado / Treinado / Especialista / Mestre / Lendario.', 'p')}</div>
        </div>
      </div>
      <div class="ethernum-pf2-panel" data-pf2-panel="inventario">
        <table class="ethernum-pf2-table">
          <thead><tr><th>Item</th><th>Tipo</th><th>Dano / Armadura / Cura</th><th>Bulk</th><th>Notas</th></tr></thead>
          <tbody>${list(inventoryRows)}</tbody>
        </table>
        <button class="ethernum-pf2-add" type="button" data-add-inventory>Adicionar item</button>
      </div>`;
    sheet.addEventListener('click', (event) => {
      const tab = event.target.closest('.ethernum-pf2-tab');
      if (!tab) return;
      sheet.querySelectorAll('.ethernum-pf2-tab').forEach((btn) => btn.classList.remove('is-active'));
      sheet.querySelectorAll('.ethernum-pf2-panel').forEach((panel) => panel.classList.remove('is-active'));
      tab.classList.add('is-active');
      sheet.querySelector(`[data-pf2-panel="${tab.dataset.pf2Tab}"]`)?.classList.add('is-active');
    });
    const bindEditable = (root = sheet) => {
      root.querySelectorAll('[data-edit-key]').forEach((el) => {
        if (el.dataset.boundEditable === 'true') return;
        el.dataset.boundEditable = 'true';
        const key = `ethernum-pf2-${characterId}-${el.dataset.editKey}`;
        const saved = localStorage.getItem(key);
        if (saved !== null) el.textContent = saved;
        el.addEventListener('input', () => localStorage.setItem(key, el.textContent.trim()));
      });
    };
    bindEditable();
    sheet.querySelector('[data-add-inventory]')?.addEventListener('click', () => {
      const tbody = sheet.querySelector('.ethernum-pf2-table tbody');
      const index = tbody.querySelectorAll('tr').length;
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="ethernum-editable" contenteditable="true" data-edit-key="inventory-${index}-item">Novo item</td>
        <td class="ethernum-editable" contenteditable="true" data-edit-key="inventory-${index}-type">Geral</td>
        <td class="ethernum-editable" contenteditable="true" data-edit-key="inventory-${index}-effect">-</td>
        <td class="ethernum-editable" contenteditable="true" data-edit-key="inventory-${index}-bulk"></td>
        <td class="ethernum-editable" contenteditable="true" data-edit-key="inventory-${index}-notes"></td>`;
      tbody.appendChild(row);
      localStorage.setItem(inventoryKey, String(index + 1));
      bindEditable(row);
    });
    const host = document.querySelector('main') || document.querySelector('.container') || document.querySelector('.page') || document.body;
    host.appendChild(sheet);
  }

  function addCharacterArt(characterId) {
    const data = characters[characterId];
    if (!data?.art || document.querySelector('.ethernum-character-portrait') || document.querySelector('.ethernum-character-overview')) return;
    const portrait = document.createElement('figure');
    portrait.className = 'ethernum-character-portrait';
    portrait.innerHTML = `<img src="${data.art}" alt="${data.label}">`;
    const anchor = document.querySelector('.hero, .site-header');
    if (anchor) anchor.insertAdjacentElement('afterend', portrait);
    else document.body.prepend(portrait);
  }

  function overviewMarkup(characterId) {
    const data = characters[characterId];
    const overview = data?.overview;
    if (!data || !overview) return '';
    const art = data.art || '';
    return `
      <div class="ethernum-overview-hero">
        <div class="ethernum-overview-left">
          <p class="ethernum-overview-eyebrow">// ${overview.line}</p>
          <h1 class="ethernum-overview-name">${overview.first}<span>${overview.last}</span></h1>
          <p class="ethernum-overview-sub">| ${overview.sub}</p>
          <div class="ethernum-overview-tags">
            ${overview.tags.map((tag) => `<span>${tag}</span>`).join('')}
          </div>
        </div>
        <div class="ethernum-overview-right">
          ${art ? `<img src="${art}" alt="${data.label}">` : ''}
        </div>
      </div>
      <div class="ethernum-overview-story">
        <article>
          <p>Origem</p>
          <div class="ethernum-editable" contenteditable="true" data-edit-key="overview-origin">${overview.origin}</div>
        </article>
        <article>
          <p>Caminho</p>
          <div class="ethernum-editable" contenteditable="true" data-edit-key="overview-path">${overview.path}</div>
        </article>
      </div>`;
  }

  function addCharacterOverview(characterId) {
    if (!characterId || document.querySelector('.ethernum-character-overview')) return;
    const html = overviewMarkup(characterId);
    if (!html) return;
    const overview = document.createElement('header');
    overview.className = `ethernum-character-overview ethernum-theme-${characterId}`;
    overview.dataset.overview = characterId;
    overview.innerHTML = html;
    overview.querySelectorAll('[data-edit-key]').forEach((el) => {
      const key = `ethernum-overview-${characterId}-${el.dataset.editKey}`;
      const saved = localStorage.getItem(key);
      if (saved !== null) el.textContent = saved;
      el.addEventListener('input', () => localStorage.setItem(key, el.textContent.trim()));
    });

    const shell = document.querySelector('.ethernum-shell-nav');
    if (shell) shell.insertAdjacentElement('afterend', overview);
    else document.body.prepend(overview);
  }

  function setupSharedBackgroundAudio(characterId) {
    if (!characterId || document.querySelector('script[src*="app.js"]')) return;
    if (localStorage.getItem('ethernum-enable-custom') === 'false') return;
    const stored = localStorage.getItem(`ethernum-music-url-${characterId}`);
    if (!stored) return;
    const src = normalizeAudioUrl(stored);
    if (!src) return;
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.05;
    audio.addEventListener('error', () => {
      if (!audio.src.includes('audio%20%5Bmusic%5D.mp3')) {
        audio.src = DEFAULT_AUDIO;
        audio.load();
      }
    }, { once: true });
    window.EthernumBackgroundAudio = audio;
    document.addEventListener('click', () => {
      audio.play().catch(() => null);
    }, { once: true });
  }

  function setupSharedEditMode(characterId) {
    if (!characterId || document.querySelector('script[src*="app.js"]')) return;
    let editMode = false;
    const selectors = 'h1, h2, h3, h4, p, li, td, th, .pill, .tag, .badge, .ethernum-editable';
    const save = (el, index) => {
      const key = `edit-${characterId}-shared-${index}`;
      localStorage.setItem(key, el.innerText);
    };
    const elements = () => Array.from(document.querySelectorAll(selectors))
      .filter((el) => !el.closest('script, style, .ethernum-shell-nav, .ethernum-tabs'));

    elements().forEach((el, index) => {
      const saved = localStorage.getItem(`edit-${characterId}-shared-${index}`);
      if (saved) el.innerText = saved;
      el.addEventListener('click', (event) => {
        if (!editMode || el.closest('.ethernum-master-locked')) return;
        event.stopPropagation();
        el.contentEditable = 'true';
        el.focus();
        el.style.outline = '2px solid var(--ethernum-gold, #c8a84b)';
        el.style.outlineOffset = '2px';
        el.addEventListener('blur', () => {
          el.contentEditable = 'false';
          el.style.outline = '';
          el.style.outlineOffset = '';
          save(el, index);
        }, { once: true });
      });
    });

    document.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'e') {
        event.preventDefault();
        toggleEditMode();
      }
    });
    document.addEventListener('ethernum:toggle-edit', toggleEditMode);

    function toggleEditMode() {
      editMode = !editMode;
      document.body.classList.toggle('ethernum-edit-mode', editMode);
      document.querySelector('.ethernum-edit-btn')?.classList.toggle('is-active', editMode);
    }
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
      applySectionLocks(pageCharacter());
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
        if (typeof window.showSection === 'function') window.showSection('ficha', btn);
        else document.getElementById('s-ficha')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    panel.appendChild(document.querySelector('[data-pf2-sheet="true"]'));
  }

  function exposeApi(characterId) {
    window.EthernumShared = {
      characters,
      sectionDefinitions,
      currentCharacter: characterId,
      isMaster,
      requestMaster,
      leaveMaster,
      getSectionLocks,
      setSectionLock,
      applySectionLocks
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
    const characterId = pageCharacter();
    const pippingMap = {
      sheet: 'sheet',
      tiers: 'tiers',
      progression: 'progression',
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
      visao: 'visao',
      estagios: 'estagios',
      humanidade: 'humanidade',
      arquivista: 'arquivista',
      ficha: 'ficha',
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
    if (characterId === 'gyro' && sectionId === 's-ficha' && typeof window.showSection === 'function') {
      const btn = document.querySelector('[data-ethernum-sheet-tab]');
      window.showSection('ficha', btn);
      return;
    }
    if (characterId === 'cinerio') {
      const btn = document.querySelector(`[data-t="${sectionId}"]`);
      if (btn) {
        btn.click();
        return;
      }
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const characterId = pageCharacter();
    document.body.classList.add('ethernum-page-ready');
    if (characterId) ensureShell();
    addCharacterOverview(characterId);
    addCharacterArt(characterId);
    addPf2Sheet(characterId);
    setupSharedBackgroundAudio(characterId);
    setupSharedEditMode(characterId);
    makePippingTabs();
    addGyroSheetTab();
    addBayleSheetTab();
    applyMasterLocks();
    exposeApi(characterId);
    applySectionLocks(characterId);
    document.addEventListener('ethernum:master-change', applyMasterLocks);
    document.addEventListener('ethernum:master-change', () => applySectionLocks(characterId));
    window.addEventListener('message', (event) => {
      if (event.data?.action === 'TOGGLE_MASTER') {
        if (event.data.value) requestMaster();
        else leaveMaster();
        applyMasterLocks();
      }
      if (event.data?.action === 'SWITCH_SECTION') routeSection(event.data.sectionId);
      if (event.data?.action === 'APPLY_LOCKS') applySectionLocks(characterId);
      if (event.data?.action === 'TOGGLE_SOUND' && window.EthernumBackgroundAudio) {
        if (event.data.enabled) window.EthernumBackgroundAudio.play().catch(() => null);
        else window.EthernumBackgroundAudio.pause();
      }
    });
  });
})();
