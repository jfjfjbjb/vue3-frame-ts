import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

let arr: number[] = [1, 2, 3, 4, 5];
let arr1: any[] = [1, 'xxg', true, 4, 5];
let hh: string | number = 1;
hh = 'ssdddeess';

console.log(arr, arr1, hh);
