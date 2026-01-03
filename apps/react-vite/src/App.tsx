import './App.css'

const title = "React page.";
const message = "メッセージを表示します";

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

function App() {
  return (
    <div className='container'>
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
    </div>
  );
}

export default App
