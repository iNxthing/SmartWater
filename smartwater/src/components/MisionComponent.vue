<template>
  <section id="mision">
    <h2 class="section-title">Nuestra Mision</h2>
    <div class="mision-container">
      <div class="mision-content">
        <p class="mision-text">"Implementar un sistema inteligente basado en IoT que permita supervisar la presion del agua, el nivel de los tanques y detectar fugas en tiempo real para mejorar la gestion del recurso hidrico en Santa Marta, optimizar mantenimientos y garantizar un acceso equitativo al agua potable."</p>
        <br>
        <p><strong>Objetivos estrategicos:</strong> Reducir perdidas de agua en un 40% en 2 anos, enviar alertas automaticas, fomentar sostenibilidad y generar reportes de consumo para entidades publicas.</p>
        <p><strong>Viabilidad:</strong> Tecnologia de bajo costo + sensores + plataforma de monitoreo. Apoyo de la alcaldia y empresas de acueducto.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MisionComponent'
}
</script>

<style scoped>
.mision-container {
  background: white;
  border-radius: 28px;
  padding: 2rem;
  box-shadow: 0 12px 24px rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;
}

.mision-content {
  position: relative;
  z-index: 2;
}

.mision-text {
  font-size: 1.2rem;
  font-weight: 500;
  font-style: italic;
}

.mision-container::after {
  content: '';
  position: absolute;
  bottom: -30px;
  right: -30px;
  width: 160px;
  height: 160px;
  background: #6bc9b3;
  border-radius: 50%;
  opacity: 0.25;
  z-index: 0;
}
</style>
