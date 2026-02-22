import React, { useState } from "react";
import './App.css';

// MyComponentのprops型定義
interface MyComponentProps {
    value: string
}

/**
 * React.memoでラップ（メモ化）したコンポーネント
 * React.memoの動作:
 *   - propsが前回と同じ場合、再レンダリングをスキップする（浅い比較）
 *   - propsが変更された場合のみ再レンダリングが実行される
 */
const MyComponent = React.memo((props:MyComponentProps) => {
    // 再レンダリングの発生を確認するためのログ出力
    console.log('Rendering MyComponent');
    return <div className="card">{props.value}</div>
});

/**
 * React.memoの学習用コンポーネント
 *
 * このコンポーネントでの確認ポイント（コンソールで確認）:
 *   - Incrementボタン: countのみ変更 → MyComponentは再レンダリングされない
 *   - Updateボタン: valueを変更 → MyComponentが再レンダリングされる
 */
function App_memoComponent(){
    const [count, setCount] = useState(0);       // カウンター用ステート（MyComponentには渡さない）
    const [value, setValue] = useState<string>('Hello');  // MyComponentに渡すステート

    return (
        <>
            <h1>React.memoの例</h1>
            <div className="container">
                {/* countを更新するだけ — valueは変わらないのでMyComponentは再レンダリングされない */}
                <button onClick={()=>{
                    setCount(count + 1);
                    alert(`count: ${count+1}`);
                }}>Increment</button>
                {/* valueを更新する — MyComponentのpropsが変わるので再レンダリングされる */}
                <button onClick={()=>{
                    setValue(`count:` + count);
                    alert('Update now!!');
                }}>Update</button>
                {/* Incrementボタンをクリックしても、valueの値は変化しないのでMyComponentの再レンダリングは実行されない */}
                <MyComponent value={value} />
            </div>
        </>
    )
}

export default App_memoComponent;

