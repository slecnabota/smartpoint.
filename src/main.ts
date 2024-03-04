import {createApp} from 'vue';
import {createPinia} from 'pinia';
import App from "./layouts/App.vue";
import router from './router/index.js';

const app = createApp(App);
const store = createPinia();

app.use(store);
app.use(router);

import Core from './_libs/core/index.js'
import libs from './_libs/index.js'
import config from './_config/index.js'

Core.init(app, router, config, libs)

app.mount('#app')