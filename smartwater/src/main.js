import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import LoginForm from './components/LoginForm.vue';
import BuzonQuejas from './components/BuzonQuejas.vue';
import FooterBar from './components/FooterBar.vue';
import HeroSlider from './components/HeroSlider.vue';
import NavBar from './components/NavBar.vue';
import QuienesSomos from './components/QuienesSomos.vue';
import UbicacionComponent from './components/UbicacionComponent.vue';
import GaleriaComponent from './components/GaleriaComponent.vue';
import MisionComponent from './components/MisionComponent.vue';
import MenuIoT from './components/MenuIoT.vue';

// asi viene default createApp(App).use(router).mount('#app');
// creamos una constante/variable donde se utilizen los metodos de router

const app = createApp(App).use(router);

// Crear las apps/componentes

app.component("BuzonQuejas",BuzonQuejas);
app.component("MenuIoT",MenuIoT);
app.component("FooterBar",FooterBar);
app.component("GaleriaComponent",GaleriaComponent);
app.component("HeroSlider",HeroSlider);
app.component("MisionComponent",MisionComponent);
app.component("NavBar",NavBar);
app.component("QuienesSomos",QuienesSomos);
app.component("UbicacionComponent",UbicacionComponent);
app.component("LoginForm",LoginForm);

// por ultimo llamamos a las apps/componentes que creamos

app.mount('#app');

export{app};