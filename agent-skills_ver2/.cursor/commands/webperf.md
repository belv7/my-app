# /webperf — Web パフォーマンス監査

**必読:** `agents/web-performance-auditor.md` を全文読み、そのフレームワークで監査する。

## 対象

ブラウザ向けの Web アプリケーションのみ。CLI・サーバーのみのコードには使わない。

## モード判定

**Deep モード** — 以下のいずれかがある場合:
- Lighthouse JSON レポート
- PageSpeed Insights JSON
- DevTools パフォーマンストレース
- 対象 URL + Cursor ブラウザ MCP（`browser_*` ツール）での計測

**Quick モード** — 上記がない場合のデフォルト。ソースコードの構造的反パターンをスキャンし、各所見に `potential impact` とラベル付けする。

## 手順

1. `agents/web-performance-auditor.md` のペルソナとして振る舞う
2. レビュー対象のファイル・コンポーネント・差分を特定する
3. 利用可能な計測データ（URL、Lighthouse JSON 等）があれば Deep で分析する
4. スコアカード（実測値のみ）、ランク付き所見、良い点、推奨事項を出力する

## 併用

- `skills/performance-optimization/SKILL.md`
- `references/performance-checklist.md`
- ブラウザ検証: `skills/browser-testing-with-devtools/SKILL.md`

## ユーザー追加入力

コマンド名の後のテキスト（`$ARGUMENTS`）を URL、ページ名、または計測ファイルのパスとして扱う。
