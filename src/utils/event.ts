/**
 * 全局event bus
 * （已注册于window.$bus，无需引入）
 */
import mitt from 'mitt';
import type { EventType, Handler } from 'mitt';
const bus = mitt();

export default {
  on(type: EventType, handler: Handler) {
    bus.on(type, handler);
  },
  // on(...args: [EventType, Handler]) {
  //   bus.on(...args);
  // },
  emit(type: EventType, event: unknown) {
    bus.emit(type, event);
  },
  off(type: EventType, handler?: Handler) {
    bus.off(type, handler);
  },
};

/**
 * 事件名称
 * -- GLOBAL：全局事件
 * -- ！其余事件名，也请统一处理
 */
export const GLOBAL = {
  // window窗口变化
  WINDOW_RESIZE: 'WINDOW_RESIZE'
};
