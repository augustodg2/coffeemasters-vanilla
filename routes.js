export const routes = [
  {
    path: "/",
    getElement: () => {
      const pageElement = document.createElement("h1");
      pageElement.textContent = "Home";

      return pageElement;
    },
  },
  {
    path: "/order",
    getElement: () => {
      const pageElement = document.createElement("h1");
      pageElement.textContent = "Your Order";

      return pageElement;
    },
  },
  {
    path: "/details/{id}",
    getElement: (params) => {
      const pageElement = document.createElement("h1");
      pageElement.textContent = "Details";

      Object.assign(pageElement.dataset, {
        ...pageElement.dataset,
        ...params,
      });

      return pageElement;
    },
  },
];
