import './App.css'

const title = "React page.";
const message = "メッセージを表示します";
const content_true = `*これが、trueの時に表示されるメッセージです。ちゃんと表示されていますか？`;
const content_false = `*これは、falseの時に表示されるメッセージです。`;

function Msg(msg:string, size:number, color:string){
  const s = {
    fontSize: size + "pt",
    color: color,
    fontWeight: "bold",  
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

const flg = true; // 表示フラグ
// リスト
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

function App() {
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
        li.msg {
          background-color: lightyellow;
          color: black;
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
          {map_data.map(value => (
            <tr>
              <td>{value.name}</td>
              <td>{value.mail}</td>
              <td>{value.age}</td>
            </tr>
          ))}
        </tbody>
      </table>



    </div>
  );
}

export default App
