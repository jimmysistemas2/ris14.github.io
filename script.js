
document.getElementById('ipress').textContent = DASHBOARD_CONFIG.ipress;
document.getElementById('population').textContent = DASHBOARD_CONFIG.population;

document.getElementById('ipress-grid').innerHTML =
DASHBOARD_CONFIG.establecimientos.map(x=>`
  <div class="ipress-card">
    <i class="fa-solid fa-hospital"></i>
    <strong>${x}</strong>
    <small>RIS Ate</small>
  </div>
`).join('');
