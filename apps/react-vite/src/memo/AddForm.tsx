/**
 * AddForm コンポーネント
 * 新しいメモを追加するためのフォームコンポーネント
 */

import { useState } from "react";
// カスタムフック：LocalStorageへの永続化機能を提供
import UsePersist from "../hooks/Persist";
// メモデータの型定義
import MemoData from "./MemoData";

function AddForm() {
    // LocalStorageに永続化されたメモデータを管理
    const [memo, setMemo] = UsePersist<MemoData[]>("memo", []);
    // フォームの入力値を管理するstate
    const [message, setMessage] = useState('');

    /**
     * 入力フィールドの変更イベントハンドラ
     * @param e - input要素のChangeEvent
     */
    const doChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    /**
     * フォーム送信時のイベントハンドラ
     * 新しいメモをLocalStorageに保存する
     * @param e - form要素のFormEvent
     */
    const doAction = (e: React.FormEvent<HTMLFormElement>) => {
        // デフォルトのフォーム送信動作（ページ遷移）を防止
        e.preventDefault();

        // 新しいメモデータを作成
        const data: MemoData = {
            message: message,
            created: new Date()
        }

        // unshift: 配列の先頭に要素を追加
        // この時点ではmemoステートの中身は変更されていない（参照のみ変更）
        memo!.unshift(data);

        // setMemoで値を更新 - この時点でLocalStorageに保存される
        setMemo(memo!);

        // UsePersistでLocalStorageに保管しているため、
        // 画面に反映させるにはページリロードが必要
        // （本来はstateの更新で再レンダリングさせるのが望ましい）
        window.location.reload();
    }

    return (
        // onSubmit: フォーム送信時にdoActionを実行
        <form onSubmit={doAction}>
            <div>
                {/* 制御コンポーネント: valueとonChangeでReactが入力値を管理 */}
                <input type="text" onChange={doChange} value={message} required />
                <input type="submit" value="追加" />
            </div>
        </form>
    );
}

export default AddForm;