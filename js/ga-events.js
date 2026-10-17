/* SendCleared marketing site: Google Analytics 4 event tracking.
   Loaded on every page after the GA tag. Edit here once, applies everywhere.

   Events sent:
   - signup_click  any link to app.sendcleared.com/signup
   - login_click   any link to app.sendcleared.com/login
   Parameters: cta_location, cta_text, page_path, plan (only if the link has ?plan=) */
(function () {
  if (window.__scEventsLoaded) return;
  window.__scEventsLoaded = true;

  function send(name, params) {
    if (typeof window.gtag !== 'function') return;
    params.transport_type = 'beacon'; // delivers even while the page is navigating away
    window.gtag('event', name, params);
  }

  function where(a) {
    if (a.closest('.mobile-menu')) return 'mobile_menu';
    if (a.closest('nav')) return 'nav';
    if (a.closest('footer')) return 'footer';
    if (a.closest('.cta-box')) return 'cta_box';
    var section = a.closest('section[id]');
    if (section) return section.id;
    if (a.closest('article')) return 'article';
    return 'page';
  }

  function planOf(href) {
    try {
      return new URL(href, location.href).searchParams.get('plan') || '';
    } catch (e) {
      return '';
    }
  }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';

    var name = null;
    if (href.indexOf('app.sendcleared.com/signup') !== -1) name = 'signup_click';
    else if (href.indexOf('app.sendcleared.com/login') !== -1) name = 'login_click';
    if (!name) return;

    var params = {
      cta_location: where(a),
      cta_text: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60),
      page_path: location.pathname
    };
    var plan = planOf(href);
    if (plan) params.plan = plan;
    send(name, params);
  }, true);
})();
