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

      passModal.addEventListener('close', function handler(){
        passModal.removeEventListener('close', handler);
        if(passModal.returnValue === 'ok'){
          const entered = passInput.value.trim();
          if(entered === pass){
            grantAccess(key);
            soundFX('ok');
            showPane(id);
          }else{
            soundFX('deny');
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
  const saved = localStorage.getItem('vt.theme') || 'green';
  root.setAttribute('data-theme', saved);
  if(saved === 'amber' && toggle) toggle.checked = true;

  toggle?.addEventListener('change', ()=>{
    const theme = toggle.checked ? 'amber' : 'green';
    root.setAttribute('data-theme', theme);
    localStorage.setItem('vt.theme', theme);
    soundFX('open');
  });

  document.addEventListener('keydown', (e)=>{
    if(e.key.toLowerCase()==='g'){ root.setAttribute('data-theme','green'); if(toggle) toggle.checked=false; localStorage.setItem('vt.theme','green'); soundFX('open'); }
    if(e.key.toLowerCase()==='a'){ root.setAttribute('data-theme','amber'); if(toggle) toggle.checked=true;  localStorage.setItem('vt.theme','amber'); soundFX('open'); }
  });
}

// Init
window.addEventListener('DOMContentLoaded', ()=>{
  clock();
  loadPayloads();
  setupTheme();
  setupTabs();
  typeInEffect();
  keyboardShortcuts();
  soundFX('open'); // boot
});
