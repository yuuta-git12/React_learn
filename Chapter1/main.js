// Reactバージョン　定数で宣言
const version = "19.2.0";

// カウンター変数
let counter = 0;

// moduleのimport　非同期関数で宣言
// 非同期関数は、処理が完了するまで待つ関数
// awaitは、非同期関数が完了するまで待つキーワード
// async function init(){
//     // Reactのimport
//     // importは、指定したモジュールを読み込むためのキーワード
//     // awaitは、非同期関数が完了するまで待つキーワード
//     const module1 = await import(`https://esm.sh/react@${version}`);
//     // モジュールの本体(オブジェクトの集合)のdefaultプロパティの値をwindow.Reactに代入
//     window.React = module1.default;
//     // ReactDOMClientのimport
//     const module2 = await import(`https://esm.sh/react-dom@${version}/client`);
//     // モジュールの本体(オブジェクトの集合)のdefaultプロパティの値をwindow.ReactDOMClientに代入
//     window.ReactDOMClient = module2.default;
//     // メイン処理の実行
//     main();
// }

/**
 * Promiseを使ってモジュールをインポートする場合
 */
function init(){
    
    const rootDom = document.getElementById('root');
    // rootエレメントにイベント処理を割り当て
    // ルートのエレメントないをクリックしたら、第二引数のdoCount関数が実行される
    rootDom.addEventListener('click',doCount);
    
    import(`https://esm.sh/react@${version}`).then(React => {
        window.React = React;
        import(`https://esm.sh/react-dom@${version}/client`).then(ReactDOMClient => {
            window.ReactDOMClient = ReactDOMClient;

            // React Root作成
            window.rootElement = ReactDOMClient.createRoot(rootDom);

            render();
        });
    });
}

// 描画処理
function render(){
    // 仮想DOMのエレメントを作成　表示する内容を指定する
    const h2 = React.createElement('h2',{
        id:"title",
        name:"title",
        style:{
            color:"white",
            backgroundColor:"blue",
            padding:"5px 10px"
        }
    },"Sample application");
    const p = React.createElement('p',{
        id:"msg",
        name:"msg",
        style:{
            fontWeight:"bold",
            textAlign:"center",
            fontSize:"16pt"
        }
    },"これはReactのサンプルアプリケーションです。");

    const count = React.createElement(
        'p',{},"count:" + counter
    )

    // 仮想DOMのエレメントを作成　表示する内容を指定する
    const div = React.createElement('div',{
        id:"elements",
        name:"elements",
        style:{
            backgroundColor:"white",
            padding:"0px 0px 5px 0px"
        }
    },[h2,count,p]);
    // レンダリングした表示の作成
    rootElement.render(div);
    /* 
    この書き方でレンダリングしてもOK
    root.Element.render([h2,p,count]);
    */
}

// clickイベント処理
function doCount(){
    counter++;
    render();
}

init();