export function resetEl(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function appendEl(element, parent) {
  if (Array.isArray(element)) {
    element.forEach((el) => appendEl(el, parent));
  } else if (element instanceof Node) {
    parent.appendChild(element);
  } else if (typeof element === "string" || typeof element === "number") {
    parent.appendChild(document.createTextNode(element));
  }
}

export function renderEl(element, parent) {
  resetEl(parent);
  appendEl(element, parent);
}

export function el(tagname, props = {}, children = []) {
  var element = document.createElement(tagname);

  if (props.dataset) {
    for (let [key, value] of Object.entries(props.dataset)) {
      element.dataset[key] = value;
    }
    delete props.dataset;
  }

  Object.assign(element, props);

  appendEl(children, element);

  return element;
}

export function $(selector, parent = document) {
  return parent.querySelector(selector);
}
