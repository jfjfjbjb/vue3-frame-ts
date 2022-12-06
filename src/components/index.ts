import type { App } from 'vue';
import VNode from './VNode';
// import Input from './Input/index.vue';
// import Empty from './Empty/index.vue';
// import Select from './Select/index.vue';
const modules = import.meta.glob('./*/*.vue', { eager: true });

/**
 * 组件集合，生成全局组件使用
 */
interface CompRegItemType {
  name?: string;
  comp: any;
}
interface CompRegType {
  [propName: string]: CompRegItemType;
}

// 解析modules
function resolveModules(modules: any) {
  const comps: CompRegType = {};
  for (const key in modules) {
    const nameMatch = key.match(/^\.\/([\s\S]+)\/.+/);
    const _key = nameMatch != null ? nameMatch[1] : '';
    comps[_key] = {
      comp: (modules[key] as any).default
    };
  }
  return comps;
}

const config: CompRegType = {
  VNode: {
    name: 'VNode',
    comp: VNode
  },
  ...resolveModules(modules)
};

export default function (app: App) {
  _.forEach(config, (item: CompRegItemType, key: string) => {
    if (item.name) {
      app.component(item.name, item.comp);
      return;
    }
    app.component(
      `custom${key.replace(/[A-Z]/g, ($0) => {
        return '-' + $0.toLowerCase();
      })}`,
      item.comp
    );
  });
}
