# /build — 段階的実装

**必読:**
- `skills/incremental-implementation/SKILL.md`
- `skills/test-driven-development/SKILL.md`
- コミット時: `skills/git-workflow-and-versioning/SKILL.md`

## モード

コマンド名の後のテキスト（`$ARGUMENTS`）でモードを判定する:

- **`auto` または `all`** → 自律モード（下記「自律モード」）
- **空またはそれ以外** → デフォルト（次の1タスクだけ実装して停止）

## デフォルト: 1タスク

プランから次の未完了タスクを選び、以下を実行する:

1. タスクの受け入れ基準を読む
2. 関連コンテキスト（既存コード、パターン、型）を読む
3. 期待挙動の **失敗するテスト** を書く（RED）
4. テストを通す最小実装を書く（GREEN）
5. 全テストスイートを実行してリグレッションを確認する
6. ビルドを実行してコンパイルを確認する
7. 説明的なメッセージでコミットする
8. タスクを完了にマークして **停止する**

## 自律モード（`/build auto`）

仕様があり、タスク間の手動ステップを省きたい場合に使う。タスクごとの検証は省略しない。

1. **仕様必須** — `SPEC.md`（ルート）、`docs/SPEC.md`、`spec/` 配下のいずれか。なければ `/spec` を先に実行するよう伝えて停止する
2. **クリーンなベースライン** — `git status --porcelain` を確認。計画成果物（`SPEC.md`, `tasks/plan.md`, `tasks/todo.md`）以外の未コミット変更があれば、コミット・stash・方針確認を求めて停止する
3. **プラン** — `tasks/plan.md` がなければ `/plan` 相当で生成する
4. **1回の承認** — 全プランを提示し、明確な肯定（「承認」「go」「yes」）を待つ
5. **全タスクを依存順に実行** — 各タスクでデフォルトループ（RED → GREEN → リグレッション → ビルド → コミット → 完了）。1タスク1コミット
6. **ブロッカーで停止** — テスト不通過、仕様曖昧、高リスク変更（認証、決済、削除、シークレット等）は `skills/debugging-and-error-recovery` または `skills/doubt-driven-development` に従い、ユーザー確認を待つ
7. **最後にサマリー** — 完了タスク、追加テスト、コミット、スキップ事項を報告する

## UI / API 作業時の併用

- UI: `skills/frontend-ui-engineering/SKILL.md`
- API: `skills/api-and-interface-design/SKILL.md`
