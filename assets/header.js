(function () {
  const header = document.createElement('header');
  header.className = 'site-topbar';

  header.innerHTML = `
    <img 
      src="assets/img/blason-suzini.png" 
      alt="Tennis Suzini" 
      class="topbar-logo"
    >

    <div class="topbar-title">
      <strong>Révisions JAT1</strong>
      <span>Terre battue</span>
    </div>

    <img 
      src="assets/img/logo-lg.png" 
      alt="Ligue Guyane Arbitrage" 
      class="topbar-logo"
    >
  `;

  document.body.prepend(header);
})();
