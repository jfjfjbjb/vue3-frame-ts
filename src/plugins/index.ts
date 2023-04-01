import type { App } from 'vue';
const modules = import.meta.glob('./*.ts', { eager: true });

export default function (app: App) {
  for (const key in modules) {
    const m = modules[key] as any;
    m.default(app);
  }
}
