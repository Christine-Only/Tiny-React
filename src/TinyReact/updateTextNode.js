export default function updateTextNode(virtualDOM, oldVirtualDOM, oldDOM) {
  if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
    // 更新真实 DOM 对象中的内容
    oldDOM.textContent = virtualDOM.props.textContent;
    // 同步真实 DOM 对应的 Virtual DOM
    oldDOM._virtualDOM = virtualDOM;
  }
}
