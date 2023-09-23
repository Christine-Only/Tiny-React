export default function isFunctionComponent(virtualDOM) {
  return !virtualDOM.type.prototype.render;
}
