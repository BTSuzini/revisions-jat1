const storeKey = 'jat1-progress-v2';

let activeSport = 'tennis';
let revisionSport = 'tennis';
let deck = [];
let idx = 0;

const allQuestions = () => window.QUESTIONS || [];
const loadProgress = () => JSON.parse(localStorage.getItem(storeKey) || '{}');
const saveProgress = p => localStorage.setItem(storeKey, JSON.stringify(p));
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

function labelSport(sport) {
  if (sport === 'tennis') return 'Tennis';
  if (sport === 'beach_tennis') return 'Beach tennis';
  return 'Tout';
}

function getQuestionsBySport(sport) {
  const questions = allQuestions();
  if (sport === 'all') return questions;
  return questions.filter(q => (q.sport || 'tennis') === sport);
}

function mark(id, value) {
  const p = loadProgress();
  p[id] = value;
  saveProgress(p);
  renderAll();
}

function bindTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';

    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      parent.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const sport = btn.dataset.sport || 'tennis';

      if (document.getElementById('questionList')) {
        activeSport = sport;
        const filter = document.getElementById('themeFilter');
        if (filter) {
          filter.dataset.ready = '';
          filter.innerHTML = '';
        }
        renderQuestions();
      }

      if (document.getElementById('flashcard')) {
        revisionSport = sport;
        deck = [];
        idx = 0;
        renderFlash();
      }
    });
  });
}

function renderHome() {
  const el = document.getElementById('homeStats');
  if (!el || !window.QUESTIONS) return;

  const p = loadProgress();
  const ok = Object.values(p).filter(v => v === 'ok').length;
  const review = Object.values(p).filter(v => v === 'review').length;
  const tennis = getQuestionsBySport('tennis').length;
  const beach = getQuestionsBySport('beach_tennis').length;

  el.innerHTML = `
    <span class="pill">${allQuestions().length} questions</span>
    <span class="pill">${tennis} tennis</span>
    <span class="pill">${beach} beach tennis</span>
    <span class="pill">${ok} maîtrisées</span>
    <span class="pill">${review} à revoir</span>
  `;
}

function renderCourses() {
  const el = document.getElementById('courseList');
  if (!el || !window.COURSES) return;

  const themes = [...new Set(COURSES.map(c => c.theme))];

  el.innerHTML = themes.map(t => `
    <section class="course-section">
      <h2 class="section-title">${t}</h2>
      ${COURSES.filter(c => c.theme === t).map(c => `
        <article class="card">
          <h3>${c.title}</h3>
          <div class="note"><strong>À retenir :</strong> ${c.essential}</div>
          <p><strong>Exemple :</strong> ${c.example}</p>
          <div class="note trap"><strong>Piège :</strong> ${c.trap}</div>
        </article>
      `).join('')}
    </section>
  `).join('');
}

function questionCard(item) {
  const p = loadProgress();
  const status = p[item.id];

  return `
    <article class="card ${status === 'ok' ? 'status-ok' : ''} ${status === 'review' ? 'status-review' : ''}" data-theme="${item.theme}">
      <div class="q-meta">
        <span class="tag">${item.theme || 'Sans thème'}</span>
        <span class="tag">${labelSport(item.sport || 'tennis')}</span>
        ${item.niveau ? `<span class="tag">${item.niveau}</span>` : ''}
        ${status ? `<span class="tag">${status === 'ok' ? 'Maîtrisée' : 'À revoir'}</span>` : ''}
      </div>

      <h3>${item.q}</h3>

      <button class="ghost" onclick="this.nextElementSibling.classList.toggle('show')">
        Voir la réponse
      </button>

      <div class="answer">${item.a}</div>

      <div class="actions">
        <button onclick="mark(${item.id}, 'ok')">Je savais</button>
        <button class="secondary" onclick="mark(${item.id}, 'review')">À revoir</button>
      </div>
    </article>
  `;
}

function renderQuestions() {
  const list = document.getElementById('questionList');
  if (!list || !window.QUESTIONS) return;

  const filter = document.getElementById('themeFilter');
  const search = document.getElementById('search');
  const counter = document.getElementById('questionCount');
  const sportLabel = document.getElementById('activeSportLabel');

  const source = getQuestionsBySport(activeSport);

  const themes = ['Tous les thèmes', ...new Set(source.map(q => q.theme || 'Sans thème'))];

  if (filter && !filter.dataset.ready) {
    filter.innerHTML = themes.map(t => `<option>${t}</option>`).join('');
    filter.dataset.ready = '1';
    filter.onchange = renderQuestions;
  }

  if (search && !search.dataset.ready) {
    search.oninput = renderQuestions;
    search.dataset.ready = '1';
  }

  const needle = (search?.value || '').toLowerCase();
  const theme = filter?.value || 'Tous les thèmes';

  const items = source.filter(q => {
    const text = `${q.q || ''} ${q.a || ''} ${q.theme || ''} ${q.niveau || ''}`.toLowerCase();
    const matchTheme = theme === 'Tous les thèmes' || (q.theme || 'Sans thème') === theme;
    const matchSearch = text.includes(needle);
    return matchTheme && matchSearch;
  });

  if (counter) counter.textContent = `${items.length} question${items.length > 1 ? 's' : ''}`;
  if (sportLabel) sportLabel.textContent = labelSport(activeSport);

  if (!items.length) {
    list.innerHTML = `
      <article class="card">
        <h3>Aucune question trouvée</h3>
        <p>Essaie un autre thème, une autre recherche, ou change d’onglet.</p>
      </article>
    `;
    return;
  }

  list.innerHTML = items.map(questionCard).join('');
}

function setDeck(mode = 'random') {
  const p = loadProgress();
  const source = getQuestionsBySport(revisionSport);

  if (mode === 'review') {
    deck = source.filter(q => p[q.id] === 'review');
  } else {
    deck = shuffle(source).slice(0, 10);
  }

  idx = 0;
  renderFlash();
}

function renderFlash() {
  const el = document.getElementById('flashcard');
  if (!el || !window.QUESTIONS) return;

  const label = document.getElementById('revisionSportLabel');
  const count = document.getElementById('revisionCount');

  if (label) label.textContent = labelSport(revisionSport);

  const source = getQuestionsBySport(revisionSport);

  if (!deck.length) {
    deck = shuffle(source).slice(0, 10);
    idx = 0;
  }

  if (count) count.textContent = `${source.length} question${source.length > 1 ? 's' : ''} disponibles`;

  if (!source.length) {
    el.innerHTML = `
      <article class="flash">
        <h2>Aucune question disponible</h2>
        <p>Les questions ${labelSport(revisionSport).toLowerCase()} seront ajoutées plus tard.</p>
      </article>
    `;
    return;
  }

  const q = deck[idx];

  if (!q) {
    el.innerHTML = `
      <article class="flash">
        <h2>Série terminée ✅</h2>
        <p>Relance une série ou révise les questions à revoir.</p>
      </article>
    `;
    return;
  }

  el.innerHTML = `
    <article class="flash">
      <div class="progress">
        Question ${idx + 1} / ${deck.length} · ${labelSport(q.sport || 'tennis')} · ${q.theme || 'Sans thème'}
      </div>

      <div class="question">${q.q}</div>

      <button class="ghost" onclick="document.getElementById('flashAnswer').classList.toggle('show')">
        Voir la réponse
      </button>

      <div id="flashAnswer" class="answer">${q.a}</div>

      <div class="actions">
        <button onclick="mark(${q.id}, 'ok'); idx++; renderFlash();">Je savais</button>
        <button class="secondary" onclick="mark(${q.id}, 'review'); idx++; renderFlash();">À revoir</button>
      </div>
    </article>
  `;
}

function bindRevision() {
  const r = document.getElementById('randomBtn');
  if (!r) return;

  r.onclick = () => setDeck('random');

  const reviewBtn = document.getElementById('reviewBtn');
  if (reviewBtn) reviewBtn.onclick = () => setDeck('review');

  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      localStorage.removeItem(storeKey);
      deck = [];
      idx = 0;
      renderAll();
    };
  }
}

function renderAll() {
  bindTabs();
  renderHome();
  renderCourses();
  renderQuestions();
  renderFlash();
}

bindRevision();
renderAll();
