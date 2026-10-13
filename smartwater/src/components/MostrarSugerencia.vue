<template>
  <section id="sugerencias">
    <div class="sugerencias-header">
      <h2 class="section-title">Sugerencias Recibidas</h2>
      <button class="btn-toggle" @click="togglePanel">
        {{ mostrar ? 'Ocultar sugerencias' : 'Ver sugerencias' }}
        <span class="contador">{{ sugerencias.length }}</span>
      </button>
    </div>

    <div v-show="mostrar" class="panel">
      <p v-if="cargando" class="panel-vacio">Cargando sugerencias...</p>
      <p v-else-if="error" class="panel-vacio error">{{ error }}</p>
      <p v-else-if="!sugerencias.length" class="panel-vacio">
        Todavia no se han recibido sugerencias.
      </p>
      <ul v-else class="lista-sugerencias">
        <li v-for="s in sugerencias" :key="s.id" class="sugerencia-item">
          <div class="item-header">
            <strong>{{ s.nombre }}</strong>
            <span class="fecha">{{ s.fecha }}</span>
          </div>
          <a class="correo" :href="'mailto:' + s.correo">{{ s.correo }}</a>
          <p class="queja">{{ s.queja }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    name: "MostrarSugerencia",
    data() {
      return {
        mostrar: false,
        sugerencias: [],
        cargando: false,
        error: ''
      }
    },
    methods: {
      togglePanel() {
        this.mostrar = !this.mostrar
        if (this.mostrar) {
          this.getAllSugerencias()
        }
      },
      getAllSugerencias() {
        this.cargando = true;
        this.error = '';
        this.axios
        .get('http://127.0.0.1:8000/obtenerSugerencias')
        .then(response => {
          this.sugerencias = response.data.respuesta ?? [];
        })
        .catch(err => {
          console.error('Error al cargar las sugerencias:', err)
          this.sugerencias = []
          this.error = 'No fue posible cargar las sugerencias en este momento.'
        })
        .finally(() => {
          this.cargando = false
        });
      }
    }
  }
</script>

<style scoped>

.section-title {
  margin-bottom: 0;
}

.sugerencias-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.contador {
  display: inline-block;
  min-width: 1.6rem;
  padding: 0.1rem 0.5rem;
  border-radius: 40px;
  background: #0d1f1a;
  color: #5fe3b0;
  font-size: 0.85rem;
  text-align: center;
}

.panel {
  background: #0d1f1a;
  border-radius: 28px;
  padding: 2rem;
  box-shadow: 0 12px 24px rgba(0,0,0,0.05);
  max-width: 800px;
  margin: 0 auto;
}

.panel-vacio {
  color: #5fe3b0;
  font-weight: 500;
  text-align: center;
  padding: 1rem;
  background: #0d1f1a;
  border-radius: 16px;
}

.panel-vacio.error {
  background: #3d1518;
  color: #ff9aa5;
}

.lista-sugerencias {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sugerencia-item {
  padding: 1rem 1.2rem;
  border: 1px solid #c8e0d8;
  border-left: 4px solid #2c9b82;
  border-radius: 12px;
  background: #12261f;
}

.item-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
}

.item-header strong {
  color: #5fe3b0;
}

.fecha {
  color: #ffffff;
  font-size: 0.85rem;
}

.correo {
  display: inline-block;
  margin: 0.2rem 0 0.6rem;
  color: #2c9b82;
  font-size: 0.9rem;
  text-decoration: none;
}

.correo:hover {
  text-decoration: underline;
}

.queja {
  margin: 0;
  color: #ffffff;
  white-space: pre-line;
}

@media (max-width: 500px) {
  .panel {
    padding: 1.5rem;
    margin: 0 1rem;
  }
}
</style>