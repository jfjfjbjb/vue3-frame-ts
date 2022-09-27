import type { App } from 'vue';
import VNode from './VNode';
import Input from './Input/index.vue';
import Empty from './Empty/index.vue';

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

const config: CompRegType = {
  VNode: {
    name: 'VNode',
    comp: VNode
  },
  Input: { comp: Input },
  Empty: { comp: Empty }
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
      item
    );
  });
}
