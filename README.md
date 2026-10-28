# wonkoly.github.io

Portafolio personal de **Wonkoly** → https://wonkoly.github.io

Sitio estático (HTML + CSS + un poco de JS), sin frameworks ni build. GitHub Pages
sirve los archivos tal cual desde la rama `main`.

```
index.html      estructura y textos fijos
styles.css      diseño (mobile first, claro/oscuro automático)
app.js          traducciones ES/EN y render de las tarjetas
projects.json   ← la lista de proyectos (lo único que editas para agregar uno)
assets/icons/   íconos de los proyectos (PNG/SVG, ~256 px, ligeros)
```

> El repo F-Droid de CokieVault vive en otro repo (`cokievault-fdroid`) y se publica en
> `/cokievault-fdroid/`. Este sitio no lo toca: no crees aquí una carpeta con ese nombre.

## Verlo en local

```bash
python3 -m http.server 8137
```

Abre http://localhost:8137 (hace falta un servidor: `projects.json` no carga con `file://`).

## Agregar un proyecto

1. Copia el ícono a `assets/icons/` (cuadrado, 256×256 basta).
2. Agrega un objeto al arreglo de `projects.json`. Las tarjetas salen en el mismo orden.

```json
{
  "id": "mi-app",
  "name": "Mi App",
  "icon": "assets/icons/mi-app.png",
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

3. Revisa en local, haz commit y push. Pages se actualiza en ~1 minuto.

### Campos

| Campo | Obligatorio | Notas |
|---|---|---|
| `id` | sí | sin espacios; sirve de ancla (`#mi-app`) |
| `name` | sí | |
| `icon` | no | ruta relativa |
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
| `apk` | descarga directa; lee `index-v2.json` para apuntar siempre a la última versión | `index`, `package`, `abi` (opcional), `fallback` |
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

## Textos del sitio

Los textos fijos (encabezado, contacto, botones) están en el objeto `I18N` al inicio de
`app.js`, en español e inglés. El idioma se elige según el navegador y se recuerda si el
visitante usa el botón ES/EN.
