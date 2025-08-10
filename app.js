/* Vault-Tec Interface — Abri 202 */
/* Tabs, Password gating, Type-in effect, Terminal extras */

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
  // Fill <pre> blocks with template payloads
  const fill = (idTpl, idOut) => { qs(idOut).textContent = qs(idTpl).textContent.trim(); };
  fill('#tpl-lettre', '#content-citoyens');
  fill('#tpl-fiche', '#content-fiche');
  fill('#tpl-suph', '#content-suph');
  fill('#tpl-supa', '#content-supa');
  fill('#tpl-contexte', '#content-contexte');
  fill('#tpl-mj', '#content-mj');
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
        showPane(id);
        return;
      }
      const pass = btn.dataset.pass;
      const key = `tab-${id}`;
      if(haveAccess(key)){
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
            vaultBeep(true);
            showPane(id);
          }else{
            vaultBeep(false);
            // small shake
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
  // Subtle intro type glow on first visible pane
  const pane = qs('.pane.is-visible pre');
  if(!pane) return;
  const text = pane.textContent;
  pane.textContent = '';
  let i = 0;
  const step = () => {
    const chunk = text.slice(i, i+ Math.max(3, Math.floor(Math.random()*8)));
    pane.textContent += chunk;
    i += chunk.length;
    if(i < text.length) {
      setTimeout(step, 8 + Math.random()*30);
    }
  };
  step();
}

function vaultBeep(ok=true){
  // tiny webaudio beep for feedback (no external assets)
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = ok ? 'triangle' : 'square';
    o.frequency.value = ok ? 820 : 180;
    g.gain.value = 0.0015;
    o.connect(g); g.connect(ctx.destination);
    o.start();
    setTimeout(()=>{ o.stop(); ctx.close(); }, 120);
  }catch(e){}
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
      vaultBeep(true);
    }
  });
}

// Init
window.addEventListener('DOMContentLoaded', ()=>{
  clock();
  loadPayloads();
  setupTabs();
  typeInEffect();
  keyboardShortcuts();
});
