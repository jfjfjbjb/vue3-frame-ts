import { ref } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUs from 'ant-design-vue/es/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import { useI18n } from 'vue-i18n';

const antdLocale = ref(zhCN);

const antdLocaelMap: any = {
  'en': enUs,
  'zh-cn': zhCN
};

export default function () {
  const { locale } = useI18n();
  const setLocale = (val: string) => {
    // i18n
    locale.value = val;
    // dayjs
    dayjs.locale(val);
    // antd
    antdLocale.value = antdLocaelMap[val];

    localStorage.setItem('locale', val);
  };

  return {
    locale,
    antdLocale,
    setLocale
  };
}
