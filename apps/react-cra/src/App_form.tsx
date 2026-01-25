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
function AlertMessage(props:{ data:any,setData: any}){

    const data = props.data;
    const msg = JSON.stringify(data);

    return (
        <div className="alert">
            <h5>{msg}</h5>
            <hr />
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <th>Mail</th>
                        <td>{data.mail}</td>
                    </tr>
                    <tr>
                        <th>Age</th>
                        <th>{data.age}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

// -----------------------------------------------------------------------------
// App_form メインコンポーネント
// -----------------------------------------------------------------------------
// フォーム入力を使用したステート管理のサンプル
// AlertMessageコンポーネントでフォームの入力結果を表示
function App_form(){
    // メッセージの状態管理
    // msg: 現在のメッセージ
    // setMsg: メッセージを更新する関数
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [age, setAge] = useState(0);
    const [form, setForm] = useState({name:'no name', mail:'no mail', age:0});


    // -------------------------------------------------------------------------
    // 入力フィールドの変更ハンドラ
    // -------------------------------------------------------------------------
    // 各入力欄の onChange イベントで呼び出され、入力値をステートに反映する
    // event.target.value には入力フィールドの現在値（文字列）が格納される
    const doChangeName = (event: any) => {
        setName(event.target.value);
    }
    const doChangeMail = (event: any) => {
        setMail(event.target.value);
    }
    const doChangeAge = (event: any) => {
        setAge(event.target.value);
    }

    // -------------------------------------------------------------------------
    // フォーム送信ハンドラ
    // -------------------------------------------------------------------------
    // フォームの submit イベントで呼び出される
    // - event.preventDefault(): ブラウザのデフォルト送信動作（ページリロード）を防止
    // - 入力値を form ステートに保存し、入力欄をリセットする
    const doSubmit:any = (event: any) => {
        event.preventDefault();
        setForm({name:name, mail:mail,age:age})
        setName('');
        setMail('');
        setAge(0);
    }

    return (
        <div>
            <h1>React App Form</h1>
            <div className="container">
                <h2>Hooks sample page.</h2>
                {/* AlertMessageコンポーネントにメッセージを渡して表示 */}
                <AlertMessage data={form} setData={setForm}></AlertMessage>
                <form onSubmit={doSubmit} >
                <table>
                    <tbody>
                        <tr>
                            <td><label>Name:</label></td>
                            <td><input type="text" onChange={doChangeName} /></td>
                        </tr>
                        <tr>
                            <td><label>Mail:</label></td>
                            <td><input type="text" onChange={doChangeMail} /></td>
                        </tr>
                        <tr>
                            <td><label>Age:</label></td>
                            <td><input type="number" onChange={doChangeAge} /></td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit">Click</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </form>
            </div>
        </div>
    );
}
export default App_form