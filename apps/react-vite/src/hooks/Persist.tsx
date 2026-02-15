import { useState } from 'react';

/**
 * UsePersistカスタムフックの戻り値の型定義
 * - タプル型（配列形式）で、useStateと同じ形式
 * - 第1要素: 保存された値（Type型またはnull）
 * - 第2要素: 値を更新する関数
 */
type UsePersistReturn<Type> =
    [Type | null,(val: Type | null) => void ];


/**
 * LocalStorageを使ってデータを永続化するカスタムフック
 *
 * useStateと同じ感覚で使えるが、値がLocalStorageに保存されるため
 * ブラウザを閉じてもデータが保持される
 *
 * @param key - LocalStorageのキー名（"hooks:"プレフィックスが自動付与）
 * @param initVal - 初期値（LocalStorageに値がない場合に使用）
 * @returns [保存された値, 値を更新する関数] のタプル
 *
 * 使用例:
 * const [name, setName] = UsePersist<string>("userName", "ゲスト");
 */
function UsePersist<Type>(key:string, initVal:Type | null):UsePersistReturn<Type> {
    // キー名にプレフィックスを付けて、他のLocalStorageデータと区別する
    const storageKey = "hooks:" + key;

    /**
     * LocalStorageから値を取得する関数
     * - 値が存在すればJSONパースして返す
     * - 値がなければ初期値を返す
     * - エラー時（JSONパース失敗等）も初期値を返す
     */
    const getValue = ():Type | null => {
        try{
            const item = window.localStorage.getItem(storageKey);
            // itemが存在すればパース、なければ初期値を使用
            return item? JSON.parse(item) : initVal;
        }catch(err){
            console.log(err);
            return initVal;
        }
    }

    // useStateの初期値としてgetValueを渡す（遅延初期化）
    // コンポーネントの初回レンダリング時にLocalStorageから値を読み込む
    const [savedValue,setSavedValue] = useState<Type | null>(getValue);

    /**
     * 値を更新する関数
     * - Reactのstateを更新（画面が再レンダリングされる）
     * - 同時にLocalStorageにも保存（永続化）
     */
    const setValue = (val:Type | null): void => {
        try{
            setSavedValue(val);  // stateを更新
            window.localStorage.setItem(storageKey,JSON.stringify(val));  // LocalStorageに保存
        }catch(err){
            console.log(err);
        }
    }

    // useStateと同じ形式で返す [現在の値, 更新関数]
    return [savedValue,setValue];
}

export default UsePersist;