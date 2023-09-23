import mountNativeElement from "./mountNativeElement";
import mountComponent from "./mountComponent";
import isFunction from "./isFunction";

export default function mountElement(virtualDOM, container) {
  // component VS 普通的Virtual DOM对象
  if (isFunction(virtualDOM)) {
    mountComponent(virtualDOM, container);
  } else {
    mountNativeElement(virtualDOM, container);
  }
}
