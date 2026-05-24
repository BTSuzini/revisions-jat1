(function () {

  const header = document.createElement('header');
  header.className = 'site-topbar';

  header.innerHTML = `
    
    <div class="topbar-overlay"></div>

    <div class="topbar-inner">

      <img 
        src="assets/img/blason-suzini.png"
        alt="Tennis Suzini"
        class="topbar-logo"
      >

      <div class="topbar-center">

        <div class="topbar-line"></div>

        <div class="topbar-title">
          Révisions JAT1
        </div>

        <div class="topbar-line"></div>

      </div>

      <img 
        src="assets/img/logo-lg.png"
        alt="Arbitrage"
        class="topbar-logo"
      >

    </div>

  `;

  document.body.prepend(header);

})();
