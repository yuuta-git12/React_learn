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