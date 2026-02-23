// =============================================================================
// React アプリケーションのエントリーポイント (Vite版)
// =============================================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App'          // メインのAppコンポーネント
import App_hook_state from './App_hook_state'  // フック・ステート用のApp_hook_stateコンポーネント
import './index.css'                 // グローバルCSSスタイルのインポート
import App_child from './App_child'            // 子コンポーネントサンプル用のApp_childコンポーネント
import App_bidirectionl from './App_bidirectional'  // 双方向データバインディングサンプル用コンポーネント
import App_form from './App_form'                    // フォーム入力サンプル用コンポーネント
import App_useEffect from './App_useEffect'          // useEffectサンプル用のApp_useEffectコンポーネント
import App_useCounter from './App_useCounter';  // useCounterカスタムフックサンプル用コンポーネント
import Calcmenu from './components/Calcmenu'    // 計算メニューコンポーネント（useCalcカスタムフック使用）
import App_usePersist from './App _usePersist'  // UsePersist（LocalStorage永続化）サンプル用コンポーネント
import App_useMemo from './App_useMemo'
import MainMemo from './main_memo'              // メモアプリページ
import App_useCallback from './App_useCallback'          // useCallbackサンプル用コンポーネント
import App_memoComponent from './App_memoComponent'      // React.memoサンプル用コンポーネント
import App_useReducer from './App_useReducer'    // useReducerサンプル用コンポーネント

// -----------------------------------------------------------------------------
// ルート要素の取得と検証
// -----------------------------------------------------------------------------
// index.html内の<div id="root">要素を取得
const rootElement = document.getElementById('root')

// ルート要素が存在しない場合はエラーをスロー（TypeScriptの型安全性も確保）
if (!rootElement) {
  throw new Error('Root container missing in index.html')
}

// -----------------------------------------------------------------------------
// Reactルートの作成
// -----------------------------------------------------------------------------
// createRoot: React 18で導入された新しいルートAPI
// 注意: createRootは一度だけ呼び出し、同じrootインスタンスを再利用する
const root = createRoot(rootElement)

// -----------------------------------------------------------------------------
// カウンター状態の管理
// -----------------------------------------------------------------------------
// 注意: 通常はuseStateフックを使用するが、ここでは手動での再レンダリングを学習するため
//       グローバル変数として定義している
var counter = 0;

// -----------------------------------------------------------------------------
// クリックイベントハンドラ
// -----------------------------------------------------------------------------
// カウンターをインクリメントし、画面を再レンダリングする
const doAction = () =>{
  counter++;  // カウンターを1増加
  render();   // 手動で再レンダリングを実行
}

// -----------------------------------------------------------------------------
// ホームページコンポーネント
// -----------------------------------------------------------------------------
// 既存の全コンポーネントを表示するホームページ
function HomePage() {
  return (
    <>
      {/* ナビゲーションリンク */}
      <nav style={{ padding: '10px', marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
        <Link to="/memo" style={{ color: '#007bff', textDecoration: 'none', fontSize: '16px' }}>
          → メモアプリへ
        </Link>
      </nav>
      <App counter={counter} onClick={doAction}/>
      <App_hook_state />
      <App_child />  {/* 子コンポーネントサンプル */}
      <App_bidirectionl />
      <App_form />  {/* フォーム入力サンプル */}
      <App_useEffect />  {/* useEffectサンプル */}
      <App_useCounter />  {/* useCounterカスタムフックサンプル */}
      <Calcmenu />  {/* 計算メニュー（useCalcカスタムフック使用） */}
      <App_usePersist />  {/* UsePersist（LocalStorage永続化）サンプル */}
      <App_useMemo />
      <App_useCallback />  {/* useCallbackサンプル */}
      <App_memoComponent />  {/* React.memoサンプル */}
      <App_useReducer />  {/* useReducerサンプル */}
    </>
  )
}

// -----------------------------------------------------------------------------
// レンダリング関数
// -----------------------------------------------------------------------------
// React Router を使用してルーティングを設定
// - StrictMode: 開発時に潜在的な問題を検出するためのラッパー
// - BrowserRouter: HTML5 History APIを使用したルーター
// - Routes/Route: ルート定義
function render(){
  root.render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/memo" element={<MainMemo />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  )
}

// -----------------------------------------------------------------------------
// 初回レンダリングの実行
// -----------------------------------------------------------------------------
render();

