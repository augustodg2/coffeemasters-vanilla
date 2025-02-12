/* Browsers might have finished parsing, but is still constructing the DOM
 * So it's better to wait for the DOMContentLoaded event for DOM manipulation
 *
 * The difference between load and DOMContentLoaded event is that the load event
 * is fired when the whole page has loaded, including all dependent resources such
 * as stylesheets, images and videos.
 */
window.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
  nav.innerHTML = `
    <h2>Hello World</h2>
    <p>This was loaded using JavaScript</p>
  `;
});
