// waitlist.js — modal + form-to-email submission for "coming soon" CTAs.
//
// Endpoint: defaults to FormSubmit.co (no signup needed, but requires confirming
// the destination email ONCE on first submission — they email you a link to click).
// Swap WAITLIST_ENDPOINT for Web3Forms, Formspree, or your own URL.
//
// Submit POSTs JSON: { email, product, source, _subject }.

const WAITLIST_ENDPOINT = 'https://formsubmit.co/ajax/hello@baryon.ai';

(() => {
  const modal = document.getElementById('waitlist-modal');
  if (!modal) return;
  const modalForm = document.getElementById('waitlist-form');
  const successBox = modal.querySelector('.modal-success');
  const errorBox   = modal.querySelector('.modal-error');
  const emailIn    = modalForm.querySelector('input[type=email]');
  const submitBtn  = modalForm.querySelector('button[type=submit]');

  // currentProduct + lastEmail kept in closure so we can re-apply
  // them to dynamically-replaced .modal-product / .ms-email nodes after lang toggle.
  let currentProduct = '';
  let lastEmail = '';

  function refreshDynamic() {
    modal.querySelectorAll('.modal-product').forEach((s) => {
      s.textContent = currentProduct || (document.documentElement.lang === 'ko' ? '이 제품' : 'this product');
    });
    if (lastEmail) {
      modal.querySelectorAll('.ms-email').forEach((e) => { e.textContent = lastEmail; });
    }
  }

  function open(product) {
    currentProduct = product || '';
    modalForm.querySelector('[name="product"]').value = currentProduct;
    refreshDynamic();
    modalForm.hidden = false;
    successBox.hidden = true;
    errorBox.hidden = true;
    submitBtn.disabled = false;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => emailIn.focus(), 220);
  }

  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // intercept waitlist links
  document.querySelectorAll('[data-waitlist]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      open(a.dataset.waitlist);
    });
  });

  // close on backdrop, X, ESC
  modal.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });

  // re-apply dynamic bits after i18n swap
  document.addEventListener('baryon:langchanged', refreshDynamic);

  // submit
  modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(modalForm);
    const email   = (fd.get('email')   || '').toString().trim();
    const product = (fd.get('product') || '').toString();
    if (!email) return;

    const origLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '…';

    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email,
          product,
          source: 'baryon.ai/waitlist',
          lang: document.documentElement.lang || 'en',
          _subject: `[Baryon waitlist] ${product || 'general'}`
        })
      });
      if (!res.ok) throw new Error('http ' + res.status);
      lastEmail = email;
      modalForm.hidden = true;
      successBox.hidden = false;
      refreshDynamic();
    } catch (err) {
      console.warn('waitlist submission failed', err);
      errorBox.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = origLabel;
    }
  });
})();
