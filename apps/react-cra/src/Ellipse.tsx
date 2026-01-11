import React from "react";

/**
 * 楕円形（円形）のdiv要素を描画するコンポーネント
 * 
 * 指定された位置、サイズ、色で円形のdiv要素を絶対配置で描画します。
 * 
 * @param props - コンポーネントのプロパティ
 * @param props.width - 楕円の幅（ピクセル単位の数値）
 * @param props.height - 楕円の高さ（ピクセル単位の数値）
 * @param props.x - 親要素の左端からの位置（ピクセル単位の数値）
 * @param props.y - 親要素の上端からの位置（ピクセル単位の数値）
 * @param props.color - 楕円の背景色（CSSの色指定文字列、例: "red", "#ff0000", "rgb(255,0,0)"）
 * @returns 円形のdiv要素を返すReact要素
 */
function Ellipse(props: {width:number, height:number,x:number,y:number,color:string}){
    // React.CSSProperties：Reactのエレメント使用するスタイルシートのプロパティを記述できる
    const ellipseStyle:React.CSSProperties = {
        width: `${props.width}px`,
        height: `${props.height}px`,
        backgroundColor: props.color,
        position: 'absolute',
        left: `${props.x}px`,
        top: `${props.y}px`,
        borderRadius: '50%',
    };
    return <div style={ellipseStyle}></div>;
}

export default Ellipse;