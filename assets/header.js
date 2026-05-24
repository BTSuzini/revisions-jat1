(function () {
  const header = document.createElement('header');
  header.className = 'clay-header';

  header.innerHTML = `
    <div class="clay-header__inner">
      <img 
        src="assets/img/blason-suzini.png" 
        alt="Tennis Suzini" 
        class="clay-header__logo"
      >

      <div class="clay-header__title">
        Révisions JAT1
      </div>

      <img 
        src="assets/img/logo-lg.png" 
        alt="Arbitrage" 
        class="clay-header__logo"
      >
    </div>
  `;

  document.body.prepend(header);
})();
