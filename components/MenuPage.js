export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    this.root.appendChild(style);

    async function loadCSS() {
      const request = await fetch("/components/MenuPage.css");
      const css = await request.text();
      style.textContent = css;
    }

    loadCSS();
  }

  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);
    loadData();
  }
}

customElements.define("menu-page", MenuPage);
