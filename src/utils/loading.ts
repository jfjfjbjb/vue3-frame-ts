/**
 * 全局loading
 * （已注册于window.$loading，无需引入）
 */
import config from '@/config';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

interface LoadingParmas {
  useMessage?: boolean;
  tips?: string;
  method?: 'success' | 'error' | 'info' | 'warning' | 'warn';
  errTitle?: string;
}

const msgKey = 'global_message_key';
const { BASE = {} } = config.LOADING || {};
NProgress.configure(BASE);

const Loading = {
  show(params: LoadingParmas = {}) {
    const { useMessage = false, tips } = params;
    if (useMessage) {
      $message.loading({ content: tips || '请求中...', key: msgKey });
    } else {
      NProgress.start();
    }
  },
  hide(params: LoadingParmas = {}) {
    const { useMessage = false, method, tips, errTitle } = params;
    if (method && method !== 'success') {
      // 非成功时，使用notification显示信息
      $notification[method || 'error']({
        message: errTitle || '请求失败',
        description: tips || ''
      });
      NProgress.done();
      $message.destroy();
      return;
    }
    if (useMessage) {
      $message[method || 'success']({
        content: tips || '请求完成！',
        key: msgKey
      });
    } else {
      $message.destroy();
    }
    NProgress.done();
  }
};

export default Loading;
