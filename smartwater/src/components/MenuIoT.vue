<template>
  <article v-show="loadingIOT == true" class="card-content">
    <SkeletonPrime height="8rem"></SkeletonPrime>
    <SkeletonPrime height="8rem"></SkeletonPrime>
    <SkeletonPrime height="8rem"></SkeletonPrime>
  </article>
  <section id="menu" v-show="loadingIOT == false">
    <h2 class="section-title">Menu de Funcionalidades IoT</h2>
    <div class="cards-container">
      <div class="card" v-for="(card, index) in cards" :key="index">
        <img class="card-img" :src="card.img" :alt="card.alt">
        <div class="card-content">
          <h3>{{ card.titulo }}</h3>
          <p>{{ card.descripcion }}</p>
          <div class="badge">{{ card.badge }}</div>
        </div>
      </div>
    </div>
    <div class="btn-container">
      <button @click="mostrarInfo">Conocer mas sobre el sistema IoT</button>
    </div>
  </section>
</template>

<script>
import API_BASE_URL from '../api'

export default {
  name: 'MenuIoT',
  data() {
    return {
      cards: [],
      loadingIOT: false,
    }
  },
  methods: {
    getAllImages: async function(){

      this.loadingIOT = true;
      await this.axios.get(`${API_BASE_URL}/ImagenesIOT`)
        .then(response => {
          this.cards = response.data.respuesta ?? [];
          console.log(this.cards);
        })
        .catch(e => {
        console.error('Error al cargar las imagenes del menu IOT',e)
        this.cards = []
      })
        .finally(()=> {
          setTimeout(()=> {
            this.loadingIOT = false;
          }, 2000);
        });
    },
    mostrarInfo() {
      alert('El sistema SmartWater integra sensores de presion, caudal y nivel, conectados a una plataforma cloud. Genera reportes historicos, alertas por fugas y dashboard para operadores. Proyecto alineado con ODS 6 - Agua limpia y saneamiento.')
    }
  },
  created(){
    this.getAllImages();
  }
}
</script>

<style scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.card {
  background: #0d1f1a;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  transition: transform 0.25s ease;
}

.card:hover {
  transform: translateY(-8px);
}

.card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  background: #bcd9d0;
}

.card-content {
  padding: 1.4rem;
}

.card-content h3 {
  color: #5fe3b0;
  margin-bottom: 0.5rem;
}

.badge {
  display: inline-block;
  background: #12261f;
  padding: 0.2rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #4ade9f;
  margin-top: 12px;
}

.btn-container {
  text-align: center;
  margin-top: 1.5rem;
}
</style>
