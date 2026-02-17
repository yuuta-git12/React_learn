import { useState, useMemo } from 'react';
import './App.css';

/**
 * 1からnまでの合計を計算する関数
 * useMemoによるメモ化の効果を確認するため、意図的に毎回ループで計算している
 * @param n - 合計を求める上限値
 * @returns 1からnまでの合計値（n < 1 の場合は 0）
 */
function calculateTotal(n: number): number {
    if(n < 1 ) return 0;
    let result = 0;
    for(let i = 1; i<= n; i++){
        result += i;
    }

    console.log('calculateTotal(' + n + ') =' + result);
    return result;
}

/**
 * useMemoフックの学習用コンポーネント
 *
 * useMemoの動作:
 *   - 第1引数: メモ化したい計算処理（コールバック関数）
 *   - 第2引数: 依存配列 — この値が変わったときだけ再計算される
 *   - 依存配列の値が変わらなければ、前回の計算結果をキャッシュから返す
 *
 * このコンポーネントでの確認ポイント:
 *   - numberが変わったときだけcalculateTotalが実行される（コンソールで確認可能）
 *   - showTotalの切り替えでは再計算されない（useMemoの効果）
 */
function App_useMemo(){
    const [number, setNumber] = useState<number>(0);
    const [showTotal, setShowTotal] = useState<boolean>(false);

    // useMemoの処理部分
    // 依存配列[number]により、numberステート更新時にのみcalculateTotalを再実行する
    // showTotalの変更など、他のステート更新では再計算をスキップする
    const total = useMemo(()=>{
        return calculateTotal(number);
    },[number]);

    // useMemoフックを使わない場合（比較用）
    // この書き方だと、showTotalの切り替え時にも毎回calculateTotalが実行される
    // const total = calculateTotal(number);

    return (
        <div>
            <h1>useMemoの例</h1>
            <div className='container'>
                <p>数字を入力してください：</p>
                <div>
                    {/* 注意: parseIntの結果がNaNになる場合（入力が空の場合など）の対策が未実装 */}
                    <input type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value, 10) || 0)}/>
                    {/* showTotalの切り替え時、useMemoにより再計算が発生しないことをコンソールで確認できる */}
                    <button onClick={() => setShowTotal(!showTotal)}>
                        Show/Hide Total
                    </button>
                </div>
                {/* 条件付きレンダリング: showTotalがtrueの場合のみ合計を表示 */}
                {showTotal && (
                    <p className='card'>
                        {number}の合計は:{total}
                    </p>
                )}
            </div>
        </div>
    )
}
export default App_useMemo;
