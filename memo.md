# 開発環境作成・起動の手順
利用手順（まだVite未作成なら）:
1) npm create vite@latest . -- --template react（空ディレクトリ推奨）
2) npm install
3) docker-compose up --build → http://localhost:5173 で確認。

# コンテナ内への入り方
- 以下のコマンド実行でNode.jsのコンテナに入る
```
docker compose exec -it web sh  
```

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

# React DOM
- DOM(Document Object Model)：
  - HTMLやXML文書をプログラムから操作するためのAPI（インターフェース）
  - ブラウザがHTMLを読み込むと、その構造をツリー状のオブジェクトとして表現する
  - JavaScriptを使ってDOMを操作することで、ページの内容を動的に変更できる
  - 例：要素の追加・削除、スタイルの変更、イベントの処理など
  - 欠点：DOMの操作のたびに**ページ全体が更新される**
- React DOMは、Reactコンポーネントを実際のDOMに反映させるためのライブラリ
- Reactは仮想DOM（Virtual DOM）を使用して効率的にDOMを更新する
- 仮想DOM内で操作を行う。レンダリング（ブラウザへの表示）は１回で済む

# Reactによる操作
1. Webページにあるエレメント(要素)からReact DOMのエレメントを作成
2. React DOMのエレメントを使って表示を操作
3. React DOMエレメントをレンダリングしてWebページの表示を更新する

# エレメントの作成
- Reactエレメントの作成記述
```
変数 = React.createElement( 要素名(タグの名前), {オプション}, コンテンツ);
```
- [オプション}には属性を指定することができる
  - ここに値を用意することで、作成されたエレメントに属性を指定することができる
  - 属性：id,name,style 

# レンダリングした表示の作成
- レンダリング表示の記述
```
ルート.render( 作成したReactエレメント );
```

# 非同期
- 処理の完了を待たずに、次の処理進むこと

- 指定したスクリプトファイルを読み込み完了（使える状態）するまで待ってから値を受け取る
```
変数 = await import(スクリプトファイルの指定);
```

- 変数の中身
  - モジュールの本体(オブジェクトの集合)
```
{
  default: ・・・
  foo:・・・
  bar:・・・
}
```

# windowオブジェクト
- Webブラウザ版javascriptのグローバルオブジェクト

# Node.js
- JavaScriptエンジンと呼ばれるプログラム
- JavaScriptのコードをWebブラウザ上でなくても実行できる
## バージョンについて
- 偶数バージョン：長期間、安定したサポートを受けれられるバージョン
- 奇数バージョン：短期間のサポートだが、新しい機能などを盛り込んだバージョン
- バージョンの確認方法
```
node --version
```

# npm
- Node.jsのツールやパッケージをインストール・管理するためのツール
- プロジェクトの実行方法
  - 作成したReactプロジェクトの実行
```
npm start
```
- 作成したプロジェクトのビルド
  - 実際にWebサーバーにアップロードできる形にする
```
npm run build
```
- distフォルダに保存されたファイルをすべてWebサーバーにアップロードして、index.htmlにアクセスすることで<br>プロジェクトで作成したアプリが動く

# React開発に必要なもののインストール
## パッケージの初期化方法
- 以下のコマンドをプロジェクト内のフォルダで実行することで、プロジェクト用のパッケージ設定情報が作成できる
- 設定ファイル「package.json」が作成される
```
npm init -y //-yオプション：初期化時に聞かれる質問をデフォルトで自動設定する
```
## 最新版のReactとReact DOMのインストール
```
npm install react@latest react-dom@latest
```
## Babel・Webpackのインストール
- 「Babel」・「Webpack」というパッケージのインストール
- 全部で8つのパッケージをインストール
```
npm install --save-dev @babel/core @babel/preset-env
npm install --save-dev @babel/preset-react babel-loader
npm install --save-dev webpack webpack-cli
npm install --save-dev webpack-dev-server
npm install --save-dev html-webpack-plugin
```
- TypeScriptを使用する場合はこちら
```
npm install --save-dev @babel/core @babel/preset-env
npm install --save-dev @babel/preset-react babel-loader
npm install --save-dev @babel/preset-typescript
npm install --save-dev webpack webpack-cli
npm install --save-dev webpack-dev-server
npm install --save-dev html-webpack-plugin
```

### Babel
- ReactのコードをJavaScriptのコードに変換する
- 専用の設定情報ファイル「.babelrc」というファイルを作成する必要がある

### Webpack
- プロジェクトからWebアプリケーションのファイルを生成するのに必要
- 「webpack.config.js」という設定情報ファイルが必要

## TypeScriptのインストール
- ReactでTypeScriptを使用する場合、以下のコマンド実行でTypeScriptとReact関係のTypeScript用型定義のパッケージがインストールできる
```
npm install --save-dev typescript @types/react @types/react-dom
```

### TypeScript用設定ファイルのさkすえい
- 「tsconfig.json」という名前のファイルをプロジェクトフォルダー内に作成する