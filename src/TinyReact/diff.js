import mountElement from "./mountElement"
import updateNodeElement from "./updateNodeElement"
import updateTextNode from "./updateTextNode"

export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM?._virtualDOM
  // 判断 旧节点 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  } else if (virtualDOM.type === oldVirtualDOM?.type) {
    if (virtualDOM.type === 'text') {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素节点属性
      updateNodeElement(oldDOM, virtualDOM.props, oldVirtualDOM.props)
    }
    virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i])
    })
  }
}