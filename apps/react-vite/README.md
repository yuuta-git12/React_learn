# React + Vite

# 開発環境作成・起動の手順
利用手順（まだVite未作成なら）:
1) npm create vite@latest . -- --template react（空ディレクトリ推奨）
2) npm install
3) docker-compose up --build → http://localhost:5173 で確認。


# コンテナ内への入り方
- 以下のコマンド実行でNode.jsのコンテナに入る
```
docker compose exec -it vite sh  
```

# Vite
- フロントエンド開発用のビルドツール
## 主な特徴
1. 高速な開発サーバー
- 起動が速い（数秒）
- ホットモジュールリプレースメント（HMR）が高速
- 変更が即座に反映される
2. ネイティブESモジュール対応
- ブラウザのESモジュールを直接利用
- バンドルせずに開発（本番ビルド時のみバンドル）
- 依存関係は事前バンドル（esbuild使用）
3. 高速な本番ビルド
- esbuild（Go製）で依存関係を事前バンドル
- Rollupで本番ビルド
- コード分割と最適化を自動化

## Viteでのプロジェクト作成
- プロジェクト作成のコマンド
```
npm create vite@latest
```
- プロジェクト名を入力
- フレームワークを選択
- 使用言語を選択
- プロジェクト生成
- `npm iinstall`を実行しパッケージ類をインストール

### プロジェクトの実行
- `npm run dev`でプロジェクトを動かす