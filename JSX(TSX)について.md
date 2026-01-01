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