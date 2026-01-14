// =============================================================================
// 子コンポーネントのサンプル (Create React App版)
// =============================================================================
// 親コンポーネントに表示される子コンポーネントの実装例
// useStateフックを使用したメッセージの動的更新を実演する

import { useState } from "react";
import './App.css';

// -----------------------------------------------------------------------------
// AlertMessage コンポーネント
// -----------------------------------------------------------------------------
// アラートスタイルでメッセージを表示する子コンポーネント
// props.message: 表示するメッセージ文字列
function AlertMessage(props:{ message:string }){
    return <div className="alert">
        {props.message}
    </div>
}

// -----------------------------------------------------------------------------
// CardMessage コンポーネント
// -----------------------------------------------------------------------------
// カードスタイルでメッセージを表示する子コンポーネント
// props.message: 表示するメッセージ文字列
function CardMessage(props:{ message:string }){
    return <div className="card">
        {props.message}
    </div>
}

// -----------------------------------------------------------------------------
// App_child メインコンポーネント
// -----------------------------------------------------------------------------
// 子コンポーネント（AlertMessage, CardMessage）を使用してメッセージを表示
// ボタンクリックでユーザー名を入力し、メッセージを更新する
function App_child(){
    // メッセージの状態管理
    // msg: 現在のメッセージ
    // setMsg: メッセージを更新する関数
    const [msg,setMsg] = useState("This is sample message!");

    // ボタンクリック時のイベントハンドラ
    // プロンプトでユーザー名を入力させ、挨拶メッセージに更新する
    const doAction = ()=>{
        let res = window.prompt('type your name:');
        setMsg("Hello," + res + "!!");
    }

    return (
        <div>
            <h1>React app child</h1>
            <div className="container">
                <h2>Hooks sample page.</h2>
                {/* AlertMessageコンポーネントにメッセージを渡して表示 */}
                <AlertMessage message={msg}></AlertMessage>
                {/* CardMessageコンポーネントにメッセージを渡して表示 */}
                <CardMessage message={msg}></CardMessage>
                {/* クリックでdoActionを実行し、メッセージを更新 */}
                <button onClick={doAction}>
                    Click me!
                </button>
            </div>
        </div>
    )
}
export default App_child