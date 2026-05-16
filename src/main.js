/* ── Page routing ── */ /*
  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active-nav'));
    const pg = document.getElementById('page-' + id);
    if (pg) { pg.classList.add('active'); window.scrollTo(0,0); }
    const nav = document.getElementById('nav-' + id);
    if (nav) nav.classList.add('active-nav');
    // Close mobile nav
    const navCollapse = document.getElementById('navMain');
    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
    if (bsCollapse) bsCollapse.hide();
  }*/

  /* ── Cart ── */
  let cart = [];
  function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
    showToast('✦ ' + name + ' wurde hinzugefügt.');
  }
  function updateCart() {
    const count = document.getElementById('cart-count');
    count.textContent = cart.length;
    const items = document.getElementById('cart-items');
    if (cart.length === 0) {
      items.innerHTML = '<p style="color:var(--sand-dk);font-style:italic;">Ihr Warenkorb ist leer.</p>';
      document.getElementById('cart-total').textContent = '€ 0,00';
      return;
    }
    let html = '<ul class="list-unstyled">';
    let total = 0;
    cart.forEach((item, i) => {
      const val = parseFloat(item.price.replace('€ ','').replace(',','.'));
      total += val;
      html += `<li class="d-flex justify-content-between align-items-center py-2" style="border-bottom:1px solid var(--sand-dk);">
        <span style="font-family:'Cinzel',serif;font-size:.85rem;">${item.name}</span>
        <span>${item.price}
          <button class="btn btn-sm ms-2" style="color:var(--red-acc);font-size:.7rem;" onclick="removeFromCart(${i})" aria-label="${item.name} entfernen">✕</button>
        </span>
      </li>`;
    });
    html += '</ul>';
    items.innerHTML = html;
    document.getElementById('cart-total').textContent = '€ ' + total.toFixed(2).replace('.',',');
  }
  function removeFromCart(i) {
    cart.splice(i, 1);
    updateCart();
  }
  function mockCheckout() {
    if (cart.length === 0) { showToast('Warenkorb ist leer.'); return; }
    showToast('✦ Kasse (Demo): Vielen Dank! In der Vollversion würde hier die Zahlung erfolgen.');
    cart = [];
    updateCart();
  }

  /* ── Toast ── */
  function showToast(msg) {
    document.getElementById('toast-msg').textContent = msg;
    const el = document.getElementById('main-toast');
    const toast = new bootstrap.Toast(el, { delay: 3500 });
    toast.show();
  }

  /* ── Cookie banner ── */
  function hideCookieBanner() {
    document.getElementById('cookie-banner').style.display = 'none';
  }
  function acceptCookies() {
    hideCookieBanner();
    showToast('Alle Cookies akzeptiert. Danke!');
    localStorage.setItem('sg_consent','all');
  }
  function rejectCookies() {
    hideCookieBanner();
    showToast('Nur notwendige Cookies aktiviert.');
    localStorage.setItem('sg_consent','necessary');
  }
  // Check if consent already given
  if (localStorage.getItem('sg_consent')) {
    hideCookieBanner();
  }

  /* ── Contact form ── */
  function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const check = document.getElementById('privacy-check').checked;
    if (!name || !email || !check) {
      showToast('Bitte alle Pflichtfelder ausfüllen.');
      return;
    }
    showToast('✦ Demo: Nachricht von ' + name + ' wurde gesendet. (Keine echten Daten übertragen.)');
    e.target.reset();
  }