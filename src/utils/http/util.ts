/**
 * 已注册于window.$http, 无需引入
 */
interface HttpUtilParamsType {
  reqInstance: Function;
  params: object;
  useLoading?: Function;
  loadingParams?: Function;
  useAwait?: boolean;
  success?: Function;
  error?: Function;
}

const HttpUtil = function ({
  reqInstance,
  params,
  useLoading,
  loadingParams,
  useAwait,
  success,
  error
}: HttpUtilParamsType) {
  const loading = (flag: boolean) => {
    if (useLoading) {
      useLoading(flag);
    } else {
      const _params = loadingParams ? loadingParams(flag) : {};
      $loading[flag ? 'show' : 'hide']({ ..._params });
    }
  };

  return new Promise((resolve, reject) => {
    loading(true);
    reqInstance(params)
      .then((res: any) => {
        if ($common.isSuccessCode(res)) {
          loading(false);
          // let reqData = _.get(res, 'data.data');
          success && success(res);
          useAwait && resolve(res);
        } else {
          $loading.hide({ method: 'error', tips: _.get(res, 'data.message') });
          useLoading && loading(false);
          error && error(res);
          useAwait && reject(res);
        }
        resolve(res);
      })
      .catch((e: any) => {
        useLoading && loading(false);
        reject(e);
      });
  });
};

export default HttpUtil;
