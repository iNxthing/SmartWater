<template>
  <footer>
    <div class="footer-content">
      <div>2025 SmartWater Santa Marta - Monitoreo IoT agua potable</div>
      <div class="social-icons">
        <span>AGUA</span>
        <span>IoT</span>
        <span>SMART</span>
      </div>
      <div>Proyecto financiado con sostenibilidad ambiental</div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style scoped>
footer {
  background: #0a2e2b;
  color: #d9f0ea;
  text-align: center;
  padding: 2rem;
  margin-top: 2rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.social-icons span {
  margin: 0 0.4rem;
  font-size: 0.9rem;
  font-weight: bold;
}

@media (max-width: 780px) {
  .footer-content {
    flex-direction: column;
  }
}
</style>
