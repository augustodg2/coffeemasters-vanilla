import { $, el, fromTemplate, renderEl } from "../lib/el.js";
import { loadCSS } from "../lib/loadCSS.js";
import { getProductById } from "../services/Menu.js";
import { addToCart } from "../services/Order.js";

export class DetailsPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const content = fromTemplate("details-page-template");
    const style = el("style");
    loadCSS("/components/DetailsPage.css", style);

    renderEl([style, content], this.root);
  }

  async renderData() {
    if (!this.dataset.id) {
      alert("Invalid Product ID");
      return;
    }

    this.product = await getProductById(Number(this.dataset.id));

    $("h2", this.root).textContent = this.product.name;
    $("img", this.root).src = `/data/images/${this.product.image}`;
    $(".description", this.root).textContent = this.product.description;
    $(".price", this.root).textContent = `$ ${this.product.price.toFixed(
      2
    )} ea`;
    $("button", this.root).addEventListener("click", () => {
      addToCart(this.product.id);
      app.router.go("/order");
    });
  }

  connectedCallback() {
    this.renderData();
  }
}

customElements.define("details-page", DetailsPage);
