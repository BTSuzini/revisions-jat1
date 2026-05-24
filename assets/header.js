(function () {

  /* Couleur navigateur / iOS */
  const metaTheme = document.createElement('meta');
  metaTheme.name = 'theme-color';
  metaTheme.content = '#c85a1e';
  document.head.appendChild(metaTheme);

  const metaApple1 = document.createElement('meta');
  metaApple1.name = 'apple-mobile-web-app-capable';
  metaApple1.content = 'yes';
  document.head.appendChild(metaApple1);

  const metaApple2 = document.createElement('meta');
  metaApple2.name = 'apple-mobile-web-app-status-bar-style';
  metaApple2.content = 'black-translucent';
  document.head.appendChild(metaApple2);

  /* Header */
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
