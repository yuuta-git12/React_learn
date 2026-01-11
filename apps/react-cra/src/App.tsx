import React from 'react';
import logo from './logo.svg';
import './App.css';
import Ellipse from './Ellipse';

const title = "React page.";
const message = "メッセージを表示します";
const content_true = `*これが、trueの時に表示されるメッセージです。ちゃんと表示されていますか？`;
const content_false = `*これは、falseの時に表示されるメッセージです。`;

function Msg(msg:string, size:number, color:string){
  const s = {
    fontSize: size + "pt",
    color: color,
  }
  return <p className='msg' style={s}>{msg}</p>
}

// Msg2Propsインターフェースの定義
interface Msg2Props {
  msg: string,
  size: number,
  color: string
}

function Msg2(props: Msg2Props){
  const s = {
    fontSize: props.size + "pt",
    color: props.color,
  }
  return <p className='msg' style={s}>{props.msg}</p>
}

// Msg3：タグで囲われたコンテンツを表示する
function Msg3(props:{children: string}){
  console.log(props.children);
  return (
    <div className='msg'>
      {props.children}
    </div>
  );
}

function Msg4(props:{children:Array<any>}){
  return (
    <ol className='msg'>
      {props.children.map((child: any) => {
        return <li style={{margin:"10px 50px"}}>
          {/* childで渡された属性のコンテンツの値を取り出している */}
          {child.props.children}
        </li>;
      })}
    </ol>
  )
}

// Dataコンポーネントのインターフェース
// data属性の中に３つのオブジェクトを用意
interface DataInterface {
  data:{
    name:string,
    mail:string,
    age:number
  }
}
// Dataコンポーネントの定義
function Data(props:DataInterface){
  return (
    <p className='msg'>
      {props.data.name}({props.data.age}) &lt;{props.data.mail}&gt;
    </p>
  );
}

const flg = false; // 表示フラグ
// リストデータ
const list_data = [
  <li className='msg'>One</li>,
  <li className='msg'>Two</li>,
  <li className='msg'>Three</li>,
];
// mapで利用するデータ
const map_data = [
  {name:'Taro',mail:'taro@tomioka',age:30},
  {name:'Kei',mail:'kei@toumine',age:30},
  {name:'Toshiya',mail:'toshiya@tomioka',age:28},
  {name:'Jiro',mail:'jiro@change',age:18},
  {name:'Kumi',mail:'kumi@class',age:60},
];

// アロー関数で使用するデータ
const arrow_data = {
  url:'http://google.com',
  title:'Google',
  caption:`*これは、Googleの検索サイトです。このサイトは、Googleが提供しています`,
}

// データ取得の関数定義(コンポーネントではないので注意)
function getData(n:number){
  const flg = n%2 == 0;
  return (
    <p className='msg'
      style={flg ? {backgroundColor:'gray', color:'white'}: {}}>
      [{n+1}] {map_data[n].name}({map_data[n].age}) &lt;{map_data[n].mail}&gt;
    </p>
  );
}

// ?を付けることで、属性が任意（あってもなくてもOK)であることを示す
function App(props: {counter?: number}) {
  return (
    <div className='container'>
      {/* コンポーネント内のスタイル設定 */}
      <style>{`
        h1 {
          coloer: white;
          background-color: blue;
          padding: 5px;
        }
        h2 {
          color: white;
          background-color: red;
          padding: 5px 10px;
        }
        p.msg {
          background-color: lightyellow;
        }
      `}</style>
      <h1>{title}</h1>
      <h2>{message}</h2>
      {/* Msgに引数を渡して呼び出し */}
      { Msg("最初のメッセージ", 36, "red")}
      { Msg("次のメッセージ", 24, "lightgray")}
      { Msg("最後のメッセージ", 12, "black")}

      {/* Msg2のprops(属性)を使って値を渡す場合 */}
      <Msg2 msg={"最初のメッセージ2"} size={20} color={"blue"} />
      <Msg2 msg={"次のメッセージ2"} size={20} color={"green"} />
      <Msg2 msg={"最後のメッセージ2"} size={20} color={"orange"} />

      {/* Msg3 タグで囲われたコンテンツを表示する場合*/}
      <Msg3>
        ＊これは、メッセージです。
        複数行のメッセージを表示します。
      </Msg3>

      {/* Msg4 複数のタグ付きのコンテンツを表示する場合 */}
      <Msg4>
        <p>＊これは、メッセージです。</p>
        <p>複数行のメッセージを表示します</p>
        <p>番号をつけて順に表示されます。</p>
      </Msg4>

      {flg ?
        <div className='msg'>
          <p>{content_true}</p>
        </div>
        :
        <div className='msg'>
          <p>{content_false}</p>
        </div>
      }

      {/* リスト表示 */}
      <ul>
        {list_data}
      </ul>

      {/* mapデータのテーブル表示 */}
      <table className='data-table'>
        <thead>
          <tr>
            <th>name</th>
            <th>mail</th>
            <th>age</th>
          </tr>
        </thead>
        <tbody>
          {map_data.map(value =>(
            <tr>
              <td>{value.name}</td>
              <td>{value.mail}</td>
              <td>{value.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {getData(0)}
      {getData(1)}
      {getData(2)}
      {getData(3)}
      {getData(4)}

      {/* Dataコンポーネントでの表示 */}
      <Data data={{name:'Taro', mail:'taro@yamada', age:45}} />
      <Data data={{name:'Hanako', mail:'hanako@flower', age:36}} />
      <Data data={{name:'Sachiko', mail:'sachiko@happy', age:27}} />

      {/* アロー関数での表示 */}
      {(()=>
        <div className='card'>
          <div className="header">
            {arrow_data.title}
          </div>
          <div className='body'>
            {arrow_data.caption}
          </div>
          <div className='footer'>
            <a href={arrow_data.url}>*{arrow_data.title}に移動</a>
          </div>
        </div>
      )()}

      {/* Ellupseコンポーネントでの楕円形の描画 */}
      <Ellipse width={100} height={100} x={50} y={250} color="#f006" />
      <Ellipse width={125} height={125} x={100} y={300} color="#f006" />
      <Ellipse width={150} height={150} x={150} y={350} color="#f006" />
      <Ellipse width={175} height={175} x={200} y={400} color="#f006" />

      <h5 className='msg'>
        count:{props.counter || 0}.
      </h5>

    </div>
  );
}

export default App;
