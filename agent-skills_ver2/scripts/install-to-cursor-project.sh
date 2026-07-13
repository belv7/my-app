#!/usr/bin/env bash
# agent-skills2 を任意のプロジェクトにインストールする
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
TARGET="${1:-.}"

mkdir -p "$TARGET"

if [[ ! -d "$TARGET" ]]; then
  echo "Error: could not create target directory: $TARGET" >&2
  exit 1
fi

TARGET="$(cd "$TARGET" && pwd)"

echo "Installing agent-skills2 into: $TARGET"

mkdir -p "$TARGET/.cursor/rules" "$TARGET/.cursor/commands"

# Rules & commands
cp -r "$ROOT_DIR/.cursor/rules/." "$TARGET/.cursor/rules/"
cp -r "$ROOT_DIR/.cursor/commands/." "$TARGET/.cursor/commands/"

# Skills, agents, references (rules reference these paths)
for dir in skills agents references; do
  if [[ -d "$TARGET/$dir" ]]; then
    echo "Warning: $TARGET/$dir already exists — merging (existing files kept)"
    cp -rn "$ROOT_DIR/$dir/." "$TARGET/$dir/" 2>/dev/null || cp -r "$ROOT_DIR/$dir/." "$TARGET/$dir/"
  else
    cp -r "$ROOT_DIR/$dir" "$TARGET/$dir"
  fi
done

# AGENTS.md — append if exists, otherwise copy
if [[ -f "$TARGET/AGENTS.md" ]]; then
  if ! grep -q "agent-skills2" "$TARGET/AGENTS.md" 2>/dev/null; then
    echo "" >> "$TARGET/AGENTS.md"
    echo "---" >> "$TARGET/AGENTS.md"
    echo "" >> "$TARGET/AGENTS.md"
    echo "<!-- agent-skills2 -->" >> "$TARGET/AGENTS.md"
    cat "$ROOT_DIR/AGENTS.md" >> "$TARGET/AGENTS.md"
    echo "Appended agent-skills2 section to existing AGENTS.md"
  else
    echo "AGENTS.md already contains agent-skills2 — skipped"
  fi
else
  cp "$ROOT_DIR/AGENTS.md" "$TARGET/AGENTS.md"
fi

echo ""
echo "Done. Open the project in Cursor and type / in Agent chat."
echo ""
echo "Commands: /spec /plan /build /test /review /code-simplify /ship /webperf"
echo "Docs:     docs/cursor-setup.md"
