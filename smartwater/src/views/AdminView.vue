<template>
    <div class="container">
        <NavbarAdmin />
        <main>
          <MostrarSugerencia/>
        </main>
    <FooterBar />
  </div>
</template>

<script>
import MostrarSugerencia from '@/components/MostrarSugerencia.vue';
import NavbarAdmin from '@/components/NavbarAdmin.vue';


  export default {
    name:"AdminView",
    components: {
      MostrarSugerencia,
      NavbarAdmin
    },  
  }
</script>

<style lang="scss" scoped>

</style>
