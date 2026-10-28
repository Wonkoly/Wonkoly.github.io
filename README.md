# wonkoly.github.io

Portafolio personal de **Wonkoly** → https://wonkoly.github.io (ES) · https://wonkoly.github.io/en/ (EN)

Hecho con [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com). Es un sitio 100 % estático:
cada push a `main` lo construye y publica GitHub Actions (`.github/workflows/deploy.yml`).

```
src/data/projects.json      ← la lista de proyectos (lo único que editas para agregar uno)
public/assets/icons/        íconos de los proyectos (PNG/SVG, ~256 px, ligeros)
src/i18n.ts                 textos fijos del sitio en español e inglés
src/components/Home.astro   la página (encabezado, proyectos, contacto) + JS del botón de APK
src/components/ProjectCard.astro   la tarjeta de cada proyecto
src/layouts/Layout.astro    <head>, barra superior, pie y detección de idioma
src/styles/global.css       paleta (claro/oscuro) y clases .btn
```

> El repo F-Droid de CokieVault vive en otro repo (`cokievault-fdroid`) y se publica en
> `/cokievault-fdroid/`. Este sitio no lo toca: no crees una página ni carpeta con ese nombre.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | servidor local con recarga en http://localhost:4321 |
| `npm run build` | `astro check` + build a `dist/` (lo mismo que corre en GitHub) |
| `npm run preview` | sirve `dist/` tal como quedará publicado |
| `npm run publicar -- "mensaje"` | build → commit → push → espera el deploy → verifica |

Cambios solo en `README.md` o `scripts/` no disparan un nuevo despliegue.

## Trabajar en local

```bash
npm install
npm run dev
```

Abre http://localhost:4321. Para probar exactamente lo que se publicará: `npm run build && npm run preview`.

## Agregar un proyecto

1. Copia el ícono a `public/assets/icons/` (cuadrado, 256×256 basta).
2. Agrega un objeto al arreglo de `src/data/projects.json`. Las tarjetas salen en el mismo orden.

```json
{
  "id": "mi-app",
  "name": "Mi App",
  "icon": "/assets/icons/mi-app.png",
  "platform": "Windows · Linux",
  "description": { "es": "Una línea que diga qué hace.", "en": "One line saying what it does." },
  "features": { "es": ["Función 1", "Función 2"], "en": ["Feature 1", "Feature 2"] },
  "tags": ["Python", "Qt"],
  "links": [
    {
      "type": "release",
      "url": "https://github.com/Wonkoly/mi-app/releases/latest/download/mi-app-windows.zip",
      "label": { "es": "Descargar para Windows", "en": "Download for Windows" }
    },
    { "type": "repo", "url": "https://github.com/Wonkoly/mi-app" }
  ]
}
```

3. Revisa con `npm run dev` y publica:

   ```bash
   npm run publicar -- "Agrega Mi App"
   ```

   Ese comando revisa tipos, construye, hace commit, push, espera a que GitHub Actions
   termine y comprueba que el sitio responde. Si algo falla, no se publica nada roto y te
   dice cómo ver el error.

Los tipos de cada campo están en `src/data/projects.ts`; si `npm run build` falla después
de editar el JSON, casi siempre es una coma o comilla de más.

### Campos

| Campo | Obligatorio | Notas |
|---|---|---|
| `id` | sí | sin espacios; sirve de ancla (`#mi-app`) |
| `name` | sí | |
| `icon` | no | ruta que empieza con `/assets/icons/` |
| `platform` | no | texto o `{es, en}` |
| `description` | sí | texto o `{es, en}` |
| `features` | no | lista o `{es: [...], en: [...]}` |
| `tags` | no | tecnologías |
| `status` | no | etiqueta junto a la plataforma, p. ej. «En desarrollo» |
| `private` | no | `true` muestra la nota de «código privado» (útil sin links) |
| `links` | no | botones, ver abajo |

Cualquier texto puede ser una cadena simple (igual en ambos idiomas) o `{"es": "...", "en": "..."}`.

### Tipos de link

| `type` | Qué hace | Campos |
|---|---|---|
| `fdroid` | botón principal «Agregar a F-Droid» + instrucciones plegables con botón de copiar | `url` (con `?fingerprint=…`) |
| `apk` | descarga directa; lee `index-v2.json` en el navegador para apuntar siempre a la última versión | `index`, `package`, `abi` (opcional), `fallback` |
| `release` | descarga desde GitHub Releases | `url`, `label`, `hint` |
| `repo` | botón «Código» | `url` |
| `link` | cualquier otro enlace | `url`, `label`, `hint` |

`label` y `hint` son opcionales y aceptan `{es, en}`.

### Descargas pesadas: siempre GitHub Releases

Nunca subas instaladores/ZIP a este repo (GitHub rechaza archivos de más de 100 MB y
Pages tiene límite de tamaño). Súbelos como *asset* de un Release del repo del proyecto
(hasta 2 GB por archivo):

```bash
gh release create v1.0.0 dist/mi-app-windows.zip --repo Wonkoly/mi-app --title "v1.0.0"
```

y usa el enlace estable que siempre apunta al último release:

```
https://github.com/Wonkoly/mi-app/releases/latest/download/mi-app-windows.zip
```

Mantén el **mismo nombre de archivo** en cada versión para que el link no cambie
(sin número de versión en el nombre).

## Idiomas

`/` es la versión en español y `/en/` la de inglés. En la primera visita, si el navegador
no está en español se redirige a `/en/`; el botón ES/EN guarda la elección del visitante.
Los textos fijos están en `src/i18n.ts`.
