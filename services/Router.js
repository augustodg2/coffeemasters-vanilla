import { renderEl } from "../lib/el.js";
import { routes } from "../routes.js";

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

    window.addEventListener("popstate", () => {
      this.go(location.pathname, false);
    });

    this.go(location.pathname, false);
  },

  matchRoute(route, path) {
    const paramRegex = /(?<=\{)[^{}]*(?=\})/g;
    const paramMatches = route.path.matchAll(paramRegex);

    if (paramMatches.length < 1) {
      return {
        matches: true,
        params: {},
      };
    }

    const routeSegments = route.path.split("/");
    const pathSegments = path.split("/");

    if (routeSegments.length !== pathSegments.length) {
      return {
        matches: false,
        params: {},
      };
    }

    const params = {};

    const segmentsMatch = routeSegments.every((routeSegment, i) => {
      const result = routeSegment.match(paramRegex);
      const param = result?.[0];

      if (param) {
        params[param] = pathSegments[i];
        return true;
      }

      return routeSegment === pathSegments[i];
    });

    return {
      matches: segmentsMatch,
      params: segmentsMatch ? params : {},
    };
  },

  go(path, addToHistory = true) {
    if (addToHistory) {
      history.pushState({ path }, null, path);
    }

    let pageElement = null;

    routes.forEach((route) => {
      const { matches, params } = this.matchRoute(route, path);

      if (matches) {
        pageElement = route.getElement(params);
      }
    });

    if (!pageElement) {
      pageElement = document.createElement("h1");
      pageElement.textContent = "404: not found";
    }

    const main = document.querySelector("main");

    renderEl(pageElement, main);
    window.scrollX = 0;
    window.scrollY = 0;
  },
};

export default Router;
