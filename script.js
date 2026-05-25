/*
script.js
Función:
- Controla la navegación por pestañas.
- Inserta automáticamente las URLs de Power BI definidas en config.js.
*/

document.querySelectorAll(".menu-item").forEach(button => {
  button.addEventListener("click", () => {
    const sectionId = button.dataset.section;
    goToSection(sectionId);
  });
});

function goToSection(sectionId) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  document.querySelectorAll(".menu-item").forEach(item => {
    item.classList.remove("active");
  });

  const target = document.getElementById(sectionId);
  const menu = document.querySelector(`[data-section="${sectionId}"]`);

  if (target) target.classList.add("active");
  if (menu) menu.classList.add("active");
}

function loadPowerBiReports() {
  const mapping = {
    produccion: "powerbi-produccion",
    ipress: "powerbi-ipress",
    ups: "powerbi-ups",
    rrhh: "powerbi-rrhh",
    calidad: "powerbi-calidad"
  };

  Object.keys(mapping).forEach(key => {
    const iframe = document.getElementById(mapping[key]);
    if (!iframe) return;

    const url = POWERBI_URLS[key];

    if (url && url.trim() !== "") {
      iframe.src = url;
    } else {
      iframe.srcdoc = `
        <html>
          <body style="margin:0;height:100vh;display:grid;place-items:center;background:#06111d;color:white;font-family:Arial;text-align:center;">
            <div>
              <h2>Reporte Power BI pendiente</h2>
              <p>Coloque la URL del reporte en el archivo config.js</p>
            </div>
          </body>
        </html>`;
    }
  });
}

loadPowerBiReports();
