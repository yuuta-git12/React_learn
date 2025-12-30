# React + Webpack

# コンテナ内への入り方
- 以下のコマンド実行でNode.jsのコンテナに入る
```
docker compose exec -it webpack sh  
```


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