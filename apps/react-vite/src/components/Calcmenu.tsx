// =============================================================================
// Calcmenu コンポーネント
// =============================================================================
// 計算機能を持つメニューコンポーネント
// useCalcカスタムフックを使用して、様々な計算処理を行う
// - PlainMessage: 入力値をそのまま表示
// - AlertMessage: 1からnまでの合計を計算
// - CardMessage: 消費税（10%）を計算
// =============================================================================

import { useState,useEffect,ChangeEvent } from "react";
import '../App.css';
import useCalc from "../hooks/useCalc";  // 計算処理用カスタムフック

// -----------------------------------------------------------------------------
// 計算関数
// -----------------------------------------------------------------------------

// 合計計算の関数（1からnまでの総和）
const total = (n: number): number => {
    let re = 0;
    for(let i=0; i<= n; i++){
        re += i; 
    } 
    return re;
};

// 消費税計算の関数（10%の消費税を加算し、小数点以下切り捨て）
const tax = (n: number): number => {
    return Math.floor(n * 1.1);
}

// -----------------------------------------------------------------------------
// サブコンポーネント
// -----------------------------------------------------------------------------

/**
 * PlainMessage - 入力値をそのまま表示するコンポーネント
 * useCalcに恒等関数(n => n)を渡し、入力された値をそのまま結果として表示
 */
function PlainMessage(){
    const [n, setN] = useState(0);              // 入力値を管理するstate
    const [msg, setCalc] = useCalc(0, (n) => n); // useCalcカスタムフック（恒等関数使用）

    // 入力値変更時のハンドラ
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setN(+e.target.value);       // 入力値を数値に変換してstateに設定
        setCalc(+e.target.value);    // useCalcの計算を実行
    }

    return(
        <div>
            <hr />
            <h5>{msg}</h5>
            <input type="number" onChange={onChange} value={n}/>
            <hr />
        </div>
    )
}

/**
 * AlertMessage - 1からnまでの合計を計算するコンポーネント
 * useCalcにtotal関数を渡し、入力値までの総和を計算して表示
 */
function AlertMessage(){
    const [n, setN] = useState(0);               // 入力値を管理するstate
    const [msg, setCalc] = useCalc(0,total);     // useCalcカスタムフック（total関数使用）

    // 入力値変更時のハンドラ
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setN(+e.target.value);       // 入力値を数値に変換してstateに設定
        setCalc(+e.target.value);    // useCalcの計算を実行
    }

    return(
        <div className="alert">
            <h5>{msg}</h5>
            <input type="number" onChange={onChange} min="0" max="10000" value={n}/>
        </div>
    )
}

/**
 * CardMessage - 消費税を計算するコンポーネント
 * useCalcにtax関数を渡し、消費税込みの金額を計算して表示
 * range型のスライダーで値を入力
 */
function CardMessage(){
    const [n, setN] = useState(0);               // 入力値を管理するstate
    const [msg, setCalc] = useCalc(0,tax);       // useCalcカスタムフック（tax関数使用）

    // スライダー変更時のハンドラ
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setN(+e.target.value);       // 入力値を数値に変換してstateに設定
        setCalc(+e.target.value);    // useCalcの計算を実行
    }

    return(
        <div className="card">
            <h5>{msg}</h5>
            <input type="range" onChange={onChange} min="0" max="10000" step="100"/>
        </div>
    )
}

// -----------------------------------------------------------------------------
// メインコンポーネント
// -----------------------------------------------------------------------------

/**
 * Calcmenu - 計算メニューのメインコンポーネント
 * 複数の計算コンポーネントをまとめて表示
 */
function Calcmenu(){
    return(
        <div>
            <h1>Calcmenu</h1>
            <div className="container">
                <h3>Hooks Sample</h3>
                <PlainMessage />   {/* 入力値をそのまま表示 */}
                <AlertMessage />   {/* 1からnまでの合計を計算 */}
                <CardMessage />    {/* 消費税を計算 */}
            </div>
        </div>
    )
}

export default Calcmenu;