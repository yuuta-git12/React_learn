# メインアプリ コンポーネント処理フロー

## 全体構成（ルーティング）

```
main.tsx (エントリーポイント)
  └─ BrowserRouter
       └─ Routes
            ├─ "/" → HomePage
            │       ├─ App (カウンター)
            │       ├─ App_hook_state (フック・ステート)
            │       ├─ App_child (子コンポーネント)
            │       ├─ App_bidirectional (双方向バインディング)
            │       ├─ App_form (フォーム入力)
            │       ├─ App_useEffect (useEffect)
            │       ├─ App_useCounter (useCounterカスタムフック)
            │       ├─ Calcmenu (計算メニュー)
            │       └─ App_usePersist (LocalStorage永続化)
            │
            └─ "/memo" → MainMemo → メモアプリ（別ドキュメント参照）
```

---

## main.tsx の処理フロー

```
1. [DOM要素取得]
   ├─ document.getElementById('root') でルート要素を取得
   └─ 要素が存在しない場合は Error をスロー

2. [Reactルート作成]
   └─ createRoot(rootElement) で React 18 のルートを生成

3. [グローバルカウンター管理]（学習用：通常はuseStateを使用）
   ├─ counter 変数を 0 で初期化
   └─ doAction 関数: counter++ してから render() を手動呼び出し

4. [HomePage コンポーネント]
   ├─ ナビゲーションリンク（→ メモアプリへ）を表示
   └─ 各学習用コンポーネントを順番にレンダリング

5. [render 関数]
   └─ root.render() で以下をレンダリング:
       ├─ StrictMode（開発時の問題検出）
       └─ BrowserRouter → Routes → Route 定義

6. [初回レンダリング]
   └─ render() を呼び出してアプリを起動
```

---

## App_usePersist (`App _usePersist.tsx`) の処理フロー

**役割**: UsePersist カスタムフックのデモコンポーネント

```
1. [AlertMessage コンポーネント]

   1-1. [State 初期化]
        ├─ name, mail, age を useState で初期化
        └─ UsePersist<Data>("mydata", null) で LocalStorage 永続化ステートを初期化

   1-2. [入力イベントハンドラ]
        ├─ onChangeName: name state を更新
        ├─ onChangeMail: mail state を更新
        └─ onChangeAge: Number() で数値変換して age state を更新

   1-3. [保存ボタンクリック] onAction
        ├─ { name, mail, age } の Data オブジェクトを作成
        └─ setMydata(data) で LocalStorage に保存

   1-4. [レンダリング]
        ├─ JSON.stringify(mydata) で保存データを表示
        └─ Name / Mail / Age の入力フィールドと Save ボタンを表示

2. [App_usePersist コンポーネント]
   └─ AlertMessage をラップして表示
```

---

## データ型定義

### Data (App _usePersist.tsx 内)
```typescript
interface Data {
    name: string   // ユーザー名
    mail: string   // メールアドレス
    age: number    // 年齢
}
```
