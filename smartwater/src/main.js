import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import LoginForm from './components/LoginForm.vue';
import BuzonQuejas from './components/BuzonQuejas.vue';
import FooterBar from './components/FooterBar.vue';
import HeroSlider from './components/HeroSlider.vue';
import MostrarSugerencia from './components/MostrarSugerencia.vue';
import NavBar from './components/NavBar.vue';
import QuienesSomos from './components/QuienesSomos.vue';
import UbicacionComponent from './components/UbicacionComponent.vue';
import GaleriaComponent from './components/GaleriaComponent.vue';
import MisionComponent from './components/MisionComponent.vue';
import MenuIoT from './components/MenuIoT.vue';
import axios from 'axios';

import VueAxios from 'vue-axios';


const app = createApp(App).use(router);

app.use(VueAxios, axios);


app.component("BuzonQuejas",BuzonQuejas);
app.component("MenuIoT",MenuIoT);
app.component("FooterBar",FooterBar);
app.component("GaleriaComponent",GaleriaComponent);
app.component("HeroSlider",HeroSlider);
app.component("MostrarSugerencia",MostrarSugerencia);
app.component("MisionComponent",MisionComponent);
app.component("NavBar",NavBar);
app.component("QuienesSomos",QuienesSomos);
app.component("UbicacionComponent",UbicacionComponent);
app.component("LoginForm",LoginForm);



app.mount('#app');

export{app};
