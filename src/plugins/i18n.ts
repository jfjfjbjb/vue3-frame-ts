import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import config from '@/config/index';
const modules = import.meta.glob('../locales/*.ts', { eager: true });
const messages: any = {};
for (const key in modules) {
  const matches = key.match(/\/([^/]+)\.ts/);
  if (matches) {
    messages[matches[1]] = (modules[key] as any).default;
  }
}

const i18n = createI18n({
  locale: localStorage.getItem(config.localStorage.LOCALE) || 'zh-cn',
  legacy: false,
  globalInjection: true,
  fallbackLocale: 'zh-cn',
  messages
});

export { i18n };

export default function (app: App) {
  app.use(i18n);
}
