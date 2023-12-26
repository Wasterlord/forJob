import { createApp } from 'vue';
// @ts-ignore
import router from './router/index.ts';
import Maska from 'maska';
// @ts-ignore
import { store } from './store/index.ts';
import '../src/scss/global.scss';
import App from './app.vue';

const app = createApp(App)
app.use(store);
app.use(Maska);
app.use(router);
app.mount('#root')