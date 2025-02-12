import Router from "./services/Router.js";
import Store from "./services/Store.js";

import "./components/index.js";

window.app = {};
app.store = Store;
app.router = Router;

/* Browsers might have finished parsing, but is still constructing the DOM
 * So it's better to wait for the DOMContentLoaded event for DOM manipulation
 *
 * The difference between load and DOMContentLoaded event is that the load event
 * is fired when the whole page has loaded, including all dependent resources such
 * as stylesheets, images and videos.
 */
window.addEventListener("DOMContentLoaded", async () => {
  app.router.init();
});
