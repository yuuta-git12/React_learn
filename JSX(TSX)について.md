# JSX(TSX)
- JSX：JavaSctipt XMLの略
- TSX：TypeSctipt XMLの略
- JavaScript(TypeScript)内でXML/HTMLのようなタグによる記述を可能にする文法拡張

# JSX(TSX)を処理しているライブラリ
- Create React App：Babel
- Vite：esbuild(TypeScirpt,TSXをトランスパイルする。型チェックはしない)

# JSX(TSX)使用時の注意点
## renderできるエレメントは１つだけを意識する
- `render`渡せるエレメントは１つだけ、複数のタグが存在するHTMLは複数エレメントがあると判断され、文法エラーを起こす
- 複数タグが存在する場合は`<div>`などで一つにまとめる

# Windowオブジェクト
- 読み込んだオブジェクトをwindowのプロパティに保管し、モジュール外で使えるようにする
- `React`,`ReactDOMClient`をグローバル変数として使用できるようにする
```javascript
import React from "https://esm.sh/react@19.2.0"
import ReactDOMClient from "https://esm.sh/react-dom@19.2.0/client"
window.React = React;
window.ReactDOMClient = ReactDOMClient;
```

# コンポーネントの属性を使って値を受け渡したい場合
- コンポーネント関数で定義されている**props**を利用する
- propsはオブジェクトである
- propsにはコンポーネントの属性が保管されている
- コンポーネント関数渡す`props`の内容を**インターフェース**を使って定義する
- 定義の順番
  - インターフェースの定義
  - コンポーネント関数の定義
## インターフェース
- オブジェクトの内容を定義するもの
- 実際にオブジェクトを作成するわけではない
- インターフェースに記述した内容のオブジェクトをこういう名前で定義するというもの
## スタイルの設定
- コンポーネントのスタイルは、コンポーネント内でstyle属性を指定して行うのが基本

# JSXでの構文的な書き方
- JSXでは条件分岐・繰り返しなど、構文のような書き方をする機能はない
  - JSXは「タグをそのまま値として記述する」ものなので、構文のような機能はない
## 真偽値地で表示を制御
- 条件分岐に相当する書き方
```
{ 真偽値 && JSXの記述}
```
- 三項演算子を用いた書き方
```
{ 真偽値? true時の表示 : false時の表示　}
```
## 繰り返し表示
### 配列を使った表示
- 事前に<ul>,<ol>用の<li>を並べた配列を作成する
```
const list_data = [
  <li className='msg'>One</li>,
  <li className='msg'>Two</li>,
  <li className='msg'>Three</li>,
]
```
- 作成したリストデータをJSX内に埋め込む
```
{/* リスト表示 */}
<ul>
{list_data}
</ul>
```
### mapを使った表示
- 「用意したものを表示するだけ」でなく、「あらかじめ用紙したデータを元に表示する内容を作成」する場合
- この場合は、`map`メソッドを使用する
  - `map`メソッドは配列の各要素を元に別の配列を作成する
```
配列オブジェクト.map( value => 新しい項目)
オブジェクト.map(引数 => 戻り値)
<!-- 例 -->
let A = [1,2,5];
let B = A.map( value => value * 2);
B = [2,4,10]となる
```