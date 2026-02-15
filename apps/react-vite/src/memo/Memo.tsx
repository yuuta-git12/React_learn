/**
 * Memo コンポーネント
 * LocalStorageに永続化されたメモデータを表示するコンポーネント
 */

// カスタムフック：LocalStorageへの永続化機能を提供
import UsePersist from "../hooks/Persist";
// メモデータの型定義
import MemoData from "./MemoData";
// 個別のメモアイテムを表示するコンポーネント
import Item from "./Item";
import { JSX } from "react";

function Memo() {
    // UsePersistフックでメモデータを管理
    // 第1引数: LocalStorageのキー名
    // 第2引数: 初期値（空配列）
    const [memo, setMemo] = UsePersist<MemoData[]>("memo", []);

    // memo配列をItemコンポーネントの配列に変換
    // memo!の「!」は非nullアサーション演算子
    // TypeScriptに「この値はnullまたはundefinedではない」と明示的に伝える
    // UsePersistの戻り値がnull/undefinedの可能性があるため使用している
    let date: JSX.Element[] = memo!.map((value, key) => (
        <Item key={value.message} value={value} index={key + 1} />
    ));

    return (
        // テーブル形式でメモ一覧を表示
        <table className="memo" width={'100%'}>
            <tbody>{date}</tbody>
        </table>
    );
}

export default Memo;