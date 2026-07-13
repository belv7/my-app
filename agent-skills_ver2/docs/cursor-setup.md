# agent-skills2 を Cursor で使う

agent-skills2 は **Cursor 向けにプリセット済み** です。Claude Code の `/spec` やセッションフック相当の機能も、`.cursor/commands/` と `.cursor/rules/` で再現しています。

## クイックスタート

### このリポジトリをそのまま使う

```bash
cd agent-skills2
cursor .
```

`.cursor/rules/` と `.cursor/commands/` が自動で読み込まれます。Agent チャットで `/` を入力するとコマンド一覧が出ます。

### 既存プロジェクトに導入する

```bash
# agent-skills2 のルートから実行
./scripts/install-to-cursor-project.sh /path/to/your-project
```

または手動で:

```bash
TARGET=/path/to/your-project

mkdir -p "$TARGET/.cursor/rules" "$TARGET/.cursor/commands"
cp -r .cursor/rules/* "$TARGET/.cursor/rules/"
cp -r .cursor/commands/* "$TARGET/.cursor/commands/"
cp -r skills agents references "$TARGET/"
cp AGENTS.md "$TARGET/AGENTS.md"   # 既存がある場合はマージを検討
```

**重要:** ルールは `skills/` を参照するため、`skills/` ディレクトリも必ずコピーしてください。

---

## 含まれる Cursor 設定

### スラッシュコマンド（`.cursor/commands/`）

| コマンド | 用途 | 読むスキル |
|---------|------|-----------|
| `/spec` | 仕様書 `SPEC.md` を作成 | `spec-driven-development` |
| `/plan` | タスク分解 | `planning-and-task-breakdown` |
| `/build` | 次の1タスクを実装 | `incremental-implementation` + `test-driven-development` |
| `/build auto` | 全タスクを自律実装 | 上記 + `planning-and-task-breakdown` |
| `/test` | TDD / Prove-It | `test-driven-development` |
| `/review` | 5軸コードレビュー | `code-review-and-quality` |
| `/code-simplify` | 挙動を変えず簡素化 | `code-simplification` |
| `/ship` | リリース GO/NO-GO | `shipping-and-launch` + `agents/*` |
| `/webperf` | Web 性能監査 | `agents/web-performance-auditor` |

使い方: Agent チャットで `/` → コマンドを選択。引数も渡せます（例: `/build auto`、`/webperf https://example.com`）。

### ルール（`.cursor/rules/`）

| ルール | 適用 | 役割 |
|--------|------|------|
| `00-orchestration.mdc` | 常時 | タスク → スキルの振り分け |
| `01-core-behaviors.mdc` | 常時 | 仮定の明示、検証、スコープ管理 |
| `02-build-essential.mdc` | 常時 | TDD + 段階的実装 |
| `define-spec.mdc` | 手動/文脈 | 仕様策定 |
| `plan-tasks.mdc` | 手動/文脈 | タスク分解 |
| `frontend-ui.mdc` | `*.tsx` 等 | UI 実装 |
| `api-design.mdc` | `api/` 等 | API 設計 |
| `review-quality.mdc` | 手動/文脈 | コードレビュー |
| `debug-recovery.mdc` | 手動/文脈 | デバッグ |
| `security-hardening.mdc` | 認証・env 等 | セキュリティ |
| `performance.mdc` | 手動/文脈 | パフォーマンス |
| `ship-launch.mdc` | 手動/文脈 | リリース |

---

## Claude Code との対応表

| Claude Code | agent-skills2 on Cursor |
|-------------|-------------------------|
| `/plugin install` | `./scripts/install-to-cursor-project.sh` |
| `/spec` 等 | `.cursor/commands/*.md` |
| `session-start` フック | `00-orchestration` + `01-core-behaviors`（常時適用ルール） |
| `agent-skills:skill-name` | `skills/<skill-name>/SKILL.md` を読む |
| サブエージェント | `agents/*.md` を読む、または Task ツール |

---

## 推奨ワークフロー

```
/spec → /plan → /build（繰り返し）→ /test → /review → /ship
```

Web ページ開発の場合、`frontend-ui.mdc` が UI ファイル編集時に自動で有効になります。

---

## コンテキスト管理

Cursor にはコンテキスト上限があります。

1. **常時ロードは3ルールのみ**（`00`, `01`, `02`）— これ以上を `alwaysApply: true` にしない
2. **フェーズ別ルール**は `alwaysApply: false` のまま、コマンドまたは `@rule` で有効化
3. スキル全文は必要なときだけ `skills/` から読む（ルールが指示する）

---

## チーム共有

`.cursor/`、`skills/`、`agents/`、`references/` を git にコミットすれば、チーム全員が同じワークフローを使えます。

Cursor の **Remote Rule (GitHub)** でも `.mdc` を同期できます（Customize → Rules → Add Rule → Remote Rule）。

---

## トラブルシュート

| 症状 | 対処 |
|------|------|
| `/` にコマンドが出ない | `.cursor/commands/` がプロジェクトルートにあるか確認。Cursor を再起動 |
| スキル手順が守られない | 「`skills/xxx/SKILL.md` を読んでから実行して」と明示 |
| コンテキスト溢れ | `alwaysApply: true` のルールを減らす |
| `skills/` が見つからない | インストールスクリプトで `skills/` もコピーしたか確認 |
