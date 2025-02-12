import { $, el, fromTemplate, renderEl } from "../lib/el.js";
import { loadCSS } from "../lib/loadCSS.js";
import { useFormBinding } from "../lib/useFormBinding.js";

export class OrderPage extends HTMLElement {
  #user = {
    name: "",
    phone: "",
    email: "",
  };

  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const style = el("style");
    loadCSS("/components/OrderPage.css", style);

    renderEl([style, el("section")], this.root);
  }

  connectedCallback() {
    window.addEventListener("appcartchange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    const getSectionContent = () => {
      if (app.store.cart.length == 0) {
        return el("p", { className: "empty" }, "Your order is empty");
      }

      let orderTotal = 0;
      const cartItems = app.store.cart.map((item) => {
        orderTotal += item.quantity * item.product.price;

        return el("cart-item", {
          dataset: {
            item: JSON.stringify(item),
          },
        });
      });

      const order = el("ul", {}, [
        ...cartItems,
        el("li", {}, [
          el("p", { className: "total" }, "Total"),
          el("p", { className: "price-total" }, `$${orderTotal.toFixed(2)}`),
        ]),
      ]);

      const orderForm = fromTemplate("order-form-template");

      return [el("h2", {}, "Your Order"), order, orderForm];
    };

    let section = $("section", this.root);
    renderEl(getSectionContent(), section);

    const form = $("form", this.root);

    if (!form) {
      return;
    }

    this.#user = useFormBinding(form, this.#user);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert(`Thanks for your order ${this.#user.name}`);

      this.#user.name = "";
      this.#user.email = "";
      this.#user.phone = "";

      // TODO Send data to the server
    });
  }
}
customElements.define("order-page", OrderPage);
