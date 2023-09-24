import diff from "./diff";

export default class Component {
  constructor(props) {
    this.props = props;
  }

  setState(state) {
    // 由于在子类调用的 setState, 所以 this 指向子类
    this.state = Object.assign({}, this.state, state);
    // 获取最新的要渲染的 virtualDOM 对象
    const virtualDOM = this.render();
    const oldDOM = this.getCOM();
    // 获取旧的 virtualDOM 对象 和新的要渲染的 virtualDOM 对象 进行比较
    diff(virtualDOM, oldDOM.parentNode, oldDOM);
  }

  setDOM(dom) {
    this._dom = dom;
  }

  getCOM() {
    return this._dom;
  }

  updateProps(props) {
    this.props = props;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps - nextProps", nextProps);
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return JSON.stringify(this.props) === JSON.stringify(nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate - prevProps", prevProps);
  }
}
