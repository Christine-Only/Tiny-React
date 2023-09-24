import TinyReact from "./TinyReact";

const root = document.getElementById("root");

const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
    <input type="text" value="13" />
  </div>
);

const modifyDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test123">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段被修改过内容</span>
    <button onClick={() => alert("你好!!!!!")}>点击我</button>
    {/* <h6>这个将会被删除</h6> */}
    2, 3
    <input type="text" value="13" />
  </div>
);

// TinyReact.render(virtualDOM, root)

// console.log('virtualDOM: ', virtualDOM);

const Demo = () => <div>&hearts;</div>;

const Heart = (props) => (
  <div>
    {props.title} <Demo />
  </div>
);

// TinyReact.render(<Heart title="Hello React"/>, root);

class Alert extends TinyReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Hello React",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ title: "changed title" });
  }

  render() {
    return (
      <div>
        {this.props.name}
        {this.props.age}
        <div>
          {this.state.title}
          <button onClick={this.handleClick}>点我改变title</button>
        </div>
      </div>
    );
  }
}

TinyReact.render(<Alert name="Christine" age={18} />, root);

// TinyReact.render(virtualDOM, root);

setTimeout(() => {
  // TinyReact.render(modifyDOM, root);
  // TinyReact.render(<Heart title="Hello React" />, root);
  TinyReact.render(<Alert name="Picker" age={22} />, root);
}, 2000);
