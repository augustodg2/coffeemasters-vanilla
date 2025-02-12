import { $, el, renderEl } from "../lib/el.js";

let css;

async function loadCSS() {
  const request = await fetch("/components/MenuPage.css");
  css = await request.text();
}

export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const style = el("style");

    if (css) {
      style.textContent = css;
    } else {
      loadCSS().then(() => {
        style.textContent = css;
      });
    }

    renderEl(style, this.root);
  }

  connectedCallback() {
    const content = $("#menu-page-template").content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener("appmenuchange", () => {
      this.render();
    });

    this.render();
  }

  render() {
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

    const menu = $("#menu", this.root);
    renderEl(getMenuContent(), menu);
  }
}

customElements.define("menu-page", MenuPage);
