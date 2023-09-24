import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent(virtualDOM, container, oldDOM) {
  let newVirtualDOM = null;
  let component = null;
  // 判断组件是类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    newVirtualDOM = buildFunctionComponent(virtualDOM);
  } else {
    newVirtualDOM = buildClassComponent(virtualDOM);
    // 获取类组件实例对象
    component = newVirtualDOM.component;
  }

  // 判断得到的 Virtual Dom 是否是组件
  if (isFunction(newVirtualDOM)) {
    // 如果是组件 继续调用 mountComponent 解剖组件
    mountComponent(newVirtualDOM, container, oldDOM);
  } else {
    // 如果是 普通的Virtual DOM对象 就去渲染
    mountNativeElement(newVirtualDOM, container, oldDOM);
  }

  // 如果类组件实例对象存在的话
  if (component) {
    component.componentDidMount();
    // 判断组件实例对象身上是否有 props 属性 props 属性中是否有 ref 属性
    component.props?.ref?.(component);
  }
}

function buildFunctionComponent(virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {});
}

function buildClassComponent(virtualDOM) {
  // 实例化类组件 得到类组件实例对象 并将 props 属性传递给类组件
  const component = new virtualDOM.type(virtualDOM.props || {});
  // 调用类组件中的render方法得到要渲染的 Virtual DOM
  const newVirtualDOM = component.render();
  newVirtualDOM.component = component;
  return newVirtualDOM;
}
