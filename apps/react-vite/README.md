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
