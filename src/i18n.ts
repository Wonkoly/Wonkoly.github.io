export const languages = ["es", "en"] as const;
export type Lang = (typeof languages)[number];

export const ui = {
  es: {
    "meta.title": "Wonkoly · Portafolio",
    "meta.description": "Wonkoly — apps pequeñas, útiles y bien contadas.",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.switch": "Read in English",
    "hero.eyebrow": "Desarrollador · Python & web",
    "hero.lede": "Escribo software como quien escribe cuentos cortos: pocas páginas, un propósito claro y un final que sirva para algo.",
    "hero.sub": "Aquí guardo las historias que ya terminé y las que todavía estoy escribiendo.",
    "projects.title": "Proyectos",
    "contact.title": "Contacto",
    "contact.text": "¿Una idea, un error o una buena conversación? Escríbeme.",
    "footer.made": "Hecho con Astro y Tailwind.",
    "btn.fdroid": "Agregar a F-Droid",
    "btn.fdroidHint": "se actualiza sola",
    "btn.apk": "Descargar APK",
    "btn.apkHint": "arm64 · la mayoría de teléfonos",
    "btn.release": "Descargar",
    "btn.repo": "Código",
    "btn.link": "Abrir",
    "fdroid.how": "¿Cómo agrego el repositorio?",
    "fdroid.steps": [
      "Instala F-Droid desde f-droid.org si aún no lo tienes.",
      "Abre F-Droid → Ajustes → Repositorios → +.",
      "Pega la URL de abajo (o toca «Agregar a F-Droid» desde el teléfono).",
      "Busca la app e instálala; las actualizaciones llegan solas.",
    ],
    copy: "Copiar",
    copied: "¡Copiado!",
    private: "El código es privado; por ahora solo puedo contarte de qué trata.",
  },
  en: {
    "meta.title": "Wonkoly · Portfolio",
    "meta.description": "Wonkoly — small, useful, well-told apps.",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.switch": "Leer en español",
    "hero.eyebrow": "Developer · Python & web",
    "hero.lede": "I write software the way one writes short stories: few pages, a clear purpose, and an ending that's actually useful.",
    "hero.sub": "This is where I keep the stories I've finished and the ones I'm still writing.",
    "projects.title": "Projects",
    "contact.title": "Contact",
    "contact.text": "An idea, a bug, or just a good conversation? Write to me.",
    "footer.made": "Built with Astro and Tailwind.",
    "btn.fdroid": "Add to F-Droid",
    "btn.fdroidHint": "updates itself",
    "btn.apk": "Download APK",
    "btn.apkHint": "arm64 · most phones",
    "btn.release": "Download",
    "btn.repo": "Source",
    "btn.link": "Open",
    "fdroid.how": "How do I add the repository?",
    "fdroid.steps": [
      "Install F-Droid from f-droid.org if you don't have it yet.",
      "Open F-Droid → Settings → Repositories → +.",
      "Paste the URL below (or tap “Add to F-Droid” on your phone).",
      "Find the app and install it; updates arrive on their own.",
    ],
    copy: "Copy",
    copied: "Copied!",
    private: "The code is private; for now I can only tell you what it's about.",
  },
} as const;

export const useT = (lang: Lang) => ui[lang];

/** Textos de projects.json: cadena simple o {"es": ..., "en": ...}. */
export type Localized<T = string> = T | Partial<Record<Lang, T>>;

export function loc<T>(value: Localized<T> | undefined, lang: Lang): T | undefined {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const v = value as Partial<Record<Lang, T>>;
    return v[lang] ?? v.es ?? Object.values(v)[0];
  }
  return value as T | undefined;
}

export const homePath = (lang: Lang) => (lang === "es" ? "/" : `/${lang}/`);
