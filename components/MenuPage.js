import { $, el, fromTemplate, renderEl } from "../lib/el.js";
import { loadCSS } from "../lib/loadCSS.js";

export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const style = el("style");
    loadCSS("/components/MenuPage.css", style);

    renderEl(style, this.root);
  }

  connectedCallback() {
    const content = fromTemplate("menu-page-template");
    renderEl(content, this.root);

    window.addEventListener("appmenuchange", () => {
      this.render();
    });

    this.render();
  }

  render() {
    const menu = $("#menu", this.root);

    const getMenuContent = () => {
      if (!app.store.menu) {
        return "Loading...";
      }

      return app.store.menu.map((category) => {
        const productList = category.products.map((product) =>
          el("product-item", {
            dataset: {
              product: JSON.stringify(product),
            },
          })
        );

        return el("li", {}, [
          el("h3", {}, category.name),
          el("ul", { className: "category" }, productList),
        ]);
      });
    };

    renderEl(getMenuContent(), menu);
  }
}

customElements.define("menu-page", MenuPage);
