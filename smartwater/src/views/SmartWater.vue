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
};

</script>

<style>
.container {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background: #f0f7f4;
}

.container main {
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0;
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