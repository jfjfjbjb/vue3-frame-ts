import { apiGet, apiPost, apiErr } from '@/api/test';
import { ref } from 'vue';

export default function () {
  // data
  const loading = ref(false);
  const getRes = ref();

  // methods
  const onGetData = function () {
    // 获取请求
    $http({
      reqInstance: apiGet,
      params: {},
      useLoading: (flag: boolean) => {
        loading.value = flag;
      },
      success: (res: any) => {
        getRes.value = JSON.stringify(_.get(res, 'data.data'));
      }
    });
  };

  const onSubmit = function (loadingParams = {}) {
    // 提交请求
    $http({
      reqInstance: apiPost,
      params: {},
      loadingParams: (flag: boolean) => {
        return flag ? {} : { useMessage: true, tips: '请求成功！' };
      }
    });
  };

  const onSubmitErr = async function (loadingParams = {}) {
    // 提交请求
    await $http({
      reqInstance: apiErr,
      params: {}
    });
  };

  return {
    loading,
    getRes,
    onGetData,
    onSubmit,
    onSubmitErr
  };
}
