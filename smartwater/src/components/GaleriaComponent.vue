<template>
  <section id="galeria">
    <h2 class="section-title">Infraestructura y sensores en campo</h2>
    <div class="gallery-grid">
      <div
        class="gallery-item"
        v-for="(item, index) in items"
        :key="index"
        @click="mostrarInfo(item.alt)"
      >
        <img :src="item.src" :alt="item.alt">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'GaleriaComponent',
  data() {
    return {
      items: [
        { src: 'https://placehold.co/400x250/318f7a/white?text=Estacion+de+monitoreo', alt: 'Estacion monitoreo' },
        { src: 'https://placehold.co/400x250/57b594/white?text=Sensor+de+caudal', alt: 'Sensor caudal' },
        { src: 'https://placehold.co/400x250/1f6e5c/white?text=Panel+de+control+IoT', alt: 'Panel IoT' },
        { src: 'https://placehold.co/400x250/399e86/white?text=Tanque+inteligente', alt: 'Tanque inteligente' },
        { src: 'https://placehold.co/400x250/4cae94/white?text=Comunicacion+LoRa', alt: 'Comunicacion IoT' },
        { src: 'https://placehold.co/400x250/269c7c/white?text=Dron+supervision', alt: 'Supervision tecnica' }
      ]
    }
  },
  methods: {
    mostrarInfo(alt) {
      alert('Infraestructura desplegada: ' + alt + '. SmartWater monitorea fugas y niveles en tiempo real.')
    }
  }
}
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  height: 200px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.gallery-item:hover img {
  transform: scale(1.08);
}
</style>
