import { useState, useEffect, JSX } from 'react';
import './App.css';

/**
 * アラートメッセージを表示する子コンポーネント
 * @param props.msg - 表示するJSX要素（HTML要素を含むReactコンポーネント）
 */
function AlertMessage(props: {msg: JSX.Element}){
    return(
        <div className="alert">
            <h4>{props.msg}</h4>
        </div>
    );
}

/**
 * useEffectフックのサンプルコンポーネント
 * 入力された金額に対して軽減税率(8%)と通常税率(10%)を計算して表示する
 */
function App_useEffect(){
    // 入力された金額を保持するState（初期値: 0）
    const [val, setVal] = useState(0);
    // 軽減税率(8%)適用後の金額を保持するState
    const [tax1, setTax1] = useState(0);
    // 通常税率(10%)適用後の金額を保持するState
    const [tax2, setTax2] = useState(0);
    // 計算結果を表示するためのJSX要素を保持するState
    const [msg, setMsg] = useState(<p>set a number...</p>);

    /**
     * input要素の値が変更された時に呼ばれるハンドラ
     * +演算子で文字列を数値に変換してvalを更新
     */
    const doChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVal(+event.target.value);
    }

    /**
     * useEffect #1: 税額表示メッセージを更新
     *
     * 【実行タイミング】
     * ✅ 依存配列 [tax1, tax2] が指定されている
     * → tax1またはtax2が変更された時のみ実行される（Good!）
     *
     * 【処理内容】
     * tax1とtax2の値を使って表示用のJSX要素を生成し、msgを更新
     */
    useEffect(() => {
        let res = <div>
            <p>軽減税率(8%): {tax1} 円</p>
            <p>通有情税率(10%): {tax2} 円</p>
        </div>
        setMsg(res);
    },[tax1,tax2])

    /**
     * useEffect #2: 軽減税率(8%)を計算
     *
     * 【実行タイミング】
     * ✅ 依存配列 [val] が指定されている
     * → valが変更された時のみ実行される（Good!）
     *
     * 【処理内容】
     * valに1.08を掛けて小数点以下を切り捨て、tax1を更新
     */
    useEffect(() => {
        setTax1(Math.floor(val * 1.08));
    },[val]);

    /**
     * useEffect #3: 通常税率(10%)を計算
     *
     * 【実行タイミング】
     * ✅ 依存配列 [val] が指定されている
     * → valが変更された時のみ実行される（Good!）
     *
     * 【処理内容】
     * valに1.1を掛けて小数点以下を切り捨て、tax2を更新
     */
    useEffect(() => {
        setTax2(Math.floor(val * 1.1));
    },[val]);

    return(
        <div>
            <h1>React App useEffect</h1>
            <div className='container'>
                <h2>Hooks sample page.</h2>
                <AlertMessage msg={msg} />
                    <label>Input:</label>
                    <input type="number" onChange={doChange} />
            </div>
        </div>
    );
}

export default App_useEffect;