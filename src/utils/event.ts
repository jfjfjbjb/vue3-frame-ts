/**
 * 全局event bus
 * （已注册于window.$bus，无需引入）
 */
import mitt from 'mitt';
import type { EventType, Handler } from 'mitt';
const bus = mitt();

export default {
  // on(event: EventType, handler: Handler) {
  //   bus.on(event, handler);
  // },
  on(...args: [EventType, Handler]) {
    bus.on(...args);
  },
  emit(event: EventType, handler: Handler) {
    bus.emit(event, handler);
  },
  off(event: EventType, handler?: Handler) {
    bus.off(event, handler);
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
