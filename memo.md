# 開発環境作成・起動の手順
利用手順（まだVite未作成なら）:
1) npm create vite@latest . -- --template react（空ディレクトリ推奨）
2) npm install
3) docker-compose up --build → http://localhost:5173 で確認。


# npm
- JavaScriptのパッケージ管理ツール

# import
- 指定したスクリプトファイルからモジュールを読み込むための記述

```
//　例
import React from ファイルのパス
```
# CDN(Content Delivery Network)
- JavaScriptのスクリプトなどをオンラインで配布するサイト

# モジュール
- React,ReactDOMClient
  - Reactの最も基本となるモジュール

# Reactはタグの内容を書き換える
- Reactはもともと用意されているHTMLタグの一部を書き換えて独自の表示を組み込むことができる