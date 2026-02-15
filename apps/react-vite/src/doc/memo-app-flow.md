# メモアプリ コンポーネント処理フロー

## 全体構成

```
main.tsx (ルーティング)
  └─ /memo → MainMemo (main_memo.tsx)
               └─ App_memo (App_memo.tsx)
                    └─ MemoPage (memo/MemoPage.tsx)
                         ├─ AddForm (memo/AddForm.tsx)  ... メモ追加
                         ├─ DelForm (memo/DelForm.tsx)  ... メモ削除
                         └─ Memo (memo/Memo.tsx)        ... メモ一覧表示
                              └─ Item (memo/Item.tsx)   ... 各メモ行
```

## データフロー

```
LocalStorage ("memo" キー)
    ↕ UsePersist カスタムフック
AddForm / DelForm / Memo （各コンポーネントが独立してUsePersistでアクセス）
```

---

## 各コンポーネントの処理フロー

### 1. MainMemo (`main_memo.tsx`)

**役割**: メモページのエントリーポイント

```
1. ナビゲーションリンク（← メインページに戻る）を表示
2. ページタイトル「メモページ」を表示
3. App_memo コンポーネントをレンダリング
```

### 2. App_memo (`App_memo.tsx`)

**役割**: メモアプリのラッパーコンポーネント

```
1. <h1>React</h1> を表示
2. containerクラスのdiv内に <h2>Memo.</h2> を表示
3. MemoPage コンポーネントをレンダリング
```

### 3. MemoPage (`memo/MemoPage.tsx`)

**役割**: メモアプリ全体のレイアウト管理

```
1. alertエリア内に以下を配置:
   ├─ AddForm（メモ追加フォーム）
   └─ DelForm（メモ削除フォーム）
2. alertエリアの下に Memo（メモ一覧）を配置
```

### 4. AddForm (`memo/AddForm.tsx`)

**役割**: 新しいメモを追加するフォーム

```
1. [初期化]
   ├─ UsePersist で LocalStorage の "memo" キーからデータ取得
   └─ useState で入力値(message)を空文字で初期化

2. [ユーザー入力時] doChange
   └─ input の onChange → message state を更新

3. [フォーム送信時] doAction
   ├─ e.preventDefault() でページ遷移を防止
   ├─ MemoData オブジェクトを作成 { message, created: new Date() }
   ├─ memo 配列の先頭に unshift で追加
   ├─ setMemo で LocalStorage に保存
   └─ window.location.reload() でページをリロード（再レンダリング）
```

### 5. DelForm (`memo/DelForm.tsx`)

**役割**: 既存のメモを削除するフォーム

```
1. [初期化]
   ├─ UsePersist で LocalStorage の "memo" キーからデータ取得
   └─ useState で選択インデックス(num)を 0 で初期化

2. [セレクトボックス生成]
   └─ memo 配列を map して option 要素の配列を生成
       └─ 各 option にはメッセージの先頭10文字を表示

3. [選択変更時] doChange
   └─ select の onChange → num state を更新（+演算子で数値変換）

4. [フォーム送信時] doAction
   ├─ memo.filter で num と一致しないインデックスの要素だけ残す
   ├─ setMemo で フィルタ結果を LocalStorage に保存
   └─ setNum(0) で選択を先頭に戻す
```

### 6. Memo (`memo/Memo.tsx`)

**役割**: メモ一覧をテーブル形式で表示

```
1. [初期化]
   └─ UsePersist で LocalStorage の "memo" キーからデータ取得

2. [一覧生成]
   └─ memo 配列を map して Item コンポーネントの配列に変換
       └─ 各 Item に value(メモデータ) と index(番号) を渡す

3. [レンダリング]
   └─ <table> 内の <tbody> に Item 配列を展開
```

### 7. Item (`memo/Item.tsx`)

**役割**: メモ1件分の行を表示

```
1. [日時フォーマット]
   ├─ Date.parse で created 文字列を Date オブジェクトに変換
   └─ 「月/日 時:分」形式の文字列を生成

2. [レンダリング]
   └─ <tr> 内に以下を配置:
       ├─ <th> No, {index}（番号）
       ├─ <td> {message}（メッセージ内容）
       └─ <td> {f}（作成日時）
```

### 8. MemoData (`memo/MemoData.tsx`)

**役割**: メモデータの型定義（インターフェース）

```
interface MemoData {
    message: string   // メモの内容
    created: Date     // 作成日時
}
```

---

## 補足: UsePersist カスタムフック

メモアプリの各コンポーネント（AddForm, DelForm, Memo）はそれぞれ独立して `UsePersist` フックを使用し、LocalStorage の同じキー `"memo"` にアクセスしている。これにより、データの永続化が実現されている。
