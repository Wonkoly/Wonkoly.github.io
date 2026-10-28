#!/usr/bin/env bash
# Revisa, construye, sube y espera a que el sitio quede publicado.
#   npm run publicar -- "mensaje del commit"
set -euo pipefail
cd "$(dirname "$0")/.."

msg="${1:-Actualiza portafolio}"
site="https://wonkoly.github.io/"

echo "▸ Revisando y construyendo…"
npm run --silent build >/dev/null

git add -A
if git diff --cached --quiet; then
  echo "▸ No hay cambios nuevos para publicar."
else
  git commit -qm "$msg"
  echo "▸ Commit: $msg"
fi

if [ -z "$(git log --oneline @{u}..HEAD 2>/dev/null)" ]; then
  echo "▸ Nada que subir; el sitio ya está al día."
  exit 0
fi

git push -q
sha="$(git rev-parse HEAD)"
echo "▸ Subido. Esperando a GitHub Actions…"

run=""
for _ in $(seq 1 30); do
  run="$(gh run list --workflow deploy.yml --commit "$sha" --json databaseId -q '.[0].databaseId' 2>/dev/null || true)"
  [ -n "$run" ] && break
  sleep 2
done
if [ -z "$run" ]; then
  echo "▸ El push no disparó un despliegue (¿solo cambiaste el README?)."
  exit 0
fi

gh run watch "$run" --exit-status --interval 5 >/dev/null || {
  echo "✗ Falló el despliegue: gh run view $run --log-failed"
  exit 1
}

code="$(curl -s -o /dev/null -w '%{http_code}' "$site")"
echo "✓ Publicado ($code): $site"
