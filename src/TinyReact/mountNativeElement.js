import createDOMElement from "./createDOMElement";
import unmountNode from "./unmountNode";

export default function mountNativeElement(virtualDOM, container, oldDOM) {
  const newElement = createDOMElement(virtualDOM);

  if (oldDOM) {
    container.insertBefore(newElement, oldDOM);
    unmountNode(oldDOM);
  } else {
    // 将转换之后的页面挂在到container中
    container.appendChild(newElement);
  }

  let { component } = virtualDOM;
  if (component) {
    component.setDOM(newElement);
  }
}
