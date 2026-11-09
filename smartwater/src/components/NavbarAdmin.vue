<template>
  <header>
    <nav>
      <div class="logo" @click="Inicio">SmartWater <span>Santa Marta IoT</span></div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen 
    },
    Inicio(){
      this.$router.push('/smartwater');
    }
  }
}
</script>

<style scoped>
header {
  background: #0a2e2b;
  color: white;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.logo {
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.logo span {
  color: #6bc9b3;
  font-weight: lighter;
}


.menu-toggle {
  display: none;
  font-size: 1.2rem;
  cursor: pointer;
  background: #2c9b82;
  padding: 0.4rem 1rem;
  border-radius: 8px;
}



.logo:hover { 
  cursor: pointer;
}

@media (max-width: 780px) {
  .nav-links {
    display: none;
    width: 100%;
    flex-direction: column;
    text-align: center;
    padding: 1rem 0;
    gap: 0.8rem;
  }
  .nav-links.active {
    display: flex;
  }
  .menu-toggle {
    display: block;
  }
}
</style>
