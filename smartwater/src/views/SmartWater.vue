<template>
    <div class="container">
        <NavBar />
        <main>
            <HeroSlider />
            <QuienesSomos />
            <MenuIoT />
            <GaleriaComponent />
            <UbicacionComponent />
            <BuzonQuejas />
            <MisionComponent />
        </main>
    <FooterBar />
  </div>
</template>

<script>
export default {
    components: {
        
    },
  methods: {
    estaAutorizado: async function(){
      try {
        await this.axios.get('https://apismartwater.onrender.com/ImagenesSlider',{
          headers: { Authorization: 'bearer ' + localStorage.getItem('token') }
        });
        // Respuesta 2xx: el token es válido, no hay nada que hacer.
      } catch (error) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          alert('Su sesión ha expirado o no tiene autorización para acceder a esta sección. Por favor, inicie sesión nuevamente.');
          localStorage.removeItem('token');
          this.$router.push('/');
        }
      }
    },
    borarToken(){
      localStorage.removeItem('token');
    }
  },
  created(){
    this.estaAutorizado(); 
  }
};

</script>

<style>
.container {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background: #000000;
    display: flex;
    flex-direction: column;
}

.container main {
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0;
    flex: 1;
}

@media (max-width: 780px) {
    .container main {
        max-width: 100%;
    }
}

@media (max-width: 500px) {
    .container main {
        padding: 0;
    }
}
</style>
