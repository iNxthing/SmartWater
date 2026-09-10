<template>
  <section id="inicio">
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
        <div class="image-overlay">
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
export default {
  name: 'HeroSlider',
  data() {
    return {
      currentSlide: 0,
      autoInterval: null,
      slides: [
        { src: 'https://static1.squarespace.com/static/521e95f4e4b01c5870ce81cf/t/55e6681fe4b05f924df365d8/1441163330952/?format=1500w', alt: 'Monitoreo agua', nombre: 'Monitoreo de agua' },
        { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKhz9M9tnfyZA9IiOMMwEsaYKJIHc1tl6VazjCwg0O08UHQ3GIwcSbP9k&s=10', alt: 'Fugas', nombre: 'Detección de fugas' },
        { src: 'https://telemetrik.co/wp-content/uploads/2023/04/Sensores-de-nivel-e-IoT-la-clave-para-la-optimizacio%CC%81n-del-servicio-en-el-acueducto-de-Segovia-970x457.jpg', alt: 'Tanques', nombre: 'Monitoreo de tanques' },
        { src: 'https://i.pinimg.com/736x/37/f9/9e/37f99e422f151a5914f50d70673e9e3c.jpg', alt: 'Dashboard', nombre: 'Panel de control' }
      ]
    }
  },
  mounted() {
    this.startSlider()
  },
  beforeUnmount() {
    this.clearSlider()
  },
  methods: {
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
      this.currentSlide = (this.currentSlide + 1) % this.slides.length
    },
    prev() {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    }
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
  background: #0e5e4f;
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
  color: #0a5b4b;
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
