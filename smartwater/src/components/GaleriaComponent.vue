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
        <div class="image-overlay">
          <span>{{ item.nombre }}</span>
        </div>
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
        { src: 'https://www.tecpi.com.co/wp-content/uploads/2024/10/planta-aguas-tunja-veolia-tecpi-jpg.webp', alt: 'Estacion monitoreo', nombre: 'Estacion de monitoreo' },
        { src: 'https://medicionycontrol.com.co/wp-content/uploads/2022/11/Medidor-de-Flujo-tipos-y-caracteristicas-Medicion-y-Control.jpg', alt: 'Sensor caudal', nombre: 'Sensor de caudal' },
        { src: 'https://telemetrik.co/wp-content/uploads/2023/02/Monitoreo-del-nivel-del-agua-en-tiempo-real-con-tecnologi%CC%81a-IoT-Tablero-720x478.jpg', alt: 'Panel IoT', nombre: 'Panel de control IoT' },
        { src: 'https://www.vanguardia.com/resizer/v2/oygukygfiu858257420230803172821jpg-WI7HRQMV7JHURPWWZOGHLYAQII.jpg?auth=533a63ad7d18f18038651678c61e1f2dc663e6f4b08791099d70d543d9e7f105&smart=true&width=1200&height=800&quality=70', alt: 'Tanque inteligente', nombre: 'Tanque inteligente' },
        { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKhz9M9tnfyZA9IiOMMwEsaYKJIHc1tl6VazjCwg0O08UHQ3GIwcSbP9k&s=10', alt: 'Supervision tecnica', nombre: 'Supervision tecnica' }
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

.image-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  color: white;
  text-align: center;
  transition: background 0.3s;
}

.image-overlay span {
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

.gallery-item:hover .image-overlay {
  background: rgba(0, 0, 0, 0.48);
}

.gallery-item:hover img {
  transform: scale(1.08);
}
</style>
