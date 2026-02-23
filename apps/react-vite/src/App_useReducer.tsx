// =============================================================================
// useReducer サンプルコンポーネント
// useReducerフックを使用したカウンター機能の実装例
// useReducerはuseStateの代替で、複雑な状態ロジックを管理するのに適している
// =============================================================================

import { useReducer } from "react";
import "./App.css";

// 状態のインターフェース定義
interface State {
    count: number;
}

// 初期状態を定義
const initialState: State = { count: 0};

// アクションの型を定義
type Action = { type: 'increment'} | { type: 'decrement' }|{ type: 'reset' };

// リデューサー関数を定義
// 引数：State,Action
// 戻り値: State
function reducer(state: State, action: Action):State {
    switch(action.type){
        case 'increment':
            return { count: state.count + 1};
        case 'decrement':
            return { count: state.count - 1};
        case 'reset':
            return initialState;
        default:
            throw new Error('未知のアクションタイプ');
    }
}

// App_useReducerコンポーネント
function App_useReducer(){
    // リデューサーの作成
    const [state, dispatch] = useReducer( reducer, initialState);

    return(
        <div>
            <h1>useReducerの例</h1>
            <div className="container">
                {/* state.count = reducer関数の引数、stateのcountということ？ */}
                <p>カウント: {state.count}</p>
                <button onClick={() => dispatch({type:'increment'})}>Increment</button>
                <button onClick={() => dispatch({type:'decrement'})}>decrement</button>
                <button onClick={() => dispatch({type:'reset'})}>Reset</button>
            </div>
        </div>
    );
}

export default App_useReducer;
