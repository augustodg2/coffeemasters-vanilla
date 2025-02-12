const cssCache = {};

export async function loadCSS(url, styleEl) {
  if (cssCache[url]) {
    styleEl.textContent = cssCache[url];
    return;
  }

  const response = await fetch(url);
  const css = await response.text();

  cssCache[url] = css;
  styleEl.textContent = css;
}
