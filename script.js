
document.querySelectorAll(".menu-item").forEach(btn=>{

  btn.addEventListener("click",()=>{

    const section = btn.dataset.section;

    goToSection(section);

  });

});

function goToSection(sectionId){

  document.querySelectorAll(".section").forEach(section=>{

    section.classList.remove("active");

  });

  document.querySelectorAll(".menu-item").forEach(btn=>{

    btn.classList.remove("active");

  });

  const target = document.getElementById(sectionId);

  if(target){

    target.classList.add("active");

  }

  const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);

  if(activeBtn){

    activeBtn.classList.add("active");

  }

}

const mapping = {
  gestion:"pbi-gestion",
  fed:"pbi-fed",
  convenio:"pbi-convenio",
  curso:"pbi-curso",
  inmunizaciones:"pbi-inmunizaciones",
  mental:"pbi-mental",
  atenciones:"pbi-atenciones",
  ipress:"pbi-ipress",
  ups:"pbi-ups",
  rrhh:"pbi-rrhh",
  calidad:"pbi-calidad"
};

Object.keys(mapping).forEach(key=>{

  const iframe = document.getElementById(mapping[key]);

  if(!iframe) return;

  const url = POWERBI_URLS[key];

  if(url && url.trim() !== ""){

    iframe.src = url;

  }else{

    iframe.srcdoc = `
    <html>
    <body style="
    margin:0;
    display:grid;
    place-items:center;
    height:100vh;
    background:#f6fbff;
    font-family:Arial;
    color:#1a4c70;
    text-align:center;">
    <div>
      <h2>Power BI pendiente</h2>
      <p>Pegue la URL en config.js</p>
    </div>
    </body>
    </html>
    `;

  }

});
