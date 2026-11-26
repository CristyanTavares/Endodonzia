(function () {
  var STORAGE_KEY = "endodonzia_gdpr_consent_v1";
  var PIXEL_ID = "1390555636571453";
  var pixelLoaded = false;
  var analyticsLoaded = false;

  function getStoredConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (typeof parsed === "object" && parsed !== null && typeof parsed.marketing === "boolean") {
        return parsed;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(analytics, marketing) {
    var payload = {
      necessary: true,
      analytics: !!analytics,
      marketing: !!marketing,
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {}
    applyConsent(payload);
    hideBanner();
  }

  function loadMetaPixel() {
    if (pixelLoaded) return;
    pixelLoaded = true;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");

    var cfg = window.__ENDODONZIA_PIXEL_CONFIG;
    if (cfg && Array.isArray(cfg.extraEvents)) {
      cfg.extraEvents.forEach(function (ev) {
        if (ev && ev.name) {
          window.fbq("track", ev.name, ev.params || {});
        }
      });
    }
  }

  function loadVercelAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    window.va = window.va || function () {
      (window.vaq = window.vaq || []).push(arguments);
    };
    var s = document.createElement("script");
    s.defer = true;
    s.src = "/_vercel/insights/script.js";
    document.head.appendChild(s);
  }

  function applyConsent(consent) {
    if (!consent) return;
    if (consent.analytics) {
      loadVercelAnalytics();
    }
    if (consent.marketing) {
      loadMetaPixel();
    }
  }

  function injectStyles() {
    if (document.getElementById("gdpr-banner-styles")) return;
    var style = document.createElement("style");
    style.id = "gdpr-banner-styles";
    style.textContent = [
      ".gdpr-banner{position:fixed;bottom:16px;left:16px;right:16px;z-index:99999;max-width:780px;margin:0 auto;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;border-radius:16px;box-shadow:0 20px 50px rgba(15,23,42,0.22);padding:20px 22px;font-family:'Inter',system-ui,-apple-system,sans-serif;font-size:13px;line-height:1.5;display:none;}",
      ".gdpr-banner.is-open{display:block;}",
      ".gdpr-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}",
      ".gdpr-title{margin:0;font-size:15px;font-weight:800;color:#0f172a;}",
      ".gdpr-close{background:transparent;border:1px solid #e2e8f0;color:#475569;border-radius:8px;width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;line-height:1;flex-shrink:0;}",
      ".gdpr-close:hover{background:#f1f5f9;color:#0f172a;}",
      ".gdpr-text{margin:8px 0 0;color:#334155;font-size:12.5px;}",
      ".gdpr-link{color:#0f766e;font-weight:600;text-decoration:underline;cursor:pointer;background:none;border:none;padding:0;font:inherit;}",
      ".gdpr-prefs{margin-top:14px;padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;display:none;gap:10px;flex-direction:column;}",
      ".gdpr-prefs.is-open{display:flex;}",
      ".gdpr-pref-row{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}",
      ".gdpr-pref-label{font-weight:700;color:#0f172a;font-size:12.5px;}",
      ".gdpr-pref-desc{color:#475569;font-size:11.5px;margin-top:2px;}",
      ".gdpr-actions{margin-top:14px;display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;}",
      ".gdpr-btn{border-radius:10px;padding:10px 15px;font-size:12.5px;font-weight:700;cursor:pointer;border:1px solid transparent;transition:all .15s ease;flex:1 1 auto;text-align:center;}",
      "@media (min-width:640px){.gdpr-btn{flex:0 0 auto;}}",
      ".gdpr-btn-reject{background:#f1f5f9;color:#0f172a;border-color:#cbd5e1;}",
      ".gdpr-btn-reject:hover{background:#e2e8f0;}",
      ".gdpr-btn-custom{background:#ffffff;color:#0f172a;border-color:#94a3b8;}",
      ".gdpr-btn-custom:hover{background:#f8fafc;}",
      ".gdpr-btn-accept{background:#008757;color:#ffffff;border-color:#008757;}",
      ".gdpr-btn-accept:hover{background:#007048;}",
      ".gdpr-modal-backdrop{position:fixed;inset:0;z-index:100000;background:rgba(15,23,42,0.62);display:none;align-items:center;justify-content:center;padding:16px;}",
      ".gdpr-modal-backdrop.is-open{display:flex;}",
      ".gdpr-modal{background:#ffffff;color:#0f172a;border-radius:16px;max-width:680px;width:100%;max-height:86vh;overflow-y:auto;padding:24px;box-shadow:0 24px 60px rgba(0,0,0,0.3);font-family:'Inter',system-ui,-apple-system,sans-serif;font-size:13px;line-height:1.6;}",
      ".gdpr-modal h2{margin:0 0 12px;font-size:18px;font-weight:800;color:#0f766e;}",
      ".gdpr-modal h3{margin:16px 0 6px;font-size:14px;font-weight:700;color:#0f172a;}",
      ".gdpr-modal p,.gdpr-modal ul{margin:0 0 8px;color:#334155;}",
      ".gdpr-modal ul{padding-left:18px;list-style:disc;}"
    ].join("");
    document.head.appendChild(style);
  }

  function buildUI() {
    if (document.getElementById("gdpr-cookie-banner")) return;
    injectStyles();

    var banner = document.createElement("div");
    banner.id = "gdpr-cookie-banner";
    banner.className = "gdpr-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-modal", "false");
    banner.setAttribute("aria-label", "Preferenze sui cookie e privacy GDPR");

    banner.innerHTML =
      '<div class="gdpr-header">' +
        '<p class="gdpr-title">Informativa Cookie e Privacy (GDPR)</p>' +
        '<button type="button" class="gdpr-close" id="gdpr-btn-close" aria-label="Chiudi e mantieni solo i cookie necessari" title="Chiudi e continua senza cookie non necessari">&times;</button>' +
      '</div>' +
      '<p class="gdpr-text">' +
        'Utilizziamo cookie tecnici necessari per il funzionamento del sito e, previo tuo consenso, cookie analitici e di marketing (Meta Pixel) per migliorare il servizio e misurare le campagne. ' +
        'Chiudendo questo avviso o cliccando su «Rifiuta non necessari» verranno attivati solo i cookie tecnici. ' +
        '<button type="button" class="gdpr-link" id="gdpr-open-policy-inline">Leggi Privacy &amp; Cookie Policy</button>.' +
      '</p>' +
      '<div class="gdpr-prefs" id="gdpr-prefs-panel">' +
        '<div class="gdpr-pref-row">' +
          '<div>' +
            '<div class="gdpr-pref-label">Cookie Tecnici e Necessari (Sempre attivi)</div>' +
            '<div class="gdpr-pref-desc">Indispensabili per la navigazione, il salvataggio delle preferenze e il reindirizzamento sicuro al checkout.</div>' +
          '</div>' +
          '<input type="checkbox" checked disabled aria-label="Cookie tecnici sempre attivi" />' +
        '</div>' +
        '<div class="gdpr-pref-row">' +
          '<div>' +
            '<div class="gdpr-pref-label">Cookie Statistici / Analitici</div>' +
            '<div class="gdpr-pref-desc">Misurazione aggregata delle visite alle pagine (Vercel Web Analytics).</div>' +
          '</div>' +
          '<input type="checkbox" id="gdpr-toggle-analytics" aria-label="Abilita cookie statistici" />' +
        '</div>' +
        '<div class="gdpr-pref-row">' +
          '<div>' +
            '<div class="gdpr-pref-label">Cookie di Marketing (Meta Pixel)</div>' +
            '<div class="gdpr-pref-desc">Utilizzati per misurare l’efficacia degli annunci su piattaforme Meta solo con il tuo consenso esplicito.</div>' +
          '</div>' +
          '<input type="checkbox" id="gdpr-toggle-marketing" aria-label="Abilita cookie di marketing" />' +
        '</div>' +
      '</div>' +
      '<div class="gdpr-actions">' +
        '<button type="button" class="gdpr-btn gdpr-btn-reject" id="gdpr-btn-reject">Rifiuta non necessari</button>' +
        '<button type="button" class="gdpr-btn gdpr-btn-custom" id="gdpr-btn-custom">Personalizza</button>' +
        '<button type="button" class="gdpr-btn gdpr-btn-accept" id="gdpr-btn-accept">Accetta tutti</button>' +
      '</div>';

    document.body.appendChild(banner);

    var modal = document.createElement("div");
    modal.id = "gdpr-policy-modal";
    modal.className = "gdpr-modal-backdrop";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Privacy Policy, Cookie Policy e Garanzia");
    modal.innerHTML =
      '<div class="gdpr-modal">' +
        '<div class="gdpr-header">' +
          '<h2>Privacy, Cookie Policy (GDPR) &amp; Garanzia 14 Giorni</h2>' +
          '<button type="button" class="gdpr-close" id="gdpr-modal-close" aria-label="Chiudi informativa">&times;</button>' +
        '</div>' +
        '<h3>1. Titolare e Trattamento dei Dati (Reg. UE 2016/679 - GDPR)</h3>' +
        '<p>I dati personali forniti volontariamente al momento dell’acquisto (es. nome e indirizzo email per la consegna dei file digitali) sono trattati esclusivamente per l’evasione dell’ordine, l’assistenza clienti e gli adempimenti di legge, nel pieno rispetto del Regolamento Europeo 2016/679 (GDPR) e del Codice Privacy italiano.</p>' +
        '<h3>2. Pagamenti Sicuri</h3>' +
        '<p>I pagamenti sono elaborati tramite piattaforma certificata Hotmart, che supporta PayPal, Apple Pay e carte di credito/debito su connessione cifrata SSL/TLS. Il sito non memorizza né ha accesso diretto ai dati della tua carta o del tuo conto.</p>' +
        '<h3>3. Tipologie di Cookie Utilizzati</h3>' +
        '<ul>' +
          '<li><strong>Cookie tecnici necessari:</strong> essenziali per memorizzare la scelta sul consenso e preservare i parametri tecnici di navigazione verso il checkout. Non richiedono consenso preventivo.</li>' +
          '<li><strong>Cookie analitici (su consenso):</strong> statistiche aggregate sulle visite.</li>' +
          '<li><strong>Cookie di marketing (su consenso):</strong> Meta Pixel per l’attribuzione delle campagne pubblicitarie. Puoi accettare, rifiutare o revocare il consenso in qualsiasi momento tramite il link «Gestisci preferenze cookie» nel footer.</li>' +
        '</ul>' +
        '<h3>4. Garanzia e Diritto di Recesso (14 Giorni)</h3>' +
        '<p>Ai sensi del Codice del Consumo (D.Lgs. 206/2005) e della nostra politica di trasparenza commerciale (Direttiva Omnibus), l’acquisto è coperto da una garanzia soddisfatti o rimborsati di <strong>14 giorni</strong> dalla data d’ordine, richiedibile direttamente tramite la piattaforma di pagamento Hotmart o contattando il supporto.</p>' +
        '<h3>5. Diritti dell’Interessato</h3>' +
        '<p>In conformità agli artt. 15–22 del GDPR, hai diritto di chiedere l’accesso, la rettifica, la cancellazione, la limitazione o l’opposizione al trattamento dei dati e di revocare il consenso prestato in ogni momento.</p>' +
        '<div style="margin-top:16px;text-align:right;">' +
          '<button type="button" class="gdpr-btn gdpr-btn-accept" id="gdpr-modal-ok">Chiudi</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(modal);

    var prefsOpen = false;
    var prefsPanel = document.getElementById("gdpr-prefs-panel");
    var customBtn = document.getElementById("gdpr-btn-custom");
    var analyticsToggle = document.getElementById("gdpr-toggle-analytics");
    var marketingToggle = document.getElementById("gdpr-toggle-marketing");

    var existing = getStoredConsent();
    if (existing) {
      analyticsToggle.checked = !!existing.analytics;
      marketingToggle.checked = !!existing.marketing;
    }

    customBtn.addEventListener("click", function () {
      if (!prefsOpen) {
        prefsOpen = true;
        prefsPanel.classList.add("is-open");
        customBtn.textContent = "Salva preferenze";
      } else {
        saveConsent(analyticsToggle.checked, marketingToggle.checked);
      }
    });

    document.getElementById("gdpr-btn-accept").addEventListener("click", function () {
      analyticsToggle.checked = true;
      marketingToggle.checked = true;
      saveConsent(true, true);
    });

    document.getElementById("gdpr-btn-reject").addEventListener("click", function () {
      analyticsToggle.checked = false;
      marketingToggle.checked = false;
      saveConsent(false, false);
    });

    document.getElementById("gdpr-btn-close").addEventListener("click", function () {
      // Conformità Garante Privacy: la chiusura con X mantiene i soli cookie tecnici necessari
      analyticsToggle.checked = false;
      marketingToggle.checked = false;
      saveConsent(false, false);
    });

    document.getElementById("gdpr-open-policy-inline").addEventListener("click", openPrivacyModal);
    document.getElementById("gdpr-modal-close").addEventListener("click", closePrivacyModal);
    document.getElementById("gdpr-modal-ok").addEventListener("click", closePrivacyModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closePrivacyModal();
    });
  }

  function showBanner(openPrefs) {
    buildUI();
    var banner = document.getElementById("gdpr-cookie-banner");
    var prefsPanel = document.getElementById("gdpr-prefs-panel");
    var customBtn = document.getElementById("gdpr-btn-custom");
    if (banner) banner.classList.add("is-open");
    if (openPrefs && prefsPanel && customBtn) {
      prefsPanel.classList.add("is-open");
      customBtn.textContent = "Salva preferenze";
    }
  }

  function hideBanner() {
    var banner = document.getElementById("gdpr-cookie-banner");
    if (banner) banner.classList.remove("is-open");
  }

  function openPrivacyModal() {
    buildUI();
    var modal = document.getElementById("gdpr-policy-modal");
    if (modal) modal.classList.add("is-open");
  }

  function closePrivacyModal() {
    var modal = document.getElementById("gdpr-policy-modal");
    if (modal) modal.classList.remove("is-open");
  }

  window.openCookiePreferences = function () {
    showBanner(true);
  };
  window.openPrivacyModal = openPrivacyModal;

  function init() {
    var consent = getStoredConsent();
    if (consent) {
      applyConsent(consent);
    } else {
      showBanner(false);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
