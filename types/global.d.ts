import type { App } from 'vue';
import config from '@/config';
import event from '@/utils/event';
import loading from '@/utils/loading';
import common from '@/utils/common.js';

declare global {
  const require: any;
  const defineOptions: any;
  // 已通过window.ts注册到window上，可直接使用
  const _: import('@types/lodash');
  const $config: typeof config;
  const $bus: typeof event;
  const $loading: typeof loading;
  const $common: typeof common;
  const $message: typeof import('ant-design-vue/es')['message'];
  const $notification: typeof import('ant-design-vue/es')['notification'];
  const $ROOT: App;
  const $ENTRY: {
    showMask(): void;
    hideMask(): void;
  };
  // 扩充window，使用方式：window.xxxx
  interface Window {
    _axiosPromiseArr: any[];
  }
}

export {};
