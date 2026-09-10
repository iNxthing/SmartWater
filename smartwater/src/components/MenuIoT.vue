<template>
  <section id="menu">
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
export default {
  name: 'MenuIoT',
  data() {
    return {
      cards: [
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxhyVaxGAP1M9qb9x19hEZcKHEwWHueBmHV4i0Cud6Jvh8JaYAx_YSeZU&s=10',
          alt: 'Presion agua',
          titulo: 'Monitoreo de Presion',
          descripcion: 'Medicion en tiempo real mediante sensores de presion. Detecta variaciones anormales y posibles fugas.',
          badge: 'Prioridad ALTA'
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4fOKGXQOOsAirdZ4v6Ei26Gi2SgR1C8OgHf8WtEQ-HNxQt1BqXqBaUWs&s=10',
          alt: 'Nivel tanques',
          titulo: 'Nivel de Tanques',
          descripcion: 'Sensores de nivel ultrasonicos que actualizan automaticamente el volumen de almacenamiento.',
          badge: 'Control de abastecimiento'
        },
        {
          img: 'https://www.esders.es/wp-content/uploads/2023/10/Wasserleck-Tracergas-TIB40-H2-Markus-1494x1040-1.jpg',
          alt: 'Fugas',
          titulo: 'Deteccion de Fugas',
          descripcion: 'Algoritmos que comparan flujo y presion; alertan ante fugas en la red de distribucion.',
          badge: 'Ahorro hidrico'
        },
        {
          img: 'https://fotografias.lasexta.com/clipping/cmsimages02/2021/07/08/62A2683F-7D56-4DAC-A3F7-F87735DD973C/98.jpg?crop=1300,731,x0,y9&width=1900&height=1069&optimize=high&format=webply',
          alt: 'Alertas',
          titulo: 'Generacion de Alertas',
          descripcion: 'Notificaciones automaticas al personal tecnico via app y panel central.',
          badge: 'Respuesta rapida'
        }
      ]
    }
  },
  methods: {
    mostrarInfo() {
      alert('El sistema SmartWater integra sensores de presion, caudal y nivel, conectados a una plataforma cloud. Genera reportes historicos, alertas por fugas y dashboard para operadores. Proyecto alineado con ODS 6 - Agua limpia y saneamiento.')
    }
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
  background: white;
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
  color: #0a5b4b;
  margin-bottom: 0.5rem;
}

.badge {
  display: inline-block;
  background: #e0f2e9;
  padding: 0.2rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #0b6e5b;
  margin-top: 12px;
}

.btn-container {
  text-align: center;
  margin-top: 1.5rem;
}
</style>