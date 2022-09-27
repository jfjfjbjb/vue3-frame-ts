import http, { getCancelToken } from '../utils/http';

export function apiGet(params: any, cancelHandler: Function) {
  return http({
    url: '/api/get',
    method: 'get',
    params,
    cancelToken: getCancelToken(cancelHandler)
  });
}

export function apiPost(params: any) {
  return http({
    url: '/api/post',
    method: 'post',
    data: params
  });
}

export function apiErr(params: any) {
  return http({
    url: '/api/post/err',
    method: 'post',
    data: params
  });
}
