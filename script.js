const sectionContainer = document.getElementById('powerSections');
const overlay = document.getElementById('overlay');
const sidebar = document.getElementById('sidebar');
const mobileMenu = document.getElementById('mobileMenu');

function createPowerSections(){
  STRATEGIES.forEach(item=>{
    const section = document.createElement('section');
    section.className = 'section';
    section.id = item.id;
    section.innerHTML = `
      <div class="powerbi-header">
        <h2>${item.title}</h2>
        <p>${item.group} · Módulo listo para insertar reporte Power BI.</p>
      </div>
      <div class="powerbi-container">
        <iframe id="pbi-${item.id}" title="Power BI ${item.title} RIS Ate"></iframe>
      </div>
    `;
    sectionContainer.appendChild(section);
  });
}

function goToSection(sectionId){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
  const section = document.getElementById(sectionId);
  const btn = document.querySelector(`[data-section="${sectionId}"]`);
  if(section) section.classList.add('active');
  if(btn) btn.classList.add('active');
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
  window.scrollTo({top:0,behavior:'smooth'});
}

function loadPowerBi(){
  STRATEGIES.forEach(item=>{
    const iframe = document.getElementById(`pbi-${item.id}`);
    if(!iframe) return;
    const url = POWERBI_URLS[item.id] || '';
    if(url.trim()){
      iframe.src = url;
    }else{
      iframe.srcdoc = `
        <html>
          <body style="margin:0;height:100vh;display:grid;place-items:center;background:#f7fbff;color:#005b96;font-family:Arial;text-align:center;">
            <div>
              <h2>${item.title}</h2>
              <p>Reporte Power BI pendiente</p>
              <small>Pegue la URL en config.js, clave: ${item.id}</small>
            </div>
          </body>
        </html>
      `;
    }
  });
}

function renderIpress(){
  const totalAt = IPRESS_DATA.reduce((a,b)=>a+(b.atenciones||0),0);
  const totalAd = IPRESS_DATA.reduce((a,b)=>a+(b.atendidos||0),0);
  document.getElementById('totalIpress').textContent = IPRESS_DATA.length;
  document.getElementById('totalAtenciones').textContent = totalAt.toLocaleString('es-PE');
  document.getElementById('totalAtendidos').textContent = totalAd.toLocaleString('es-PE');

  document.getElementById('ipressList').innerHTML = IPRESS_DATA.map(x=>`
    <div class="ipress-card">
      <strong>${x.nombre}</strong>
      <div class="ipress-metrics">
        <span>${(x.atenciones||0).toLocaleString('es-PE')} atenciones</span>
        <span>${(x.atendidos||0).toLocaleString('es-PE')} atendidos</span>
      </div>
    </div>
  `).join('');
}

document.querySelectorAll('.nav-item').forEach(btn=>{
  btn.addEventListener('click',()=>goToSection(btn.dataset.section));
});

mobileMenu.addEventListener('click',()=>{
  sidebar.classList.add('open');
  overlay.classList.add('show');
});

overlay.addEventListener('click',()=>{
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});

createPowerSections();
loadPowerBi();
renderIpress();
