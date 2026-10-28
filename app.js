"use strict";

const I18N = {
  es: {
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "hero.eyebrow": "Desarrollador · Python & web",
    "hero.lede": "Escribo software como quien escribe cuentos cortos: pocas páginas, un propósito claro y un final que sirva para algo.",
    "hero.sub": "Aquí guardo las historias que ya terminé y las que todavía estoy escribiendo.",
    "projects.title": "Proyectos",
    "contact.title": "Contacto",
    "contact.text": "¿Una idea, un error o una buena conversación? Escríbeme.",
    "footer.made": "Hecho a mano, sin frameworks.",
    "btn.fdroid": "Agregar a F-Droid",
    "btn.fdroidHint": "se actualiza sola",
    "btn.apk": "Descargar APK",
    "btn.apkHint": "arm64 · la mayoría de teléfonos",
    "btn.release": "Descargar",
    "btn.repo": "Código",
    "btn.link": "Abrir",
    "fdroid.how": "¿Cómo agrego el repositorio?",
    "fdroid.s1": "Instala F-Droid desde f-droid.org si aún no lo tienes.",
    "fdroid.s2": "Abre F-Droid → Ajustes → Repositorios → +.",
    "fdroid.s3": "Pega la URL de abajo (o toca «Agregar a F-Droid» desde el teléfono).",
    "fdroid.s4": "Busca la app e instálala; las actualizaciones llegan solas.",
    "copy": "Copiar",
    "copied": "¡Copiado!",
    "private": "El código es privado; por ahora solo puedo contarte de qué trata.",
    "error": "No pude cargar los proyectos. Intenta recargar la página.",
  },
  en: {
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.eyebrow": "Developer · Python & web",
    "hero.lede": "I write software the way one writes short stories: few pages, a clear purpose, and an ending that's actually useful.",
    "hero.sub": "This is where I keep the stories I've finished and the ones I'm still writing.",
    "projects.title": "Projects",
    "contact.title": "Contact",
    "contact.text": "An idea, a bug, or just a good conversation? Write to me.",
    "footer.made": "Handmade, no frameworks.",
    "btn.fdroid": "Add to F-Droid",
    "btn.fdroidHint": "updates itself",
    "btn.apk": "Download APK",
    "btn.apkHint": "arm64 · most phones",
    "btn.release": "Download",
    "btn.repo": "Source",
    "btn.link": "Open",
    "fdroid.how": "How do I add the repository?",
    "fdroid.s1": "Install F-Droid from f-droid.org if you don't have it yet.",
    "fdroid.s2": "Open F-Droid → Settings → Repositories → +.",
    "fdroid.s3": "Paste the URL below (or tap “Add to F-Droid” on your phone).",
    "fdroid.s4": "Find the app and install it; updates arrive on their own.",
    "copy": "Copy",
    "copied": "Copied!",
    "private": "The code is private; for now I can only tell you what it's about.",
    "error": "Couldn't load the projects. Try reloading the page.",
  },
};

const ICONS = {
  fdroid: '<svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M3 8.5A2.5 2.5 0 0 1 5.5 6h13A2.5 2.5 0 0 1 21 8.5v7a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 15.5v-7Zm9 1.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM4.2 2.6l2.1 3.1-1 .6-2.1-3.1 1-.6Zm15.6 0 1 .6-2.1 3.1-1-.6 2.1-3.1Z"/></svg>',
  download: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  code: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m8 7-5 5 5 5m8-10 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  link: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14 4h6v6m0-6-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

const LANG_KEY = "lang";
let lang = pickLang();
let projects = [];

function pickLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch (_) {}
  return (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
}

const t = (key) => I18N[lang][key] ?? I18N.es[key] ?? key;
// Text fields in projects.json are either a plain string or {"es": ..., "en": ...}.
const loc = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v.es ?? Object.values(v)[0] : v);

function el(tag, attrs = {}, html) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function button(href, icon, label, hint, primary) {
  const a = el("a", { class: primary ? "btn primary" : "btn", href });
  a.innerHTML = ICONS[icon];
  a.append(document.createTextNode(label));
  if (hint) {
    const small = el("small");
    small.textContent = `· ${hint}`;
    a.append(" ", small);
  }
  return a;
}

function fdroidBlock(link) {
  const frag = document.createDocumentFragment();
  frag.append(button(link.url, "fdroid", loc(link.label) || t("btn.fdroid"), t("btn.fdroidHint"), true));

  const details = el("details", { class: "howto" });
  details.append(el("summary", {}, ""));
  details.firstChild.textContent = t("fdroid.how");
  const ol = el("ol");
  for (const k of ["fdroid.s1", "fdroid.s2", "fdroid.s3", "fdroid.s4"]) {
    const li = el("li");
    li.textContent = t(k);
    ol.append(li);
  }
  const row = el("div", { class: "copy-row" });
  const code = el("code");
  code.textContent = link.url;
  const copy = el("button", { class: "btn", type: "button" });
  copy.textContent = t("copy");
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(link.url);
    } catch (_) {
      const range = document.createRange();
      range.selectNodeContents(code);
      getSelection().removeAllRanges();
      getSelection().addRange(range);
      document.execCommand("copy");
    }
    copy.textContent = t("copied");
    setTimeout(() => (copy.textContent = t("copy")), 1600);
  });
  row.append(code, copy);
  details.append(ol, row);
  return { frag, details };
}

// Reads the F-Droid index so the APK button always points at the newest build.
// The fixed `fallback` URL stays in place if the fetch fails.
const indexCache = new Map();
async function resolveApk(link, anchor) {
  try {
    if (!indexCache.has(link.index)) {
      indexCache.set(link.index, fetch(link.index, { cache: "no-cache" }).then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      }));
    }
    const index = await indexCache.get(link.index);
    const pkg = index.packages?.[link.package];
    if (!pkg) return;
    const best = Object.values(pkg.versions)
      .filter((v) => !link.abi || (v.manifest.nativecode || []).includes(link.abi))
      .sort((a, b) => b.manifest.versionCode - a.manifest.versionCode)[0];
    if (!best) return;
    const base = link.index.replace(/[^/]+$/, "");
    anchor.href = base + best.file.name.replace(/^\//, "");
    const small = anchor.querySelector("small");
    if (small) small.textContent = `· v${best.manifest.versionName} · ${t("btn.apkHint")}`;
  } catch (err) {
    console.warn("APK index lookup failed, using fallback link", err);
  }
}

function renderCard(p) {
  const card = document.getElementById("card-tpl").content.firstElementChild.cloneNode(true);
  card.id = p.id;
  const icon = card.querySelector(".icon");
  if (p.icon) icon.src = p.icon; else icon.remove();
  card.querySelector(".name").textContent = p.name;

  const meta = card.querySelector(".meta");
  meta.textContent = loc(p.platform) || "";
  if (p.status) {
    const badge = el("span", { class: "badge" });
    badge.textContent = loc(p.status);
    meta.append(badge);
  }
  card.querySelector(".desc").textContent = loc(p.description) || "";

  const features = card.querySelector(".features");
  const feats = loc(p.features) || [];
  if (feats.length) for (const f of feats) features.append(Object.assign(el("li"), { textContent: f }));
  else features.remove();

  const tags = card.querySelector(".tags");
  for (const tag of p.tags || []) tags.append(Object.assign(el("li"), { textContent: tag }));

  const actions = card.querySelector(".actions");
  let howto = null;
  for (const link of p.links || []) {
    switch (link.type) {
      case "fdroid": {
        const { frag, details } = fdroidBlock(link);
        actions.append(frag);
        howto = details;
        break;
      }
      case "apk": {
        const a = button(link.fallback, "download", loc(link.label) || t("btn.apk"), t("btn.apkHint"));
        a.setAttribute("download", "");
        actions.append(a);
        resolveApk(link, a);
        break;
      }
      case "release":
        actions.append(button(link.url, "download", loc(link.label) || t("btn.release"), loc(link.hint), !actions.children.length));
        break;
      case "repo":
        actions.append(button(link.url, "code", loc(link.label) || t("btn.repo")));
        break;
      default:
        actions.append(button(link.url, "link", loc(link.label) || t("btn.link"), loc(link.hint)));
    }
  }
  if (p.private) {
    const note = el("p", { class: "private-note" });
    note.textContent = t("private");
    actions.append(note);
  }
  if (!actions.children.length) actions.remove();
  if (howto) card.append(howto);
  return card;
}

function render() {
  document.documentElement.lang = lang;
  document.title = lang === "es" ? "Wonkoly · Portafolio" : "Wonkoly · Portfolio";
  for (const node of document.querySelectorAll("[data-i18n]")) node.textContent = t(node.dataset.i18n);
  document.getElementById("lang").textContent = lang === "es" ? "EN" : "ES";

  const grid = document.getElementById("grid");
  grid.replaceChildren(...projects.map(renderCard));
}

document.getElementById("lang").addEventListener("click", () => {
  lang = lang === "es" ? "en" : "es";
  try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
  render();
});
document.getElementById("year").textContent = new Date().getFullYear();

fetch("projects.json", { cache: "no-cache" })
  .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
  .then((data) => { projects = data; render(); })
  .catch((err) => {
    console.error(err);
    render();
    const msg = el("p");
    msg.textContent = t("error");
    document.getElementById("grid").replaceChildren(msg);
  });
