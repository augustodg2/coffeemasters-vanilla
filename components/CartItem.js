import { $, renderEl } from "../lib/el.js";
import { removeFromCart } from "../services/Order.js";

export class CartItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const item = JSON.parse(this.dataset.item);

    const content = $("#cart-item-template").content.cloneNode(true);

    renderEl(content, this);

    $(".qty", this).textContent = `${item.quantity}x`;
    $(".name", this).textContent = item.product.name;
    $(".price", this).textContent = `$${item.product.price.toFixed(2)}`;
    $("a.delete-button", this).addEventListener("click", () => {
      removeFromCart(item.product.id);
    });
  }
}

customElements.define("cart-item", CartItem);
