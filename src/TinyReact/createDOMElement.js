import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";

export default function createDOMElement(virtualDOM) {
  let newElement = null;
  const { type, props, children } = virtualDOM;
  if (type === "text") {
    // 文本节点
    newElement = document.createTextNode(props.textContent);
  } else {
    // 元素节点
    newElement = document.createElement(type);
    updateNodeElement(newElement, props);
  }

  // 将 Virtual DOM 挂载到真实 DOM 对象的属性中 方便在对比时获取其 Virtual DOM
  newElement._virtualDOM = virtualDOM;

  // 递归创建子节点
  children.forEach((child) => {
    mountElement(child, newElement);
  });

  return newElement;
}
