// =============================================================================
// React Hooks を使用したステート管理のサンプルコンポーネント
// =============================================================================

import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

// -----------------------------------------------------------------------------
// App_hook_state コンポーネント
// -----------------------------------------------------------------------------
// このコンポーネントでは、React の useState フックを使用して
// コンポーネント内部でステート（状態）を管理する方法を学習する
function App_hook_state(){

    // -------------------------------------------------------------------------
    // useState フック
    // -------------------------------------------------------------------------
    // useState は [現在の値, 更新関数] の配列を返す
    // - message: 固定メッセージ（更新関数は使用しない例）
    // - count: クリック回数を管理するステート
    // - setCount: count を更新するための関数
    const [message] = useState("Welcome to Hooks!");
    const [count, setCount] = useState(0);
    // - flag: 表示スタイルを切り替えるためのboolean型ステート
    // - setFlag: flag を更新するための関数
    const [flag, setFlag] = useState(false);

    // -------------------------------------------------------------------------
    // クリックイベントハンドラ
    // -------------------------------------------------------------------------
    // ボタンクリック時に count を 1 増加させる
    // setCount を呼ぶと React が自動的に再レンダリングを行う
    const clickFunc = () => {
        setCount(count + 1);
    }

    // -------------------------------------------------------------------------
    // チェックボックス変更イベントハンドラ
    // -------------------------------------------------------------------------
    // チェックボックスの状態変更時に flag を更新する
    // e.target.checked でチェックボックスの現在の状態（true/false）を取得
    const changeFlag = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFlag(e.target.checked);
    }

    // -------------------------------------------------------------------------
    // JSX によるUI定義
    // -------------------------------------------------------------------------
    return (
        <div>
            <h1>React app</h1>
            <div className='container'>
                <h2>Hooks sample</h2>
                {/* useState で管理している message を表示 */}
                <div className='message'>
                    <p>{message}.</p>
                </div>
                <h4>Hooks sample</h4>
                {/* ---------------------------------------------------------
                    条件付きレンダリング（三項演算子）
                    ---------------------------------------------------------
                    flag の値によって異なるJSXを表示する
                    - flag が true の場合: true_msg スタイルのブロックを表示
                    - flag が false の場合: false_msg スタイルのブロックを表示
                */}
                {flag ?
                <div className='true_msg'>
                    {/* count ステートの値を表示 */}
                    <p>click:{count} times!</p>
                    <div>
                        {/* クリックで clickFunc が呼ばれ、count が更新される */}
                        <button onClick={clickFunc}>
                            Click me
                        </button>
                    </div>
                </div>
                :
                <div className='false_msg'>
                    <p>click: {count} times!</p>
                    <div>
                        <button className='false_button' onClick={clickFunc}>
                            Click me
                        </button>
                    </div>
                </div>
                }
                {/* チェックボックスで表示スタイルを切り替える */}
                <div>
                    {/* onChange イベントで changeFlag が呼ばれ、flag が更新される */}
                    <input type="checkbox" id="check1" onChange={changeFlag}/>
                    <label htmlFor="check1">
                        Change form style.
                    </label>
                </div>
            </div>
        </div>
    );
}

export default App_hook_state;
