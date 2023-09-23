import createDOMElement from "./createDOMElement";

export default function mountNativeElement(virtualDOM, container) {
  const newElement = createDOMElement(virtualDOM)

  // 将转换之后的页面挂在到container中
  container.appendChild(newElement);
}