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

# React プロジェクトの中身
## フォルダ関係
- 「node_modules」フォルダ：npmで管理されるモジュール類がまとめてある
- 「public」フォルダ：公開フォルダ。HTML、CSSなど公開されるフォルダ類が保存されている
- 「src」フォルダ：Reactで作成したファイルがまとめられている
## ファイル類
- .gitignore：Gitの設定ファイル（コミットしたくないファイル、フォルダの設定を行う）
- package.json：npmでパッケージ管理するための設定ファイル
- package-lock.json：npmに関する設定を記述したファイル
- tsconfig.json：TypeScriptの設定ファイル

## package.jsonの構造
```
{
  "name": "プロジェクト名",
  "private": 非公開か否か(true：非公開),
  "version": "プロジェクトのバージョン",
  "scripts": { コマンドの定義　},
  "dependencies": {　本番環境での依存パッケージ　},
  "devDependencies": {開発環境での依存パッケージ},
  "eslintConfig":{eslintの設定},
  browserlist:{ブラウザのリスト}
}
```
- 依存パッケージ：「あるパッケージを動かすのに必要なパッケージ」
  - TypeScript関係のパッケージの前には「@types」と書かれている
- 「dependencies」の内容の書き換え
  - 「dependencies」の内容を書き換えることで、パッケージのバージョンを変更することが可能
  - 書き換え後は`npm install`を実行しパッケージの再インストールが必要
- 「scripts」でのコマンド定義
  - `npm run`で実行するコマンドを定義する場所
    - 例) `npm run 定義したコマンド`で「scripts」内に定義したコマンドを実行できる
### package.jsonの違い
- package.jsonはReactプロジェクトの作成方法によって、内容が異なる
  - webpack
  - Create Reacte App：依存パッケージの記述に「devDependencies」がない
  - Vite