/*
==========================================================
ARCHIVO: script.js
==========================================================
Este archivo controla la parte dinámica del portal.

Funciones principales:
1. Cambiar de pestaña.
2. Abrir/cerrar menú en celular.
3. Insertar automáticamente las URL de Power BI.
*/

// Seleccionamos elementos del HTML
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");

// Escucha los clics de todos los botones del menú
document.querySelectorAll(".menu-item").forEach(button => {
  button.addEventListener("click", () => {
    const sectionId = button.dataset.section;
    goToSection(sectionId);
  });
});

// Esta función cambia de sección
function goToSection(sectionId) {
  // Oculta todas las secciones
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  // Quita la clase active de todos los botones
  document.querySelectorAll(".menu-item").forEach(button => {
    button.classList.remove("active");
  });

  // Activa la sección seleccionada
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.add("active");
  }

  // Activa el botón correspondiente del menú
  const activeButton = document.querySelector(`[data-section="${sectionId}"]`);
  if (activeButton) {
    activeButton.classList.add("active");
  }

  // Cierra menú móvil después de seleccionar
  sidebar.classList.remove("open");
  overlay.classList.remove("show");

  // Lleva al usuario arriba de la pantalla
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Abre menú en celular
mobileMenuBtn.addEventListener("click", () => {
  sidebar.classList.add("open");
  overlay.classList.add("show");
});

// Cierra menú cuando se hace clic fuera
overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});

// Mapa entre secciones e iframe
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

// Carga las URL de Power BI desde config.js
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
              <h2>Reporte Power BI pendiente</h2>
              <p>Coloque la URL en config.js</p>
              <small>Clave: ${key}</small>
            </div>
          </body>
        </html>`;
    }
  });
}

// Ejecutamos la carga al iniciar
loadPowerBiUrls();
