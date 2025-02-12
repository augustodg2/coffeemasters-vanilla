import { $, el, renderEl } from "../lib/el.js";
import { getProductById } from "../services/Menu.js";
import { addToCart } from "../services/Order.js";

let css;

async function loadCSS() {
  const request = await fetch("/components/DetailsPage.css");
  css = await request.text();
}
export class DetailsPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const content = $("#details-page-template").content.cloneNode(true);
    const style = el("style");

    if (css) {
      style.textContent = css;
    } else {
      loadCSS().then(() => {
        style.textContent = css;
      });
    }

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
