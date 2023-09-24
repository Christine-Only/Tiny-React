export default function updateNodeElement(element, newProps, oldProps = {}) {
  Object.keys(newProps).forEach((propName) => {
    // 获取属性值
    const newPropsValue = newProps[propName];
    const oldPropsValue = oldProps[propName];
    if (newPropsValue !== oldPropsValue) {
      if (propName.startsWith("on")) {
        // 添加事件处理函数 onClick => click
        const eventName = propName.toLowerCase().slice(2);
        element.addEventListener(eventName, newPropsValue);
        // 删除原有的事件处理函数
        if (oldPropsValue) {
          element.removeEventListener(eventName, oldPropsValue);
        }
      } else if (propName === "value" || propName === "checked") {
        element[propName] = newPropsValue;
      } else if (propName !== "children") {
        if (propName === "className") {
          element.setAttribute("class", newPropsValue);
        } else {
          if (propName === "ref" && typeof newPropsValue === "function") {
            newPropsValue(element);
          }
          element.setAttribute(propName, newPropsValue);
        }
      }
    }
  });

  // 判断属性被删除的情况
  Object.keys(oldProps).forEach((propName) => {
    const newPropsValue = newProps[propName];
    const oldPropsValue = oldProps[propName];
    if (!newPropsValue) {
      if (propName.startsWith("on")) {
        const eventName = propName.toLowerCase().slice(2);
        element.removeEventListener(eventName, oldPropsValue);
      } else if (propName !== children) {
        element.removeAttribute(propName);
      }
    }
  });
}
