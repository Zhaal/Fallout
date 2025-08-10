/* Vault-Tec Interface — Abri 202, Pip-Boy Edition */
/* Tabs, Password gating, Type-in effect, Terminal extras, Theme + Sounds */

const qs = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => [...el.querySelectorAll(s)];

const clock = () => {
  const el = qs('#clock');
  const pad = n => String(n).padStart(2,'0');
  setInterval(()=>{
    const d = new Date();
    el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }, 1000);
};

function loadPayloads(){
  const fill = (idTpl, idOut) => { qs(idOut).textContent = qs(idTpl).textContent.trim(); };
  fill('#tpl-lettre', '#content-citoyens');
  fill('#tpl-fiche', '#content-fiche');
  fill('#tpl-suph', '#content-suph');
  fill('#tpl-supa', '#content-supa');
  fill('#tpl-contexte', '#content-contexte');
  fill('#tpl-mj', '#content-mj');
}

/* Simple synth SFX (no assets) */
function soundFX(type='open'){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);

    if(type==='open'){ o.type='square'; o.frequency.setValueAtTime(420, ctx.currentTime); }
    if(type==='deny'){  o.type='sawtooth'; o.frequency.setValueAtTime(160, ctx.currentTime); }
    if(type==='ok'){    o.type='triangle'; o.frequency.setValueAtTime(820, ctx.currentTime); }

    g.gain.setValueAtTime(0.0009, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.18);
    o.start(); o.stop(ctx.currentTime + 0.2);
    setTimeout(()=>ctx.close(), 260);
  }catch(e){}
}

const audio = {
  connect: new Audio('Connect-pipboy.wav'),
  modal: new Audio('accès-protégé.wav'),
  amberOn: new Audio('ambre-on.wav'),
  amberOff: new Audio('ambre-off.wav'),
  mdpOk: new Audio('mdp-ok.wav'),
  mdpNo: new Audio('mdp-no.wav')
};
function play(name){
  const a = audio[name];
  if(a){
    a.currentTime = 0;
    a.play().catch(()=>{});
  }
}

function setupTabs(){
  const passModal = qs('#passModal');
  const passInput = qs('#passInput');
  const modalTarget = qs('#modal-target');

  function showPane(id){
    qsa('.pane').forEach(p => p.classList.toggle('is-visible', p.id === id));
    qsa('.tab').forEach(t => t.classList.toggle('is-active', t.dataset.tab === id));
    // smooth scroll top
    qs('.viewport').scrollTo({ top: 0, behavior: 'smooth' });
    // visual accent
    document.body.animate(
      [{filter:'brightness(1.0)'},{filter:'brightness(1.2)'},{filter:'brightness(1.0)'}],
      {duration:220, iterations:1}
    );
    // retrigger typing on the newly visible pane
    typeInEffect();
  }

  function haveAccess(key){
    return sessionStorage.getItem(`vt.access.${key}`) === '1';
  }
  function grantAccess(key){
    sessionStorage.setItem(`vt.access.${key}`, '1');
  }

  qsa('.tab').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.tab;
      const isProtected = btn.dataset.protected === 'true';
      if(!isProtected){
        soundFX('open');
        showPane(id);
        return;
      }
      const pass = btn.dataset.pass;
      const key = `tab-${id}`;
      if(haveAccess(key)){
        soundFX('open');
        showPane(id);
        return;
      }
      // Prompt
      modalTarget.textContent = btn.textContent;
      passInput.value = '';
      passModal.showModal();
      play('modal');

      passModal.addEventListener('close', function handler(){
        passModal.removeEventListener('close', handler);
        if(passModal.returnValue === 'ok'){
          const entered = passInput.value.trim();
          if(entered === pass){
            grantAccess(key);
            play('mdpOk');
            showPane(id);
          }else{
            play('mdpNo');
            passModal.querySelector('.modal-card').animate(
              [{transform:'translateX(0)'},{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],
              {duration:180, iterations:1}
            );
          }
        }
      }, {once:true});
    });
  });

  // initial
  showPane('citoyens');
}

function typeInEffect(){
  const pane = qs('.pane.is-visible pre');
  if(!pane) return;
  const text = pane.textContent;
  pane.textContent = '';
  let i = 0;
  // hide cursor while typing
  pane.style.setProperty('--pip-cursor', '" "');
  const step = () => {
    const chunk = text.slice(i, i + Math.max(3, 8 + Math.floor(Math.random()*6)));
    pane.textContent += chunk;
    i += chunk.length;
    if(i < text.length) {
      setTimeout(step, 6 + Math.random()*18);
    } else {
      pane.style.setProperty('--pip-cursor', '"▮"');
    }
  };
  step();
}

function keyboardShortcuts(){
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'PageDown'){
      const vp = qs('.viewport');
      vp.scrollBy({top: vp.clientHeight * .9, behavior:'smooth'});
    }
    if(e.key === 'PageUp'){
      const vp = qs('.viewport');
      vp.scrollBy({top: -vp.clientHeight * .9, behavior:'smooth'});
    }
    if(e.key === '`' || e.key === '~'){
      document.body.classList.toggle('terminal-mode');
      soundFX('open');
    }
  });
}

function setupTheme(){
  const root = document.documentElement;
  const toggle = qs('#themeToggle');
  let saved = 'green';
  try {
    saved = localStorage.getItem('vt.theme') || 'green';
  } catch (e) {
    // storage unavailable
  }
  root.setAttribute('data-theme', saved);
  if(saved === 'amber' && toggle) toggle.checked = true;

  toggle?.addEventListener('change', ()=>{
    const theme = toggle.checked ? 'amber' : 'green';
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('vt.theme', theme); } catch (e) {}
    play(theme === 'amber' ? 'amberOn' : 'amberOff');
  });

  document.addEventListener('keydown', (e)=>{
    const k = e.key.toLowerCase();
    if(k==='g'){
      root.setAttribute('data-theme','green');
      if(toggle) toggle.checked=false;
      try { localStorage.setItem('vt.theme','green'); } catch (e) {}
      play('amberOff');
    }
    if(k==='a'){
      root.setAttribute('data-theme','amber');
      if(toggle) toggle.checked=true;
      try { localStorage.setItem('vt.theme','amber'); } catch (e) {}
      play('amberOn');
    }
  });
}

function initApp(){
  clock();
  loadPayloads();
  setupTabs();
  typeInEffect();
  keyboardShortcuts();
}

// Init
window.addEventListener('DOMContentLoaded', ()=>{
  try { setupTheme(); } catch (e) {}
  qs('#connectBtn')?.addEventListener('click', ()=>{
    play('connect');
    initApp();
    qs('#landing')?.classList.add('hidden');
    qs('#app')?.classList.remove('hidden');
  });
});
