# 残差分の分割コミット案

## 目的

今回コミット済みの UI 検証差分（`views/index.ejs`, `tasks/plan.md`）以外を、意図ごとに安全に分割する。

## 現在の残差分（追跡済み）

- `README.md`（削除）
- `index.ts`（Task ベースのルーティング・集計連携へ変更）
- `package.json`（`test` script 追加）
- `prisma/schema.prisma`（`Task` モデル追加）

## 推奨コミット順

1. DB スキーマと移行ファイル
- 対象: `prisma/schema.prisma`, `prisma/migrations/**`
- 目的: データ構造変更を先に固定する
- 例:
  - `git add prisma/schema.prisma prisma/migrations`
  - `git commit -m "feat(db): add task model and migrations"`

2. サーバー実装
- 対象: `index.ts`, `lib/**`
- 目的: API/画面ロジックを DB 変更の上に積む
- 例:
  - `git add index.ts lib`
  - `git commit -m "feat(app): implement task routes and dashboard logic"`

3. 生成物ポリシー確定
- 対象: `generated/**`
- 方針候補:
  - 追跡する: CI で生成しない運用ならコミット
  - 追跡しない: `generated/` を ignore へ追加

4. 付帯アセット
- 対象: `SPEC.md`, `agent-skills_ver2/**`, `ui-agents/**`
- 目的: 本体機能とは分離して別コミット化
- 例:
  - `git add SPEC.md agent-skills_ver2 ui-agents`
  - `git commit -m "docs: add skill references and UI agent assets"`

5. README の扱い
- 対象: `README.md`
- 方針候補:
  - 削除を維持: そのままコミット
  - 維持する: `git restore -- README.md` で復元して除外

## 先にやるべき小さな整理

- `.DS_Store`, `.Rhistory` は `.gitignore` で除外済み。
- 既に作成済みの不要一時ファイル `.tmp/` は削除済み。

## 実行チェック

各コミット前後で以下を実施する。

- `git status --short`
- `npm test`
- `npx prisma validate`
