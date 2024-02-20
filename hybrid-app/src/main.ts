import './assets/main.css';

import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import { store, key } from '../store';
import utils from './plugins/utils';

const app = createApp(App);

app.use(store, key);

app.use(router);
app.use(VueAxios, axios);
app.use(utils);

app.mount('#app');
