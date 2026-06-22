const APP_DOWNLOAD_URL_FALLBACK = '';
const LANG_KEY = 'avo_landing_lang';

const firebaseConfig = {
  apiKey: 'AIzaSyCeK9ryIXq2hpviFw9EjnTvlcOUu4HySjo',
  authDomain: 'allesvorort.firebaseapp.com',
  projectId: 'allesvorort',
  storageBucket: 'allesvorort.firebasestorage.app',
  messagingSenderId: '288850872790',
  appId: '1:288850872790:web:0656ceecfa429e55027c77'
};

let db = null;
let appDownloadUrl = APP_DOWNLOAD_URL_FALLBACK;
let appVersionName = '';
let appVersionCode = '';

try {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  }
} catch (e) {
  console.warn('Firebase init failed', e);
}

const STRINGS = {
  de: {
    brand_kicker: 'Kostenlos in Paraguay',
    brand_title: 'Alles vor Ort',
    hero_badge: 'Kostenlos · Deutsch & Español',
    hero_headline: 'Die kostenlose App für Paraguay: suchen, filtern und sofort finden.',
    hero_text: 'Suche mit Filtern nach Regionen, entdecke Top-Beiträge, Angebote, Events, Firmen und Jobs und kontaktiere Anbieter direkt.',
    cta_download_follow: 'Google Play öffnen',
    cta_contact: 'Kontakt',
    chip_free: 'Kostenlos',
    chip_search: 'Suche & Filter',
    chip_categories: 'Kategorien',
    chip_regions: 'Regionen',
    chip_languages: 'Deutsch / Español',
    screen_top: 'Top · Highlights',
    screen_offers: 'Angebote',
    screen_events: 'Events',
    screen_companies: 'Firmen',
    screen_jobs: 'Jobs',
    features_eyebrow: 'Was die App kann',
    features_title: 'Kurz, verständlich und ohne Umwege',
    feature_search_title: 'Suche & Filter',
    feature_search_text: 'Finde Inhalte schnell nach Titel, Ort, Kategorie und Region.',
    feature_categories_title: 'Alle Kategorien',
    feature_categories_text: 'Top, Angebote, Events, Firmen und Jobs sind direkt erreichbar.',
    feature_region_title: 'Regionen in Paraguay',
    feature_region_text: 'Filtere nach Departamento und Stadt, damit du nur Relevantes siehst.',
    feature_contact_title: 'Direktkontakt',
    feature_contact_text: 'Rufe an, öffne WhatsApp, WhatsApp Business, Telegram, Maps oder die Webseite.',
    feature_favorites_title: 'Favoriten & Melden',
    feature_favorites_text: 'Speichere Einträge und melde Inhalte direkt in der App.',
    feature_free_title: 'Zweisprachig & kostenlos',
    feature_free_text: 'Die App läuft auf Deutsch und Spanisch und ist kostenlos nutzbar.',
    scope_eyebrow: 'Alles auf einen Blick',
    scope_title: 'Die wichtigsten Bereiche',
    scope_top: 'Top-Beiträge',
    scope_offers: 'Angebote',
    scope_events: 'Events',
    scope_companies: 'Firmen',
    scope_jobs: 'Jobs',
    scope_search: 'Suche & Filter',
    cta_eyebrow: 'Bereit für den Start',
    cta_title: 'Die App kurz erklärt',
    cta_copy: 'Alles vor Ort ist deine kostenlose App für Paraguay. Suche, filtere und finde Angebote, Events, Firmen und Jobs in deiner Region.',
    cta_more: 'Mehr erfahren',
    contact_eyebrow: 'Kontakt',
    contact_title: 'Fragen oder Interesse?',
    contact_text: 'Schreiben Sie uns kurz, wenn Sie Fragen zur App oder zur Zusammenarbeit haben.',
    contact_whatsapp: 'WhatsApp öffnen',
    contact_whatsapp_business: 'WhatsApp Business',
    contact_telegram: 'Telegram öffnen',
    contact_email: 'E-Mail senden',
    contact_form_eyebrow: 'Kontaktformular',
    contact_form_title: 'Nachricht senden',
    contact_form_intro: 'Nutzen Sie das Formular, wenn Sie direkt schreiben möchten.',
    contact_form_name: 'Name *',
    contact_form_email: 'E-Mail *',
    contact_form_phone: 'WhatsApp (Optional)',
    contact_form_message: 'Nachricht *',
    contact_form_human: 'Ich bin ein Mensch',
    contact_form_submit: 'Absenden',
    contact_form_success: 'Nachricht gesendet',
    contact_form_error_fields: 'Bitte alle Pflichtfelder (*) ausfüllen',
    contact_form_error_human: 'Bitte bestätigen Sie, dass Sie ein Mensch sind',
    contact_form_error_invalid_email: 'Bitte eine gültige E-Mail-Adresse eingeben',
    contact_form_sending: 'Wird gesendet…',
    contact_form_db_unavailable: 'Kontakt ist aktuell nicht verfügbar.',
    footer_contact: 'Kontakt',
    footer_imprint: 'Impressum',
    footer_privacy: 'Datenschutz',
    footer_sub: 'Kostenlos · Deutsch / Español · Paraguay',
    imprint_full_text: '<b>Anbieter:</b><br>E. H. (AvO)<br><br><b>Ansässig in:</b><br>Paraguay<br><br><b>Kontakt:</b><br>paseroeni@gmail.com<br><br><b>Hinweis:</b><br>Privat geführtes lokales Informations- und Verzeichnisangebot („AllesvorOrt“ / „todo por aqui“ / „AvO“).<br><br><b>Wichtiger behördlicher Haftungsausschluss:</b><br>Diese Web-App steht in keiner Verbindung zu einer staatlichen Stelle in Paraguay und wird von keiner Behörde betrieben oder beauftragt. Es handelt sich um ein rein privates, unabhängiges Softwareprojekt.',
    imprint_play_store_link: 'Im Play Store ansehen',
    privacy_full_text: '<b>1. Verantwortlicher und Kontakt</b><br>Verantwortlich für die Datenverarbeitung im Rahmen dieser App ist:<br>Name: E. H. (AvO)<br>E-Mail: paseroeni@gmail.com<br><br><b>Zweck der App:</b> Die App „AllesvorOrt“ (spanisch: „todo por aqui“, kurz: „AvO“) ist ein privat geführtes Branchen- und Informationsverzeichnis für Paraguay. Nutzer können Einträge (Firmen, Dienstleistungen, Jobs, Angebote, Events) suchen oder als Anbieter selbst inserieren.<br><br><b>2. Erhebung und Speicherung personenbezogener Daten</b><br><b>a) Daten von Inserenten/Anbietern</b><br>Wenn Sie ein Anbieter-Profil erstellen oder Inserate schalten, werden folgende Daten verarbeitet und im Verzeichnis für andere Nutzer sichtbar veröffentlicht:<br>- Name / Firmenname<br>- E-Mail-Adresse und Telefonnummer<br>- Standort / Region<br>- Hochgeladene Bilder und Beschreibungstexte<br><br><b>b) Firebase Authentication (Registrierung & Login)</b><br>Zur sicheren Anmeldung und Verwaltung der Anbieter-Konten nutzen wir Google Firebase Authentication. Hierbei wird Ihre E-Mail-Adresse und ein Passwort (verschlüsselt) verarbeitet, um Missbrauch zu verhindern und Ihr Konto zu schützen.<br><br><b>c) Werbung (Start.io)</b><br>Diese App bindet Werbebanner über die Plattform Start.io ein. Start.io verwendet pseudonyme Werbe-IDs (z. B. Advertising ID), um Anzeigen zu schalten und anonyme Analysen durchzuführen. Es werden keine direkt identifizierbaren Daten (wie Ihr Name oder Ihre E-Mail) an Werbenetzwerke weitergegeben.<br><br><b>d) Kontaktformular / E-Mail-Anfragen</b><br>Wenn Sie uns über das Formular kontaktieren, werden Ihre Angaben (E-Mail-Adresse, Name und Inhalt der Nachricht) zur Bearbeitung und Beantwortung der Anfrage gespeichert.<br><br><b>e) Analyse-Tools (Firebase Analytics)</b><br>Zur stetigen Verbesserung unserer App nutzen wir Google Firebase Analytics. Dabei werden anonymisierte Informationen über die Nutzung der App erfasst (z. B. welche Funktionen wie oft genutzt werden, Informationen über Abstürze oder die Dauer der Nutzung). Diese Daten dienen ausschließlich der Optimierung unserer App-Funktionen und der Fehlerbehebung. Es werden keine Klardaten (wie Ihr Name) an Google weitergegeben. Die Speicherung erfolgt anonymisiert.<br><br><b>3. App-Berechtigungen (Android Permissions)</b><br>Die App fordert beim Zugriff auf bestimmte Funktionen Berechtigungen an. Diese können Sie jederzeit in den Systemeinstellungen Ihres Geräts widerrufen:<br>- <b>Fotos/Medien/Speicher:</b> Erforderlich, damit Anbieter Bilder für Inserate, Firmenlogos oder Profilbilder hochladen können.<br>- <b>Telefon:</b> Ermöglicht es Nutzern, einen inserierten Anbieter direkt per Klick aus der App heraus anzurufen. Es werden keine Anruflisten ausgelesen.<br>- <b>Standort:</b> Wird ausschließlich zur manuellen Filterung der Regionen innerhalb der App genutzt. Es findet kein GPS-Tracking im Hintergrund statt.<br><br><b>4. Rechte der Nutzer (DSGVO)</b><br>Da die App im europäischen Raum abrufbar ist, haben Sie als Nutzer folgende Rechte bezüglich Ihrer Daten:<br>- Recht auf Auskunft, Berichtigung oder Einschränkung der Verarbeitung.<br>- Recht auf Widerruf erteilter Einwilligungen.<br>- Recht auf Datenübertragbarkeit.<br><br><b>5. Datenlöschung</b><br>Nutzer können die Löschung ihrer Daten jederzeit beantragen. Details finden Sie unter dem folgenden Link:',
    privacy_delete_link: 'Antrag auf Datenlöschung'
  },
  es: {
    brand_kicker: 'Gratis en Paraguay',
    brand_title: 'Alles vor Ort',
    hero_badge: 'Gratis · Alemán & Español',
    hero_headline: 'La app gratuita para Paraguay: busca, filtra y encuentra al instante.',
    hero_text: 'Busca con filtros por regiones, descubre destacados, ofertas, eventos, empresas y empleos, y contacta directamente con los proveedores.',
    cta_download_follow: 'Abrir en Google Play',
    cta_contact: 'Contacto',
    chip_free: 'Gratis',
    chip_search: 'Búsqueda y filtro',
    chip_categories: 'Categorías',
    chip_regions: 'Regiones',
    chip_languages: 'Alemán / Español',
    screen_top: 'Top · Destacados',
    screen_offers: 'Ofertas',
    screen_events: 'Eventos',
    screen_companies: 'Empresas',
    screen_jobs: 'Empleos',
    features_eyebrow: 'Lo que hace la app',
    features_title: 'Breve, clara y sin rodeos',
    feature_search_title: 'Búsqueda y filtro',
    feature_search_text: 'Encuentra contenido rápido por título, lugar, categoría y región.',
    feature_categories_title: 'Todas las categorías',
    feature_categories_text: 'Top, ofertas, eventos, empresas y empleos están a un clic.',
    feature_region_title: 'Regiones de Paraguay',
    feature_region_text: 'Filtra por departamento y ciudad para ver solo lo relevante.',
    feature_contact_title: 'Contacto directo',
    feature_contact_text: 'Llama, abre WhatsApp, WhatsApp Business, Telegram, Maps o la web.',
    feature_favorites_title: 'Favoritos y reportes',
    feature_favorites_text: 'Guarda entradas y reporta contenido directamente en la app.',
    feature_free_title: 'Bilingüe y gratis',
    feature_free_text: 'La app funciona en alemán y español, y es gratis.',
    scope_eyebrow: 'Todo de un vistazo',
    scope_title: 'Las áreas principales',
    scope_top: 'Entradas Top',
    scope_offers: 'Ofertas',
    scope_events: 'Eventos',
    scope_companies: 'Empresas',
    scope_jobs: 'Empleos',
    scope_search: 'Búsqueda y filtro',
    cta_eyebrow: 'Listo para empezar',
    cta_title: 'La app explicada en breve',
    cta_copy: 'Alles vor Ort es tu app gratuita para Paraguay. Busca, filtra y encuentra ofertas, eventos, empresas y empleos en tu región.',
    cta_more: 'Saber más',
    contact_eyebrow: 'Contacto',
    contact_title: '¿Preguntas o interés?',
    contact_text: 'Escríbanos si tiene preguntas sobre la app o una posible colaboración.',
    contact_whatsapp: 'Abrir WhatsApp',
    contact_whatsapp_business: 'WhatsApp Business',
    contact_telegram: 'Abrir Telegram',
    contact_email: 'Enviar correo',
    contact_form_eyebrow: 'Formulario de contacto',
    contact_form_title: 'Enviar mensaje',
    contact_form_intro: 'Use el formulario si desea escribirnos directamente.',
    contact_form_name: 'Nombre *',
    contact_form_email: 'Correo electrónico *',
    contact_form_phone: 'WhatsApp (Opcional)',
    contact_form_message: 'Mensaje *',
    contact_form_human: 'Soy un humano',
    contact_form_submit: 'Enviar',
    contact_form_success: 'Mensaje enviado',
    contact_form_error_fields: 'Por favor, complete todos los campos obligatorios (*)',
    contact_form_error_human: 'Por favor, confirme que es humano',
    contact_form_error_invalid_email: 'Por favor ingrese un correo electrónico válido',
    contact_form_sending: 'Enviando…',
    contact_form_db_unavailable: 'El contacto no está disponible en este momento.',
    footer_contact: 'Contacto',
    footer_imprint: 'Aviso legal',
    footer_privacy: 'Privacidad',
    footer_sub: 'Gratis · Alemán / Español · Paraguay',
    imprint_full_text: '<b>Proveedor:</b><br>E. H. (AvO)<br><br><b>Residente en:</b><br>Paraguay<br><br><b>Contacto:</b><br>paseroeni@gmail.com<br><br><b>Nota:</b><br>Oferta privada de información y directorio local („AllesvorOrt“ / „todo por aqui“ / „AvO“).<br><br><b>Descargo de responsabilidad:</b><br>Esta aplicación no tiene vinculación con ninguna entidad gubernamental en Paraguay y no está operada ni encargada por ninguna autoridad. Se trata de un proyecto de software puramente privado e independiente.',
    imprint_play_store_link: 'Ver en Play Store',
    privacy_full_text: '<b>1. Responsable y Contacto</b><br>El responsable del tratamiento de datos en el marco de esta aplicación es:<br>Nombre: E. H. (AvO)<br>Correo electrónico: paseroeni@gmail.com<br><br><b>Propósito de la aplicación:</b> La aplicación „AllesvorOrt“ (en español: „todo por aquí“, abreviado: „AvO“) es un directorio privado de empresas e información para Paraguay. Los usuarios pueden buscar entradas (empresas, servicios, empleos, ofertas, eventos) o anunciarse ellos mismos como proveedores.<br><br><b>2. Recopilación y almacenamiento de datos personales</b><br><b>a) Datos de anunciantes/proveedores</b><br>Al crear un perfil de proveedor o publicar anuncios, se procesan los siguientes datos y se publican en el directorio de forma visible para otros usuarios:<br>- Nombre / Nombre de la empresa<br>- Dirección de correo electrónico y número de teléfono<br>- Ubicación / Región<br>- Imágenes subidas y textos descriptivos<br><br><b>b) Firebase Authentication (Registro e Inicio de sesión)</b><br>Para el inicio de sesión seguro y la gestión de las cuentas de los proveedores, utilizamos Google Firebase Authentication. En este proceso, se procesan su dirección de correo electrónico y una contraseña (encriptada) para evitar el uso indebido y proteger su cuenta.<br><br><b>c) Publicidad (Start.io)</b><br>Esta aplicación integra banners publicitarios a través de la plataforma Start.io. Start.io utiliza identificadores publicitarios seudónimos (por ejemplo, el ID de publicidad) para mostrar anuncios y realizar análisis anónimos. No se transmiten datos directamente identificables (como su nombre o su correo electrónico) a las redes publicitarias.<br><br><b>d) Formulario de contacto / Consultas por correo electrónico</b><br>Si se pone en contacto con nosotros a través del formulario, sus datos se almacenarán para procesar y responder a la consulta.<br><br><b>e) Herramientas de análisis (Firebase Analytics)</b><br>Para la mejora continua de nuestra aplicación, utilizamos Google Firebase Analytics. A través de esta herramienta, se recopila información anonimizada sobre el uso de la aplicación (por ejemplo, qué funciones se utilizan con mayor frecuencia, información sobre bloqueos o la duración del uso). Estos datos sirven exclusivamente para optimizar las funciones de nuestra aplicación y para la corrección de errores. No se transmiten datos de identificación personal (como su nombre) a Google. El almacenamiento de esta información se realiza de forma anonimizada.<br><br><b>3. Permisos de la aplicación (Android Permissions)</b><br>La aplicación solicita permisos al acceder a ciertas funciones. Puede revocarlos en cualquier momento en los ajustes del sistema de su dispositivo:<br>- <b>Fotos/Medios/Almacenamiento:</b> Necesario para que los proveedores puedan subir imágenes para anuncios, logotipos de empresas o fotos de perfil.<br>- <b>Teléfono:</b> Permite a los usuarios llamar a un proveedor anunciado directamente con un clic desde la aplicación. No se leen las listas de llamadas.<br>- <b>Ubicación:</b> Se utiliza exclusivamente para el filtrado manual de regiones dentro de la aplicación. No se realiza un seguimiento GPS en segundo plano.<br><br><b>4. Derechos de los usuarios (RGPD)</b><br>Dado que la aplicación está disponible en el espacio europeo, usted como usuario tiene los siguientes derechos respecto a sus datos:<br>- Derecho de información, rectificación o limitación del tratamiento.<br>- Derecho a retirar los consentimientos otorgados.<br>- Derecho a la portabilidad de los datos.<br><br><b>5. Eliminación de datos</b><br>Los usuarios pueden solicitar la eliminación de sus datos en cualquier momento. Los detalles se pueden encontrar en el siguiente enlace:',
    privacy_delete_link: 'Solicitud de eliminación de datos'
  }
};

function applyLanguage(lang) {
  const strings = STRINGS[lang] || STRINGS.de;
  document.documentElement.lang = lang;
  document.body.dataset.lang = lang;
  localStorage.setItem(LANG_KEY, lang);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = strings[key];
    if (typeof value === 'string') {
      el.innerHTML = value;
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    const value = strings[key];
    if (typeof value === 'string') {
      el.innerHTML = value;
    }
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
  });

  const downloadCtas = [document.getElementById('download-cta'), document.getElementById('download-cta-bottom')];
  downloadCtas.forEach((cta) => {
    if (!cta) return;
    if (appDownloadUrl) {
      cta.href = appDownloadUrl;
      cta.removeAttribute('aria-disabled');
      cta.target = '_blank';
      cta.rel = 'noopener noreferrer';
    } else {
      cta.href = '#kontakt';
      cta.setAttribute('aria-disabled', 'true');
      cta.removeAttribute('target');
      cta.removeAttribute('rel');
    }
  });

  renderLegalMeta();
}

function init() {
  const savedLang = localStorage.getItem(LANG_KEY);
  const initialLang = savedLang === 'es' ? 'es' : 'de';
  applyLanguage(initialLang);

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });

  const downloadCtas = [document.getElementById('download-cta'), document.getElementById('download-cta-bottom')];
  downloadCtas.forEach((cta) => {
    if (!cta) return;
    cta.addEventListener('click', (event) => {
      if (!appDownloadUrl) {
        event.preventDefault();
        document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  setupContactForm();
  loadDownloadUrl();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  }
}

function loadDownloadUrl() {
  if (!db) {
    applyLanguage(document.body.dataset.lang || 'de');
    return;
  }

  db.collection('app_content').doc('home_page').get()
    .then((doc) => {
      const url = doc.exists ? (doc.get('download_link') || '') : '';
      appDownloadUrl = typeof url === 'string' ? url.trim() : '';
      appVersionName = doc.exists ? String(doc.get('latest_version_name') || '') : '';
      appVersionCode = doc.exists ? String(doc.get('latest_version_code') || '') : '';
    })
    .catch(() => {
      appDownloadUrl = APP_DOWNLOAD_URL_FALLBACK;
      appVersionName = '';
      appVersionCode = '';
    })
    .finally(() => {
      applyLanguage(document.body.dataset.lang || localStorage.getItem(LANG_KEY) || 'de');
    });
}

function renderLegalMeta() {
  const lang = document.body.dataset.lang || localStorage.getItem(LANG_KEY) || 'de';
  const strings = STRINGS[lang] || STRINGS.de;

  const versionEl = document.getElementById('imprint-version');
  if (versionEl) {
    const versionName = appVersionName || 'Web';
    const versionCode = appVersionCode || '0';
    versionEl.textContent = lang === 'es'
      ? `Versión: ${versionName} (Build ${versionCode})`
      : `Version: ${versionName} (Build ${versionCode})`;
  }

  const playStoreEl = document.getElementById('imprint-play-store');
  if (playStoreEl) {
    playStoreEl.textContent = strings.imprint_play_store_link;
    if (appDownloadUrl) {
      playStoreEl.href = appDownloadUrl;
      playStoreEl.target = '_blank';
      playStoreEl.rel = 'noopener noreferrer';
    } else {
      playStoreEl.href = '#kontakt';
      playStoreEl.removeAttribute('target');
      playStoreEl.removeAttribute('rel');
    }
  }

  const privacyDeleteEl = document.getElementById('privacy-delete-link');
  if (privacyDeleteEl) {
    privacyDeleteEl.textContent = strings.privacy_delete_link;
  }
}


function buildContactTechnicalInfo() {
  const nav = navigator;
  const screenInfo = `${window.screen.width}x${window.screen.height} @ ${window.devicePixelRatio || 1}x`;
  const browser = nav.userAgent || 'unknown';
  const lang = nav.language || 'unknown';
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';
  const platform = nav.platform || 'unknown';
  return [
    `WEB: ${window.location.href}`,
    `UA: ${browser}`,
    `PLATFORM: ${platform}`,
    `LANG: ${lang}`,
    `SCREEN: ${screenInfo}`,
    `TIMEZONE: ${timezone}`
  ].join(' | ');
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!db) {
      showContactStatus(strings.contact_form_db_unavailable, true);
      return;
    }

    const lang = document.body.dataset.lang || localStorage.getItem(LANG_KEY) || 'de';
    const strings = STRINGS[lang] || STRINGS.de;
    const name = document.getElementById('contact-name')?.value.trim() || '';
    const email = document.getElementById('contact-email')?.value.trim() || '';
    const whatsapp = document.getElementById('contact-phone')?.value.trim() || '';
    const message = document.getElementById('contact-message')?.value.trim() || '';
    const human = document.getElementById('contact-human')?.checked || false;
    const submit = document.getElementById('contact-submit');

    if (!name || !email || !message) {
      showContactStatus(strings.contact_form_error_fields, true);
      return;
    }
    if (!human) {
      showContactStatus(strings.contact_form_error_human, true);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showContactStatus(strings.contact_form_error_invalid_email, true);
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = strings.contact_form_sending;
    }
    showContactStatus(strings.contact_form_sending, false);

    const payload = {
      name,
      email,
      whatsapp,
      message,
      technical_info: buildContactTechnicalInfo(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: 'new',
      needsPush: true,
      source: 'web'
    };

    try {
      await db.collection('contact_requests').add(payload);
      form.reset();
      showContactStatus(strings.contact_form_success, false);
    } catch (err) {
      console.error('contact submit failed', err);
      showContactStatus(err?.message ? `Fehler: ${err.message}` : 'Fehler beim Senden.', true);
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = strings.contact_form_submit;
      }
    }
  });
}

function showContactStatus(text, isError) {
  const statusEl = document.getElementById('contact-status');
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.classList.toggle('contact-status--error', Boolean(isError));
}

document.addEventListener('DOMContentLoaded', init);
