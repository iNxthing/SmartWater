<template>
  <section id="quienes">
    <h2 class="section-title">Quienes Somos</h2>
    <div class="quienes-container">
      <div class="quienes-img">
        <img src="https://placehold.co/450x320/298F7A/white?text=Equipo+Ingenieria+IoT" alt="Equipo SmartWater">
      </div>
      <div class="quienes-text">
        <p>Somos un equipo interdisciplinario de ingenieros, tecnicos y especialistas en medio ambiente, comprometidos con resolver la crisis de fugas y distribucion desigual del agua potable en Santa Marta. Desarrollamos un sistema basado en Internet de las Cosas (IoT) con sensores de bajo costo que permiten supervisar en tiempo real la red hidraulica, detectar anomalias y optimizar el mantenimiento.</p>
        <br>
        <p>
          <span class="tag-iot">+40 sensores instalados</span>
          <span class="tag-iot">reduccion de perdidas 28%</span>
          <span class="tag-iot">alertas automaticas</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'QuienesSomos'
}
</script>

<style scoped>
.quienes-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
}

.quienes-img {
  flex: 1;
  min-width: 220px;
}

.quienes-img img {
  width: 100%;
  border-radius: 28px;
  box-shadow: 0 6px 14px rgba(0,0,0,0.1);
}

.quienes-text {
  flex: 1;
}

.quienes-text p {
  font-size: 1.1rem;
}

.tag-iot {
  background: #eef7f3;
  padding: 0.2rem 0.8rem;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: bold;
  display: inline-block;
  margin-right: 0.5rem;
}

@media (max-width: 500px) {
  .quienes-container {
    flex-direction: column;
  }
}
</style>
