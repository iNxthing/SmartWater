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
      items: [],
      loadingImages: false,
    }
  },
  methods: {
    getAllImages: function(){
      this.loadingImages = true;
      this.axios.get('http://127.0.0.1:8000/ImagenesGaleria')
        .then(response => {
          this.items = response.data.respuesta ?? [];
          console.log(this.items);
        })
    }, 
    mostrarInfo(alt) {
      alert('Infraestructura desplegada: ' + alt + '. SmartWater monitorea fugas y niveles en tiempo real.')
    }
  },
  created(){
    this.getAllImages();
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
