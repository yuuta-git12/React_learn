import React, { useState, useCallback } from "react";
import './App.css';

// Counterコンポーネントのprops型定義
type CounterProps = {
    count: number;
    name: string;
    increment: () => void;
};

/**
 * React.memoでラップしたカウンターコンポーネント
 * React.memoの動作:
 *   - propsが前回と同じ場合、再レンダリングをスキップする（浅い比較）
 *   - ただし、propsに関数を渡す場合、毎回新しい関数が生成されると
 *     参照が異なるためmemoの効果が無効化される
 *   - そのため、親コンポーネントでuseCallbackを使って関数をメモ化する必要がある
 */
const Counter: React.FC<CounterProps> =
    React.memo(({ count, name, increment}) => {
        // 再レンダリングの発生を確認するためのログ出力
        console.log(`[${name}] count: ${count}`);
        return (
            <div className="card">
                <p>[{name}] Count: {count}</p>
                <button onClick={increment}>Increment</button>
            </div>
        );
    });

/**
 * useCallbackフックの学習用コンポーネント
 *
 * useCallbackの動作:
 *   - 第1引数: メモ化したいコールバック関数
 *   - 第2引数: 依存配列 — この値が変わったときだけ関数を再生成する
 *   - React.memoと組み合わせることで、子コンポーネントの不要な再レンダリングを防げる
 *
 * このコンポーネントでの確認ポイント（コンソールで確認）:
 *   - increment1（useCallback有り）: count1変更時のみ1stが再レンダリング
 *   - increment2（useCallback無し）: どちらのcountを変更しても2ndが再レンダリング
 *
 * ※ 現在のincrement1は依存配列に[count1]を指定しているため、count1変更のたびに
 *   関数が再生成される。関数型アップデート setCount1(prev => prev + 1) を使えば
 *   依存配列を空[]にでき、より効果的なメモ化が実現できる
 */
function App_useCallback() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    // useCallbackでincrement関数をメモ化
    // 依存配列[count1]が変わらない限り、同じ関数参照を返す
    // ※ count1が依存配列に含まれるため、count1変更時には関数が再生成される
    // 第一引数：関数（例：setCount1(prev => prev + 1) 第二引数：依存配列(例：[])
    const increment1 = useCallback(() => {
        setCount1(prev => prev + 1);
    },[]);

    // useCallbackを使わない場合（比較用）
    // レンダリングのたびに新しい関数が生成される
    // → React.memoでラップしたCounterに渡しても、毎回propsが変わるためmemoが無効化される
    const increment2 = () => {
        setCount2(count2 + 1);
    };

    return (
        <div>
            <h1>useCallbackの例</h1>
            <div className="container">
                {/* useCallback有り: count2変更時にはCounterの再レンダリングをスキップ */}
                <h2>Counter with useCallback</h2>
                <Counter count={count1} name="1st" increment={increment1} />
                {/* useCallback無し: どのステート変更でも毎回再レンダリングされる */}
                <h2>Counter without useCallback</h2>
                <Counter count={count2} name="2nd" increment={increment2} />
            </div>
        </div>
    )
}
export default App_useCallback;
