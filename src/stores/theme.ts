import { defineStore } from 'pinia';
// import { ref } from 'vue';

// export const useThemeStore = defineStore('theme', () => {
//   const theme = ref('');
//   function setTheme(val = '') {
//     theme.value = val;
//   }

//   return { theme, setTheme };
// });

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => ({
    theme: 'compact'
  }),
  actions: {
    setTheme(val = '') {
      this.theme = val;
    }
  }
});
