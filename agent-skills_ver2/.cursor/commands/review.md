# /review — コードレビュー

**必読:** `skills/code-review-and-quality/SKILL.md` を全文読み、手順を省略せず実行する。

## レビュー対象

ステージ済みの変更、または直近のコミット。ユーザーが `@` でファイルを指定していればそれを優先する。

## 5軸レビュー

1. **正しさ** — 仕様通りか。エッジケースはあるか。テストは十分か
2. **可読性** — 名前は明確か。ロジックは素直か。整理されているか
3. **アーキテクチャ** — 既存パターンに沿っているか。境界は明確か
4. **セキュリティ** — 入力検証、秘密情報、認可（必要なら `skills/security-and-hardening/SKILL.md`）
5. **パフォーマンス** — N+1、無制限処理など（必要なら `skills/performance-optimization/SKILL.md`）

## 深刻度

- **Critical** — マージ前に必ず修正
- **Important** — 修正を強く推奨
- **Suggestion** — 改善提案

## 専門レビュー

深い監査が必要な場合、`agents/` のペルソナを読み込んで観点を追加する:

- `agents/code-reviewer.md`
- `agents/security-auditor.md`
- `agents/test-engineer.md`

## 出力形式

ファイル:行 を含む構造化レビューと、具体的な修正提案を出す。

## ユーザー追加入力

コマンド名の後のテキスト（`$ARGUMENTS`）があれば、レビュー観点やスコープのヒントとして使う。
