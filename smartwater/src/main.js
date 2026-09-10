import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import LoginForm from './components/LoginForm.vue';

const app = createApp(App).use(router).use(router);

app.component("LoginForm",LoginForm);

app.mount('#app');

export{app};