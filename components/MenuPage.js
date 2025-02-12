let css;

async function loadCSS() {
  const request = await fetch("/components/MenuPage.css");
  css = await request.text();
}

export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    this.root.appendChild(style);

    if (css) {
      style.textContent = css;
    } else {
      loadCSS().then(() => {
        style.textContent = css;
      });
    }
  }

  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener("appmenuchange", () => {
      this.render();
    });

    this.render();
  }

  render() {
    const menu = this.root.querySelector("#menu");
    if (app.store.menu) {
      menu.innerHTML = "";
      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");

        liCategory.innerHTML = `
                <h3>${category.name}</h3>
                <ul class="category">
                </ul>
            `;

        const productList = liCategory.querySelector("ul");

        for (let product of category.products) {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);

          productList.appendChild(item);
        }

        menu.appendChild(liCategory);
      }
    } else {
      menu.innerHTML = "Loading...";
    }
  }
}

customElements.define("menu-page", MenuPage);
