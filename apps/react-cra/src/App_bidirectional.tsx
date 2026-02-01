// =============================================================================
// 双方向データバインディングサンプルコンポーネント
// =============================================================================
// 親コンポーネントと子コンポーネント間でステート（状態）を共有し、
// 子コンポーネントから親のステートを更新する「リフトアップ」パターンを学習するためのサンプル

import { useState } from "react";
import './App.css';

// -----------------------------------------------------------------------------
// AlertMessage コンポーネント
// -----------------------------------------------------------------------------
// 親からpropsとして受け取ったalertメッセージを表示し、
// ボタンクリックでランダムなメッセージを親のステートに反映する
function AlertMessage(props:{ alert:string,
    setAlert: (alert: string)=>void}){

    const data = ["Hello!", "Welcome...", "Good-bye?"];

    const actionAlert = ()=> {
        const re = data[Math.floor(Math.random() * data.length)];
        // alertステートを変更する処理
        props.setAlert('message:"' + re + '".');
    }

    return (
        <div className="alert">
            <h5>{props.alert}</h5>
            <button onClick={actionAlert}>
                Click me!
            </button>
        </div>
    );
}

// -----------------------------------------------------------------------------
// CardMessage コンポーネント
// -----------------------------------------------------------------------------
// 親からpropsとして受け取ったcardメッセージを表示し、
// ボタンクリックでカウンターをインクリメントして親のステートに反映する
// 自身のローカルステート（count）も保持している
function CardMessage(props:{card:string,
    setCard: (card: string)=>void}) {

    const [count, setCount] = useState(0);

    const actionCard = () => {
        setCount((prevCount) => prevCount + 1);
        props.setCard("card counter:" + count + "count.");
    }

    return (
        <div className="card">
            <h5>{props.card}</h5>
            <button onClick={actionCard}>
                Click me!
            </button>
        </div>
    );
}

// -----------------------------------------------------------------------------
// App_bidirectionl メインコンポーネント
// -----------------------------------------------------------------------------
// 子コンポーネント（AlertMessage, CardMessage）を使用してメッセージを表示
// 各子コンポーネントにステートとセッター関数を渡し、双方向データバインディングを実現
function App_bidirectionl(){
    // メッセージの状態管理
    // msg: 現在のメッセージ
    // setMsg: メッセージを更新する関数
    const [alert,setAlert] = useState("This is alert message!");
    const [card, setCard] = useState("This is card message!");

    return (
        <div>
            <h1>React app bidirectional</h1>
            <div className="container">
                <h2>Hooks sample page.</h2>
                {/* AlertMessageコンポーネントにメッセージを渡して表示 */}
                <AlertMessage alert={alert} setAlert={setAlert}></AlertMessage>
                {/* CardMessageコンポーネントにメッセージを渡して表示 */}
                <CardMessage card={card} setCard={setCard}></CardMessage>
                <hr />
                <div className="text-right">
                    <p>{alert}</p>
                    <p>{card}</p>
                </div>
            </div>
        </div>
    )
}
export default App_bidirectionl