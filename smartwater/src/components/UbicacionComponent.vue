<template>
  <section id="ubicacion">
    <h2 class="section-title">Donde se implementa el proyecto</h2>
    <div class="ubicacion-grid">
      <div class="mapa">
        <iframe
          src="https://maps.google.com/maps?q=Santa+Marta,+Colombia&t=&z=12&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style="border:0; border-radius: 20px;"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
      <div class="info-contacto">
        <h3>Oficina Tecnica SmartWater</h3>
        <p>Calle 22 # 5-42, Centro Historico, Santa Marta</p>
        <h3>Contacto para alcaldia y operadores</h3>
        <p>+57 315 789 4002</p>
        <h3>Atencion a tecnicos 24/7</h3>
        <p>Monitoreo continuo - Mesa de ayuda IoT</p>
        <h3>Email</h3>
        <p>soporte@smartwatersmarta.gov.co</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UbicacionComponent'
}
</script>

<style scoped>
.ubicacion-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}

.mapa {
  flex: 1.2;
  min-width: 260px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  height: 320px;
}

.info-contacto {
  flex: 0.9;
  background: white;
  padding: 1.6rem;
  border-radius: 24px;
  box-shadow: 0 8px 18px rgba(0,0,0,0.05);
}

.info-contacto h3 {
  margin-top: 1rem;
  margin-bottom: 0.3rem;
  color: #0e5e4f;
}

.info-contacto h3:first-of-type {
  margin-top: 0;
}
</style>
