// =============================================================================
// UsePersistカスタムフックのサンプルコンポーネント
// LocalStorageを使ったデータ永続化のデモ
// =============================================================================

import { useState, ChangeEvent } from "react";
import './App.css';
import UsePersist from "./hooks/Persist";  // LocalStorage永続化カスタムフック

/**
 * フォームデータの型定義
 * LocalStorageに保存するデータの構造を定義
 */
interface Data {
    name: string;
    mail: string;
    age: number;
}

/**
 * フォーム入力コンポーネント
 * ユーザーが入力したデータをLocalStorageに保存する
 */
function AlertMessage() {
    // -----------------------------------------------------------------------------
    // State定義
    // -----------------------------------------------------------------------------
    // フォーム入力用のstate（一時的な入力値を保持）
    const [name, setName] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [age, setAge] = useState<number>(0);

    // UsePersistカスタムフックを使用（LocalStorageに永続化される）
    // ブラウザを閉じても"mydata"キーでデータが保持される
    const [mydata, setMydata] = UsePersist<Data>("mydata", null);

    // -----------------------------------------------------------------------------
    // イベントハンドラ
    // -----------------------------------------------------------------------------
    // 各入力フィールドの変更を対応するstateに反映

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onChangeMail = (e: ChangeEvent<HTMLInputElement>) => {
        setMail(e.target.value);
    };

    const onChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
        // input[type="number"]の値は文字列なのでNumberで変換
        setAge(Number(e.target.value));
    };

    /**
     * 保存ボタンクリック時の処理
     * フォームの入力値をDataオブジェクトにまとめてLocalStorageに保存
     */
    const onAction = () => {
        const data: Data = {
            name: name,
            mail: mail,
            age: age
        };
        setMydata(data);  // UsePersistでLocalStorageに保存
    };

    // -----------------------------------------------------------------------------
    // レンダリング
    // -----------------------------------------------------------------------------
    return (
        <div className="alert">
            {/* 保存されたデータをJSON形式で表示（デバッグ用） */}
            <h5>{JSON.stringify(mydata)}</h5>
            <table>
                <tbody>
                    <tr>
                        <td><label>Name</label></td>
                        <td>
                            <input type="text" onChange={onChangeName} value={name} />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Mail</label></td>
                        <td>
                            <input type="email" onChange={onChangeMail} value={mail} />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Age</label></td>
                        <td>
                            <input type="number" onChange={onChangeAge} value={age} />
                        </td>
                    </tr>
                    <tr><td></td>
                        <td>
                            {/* クリックでフォームデータをLocalStorageに保存 */}
                            <button onClick={onAction}>Save it!</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

/**
 * App_usePersist: UsePersistカスタムフックのデモ用メインコンポーネント
 * AlertMessageコンポーネントをラップして表示
 */
function App_usePersist() {
    return (
        <div>
            <h1>React</h1>
            <div className="container">
                <h2>Hooks sample</h2>
                <AlertMessage />
            </div>
        </div>
    );
}

export default App_usePersist;