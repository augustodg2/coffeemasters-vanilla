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
      return pageElement;
    },
  },
  {
    path: "/product/{id}",
    getElement: (params) => {
      const pageElement = document.createElement("details-page");

      Object.assign(pageElement.dataset, {
        ...pageElement.dataset,
        ...params,
      });

      return pageElement;
    },
  },
];
