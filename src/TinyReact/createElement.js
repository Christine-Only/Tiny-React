export default function createElement(type, props, ...children) {
  const childElements = [].concat(...children).reduce((current, child) => {
    if (typeof child !== "boolean" && child !== null) {
      if (child instanceof Object) {
        current.push(child);
      } else {
        current.push(createElement("text", { textContent: child }));
      }
    }
    return current;
  }, []);
  return {
    type,
    props: Object.assign({ children: childElements }, props),
    children: childElements,
  };
}
