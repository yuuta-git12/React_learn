// =============================================================================
// MemoPage コンポーネント
// メモアプリの親コンポーネント。AddForm、DelForm、Memoを統合して表示する
// =============================================================================

import Memo from './Memo';       // メモ一覧表示コンポーネント
import AddForm from './AddForm'; // メモ追加フォームコンポーネント
import DelForm from './DelForm'; // メモ削除フォームコンポーネント

/**
 * MemoPage コンポーネント
 * メモアプリ全体のレイアウトを担当する
 * - 上部（alertエリア）: 追加フォームと削除フォーム
 * - 下部: メモ一覧テーブル
 */
function MemoPage(){
    return(
        <div>
            {/* メモ操作エリア：追加・削除フォームを配置 */}
            <div className='alert'>
                <AddForm />
                <DelForm />
            </div>
            {/* メモ一覧表示エリア */}
            <Memo />
        </div>
    );
}

export default MemoPage;
