/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'ant-design-vue/dist/theme.js' {
  export declare const darkThemeSingle: any;
  export declare const compactThemeSingle: any;
  export declare const getThemeVariables: any;
}
