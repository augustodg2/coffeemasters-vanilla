import { $, fromTemplate, renderEl } from "../lib/el.js";
import { removeFromCart } from "../services/Order.js";

export class CartItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const item = JSON.parse(this.dataset.item);

    const content = fromTemplate("cart-item-template");

    $(".qty", content).textContent = `${item.quantity}x`;
    $(".name", content).textContent = item.product.name;
    $(".price", content).textContent = `$${item.product.price.toFixed(2)}`;
    $("a.delete-button", content).addEventListener("click", () => {
      removeFromCart(item.product.id);
    });

    renderEl(content, this);
  }
}

customElements.define("cart-item", CartItem);
