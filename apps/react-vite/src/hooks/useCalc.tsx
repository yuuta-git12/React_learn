// =============================================================================
// useCalc カスタムフック
// =============================================================================
// 汎用的な計算処理を行うカスタムフック
// 任意の計算関数を受け取り、計算結果をJSX要素として返す
//
// 使用例：
//   const [msg, setCalc] = useCalc(0, (n) => n * 2);  // 2倍を計算
//   setCalc(5);  // => "5の結果は、10です。" と表示
// =============================================================================

import { useState, JSX } from "react";
import '../App.css';

/**
 * 計算処理を行うカスタムフック
 * @param num - 初期値として表示する数値
 * @param func - 計算処理を行う関数（数値を受け取り、数値を返す）
 * @returns [msg, setValue] - 計算結果を表示するJSX要素と、値をセットする関数のタプル
 */
function useCalc(num:number,func:(n:number) => number) :[JSX.Element,(s:number) => void]{

        // 計算結果を表示するメッセージのstate（初期値は引数numを表示）
        const [msg,setMsg] = useState<JSX.Element>(<>default value:{num}</>);

        /**
         * 値をセットし、計算結果を更新する関数
         * @param s - 計算対象の数値
         */
        const setValue = (s:number):void => {
            // 引数で渡された計算関数を実行
            let res = func(s);
            // 計算結果をメッセージとして表示
            setMsg(<p>＊ {s}の結果は、{res}です。</p>);
        }
    return [msg, setValue];
}

export default useCalc;
