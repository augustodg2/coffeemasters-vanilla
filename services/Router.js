const Router = {
  init() {
    document.querySelectorAll("a.navlink").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        if (event.target.host !== location.host) {
        }

        const path = event.target.pathname;

        this.go(path);
      });
    });

    Router.go(location.pathname, false);
  },

  go(path, addToHistory = true) {
    if (addToHistory) {
      history.pushState({ path }, null, path);
    } else {
      history.replaceState({ path }, null, path);
    }

    let pageElement = null;
    switch (path) {
      case "/":
        pageElement = document.createElement("h1");
        pageElement.textContent = "Home";
        break;
      case "/order":
        pageElement = document.createElement("h1");
        pageElement.textContent = "Your Order";
        break;

      default:
        if (path.startsWith("/product/")) {
          pageElement = document.createElement("h1");
          pageElement.textContent = "Details";
          const paramId = path.substring(path.lastIndexOf("/") + 1);
          pageElement.dataset.id = paramId;
          break;
        }

        pageElement = document.createElement("h1");
        pageElement.textContent = "404: Page not found";
        break;
    }

    if (pageElement != null) {
      const main = document.querySelector("main");
      // main.children[0].remove();
      main.innerHTML = "";
      main.appendChild(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};

export default Router;
