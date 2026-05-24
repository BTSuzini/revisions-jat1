(function () {
  const header = document.createElement('header');
  header.className = 'site-header';

  header.innerHTML = `
    <div class="site-header__inner">
      <img class="site-header__logo site-header__logo--left" src="assets/img/blason-suzini.png" alt="Tennis Suzini">
      
      <div class="site-header__center">
        <div class="site-header__title">TERRE BATTUE</div>
        <div class="site-header__subtitle">
          <span></span>
          RÉVISIONS JAT1
          <span></span>
        </div>
      </div>

      <img class="site-header__logo site-header__logo--right" src="assets/img/logo-lg.png" alt="Ligue Guyane arbitrage">
    </div>
  `;

  document.body.prepend(header);
})();
