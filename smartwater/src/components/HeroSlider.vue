<template>
  <article v-show="loadingImages == true" class="slider-container">
    <SkeletonPrime height="14rem"></SkeletonPrime>
    <SkeletonPrime height="14rem"></SkeletonPrime>
    <SkeletonPrime height="14rem"></SkeletonPrime>
  </article>
  <section id="inicio" v-show="loadingImages == false">
    <div class="hero-slider">
      <div class="slider-container" @mouseenter="pauseSlider" @mouseleave="resumeSlider">
        <img
          v-for="(slide, index) in slides"
          :key="index"
          class="slide"
          :class="{ active: currentSlide === index }"
          :src="slide.src"
          :alt="slide.alt"
        >
        <div class="image-overlay" v-if="slides.length">
          <span>{{ slides[currentSlide].nombre }}</span>
        </div>
        <button class="slider-btn btn-prev" @click="prev">&#10094;</button>
        <button class="slider-btn btn-next" @click="next">&#10095;</button>
      </div>
    </div>
    <div class="hero-text">
      <h2>Tecnologia IoT para la gestion eficiente del agua en Santa Marta</h2>
      <p>Monitoreo de presion, nivel de tanques y alertas tempranas de fugas para reducir perdidas.</p>
    </div>
  </section>
</template>

<script>
import API_BASE_URL from '../api'

export default {
  name: 'HeroSlider',
  data() {
    return {
      currentSlide: 0,
      autoInterval: null,
      slides: [],
      loadingImages : false,
    }
  },
  mounted() {
    this.startSlider()
  },
  beforeUnmount() {
    this.clearSlider()
  },
  methods: {
    getAllImages: async function (){
      this.loadingImages = true;
      await this.axios 
      .get(`${API_BASE_URL}/ImagenesSlider`)
      .then(response => {
        this.slides = response.data.respuesta ?? [];
        console.log(this.slides);
      })
      .catch(e => {
        console.error('Error al cargar las imágenes del slider:', e)
        this.slides = []
      })
      .finally(()=> {
      setTimeout(() => {
        this.loadingImages = false;
        }, 2000);
      });
    },




    startSlider() {
      this.autoInterval = setInterval(() => this.next(), 5500)
    },
    clearSlider() {
      clearInterval(this.autoInterval)
    },
    pauseSlider() {
      this.clearSlider()
    },
    resumeSlider() {
      this.startSlider()
    },
    next() {
      if (!this.slides.length) return
      this.currentSlide = (this.currentSlide + 1) % this.slides.length
    },
    prev() {
      if (!this.slides.length) return
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    }
  },
  created(){
    this.getAllImages();
  }
}
</script>

<style scoped>
.hero-slider {
  position: relative;
  width: 100%;
  height: 460px;
  overflow: hidden;
  border-radius: 28px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  margin-bottom: 2rem;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.8s ease;
  object-fit: cover;
}

.slide.active {
  opacity: 1;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(8, 46, 41, 0.7);
  color: white;
  border: none;
  font-size: 2rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
  z-index: 10;
  border-radius: 40px;
  transition: 0.2s;
}

.slider-btn:hover {
  background: #5fe3b0;
}

.btn-prev {
  left: 15px;
}

.btn-next {
  right: 15px;
}

.hero-text {
  text-align: center;
  margin-top: 1.2rem;
}

.hero-text h2 {
  color: #5fe3b0;
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
  pointer-events: none;
  z-index: 1;
}

.image-overlay span {
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

@media (max-width: 780px) {
  .hero-slider {
    height: 280px;
  }
}

@media (max-width: 500px) {
  .hero-slider {
    height: 220px;
  }
}
</style>
