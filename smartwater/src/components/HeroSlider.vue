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
        { src: 'https://static1.squarespace.com/static/521e95f4e4b01c5870ce81cf/t/55e6681fe4b05f924df365d8/1441163330952/?format=1500w', alt: 'Monitoreo agua' },
        { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH0rHBn1eJNmJ1IESmwJt3Rom31tz6Ie5ZhCwe9lfz-yxa1ib5n0eaab8&s=10', alt: 'Fugas' },
        { src: 'https://telemetrik.co/wp-content/uploads/2023/04/Sensores-de-nivel-e-IoT-la-clave-para-la-optimizacio%CC%81n-del-servicio-en-el-acueducto-de-Segovia-970x457.jpg', alt: 'Tanques' },
        { src: '', alt: 'Dashboard' }
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
