import mountElement from "./mountElement";
import updateComponent from "./updateComponent";

export default function diffComponent(virtualDOM, container, oldDOM) {
  const oldComponent = oldDOM._virtualDOM?.component;
  console.log("oldDOM._virtualDOM: ", oldDOM._virtualDOM);

  if (isSameFunction(virtualDOM, oldComponent)) {
    // 同一个组件
    updateComponent(virtualDOM, oldComponent, container, oldDOM);
  } else {
    // 不是同一个组件
    mountElement(virtualDOM, container, oldDOM);
  }
}

// 判断是否是相同的组件
function isSameFunction(virtualDOM, oldComponent) {
  return virtualDOM.type === oldComponent?.constructor;
}
