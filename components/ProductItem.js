import { $, fromTemplate, renderEl } from "../lib/el.js";
import { addToCart } from "../services/Order.js";

export class ProductItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const content = fromTemplate("product-item-template");

    const product = JSON.parse(this.dataset.product);

    $("h4", content).textContent = product.name;
    $("p.price", content).textContent = `$${product.price.toFixed(2)}`;
    $("img", content).src = `/data/images/${product.image}`;
    $("a", content).addEventListener("click", (event) => {
      console.log(event.target.tagName);
      if (event.target.tagName.toLowerCase() === "button") {
        addToCart(product.id);
      } else {
        app.router.go(`/product/${product.id}`);
      }
      event.preventDefault();
    });

    renderEl(content, this);
  }
}

customElements.define("product-item", ProductItem);
