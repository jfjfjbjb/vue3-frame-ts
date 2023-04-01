/**
 * 单例模式：同一时间发起多个相同请求，只请求一次
 */
import Http from '@/utils/http';
import type { AxiosPromise } from 'axios';

interface httpCacheType {
  [propName: string]: AxiosPromise | null;
}
interface requestParamsType {
  url: string;
  reqParams?: object;
  method?: string;
}

const httpCache: httpCacheType = {};
const httpCbk = (key: string, resolve: Function, reject: Function) => {
  const HttpPromise = httpCache[key];
  HttpPromise &&
    HttpPromise.then((res) => {
      resolve(res);
    })
      .catch((e) => {
        reject(e);
      })
      .finally(() => {
        delete httpCache[key];
      });
};

export default function (params: requestParamsType) {
  return new Promise((resolve, reject) => {
    const { url, reqParams, method } = params;
    const key = url + '_' + JSON.stringify(reqParams);
    // 已经发起请求，直接回调
    if (httpCache[key] != null) {
      httpCbk(key, resolve, reject);
      return;
    }
    httpCache[key] = Http({
      url,
      params: reqParams,
      method: method || 'get'
    });
    httpCbk(key, resolve, reject);
  });
}
