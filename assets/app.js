const storeKey = 'jat1-progress-v1';
const loadProgress = () => JSON.parse(localStorage.getItem(storeKey) || '{}');
const saveProgress = p => localStorage.setItem(storeKey, JSON.stringify(p));
const mark = (id, value) => { const p = loadProgress(); p[id]=value; saveProgress(p); renderAll(); };
const shuffle = arr => [...arr].sort(()=>Math.random()-.5);

function renderHome(){
  const el=document.getElementById('homeStats'); if(!el || !window.QUESTIONS) return;
  const p=loadProgress();
  const ok=Object.values(p).filter(v=>v==='ok').length;
  const review=Object.values(p).filter(v=>v==='review').length;
  el.innerHTML=`<span class="pill">${QUESTIONS.length} questions</span><span class="pill">${ok} maîtrisées</span><span class="pill">${review} à revoir</span>`;
}
function renderCourses(){
  const el=document.getElementById('courseList'); if(!el || !window.COURSES) return;
  const themes=[...new Set(COURSES.map(c=>c.theme))];
  el.innerHTML=themes.map(t=>`<section class="course-section"><h2 class="section-title">${t}</h2>${COURSES.filter(c=>c.theme===t).map(c=>`<article class="card"><h3>${c.title}</h3><div class="note"><strong>À retenir :</strong> ${c.essential}</div><p><strong>Exemple :</strong> ${c.example}</p><div class="note trap"><strong>Piège :</strong> ${c.trap}</div></article>`).join('')}</section>`).join('');
}
function questionCard(item){
  const p=loadProgress(); const status=p[item.id];
  return `<article class="card ${status==='ok'?'status-ok':''} ${status==='review'?'status-review':''}" data-theme="${item.theme}"><div class="q-meta"><span class="tag">${item.theme}</span>${status?`<span class="tag">${status==='ok'?'Maîtrisée':'À revoir'}</span>`:''}</div><h3>${item.q}</h3><button class="ghost" onclick="this.nextElementSibling.classList.toggle('show')">Voir la réponse</button><div class="answer">${item.a}</div><div class="actions"><button onclick="mark(${item.id}, 'ok')">Je savais</button><button class="secondary" onclick="mark(${item.id}, 'review')">À revoir</button></div></article>`;
}
function renderQuestions(){
  const list=document.getElementById('questionList'); if(!list || !window.QUESTIONS) return;
  const filter=document.getElementById('themeFilter'); const search=document.getElementById('search');
  const themes=['Tous les thèmes', ...new Set(QUESTIONS.map(q=>q.theme))];
  if(filter && !filter.dataset.ready){ filter.innerHTML=themes.map(t=>`<option>${t}</option>`).join(''); filter.dataset.ready=1; filter.onchange=renderQuestions; }
  if(search && !search.dataset.ready){ search.oninput=renderQuestions; search.dataset.ready=1; }
  const needle=(search?.value||'').toLowerCase(); const theme=filter?.value||'Tous les thèmes';
  const items=QUESTIONS.filter(q=>(theme==='Tous les thèmes'||q.theme===theme) && (q.q+q.a+q.theme).toLowerCase().includes(needle));
  list.innerHTML=items.map(questionCard).join('') || '<p>Aucune question trouvée.</p>';
}
let deck=[], idx=0;
function setDeck(mode='random'){
  const p=loadProgress();
  deck = mode==='review' ? QUESTIONS.filter(q=>p[q.id]==='review') : shuffle(QUESTIONS).slice(0,10);
  idx=0; renderFlash();
}
function renderFlash(){
  const el=document.getElementById('flashcard'); if(!el || !window.QUESTIONS) return;
  if(!deck.length) deck=shuffle(QUESTIONS).slice(0,10);
  const q=deck[idx];
  if(!q){ el.innerHTML='<article class="flash"><h2>Série terminée ✅</h2><p>Relance une série ou révise les questions à revoir.</p></article>'; return; }
  el.innerHTML=`<article class="flash"><div class="progress">Question ${idx+1} / ${deck.length} · ${q.theme}</div><div class="question">${q.q}</div><button class="ghost" onclick="document.getElementById('flashAnswer').classList.toggle('show')">Voir la réponse</button><div id="flashAnswer" class="answer">${q.a}</div><div class="actions"><button onclick="mark(${q.id}, 'ok'); idx++; renderFlash();">Je savais</button><button class="secondary" onclick="mark(${q.id}, 'review'); idx++; renderFlash();">À revoir</button></div></article>`;
}
function bindRevision(){
  const r=document.getElementById('randomBtn'); if(!r) return;
  r.onclick=()=>setDeck('random'); document.getElementById('reviewBtn').onclick=()=>setDeck('review'); document.getElementById('resetBtn').onclick=()=>{localStorage.removeItem(storeKey); deck=[]; renderAll();};
  renderFlash();
}
function renderAll(){ renderHome(); renderCourses(); renderQuestions(); renderFlash(); }
bindRevision(); renderAll();
