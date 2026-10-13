<template>
  <section id="quejas">
    <h2 class="section-title">Buzon de Quejas y Sugerencias</h2>
    <div class="quejas-container">
      <div class="quejas-info">
        <p>Su opinion es importante para mejorar el servicio de distribucion de agua potable en Santa Marta. Diligencie el siguiente formulario para reportar cualquier irregularidad, fuga o problema en su sector.</p>
      </div>
      <form class="form-quejas" @submit.prevent="enviarQueja">
        <div class="form-group">
          <label for="nombre">Nombre completo</label>
          <input type="text" id="nombre" v-model="nombre" required placeholder="Ej: Juan Perez Rodriguez">
        </div>
        <div class="form-group">
          <label for="correo">Correo electronico</label>
          <input type="email" id="correo" v-model="correo" required placeholder="ejemplo@correo.com">
        </div>
        <div class="form-group">
          <label for="queja">Queja o sugerencia</label>
          <textarea id="queja" v-model="queja" rows="5" required placeholder="Describa detalladamente el problema que presenta con el suministro de agua, fugas detectadas, presion baja, etc."></textarea>
        </div>
        <div class="form-group">
          <button type="submit" :disabled="enviando">{{ enviando ? 'Enviando...' : 'Enviar queja' }}</button>
          <button type="button" @click="limpiarForm">Limpiar formulario</button>
        </div>
      </form>
      <div v-if="mensaje" class="mensaje-queja" :class="tipoMensaje">{{ mensaje }}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BuzonQuejas',
  data() {
    return {
      nombre: '',
      correo: '',
      queja: '',
      mensaje: '',
      tipoMensaje: '',
      enviando: false
    }
  },
  methods: {
    validarEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(email)
    },
    enviarQueja() {
      if (this.nombre.trim() === '') {
        this.mensaje = 'Por favor, ingrese su nombre completo.'
        this.tipoMensaje = 'error'
        return
      }
      if (this.correo.trim() === '') {
        this.mensaje = 'Por favor, ingrese su correo electronico.'
        this.tipoMensaje = 'error'
        return
      }
      if (!this.validarEmail(this.correo.trim())) {
        this.mensaje = 'Por favor, ingrese un correo electronico valido (ejemplo: usuario@dominio.com).'
        this.tipoMensaje = 'error'
        return
      }
      if (this.queja.trim() === '') {
        this.mensaje = 'Por favor, escriba su queja o sugerencia.'
        this.tipoMensaje = 'error'
        return
      }
      if (this.queja.trim().length < 10) {
        this.mensaje = 'Por favor, describa su queja con mas detalle (minimo 10 caracteres).'
        this.tipoMensaje = 'error'
        return
      }

      this.enviando = true;
      this.axios
      .post('http://127.0.0.1:8000/guardarSugerencia', {
        nombre: this.nombre,
        correo: this.correo,
        queja: this.queja
      })
      .then(response => {
        this.mensaje = response.data.Mensaje
        this.tipoMensaje = 'exito'

        this.nombre = ''
        this.correo = ''
        this.queja = ''

        setTimeout(() => {
          this.mensaje = ''
          this.tipoMensaje = ''
        }, 5000)
      })
      .catch(err => {
        console.error('Error al enviar la queja:', err)
        this.mensaje = 'No fue posible registrar su queja en este momento. Intentelo de nuevo.'
        this.tipoMensaje = 'error'
      })
      .finally(() => {
        this.enviando = false
      })
    },
    limpiarForm() {
      this.nombre = ''
      this.correo = ''
      this.queja = ''
      this.mensaje = ''
      this.tipoMensaje = ''
    }
  }
}
</script>

<style scoped>
.quejas-container {
  background: #0d1f1a;
  border-radius: 28px;
  padding: 2rem;
  box-shadow: 0 12px 24px rgba(0,0,0,0.05);
  max-width: 800px;
  margin: 0 auto;
}

.quejas-info {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #0d1f1a;
  border-radius: 16px;
}

.quejas-info p {
  color: #5fe3b0;
  font-weight: 500;
}

.form-quejas {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: bold;
  color: #5fe3b0;
}

.form-group input,
.form-group textarea {
  padding: 0.8rem;
  border: 1px solid #c8e0d8;
  border-radius: 12px;
  font-size: 1rem;
  transition: 0.2s;
  background: #12261f;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #5fe3b0;
  box-shadow: 0 0 0 3px rgba(44, 155, 130, 0.2);
}

.form-group textarea {
  resize: vertical;
}

.form-group button {
  width: auto;
  display: inline-block;
  margin-right: 1rem;
}

.form-group button:last-child {
  background: #95a5a6;
}

.form-group button:last-child:hover {
  background: #7f8c8d;
}

.mensaje-queja {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  font-weight: bold;
}

.mensaje-queja.exito {
  background: #10331d;
  color: #7ee2a8;
  border: 1px solid #c3e6cb;
}

.mensaje-queja.error {
  background: #3d1518;
  color: #ff9aa5;
  border: 1px solid #f5c6cb;
}

@media (max-width: 780px) {
  .quejas-container {
    padding: 1.5rem;
    margin: 0 1rem;
  }
}

@media (max-width: 500px) {
  .form-group button {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}
</style>
