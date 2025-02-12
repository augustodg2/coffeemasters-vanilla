export const routes = [
  {
    path: "/",
    getElement: () => {
      const pageElement = document.createElement("menu-page");
      return pageElement;
    },
  },
  {
    path: "/order",
    getElement: () => {
      const pageElement = document.createElement("order-page");
      pageElement.textContent = "Your Order";

      return pageElement;
    },
  },
  {
    path: "/product/{id}",
    getElement: (params) => {
      const pageElement = document.createElement("details-page");
      pageElement.textContent = "Details";

      Object.assign(pageElement.dataset, {
        ...pageElement.dataset,
        ...params,
      });

      return pageElement;
    },
  },
];
