// =============================================================================
// DelForm コンポーネント
// メモを削除するためのフォームコンポーネント
// =============================================================================

import { useState } from "react";
// カスタムフック：LocalStorageへの永続化機能を提供
import UsePersist from "../hooks/Persist";
// メモデータの型定義
import MemoData from "./MemoData";

/**
 * DelForm コンポーネント
 * セレクトボックスで選択したメモを削除する機能を提供する
 */
function DelForm () {
    // -----------------------------------------------------------------------------
    // State定義
    // -----------------------------------------------------------------------------
    // LocalStorageに永続化されたメモデータを管理
    const [memo, setMemo] = UsePersist<MemoData[]>("memo", []);
    // セレクトボックスで選択中のメモのインデックス番号
    const [num, setNum] = useState(0);

    // -----------------------------------------------------------------------------
    // イベントハンドラ
    // -----------------------------------------------------------------------------

    /**
     * セレクトボックスの変更イベントハンドラ
     * 選択されたoptionのvalue（インデックス番号）をstateに反映
     * @param e - select要素のChangeEvent
     */
    const doChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // 「+」は単項プラス演算子：文字列を数値に変換（Number()と同等）
        setNum(+e.target.value);
    }

    /**
     * フォーム送信時のイベントハンドラ
     * 選択されたメモをLocalStorageから削除する
     * @param e - form要素のFormEvent
     */
    const doAction = (e: React.FormEvent<HTMLFormElement>) => {
        // filterで選択されたインデックス以外の要素だけを残す
        // key（配列のインデックス）がnum（選択されたインデックス）と一致しない要素のみ抽出
        // → 結果として、選択されたメモが削除される
        let res = memo?.filter((item, key) => {
            return key != num;
        });
        // フィルタ結果でLocalStorageを更新（resがundefinedの場合は空配列）
        setMemo(res || []);
        // セレクトボックスの選択を先頭に戻す
        setNum(0);
    }

    // -----------------------------------------------------------------------------
    // セレクトボックスの選択肢を生成
    // -----------------------------------------------------------------------------
    // memo配列をoption要素の配列に変換
    // 各optionにはメモのメッセージ（先頭10文字）を表示
    let items = memo?.map((value, key) => (
        memo ?
        <option key={key} value={key}>
            {value.message.substring(0,10)}
        </option>
        :
        <option>no-data</option>
    ));

    // -----------------------------------------------------------------------------
    // レンダリング
    // -----------------------------------------------------------------------------
    return (
        <form onSubmit={doAction}>
            <div>
                {/* セレクトボックス：削除対象のメモを選択 */}
                <select onChange={doChange} defaultValue="-1">
                    {items}
                </select>
                {/* 削除ボタン：クリックでdoActionが実行される */}
                <input type="submit" value="削除" />
            </div>
        </form>
    );
}
export default  DelForm;
