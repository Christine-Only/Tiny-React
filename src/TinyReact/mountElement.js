import mountNativeElement from "./mountNativeElement";
import mountComponent from "./mountComponent";
import isFunction from "./isFunction";

export default function mountElement(virtualDOM, container, oldDOM) {
  // component VS 普通的Virtual DOM对象
  if (isFunction(virtualDOM)) {
    mountComponent(virtualDOM, container, oldDOM);
  } else {
    mountNativeElement(virtualDOM, container, oldDOM);
  }
}
