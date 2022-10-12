import { message, notification } from 'ant-design-vue';
// 局部引入时请打开样式
// import 'ant-design-vue/es/message/style/index.less';
// import 'ant-design-vue/es/notification/style/index.less';
import _ from '@/utils/lodash';
import event from '@/utils/event';
import loading from '@/utils/loading';
import common from '@/utils/common.js';

export default (config: typeof $config) => {
  // config
  (window as any).$config = config;
  // lodash
  (window as any)._ = _;
  // global loading
  (window as any).$loading = loading;
  // common
  (window as any).$common = common;
  // event bus
  (window as any).$bus = event;
  // antd $message
  (window as any).$message = message;
  // antd $notification
  (window as any).$notification = notification;
};

// 后续扩展的全局属性，需要到eslintrc里设置global
interface winKeysType {
  [propName: string]: string;
}
export const winKeys: winKeysType = {
  // 注册app实例 [main.js]
  $ROOT: '$ROOT',
  // 注册entry实例 [App.vue]
  $ENTRY: '$ENTRY'
};

// window属性注册机
export const winRegister = (key: string, val: any) => {
  if (winKeys[key] == null) {
    console.warn('未定义的win_key:', key);
    return;
  }
  (window as any)[key] = val;
};
