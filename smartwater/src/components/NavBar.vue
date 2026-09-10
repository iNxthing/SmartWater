<template>
  <header>
    <nav>
      <div class="logo">SmartWater <span>Santa Marta IoT</span></div>
      <div class="menu-toggle" @click="toggleMenu">MENU</div>
      <ul class="nav-links" :class="{ active: menuOpen }">
        <li><a href="#inicio" @click.prevent="scrollTo('inicio')">Inicio</a></li>
        <li><a href="#quienes" @click.prevent="scrollTo('quienes')">Quienes Somos</a></li>
        <li><a href="#menu" @click.prevent="scrollTo('menu')">Menu IoT</a></li>
        <li><a href="#ubicacion" @click.prevent="scrollTo('ubicacion')">Donde Nos Encuentran</a></li>
        <li><a href="#mision" @click.prevent="scrollTo('mision')">Nuestra Mision</a></li>
      </ul>
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
    scrollTo(id) {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      this.menuOpen = false
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
  justify-content: space-between;
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

.nav-links {
  display: flex;
  gap: 1.8rem;
  list-style: none;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s;
  padding: 0.5rem 0;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: #6bc9b3;
  transition: 0.3s;
}

.nav-links a:hover::after {
  width: 100%;
}

.menu-toggle {
  display: none;
  font-size: 1.2rem;
  cursor: pointer;
  background: #2c9b82;
  padding: 0.4rem 1rem;
  border-radius: 8px;
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
