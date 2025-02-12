# Vanilla JS: You Might Not Need a Framework

During this course, I had the opportunity to review some important concepts, such as Web Components, Client-side routing, and State Management, and how to implement them using vanilla JavaScript.

The course explored different patterns and techniques, focusing in giving you the tools to build a single-page application without the need of a framework.

After completing it, I created a set of utility functions that I found useful, and refactored the code to use them. The result is my own micro-library that can be used to build modern web apps.

## Features

- **SPA Router**: A basic client-side router that allows you to define routes and their corresponding handlers for a single-page application.
- **State Management**: A state management library that allows you to create and manage a reactive global state.
- **Two-way data binding**: A simple implementation of two-way data binding for forms.
- **Web Components**: Usage of custom elements to create reusable components, leveraging the Shadow DOM and HTML templates.
- **el.js**: A set of utility functions that help you manipulate the DOM.
- **loadCSS**: A function that loads a CSS file dynamically and automatically caches it.

## How to run the project

### VSCode Live Server

The easiest way to run the project is to use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for Visual Studio Code.

1. Install the extension.
2. Open the project in VSCode.
3. Right-click on the `index.html` file.
4. Select `Open with Live Server`.

### serve

If you prefer to use the node `serve` package with npx by running:

```bash
npx serve
```

> ### Disclaimer
>
> This repo was created on top of the base repo for the [Vanilla JS: You Might Not Need a Framework][course] course on Frontend Masters.
>
> [![Frontend Masters](images/FrontendMastersLogo.png)][fem]
>
> [Please click here][website] to head to the course website.

[fem]: https://www.frontendmasters.com
[website]: https://firtman.github.io/vanilla/
[course]: https://frontendmasters.com/courses/vanilla-js-apps/
