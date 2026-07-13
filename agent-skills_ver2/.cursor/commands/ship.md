# /ship — リリース準備

**必読:** `skills/shipping-and-launch/SKILL.md` を全文読み、手順を省略せず実行する。

## 概要

3つの専門ペルソナで並行レビューし、結果を統合して GO / NO-GO を判定する。

## Phase A — 専門レビュー

次の3ファイルを **それぞれ読み込み**、独立した観点でレビューする:

1. `agents/code-reviewer.md` — 5軸コードレビュー
2. `agents/security-auditor.md` — 脆弱性・OWASP・認証・依存関係
3. `agents/test-engineer.md` — テストカバレッジ・エッジケース

Cursor では Task ツールでサブエージェントを並列起動できる場合は並列で実行する。できない場合は順番に実行し、各レポートを独立に保持する。

**小さな変更の省略条件** — 以下すべてを満たす場合のみ Phase A を簡略化できる:
- 変更ファイルが2以下
- 差分が50行未満
- 認証・決済・データアクセス・設定/env に触れない

## Phase B — 統合

メインコンテキストで3レポートを統合する:

1. **コード品質** — Critical/Important の集約、lint・ビルド結果
2. **セキュリティ** — Critical/High はブロッカーに昇格
3. **パフォーマンス** — 必要なら `references/performance-checklist.md`
4. **アクセシビリティ** — `references/accessibility-checklist.md`
5. **インフラ** — 環境変数、マイグレーション、モニタリング、フィーチャーフラグ
6. **ドキュメント** — README、ADR、changelog

併用スキル:
- `skills/ci-cd-and-automation/SKILL.md`
- `skills/observability-and-instrumentation/SKILL.md`
- `skills/documentation-and-adrs/SKILL.md`

## Phase C — 判定

```markdown
## Ship Decision: GO | NO-GO

### Blockers（出荷前に必須）
- [出典ペルソナ: Critical + file:line]

### Recommended fixes
- [出典ペルソナ: Important + file:line]

### Acknowledged risks
- [リスク + 緩和策]

### Rollback plan
- トリガー条件:
- 手順:
- 目標復旧時間:

### Specialist reports
- [code-reviewer]
- [security-auditor]
- [test-engineer]
```

## ルール

- Critical が1つでもあればデフォルトは **NO-GO**（ユーザーがリスク承認した場合のみ GO）
- ロールバック手順は GO 判定前に必須
