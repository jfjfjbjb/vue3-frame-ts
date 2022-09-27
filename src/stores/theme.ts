import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('');
  function setTheme(val = '') {
    theme.value = val;
  }

  return { theme, setTheme };
});

