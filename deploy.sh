#!/usr/bin/env bash
set -euo pipefail

echo "=== Deploy Helper KAS-TKJ1 ke GitHub Pages ==="

if [ ! -d ".git" ]; then
  git init
  echo "✓ Git repository initialized."
fi

git add .
git commit -m "feat: KAS-TKJ1 Sistem Kas & Monitoring Iuran XII TKJ 1 v1.0" || echo "No changes to commit."

echo ""
echo "Masukkan URL remote GitHub lo (contoh: https://github.com/USERNAME/kas-tkj1.git):"
read -r REPO_URL

if [ -n "$REPO_URL" ]; then
  git remote remove origin 2>/dev/null || true
  git remote add origin "$REPO_URL"
  git branch -M main
  git push -u origin main
  echo "✓ Berhasil di-push ke GitHub!"
  echo "Silakan aktifkan GitHub Pages di Settings -> Pages -> Branch main -> Save."
fi
