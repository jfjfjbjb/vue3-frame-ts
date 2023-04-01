import type {Router} from 'vue-router';

export default function (router: Router) {
  // index.html中预加载块
  const preload: HTMLElement = document.querySelector('.preload-wrapper') as HTMLElement;
  // 过度动画延时器
  let timeout: any = null;
  // 用于存储请求，方便路由切换时统一取消
  // -- 不是提供给开发取用，所以没有走window.js逻辑
  (window as any)._axiosPromiseArr = [];

  /**
   * 路由守卫
   */
  router.beforeEach(async (to, from) => {
    if (preload.style.display === 'none') {
      // 延时显示过度动画
      timeout = setTimeout(() => {
        $ENTRY.showMask();
      }, 500);
    }

    // 路由切换，canel上一个页面的请求
    window._axiosPromiseArr.forEach((cancel, index) => {
      cancel && cancel();
      delete window._axiosPromiseArr[index];
    });
  });
  router.afterEach(async (to, from) => {
    if (preload.style.display !== 'none') {
      preload.style.display = 'none';
    }
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    $ENTRY.hideMask();
  });
}
