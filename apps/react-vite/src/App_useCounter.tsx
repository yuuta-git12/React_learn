/**
 * カスタムフック（独自フック）のサンプル
 * useCounter: カウンター機能を再利用可能な形で提供する
 * useTax: 税込み価格計算機能を再利用可能な形で提供する
 */
import { useState } from "react";
import './App.css';

/**
 * カスタムフック: useCounter
 * カウンター機能を提供する独自フック
 * @returns [number, ()=>void] - [現在のカウント値, カウントを増やす関数]
 * 例) [counter, add]
 */
function useCounter():[number, ()=>void] {
    // カウント値を管理する状態変数（初期値: 0）
    const [num, setNum] = useState(0);

    // カウントを1増やす関数
    const count = () => {
        setNum(num + 1);
    }

    // 現在値とカウントアップ関数を配列で返す
    return [num, count];
}


/**
 * カスタムフック: useTax
 * 税込み価格を計算する機能を提供する独自フック
 * 標準税率と軽減税率の両方に対応した税込み価格計算が可能
 *
 * @param t1 - 標準税率（例: 10 = 10%）
 * @param t2 - 軽減税率（例: 8 = 8%）
 * @returns [price, tax, reduced, setPrice]
 *   - price: 現在の価格（初期値: 1000）
 *   - tax: 標準税率で税込み価格を計算する関数
 *   - reduced: 軽減税率で税込み価格を計算する関数
 *   - setPrice: 価格を更新するためのセッター関数
 *
 * 使用例:
 *   const [price, tax, reduced, setPrice] = useTax(10, 8);
 *   console.log(tax());     // 標準税率10%で税込み価格を取得
 *   console.log(reduced()); // 軽減税率8%で税込み価格を取得
 */
const useTax = (t1: number, t2:number):
    [number, ()=> number, ()=> number,
    React.Dispatch<React.SetStateAction<number>>] => {
    // 価格を管理する状態変数（初期値: 1000）
    const [price, setPrice] = useState<number>(1000);
    // 標準税率を保持する状態変数
    const [tx1] = useState<number>(t1);
    // 軽減税率を保持する状態変数
    const [tx2] = useState<number>(t2);

    /**
     * 標準税率で税込み価格を計算する
     * @returns 標準税率適用後の税込み価格（小数点以下切り捨て）、価格が無効な場合は0
     */
    const tax = (): number => {
        if (isNaN(price)) return 0;
        return Math.floor(price * (1.0 + tx1 / 100));
    }

    /**
     * 軽減税率で税込み価格を計算する
     * @returns 軽減税率適用後の税込み価格（小数点以下切り捨て）、価格が無効な場合は0
     */
    const reduced = (): number => {
        if (isNaN(price)) return 0;
        return Math.floor(price * (1.0 + tx2 / 100));
    }

    // [現在価格, 標準税率計算関数, 軽減税率計算関数, 価格更新関数] を返す
    return [price ,tax ,reduced, setPrice];
}

/**
 * CardMessageコンポーネント
 * カスタムフックuseCounterとuseTaxを使用してカウンター機能と税計算機能を表示する
 */
function CardMessage(){
    // カスタムフックからカウント値と増加関数を取得
    const [counter, add] = useCounter();

    // カスタムフックから価格、税計算関数、価格更新関数を取得（標準税率10%、軽減税率8%）
    const [price,tax,reduced,setPrice] = useTax(10,8);

    /**
     * 価格入力フィールドの変更イベントハンドラ
     * @param e - 入力イベント
     */
    const doChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 入力値を数値として取得（空の場合はNaN）
        let p = e.target.valueAsNumber;
        setPrice(p);
    }

    return(
        <div className="card">
            {/* 現在のカウント値を表示 */}
            <h4>count: {counter}.</h4>
            {/* クリックでadd関数を実行してカウントアップ */}
            <button onClick={add}>count</button>
            {/* 標準税率（10%）での税込み価格を表示（空の場合は0円） */}
            <p>通常税率:{tax()}円</p>
            {/* 軽減税率（8%）での税込み価格を表示（空の場合は0円） */}
            <p>軽減税率:{reduced()}円</p>
            {/* 価格入力フィールド */}
            <label>Price:</label>
            <input type="number" onChange={doChange} value={price}/>
        </div>
    );
}



/**
 * App_useCounterコンポーネント
 * カスタムフックのサンプルページのメインコンポーネント
 */
function App_useCounter() {
    return (
        <div>
            <h1>React app</h1>
            <div className="countainer">
                <h2>Hooks sample page.</h2>
                {/* カウンター機能を持つカードコンポーネントを配置 */}
                <CardMessage />
            </div>
        </div>
    );
}

export default App_useCounter;