export function useFormBinding(form, obj) {
  if (!form) return;

  const proxyObj = new Proxy(obj, {
    set(target, property, value) {
      target[property] = value;
      form.elements[property].value = value;

      return true;
    },
  });

  Array.from(form.elements).forEach((element) => {
    element.addEventListener("change", (event) => {
      proxyObj[element.name] = event.target.value;
    });
  });

  return proxyObj;
}
