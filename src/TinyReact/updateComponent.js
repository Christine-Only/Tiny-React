import diff from "./diff";

export default function updateComponent(
  virtualDOM,
  oldComponent,
  container,
  oldDOM
) {
  oldComponent.constructor.getDerivedStateFromProps(virtualDOM.props);
  // 更新组件的 props
  oldComponent.updateProps(virtualDOM.props);
  // 因为组件的 props 已经更新 所以调用 render 方法获取最新的 Virtual DOM
  const nextVirtualDOM = oldComponent.render();
  oldComponent.componentDidMount();
  if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
    // 将组件实例对象挂载到 Virtual DOM 身上
    nextVirtualDOM.component = oldComponent;
    diff(nextVirtualDOM, container, oldDOM);
  }
  oldComponent.componentDidUpdate(oldDOM._virtualDOM.props);
}
