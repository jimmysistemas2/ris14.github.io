/*
ARCHIVO: script.js

Controla:
1. Cambio de pestañas.
2. Menú responsive.
3. Carga automática de URL de Power BI.
*/

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");

/* Al hacer clic en un botón del menú, se abre su sección */
document.querySelectorAll(".menu-item").forEach(button => {
  button.addEventListener("click", () => {
    const sectionId = button.dataset.section;
    goToSection(sectionId);
  });
});

/* Muestra una sección y oculta las demás */
function goToSection(sectionId) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  document.querySelectorAll(".menu-item").forEach(button => {
    button.classList.remove("active");
  });

  const section = document.getElementById(sectionId);
  const activeButton = document.querySelector(`[data-section="${sectionId}"]`);

  if (section) section.classList.add("active");
  if (activeButton) activeButton.classList.add("active");

  sidebar.classList.remove("open");
  overlay.classList.remove("show");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Abrir menú móvil */
mobileMenuBtn.addEventListener("click", () => {
  sidebar.classList.add("open");
  overlay.classList.add("show");
});

/* Cerrar menú móvil */
overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});

/* Relación entre config.js e iframe */
const POWERBI_IFRAMES = {
  gestion: "pbi-gestion",
  fed: "pbi-fed",
  convenio: "pbi-convenio",
  curso: "pbi-curso",
  inmunizaciones: "pbi-inmunizaciones",
  materno: "pbi-materno",
  bucal: "pbi-bucal",
  mental: "pbi-mental",
  metaxenicas: "pbi-metaxenicas",
  urgencias: "pbi-urgencias",
  atenciones: "pbi-atenciones",
  ipress: "pbi-ipress",
  ups: "pbi-ups",
  rrhh: "pbi-rrhh",
  calidad: "pbi-calidad",
  reportes: "pbi-reportes"
};

/* Carga las URL de Power BI */
function loadPowerBiUrls() {
  Object.keys(POWERBI_IFRAMES).forEach(key => {
    const iframe = document.getElementById(POWERBI_IFRAMES[key]);
    const url = POWERBI_URLS[key];

    if (!iframe) return;

    if (url && url.trim() !== "") {
      iframe.src = url;
    } else {
      iframe.srcdoc = `
        <html>
          <body style="
            margin:0;
            height:100vh;
            display:grid;
            place-items:center;
            background:#f7fbff;
            color:#005b96;
            font-family:Arial;
            text-align:center;">
            <div>
              <h2>Reporte pendiente</h2>
              <p>Coloque la URL en config.js</p>
              <small>Clave: ${key}</small>
            </div>
          </body>
        </html>`;
    }
  });
}

loadPowerBiUrls();
