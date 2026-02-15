# App_useCounter.tsx 処理の流れ

## 概要

このファイルは**カスタムフック（独自フック）**の実装サンプルです。`useCounter`（カウンター機能）と`useTax`（税込み価格計算機能）の2つのカスタムフックを定義し、再利用可能な形で提供しています。

---

## ファイル構成

```
App_useCounter.tsx
├── useCounter()      # カスタムフック（カウンター）
├── useTax()          # カスタムフック（税込み価格計算）
├── CardMessage()     # カウンター・税計算表示コンポーネント
└── App_useCounter()  # メインコンポーネント
```

---

## 処理の流れ

### 1. インポート

```tsx
import { useState } from "react";
import './App.css';
```

- ReactからuseStateフックをインポート
- スタイルシートをインポート

---

### 2. カスタムフック `useCounter` の定義

```tsx
function useCounter():[number, ()=>void] {
    const [num, setNum] = useState(0);

    const count = () => {
        setNum(num + 1);
    }

    return [num, count];
}
```

#### 処理内容

1. `useState(0)`で状態変数`num`を初期値0で作成
2. `count`関数を定義（呼び出すと`num`を1増やす）
3. `[num, count]`を配列として返す

#### 戻り値の型

- `number`: 現在のカウント値
- `()=>void`: カウントを増やす関数

---

### 3. カスタムフック `useTax` の定義

```tsx
const useTax = (t1: number, t2: number):
    [number, ()=> number, ()=> number,
    React.Dispatch<React.SetStateAction<number>>] => {
    const [price, setPrice] = useState<number>(1000);
    const [tx1] = useState<number>(t1);
    const [tx2] = useState<number>(t2);

    const tax = (): number => {
        if (isNaN(price)) return 0;
        return Math.floor(price * (1.0 + tx1 / 100));
    }

    const reduced = (): number => {
        if (isNaN(price)) return 0;
        return Math.floor(price * (1.0 + tx2 / 100));
    }

    return [price, tax, reduced, setPrice];
}
```

#### 処理内容

1. `useState(1000)`で価格`price`を初期値1000で作成
2. `tx1`に標準税率、`tx2`に軽減税率を保持
3. `tax()`関数：標準税率で税込み価格を計算（価格が空の場合は0を返す）
4. `reduced()`関数：軽減税率で税込み価格を計算（価格が空の場合は0を返す）
5. `[price, tax, reduced, setPrice]`を配列として返す

#### 引数

- `t1`: 標準税率（例: 10 = 10%）
- `t2`: 軽減税率（例: 8 = 8%）

#### 戻り値の型

- `number`: 現在の価格
- `()=> number`: 標準税率計算関数
- `()=> number`: 軽減税率計算関数
- `React.Dispatch<...>`: 価格更新関数

---

### 4. コンポーネント `CardMessage` の定義

```tsx
function CardMessage(props: any){
    const [counter, add] = useCounter();
    const [price, tax, reduced, setPrice] = useTax(10, 8);

    const doChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let p = e.target.valueAsNumber;
        setPrice(p);
    }

    return(
        <div className="card">
            <h4>count: {counter}.</h4>
            <button onClick={add}>count</button>
            <p>通常税率:{tax()}円</p>
            <p>軽減税率:{reduced()}円</p>
            <label>Price:</label>
            <input type="number" onChange={doChange} value={price}/>
        </div>
    );
}
```

#### 処理内容

1. カスタムフック`useCounter`を呼び出し、カウンター機能を取得
2. カスタムフック`useTax(10, 8)`を呼び出し、税計算機能を取得
3. `doChange`関数で入力値の変更を処理
4. ボタンクリック時に`add`関数を実行（カウントアップ）
5. 税込み価格を表示（通常税率・軽減税率）
6. 価格入力フィールドを表示

---

### 5. メインコンポーネント `App_useCounter`

```tsx
function App_useCounter() {
    return (
        <div>
            <h1>React app</h1>
            <div className="countainer">
                <h2>Hooks sample page.</h2>
                <CardMessage />
            </div>
        </div>
    );
}
```

#### 処理内容

1. ページ全体のレイアウトを定義
2. `CardMessage`コンポーネントを配置

---

## 実行時のフロー図

```
[アプリ起動]
    │
    ▼
[App_useCounter がレンダリング]
    │
    ▼
[CardMessage がレンダリング]
    │
    ├─→ [useCounter が呼び出される]
    │       │
    │       ├─→ useState(0) で num = 0 を初期化
    │       └─→ [num, count] を返す
    │
    └─→ [useTax(10, 8) が呼び出される]
            │
            ├─→ useState(1000) で price = 1000 を初期化
            ├─→ tx1 = 10（標準税率）, tx2 = 8（軽減税率）を設定
            └─→ [price, tax, reduced, setPrice] を返す
    │
    ▼
[CardMessage が初期状態で表示]
    ├─→ counter = 0
    ├─→ price = 1000
    ├─→ 通常税率: 1100円（1000 × 1.10）
    └─→ 軽減税率: 1080円（1000 × 1.08）
```

---

## ユーザー操作時のフロー

### カウントボタンクリック時

```
[ユーザーがcountボタンをクリック]
    │
    ▼
[add() 関数が実行される]
    │
    ▼
[setNum(num + 1) で状態更新]
    │
    ▼
[CardMessage が再レンダリング]
    │
    ▼
[counter がインクリメントされて表示]
```

### 価格入力変更時

```
[ユーザーが価格を入力]
    │
    ▼
[doChange() が実行される]
    │
    ▼
[e.target.valueAsNumber で数値を取得]
    │
    ├─→ [数値が有効な場合]
    │       │
    │       ▼
    │   [setPrice(p) で状態更新]
    │       │
    │       ▼
    │   [CardMessage が再レンダリング]
    │       │
    │       ▼
    │   [税込み価格が再計算されて表示]
    │
    └─→ [入力が空の場合（NaN）]
            │
            ▼
        [setPrice(NaN) で状態更新]
            │
            ▼
        [tax(), reduced() が 0 を返す]
            │
            ▼
        [通常税率: 0円, 軽減税率: 0円 と表示]
```

---

## カスタムフックのメリット

1. **再利用性**: 同じロジックを複数のコンポーネントで使い回せる
2. **関心の分離**: 状態管理ロジックをコンポーネントから分離
3. **テスタビリティ**: フック単体でテストが可能
4. **可読性**: コンポーネントがシンプルになる

---

## 注意点

- カスタムフックは必ず`use`で始める命名規則
- フックのルール（トップレベルでのみ呼び出す等）はカスタムフックにも適用される
- 入力値が空（NaN）の場合の処理を考慮する必要がある（本サンプルでは0を返す）
