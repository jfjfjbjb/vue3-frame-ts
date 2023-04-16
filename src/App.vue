<template>
  <a-config-provider :locale="antdLocale">
    <!-- 统一empty -->
    <template #renderEmpty>
      <custom-empty></custom-empty>
    </template>
    <!-- router -->
    <div id="entry">
      <RouterView />
    </div>
    <!-- 蒙层 -->
    <div class="entry-mask ani-progress" :style="{ display: maskVisible ? 'block' : 'none' }"></div>
    <!-- back-top -->
    <a-back-top style="right: 20px" />
  </a-config-provider>
</template>

<script lang="tsx" setup>
import { ref, watch, onMounted } from 'vue';
import { winRegister, winKeys } from './utils/window';
import { GLOBAL } from './utils/event';
import { useThemeStore } from './stores/theme';
import { changeTheme } from '@/style/theme';
import useLocales from './hooks/useLocales';

const themeStore = useThemeStore();
const { antdLocale, setLocale } = useLocales();
// 初始化Locale
const initLocale = localStorage.getItem($config.localStorage.LOCALE) || '';
setLocale(initLocale);
// 初始化theme
const initTheme = localStorage.getItem($config.localStorage.THEME) || 'compact';
changeTheme(initTheme);
setThemeClassName(initTheme);

// eslint-disable-next-line no-undef
// console.log('Env.theme:', __THEME__ || '--');

// data
const maskVisible = ref(false);

// computed
// const theme = computed(() => {
//   const themeStore = useThemeStore();
//   return `theme-${themeStore.theme || 'compact'}`;
// });

// watch
watch(
  () => themeStore.theme,
  (newVal, oldVal) => {
    setThemeClassName(newVal, oldVal);
  }
);

// life circle
onMounted(() => {
  console.log('App Loaded!!');

  // resize
  window.addEventListener('resize', (e) => {
    $bus.emit(GLOBAL.WINDOW_RESIZE, e);
  });
});

// methods
function showMask() {
  let html = document.documentElement;
  maskVisible.value = true;
  html.style.overflow = 'hidden';
}
function hideMask() {
  let html = document.documentElement;
  maskVisible.value = false;
  html.style.overflow = 'auto';
}
function setThemeClassName(newTheme: string, oldTheme?: string) {
  oldTheme && document.body.classList.remove(`theme-${oldTheme}`);
  document.body.classList.add(`theme-${newTheme}`);
}

// expose
let exposeObj = {
  showMask,
  hideMask
};
defineExpose(exposeObj);
// 注册windows全局属性
winRegister(winKeys.$ENTRY, exposeObj);
</script>

<style scoped lang="less">
.entry-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.05);
  cursor: not-allowed;
  z-index: @zindex-mask;
}
</style>
