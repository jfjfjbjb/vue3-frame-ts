import loading from '@/utils/loading';
// import common from '@/utils/common.js';

declare global {
  const require: any;
  const defineOptions: any;
  // 已通过window.ts注册到window上，可直接使用
  const _: any;
  const $config: any;
  const $bus: any;
  const $loading: ReturnType<typeof loading>;
  const $common: any;
  const $message: any;
  const $notification: any;
  const $ROOT: any;
  const $ENTRY: any;
  // 扩充window，使用方式：window.xxxx
  interface Window {
    _axiosPromiseArr: any[];
 }
}

export {};