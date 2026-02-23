// =============================================================================
// useReducer サンプルコンポーネント
// useReducerフックを使用したカウンター機能の実装例
// useReducerはuseStateの代替で、複雑な状態ロジックを管理するのに適している
//
// useReducerの基本構文:
//   const [state, dispatch] = useReducer(reducer, initialState)
//   - state: 現在の状態値
//   - dispatch: アクションを発行する関数（reducer関数を呼び出すトリガー）
//   - reducer: (現在のstate, action) => 新しいstate を返す純粋関数
//   - initialState: 状態の初期値
//
// useStateとの使い分け:
//   - useState: 単純な値の管理（数値、文字列、真偽値など）
//   - useReducer: 複数の関連する状態をまとめて管理したい場合や、
//                 状態更新のロジックが複雑な場合に適している
// =============================================================================

import { useReducer } from "react";
import "./App.css";

// -----------------------------------------------------------------------------
// 型定義
// -----------------------------------------------------------------------------

// 状態のインターフェース定義
// useReducerで管理する状態の型を定義する
interface State {
    count: number;  // カウンターの現在値
}

// 初期状態を定義
// useReducerの第2引数として渡す初期値
const initialState: State = { count: 0};

// アクションの型を定義（ユニオン型）
// dispatchに渡せるアクションの種類を制限する
// - 'increment': カウントを+1する
// - 'decrement': カウントを-1する
// - 'reset': カウントを初期値に戻す
type Action = { type: 'increment'} | { type: 'decrement' }|{ type: 'reset' };

// -----------------------------------------------------------------------------
// リデューサー関数
// -----------------------------------------------------------------------------
// reducer関数: 現在のstateとactionを受け取り、新しいstateを返す純粋関数
// - 引数: state（現在の状態）, action（実行するアクション）
// - 戻り値: 新しいState（既存のstateは変更せず、新しいオブジェクトを返す）
// - switch文でaction.typeに応じた処理を分岐する（Reduxと同じパターン）
function reducer(state: State, action: Action):State {
    switch(action.type){
        case 'increment':
            // 現在のcountに1を加算した新しいStateオブジェクトを返す
            return { count: state.count + 1};
        case 'decrement':
            // 現在のcountから1を減算した新しいStateオブジェクトを返す
            return { count: state.count - 1};
        case 'reset':
            // 初期状態に戻す
            return initialState;
        default:
            // 定義されていないアクションタイプが渡された場合はエラーをスロー
            throw new Error('未知のアクションタイプ');
    }
}

// -----------------------------------------------------------------------------
// App_useReducerコンポーネント
// -----------------------------------------------------------------------------
function App_useReducer(){
    // useReducerフックの呼び出し
    // - state: 現在の状態（{ count: number }）
    // - dispatch: アクションを発行する関数
    //   dispatch({ type: 'increment' }) のように呼び出すと、
    //   reducer関数が実行され、新しいstateが計算される
    const [state, dispatch] = useReducer( reducer, initialState);

    return(
        <div>
            <h1>useReducerの例</h1>
            <div className="container">
                {/* state.count: reducer関数が返した最新のStateオブジェクトのcountプロパティ */}
                <p>カウント: {state.count}</p>
                {/* dispatch関数にアクションオブジェクトを渡してreducer関数を実行する */}
                {/* クリックするとdispatch → reducer → 新しいstate → 再レンダリングの流れで更新される */}
                <button onClick={() => dispatch({type:'increment'})}>Increment</button>
                <button onClick={() => dispatch({type:'decrement'})}>decrement</button>
                <button onClick={() => dispatch({type:'reset'})}>Reset</button>
            </div>
        </div>
    );
}

export default App_useReducer;
