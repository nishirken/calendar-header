import App from "./App.svelte";

const render = (selector: string): any => {
  const app = new App({
    target: document.querySelector(selector)!,
  });
  return app;
};

export default render;