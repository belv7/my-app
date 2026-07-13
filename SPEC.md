# City Secretary / Task Board — SPEC

## 概要

タスク完了で街が育つゲーミフィケーション型タスク管理ダッシュボード。
Express + EJS + Prisma + PostgreSQL で構築する。

## UI ディレクション

- **表現テーマ:** ドット絵の街（ピクセルアート）
- **目的:** タスク完了による街の成長を、ひと目で楽しく把握できるようにする。
- **適用範囲:** 街の建物・住民・自然物・資源アイコンと、完了時のフィードバック。
- **制約:** タスク入力・編集・一覧の可読性を優先し、ピクセル表現は情報を妨げない装飾として使う。モバイルでも操作要素は 44px 以上を確保し、`prefers-reduced-motion` を尊重する。

## ユーザーストーリー

1. ユーザーはタスクを追加し、優先度・カテゴリ・締切を設定できる
2. ユーザーはタスクを完了・未完了に切り替え、複製・削除できる
3. ユーザーはタスクを編集できる
4. ダッシュボードで完了率・街レベル・資源（XP/コイン/資材）を確認できる
5. 街のビジュアルが進捗に応じて変化する

## データモデル（Task）

| フィールド | 型 | 説明 |
|-----------|-----|------|
| title | String | 必須 |
| description | String | 任意、デフォルト "" |
| category | String | study/work/exercise/hobby/chores/general |
| priority | Int | 1-4（1=最優先） |
| completed | Boolean | 完了フラグ |
| dueDate | DateTime? | 締切 |
| progressRate | Int | 0-100 |
| plannedMinutes | Int | 予定時間 |
| actualMinutes | Int | 実績時間 |
| xpReward / coinReward / materialReward | Int | 完了時報酬 |

## API

| メソッド | パス | 説明 |
|---------|------|------|
| GET | / | ダッシュボード表示 |
| POST | /tasks | タスク追加 |
| POST | /tasks/:id/toggle | 完了切替 |
| POST | /tasks/:id/duplicate | 複製 |
| POST | /tasks/:id/delete | 削除 |
| POST | /tasks/:id/edit | タスク編集 |

## ダッシュボード統計（算出ロジック）

- completionRate: 完了数 / 総数 × 100
- cityLevel: floor(完了数 / 3) + 1
- userLevel: floor(XP / 30) + 1
- cityPopulation: 10 + 完了数 × 4
- buildings: floor(完了数 / 2) + 1

## 非スコープ（今回やらない）

- 実際の AI 秘書連携
- ユーザー認証
- 日付ベースの実ストリーク追跡
- React フロントエンド移行

## 完了条件

- [x] マイグレーションがスキーマと一致
- [x] ダッシュボードロジックにユニットテストあり
- [x] タスク CRUD（追加・編集・完了・複製・削除）が動作
- [x] 街ビジュアルが進捗に連動
- [x] `npm test` がパス
