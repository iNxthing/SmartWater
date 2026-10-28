<template>
    <main class="login">
        <div class="tarjeta">
                <header class="titulo">
            <i class="fas fa-water"></i>
            <h2>SmartWater Santa Marta</h2>
            <p>Monitoreo IoT · Agua Potable Inteligente</p>
        </header>
        <form @submit.prevent="login">
            <div class="grupo">
                <label>Usuario</label>
                <input v-model="username" type="text" placeholder="Usuario/Correo Electronico" required>
            </div>
            <div class="grupo">
                <label>Contraseña</label>
                <input v-model="password" type="password" placeholder="Ingrese su contraseña" required>
            </div>
            <button class="boton" type="submit">Ingresar</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </main>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
        };
    },
    methods: {
        login() {
            this.axios.post('https://apismartwater.onrender.com/login', {
                username: this.username,
                password: this.password
            }).then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('token', response.data.access_token);
                    this.$router.push('/smartwater');
                } else {
                    this.errorMessage = 'No fue posible iniciar sesion.';
                }
            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token')
                    this.errorMessage = 'Credenciales incorrectas.';
                } else {
                    this.errorMessage = 'No fue posible iniciar sesion. Intentelo de nuevo.';
                }
            });
        },
    },
};
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.login {
    width: 100%;
    max-width: 450px;
    background: #0d1f1a;
    border-radius: 2rem;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.tarjeta {
    padding: 2rem;
}

.titulo {
    margin-bottom: 2rem;
    text-align: center;
}

.titulo h2 {
    margin-top: 1rem;
    font-weight: 700;
}

.grupo {
    margin-bottom: 1.3rem;
}

.grupo label {
    display: block;
    margin-bottom: 0.45rem;
    color: #ffffff;
    font-size: 0.9rem;
}

.grupo input {
    display: block;
    width: 100%;
    padding: 0.85rem 1rem;
    border: 1px solid #cfdfe9;
    border-radius: 1rem;
    background: #0d1f1a;
}

.grupo input:focus {
    outline: 2px solid #e0f2e9;
    border-color: #4ade9f;
}

.boton {
    width: 100%;
    padding: 0.9rem;
    border: 0;
    border-radius: 2rem;
    background: #4ade9f;
    color: white;
    cursor: pointer;
    font-weight: 700;
}

.boton:hover {
    background: #3ddc9a;
}

.error {
    margin-top: 0.75rem;
    color: #ff8a94;
    font-size: 0.9rem;
    text-align: center;
}
</style>