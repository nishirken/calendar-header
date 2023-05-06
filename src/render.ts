import type { SvelteComponent } from 'svelte';
import App from './App.svelte';
import type { Bridge } from './Bridge';

export * from './Bridge';
export * from './Observable';

type Props = { bridge: Bridge };
type Component = Omit<SvelteComponent, '$set'> & {
  $set: (props?: Props) => void;
};

export const render = (selector: string, bridge: Bridge): Component => {
  return new App({
    target: document.querySelector(selector)!,
    props: { bridge },
  });
};
