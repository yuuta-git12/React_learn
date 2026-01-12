# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

React学習用リポジトリ。異なるビルドツール（CDN、Create React App、Vite、Webpack）でReactを実装した4つのプロジェクトを含む。

## アーキテクチャ

```
apps/
├── react-cdn/      # CDN形式（ビルド不要、HTMLファイルを直接開く）
├── react-cra/      # Create React App（TypeScript）
├── react-vite/     # Vite（TypeScript）
└── react-webpack/  # Webpack + Babel（JavaScript）
```

各プロジェクトは独立しており、同じReactコンポーネントを異なる環境で実装している。

## 開発コマンド

### Docker環境（推奨）

```bash
# 全サービス起動
docker-compose up

# 個別サービス起動
docker-compose up vite      # localhost:5173
docker-compose up webpack   # localhost:3000
docker-compose up cra       # localhost:3001
```

### ローカル環境

各アプリディレクトリで実行：

```bash
# react-vite
cd apps/react-vite
npm install
npm run dev         # 開発サーバー
npm run build       # ビルド
npm run lint        # ESLint

# react-cra
cd apps/react-cra
npm install
npm start           # 開発サーバー
npm run build       # ビルド
npm test            # Jest テスト

# react-webpack
cd apps/react-webpack
npm install
npm start           # 開発サーバー
npm run build       # 本番ビルド
```

### react-cdn

`apps/react-cdn/react-app.html`をブラウザで直接開く。ESM経由でReact 19を読み込み、Babel Standaloneでトランスパイル。

## 注意事項

- react-vite と react-cra は TypeScript、react-webpack は JavaScript
- 共通ノート（`共通ノート/`）にReact学習メモあり

## CLAUDEルール
- ユーザーに選択、判断を求める場合はAskUserQuestionツールを使うこと