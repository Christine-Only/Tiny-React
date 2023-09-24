import createDOMElement from "./createDOMElement";
import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";
import updateTextNode from "./updateTextNode";
import unmountNode from "./unmountNode";
import isFunction from "./isFunction";
import diffComponent from "./diffComponent";

export default function diff(virtualDOM, container, oldDOM) {
  console.log("virtualDOM: ", virtualDOM);
  console.log("oldDOM: ", oldDOM);
  const oldVirtualDOM = oldDOM?._virtualDOM;

  // 判断 旧节点 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container);
  } else if (isFunction(virtualDOM)) {
    // 判断要更新的组件是否是组件
    // 对比组件
    diffComponent(virtualDOM, container, oldDOM);
  } else if (virtualDOM.type !== oldVirtualDOM?.type) {
    // 根据 Virtual DOM 创建真实 DOM 元素
    const newElement = createDOMElement(virtualDOM);
    // 用创建出来的真实 DOM 元素 替换旧的 DOM 元素
    // oldDOM.parentNode.replaceChild(newElement, oldDOM)
    container.replaceChild(newElement, oldDOM);
  } else if (virtualDOM.type === oldVirtualDOM?.type) {
    if (virtualDOM.type === "text") {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    } else {
      // 更新元素节点属性
      updateNodeElement(oldDOM, virtualDOM.props, oldVirtualDOM.props);
    }

    // 存储包含 key 的集合
    const keysMap = new Map();
    oldDOM.childNodes.forEach((dom) => {
      // 1 代表元素节点
      if (dom.nodeType === 1) {
        const key = dom.getAttribute("key");
        key && keysMap.set(Number(key), dom);
      }
    });

    if (keysMap.size) {
      virtualDOM.children.forEach((child, i) => {
        const domElement = keysMap.get(child.props.key);
        if (domElement) {
          if (oldDOM.childNodes[i] !== domElement) {
            oldDOM.insertBefore(domElement, oldDOM.childNodes[i]);
          }
        } else {
          mountElement(child, oldDOM, oldDOM.childNodes[i]);
        }
      });
    } else {
      // 递归对比 Virtual DOM 的子元素
      virtualDOM.children.forEach((child, i) => {
        diff(child, oldDOM, oldDOM.childNodes[i]);
      });
    }

    // 删除节点-发生在节点更新以后并且发生在同一个父节点下的所有子节点身上
    // 获取旧节点
    const oldChildNodes = oldDOM.childNodes;
    // 如果旧节点的数量多于要渲染的新节点的长度
    if (oldChildNodes.length > virtualDOM.children.length) {
      for (
        let i = oldChildNodes.length - 1;
        i > virtualDOM.children.length - 1;
        i--
      ) {
        unmountNode(oldChildNodes[i]);
      }
    }
  }
}
