import { createApp } from 'vue';
import { createPinia } from 'pinia';
import config from './config';
import router from './router';
import App from './App.vue';
import components from './components/index';
import wins, { winRegister, winKeys } from './utils/window';
import loadAllPlugins from './plugins/index';
// antd样式全量引入，可以支持本地换肤
// import 'ant-design-vue/dist/antd.variable.less';
import './style/index.less';

const app = createApp(App);
app.use(createPinia());
app.use(router);

// 注册windows全局属性
wins(config);
winRegister(winKeys.$ROOT, app);

// 注册全局组件
components(app);

// 加载插件
loadAllPlugins(app);

app.mount('#app');
