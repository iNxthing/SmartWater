<template>
  <div>
  <router-view />
  </div>
  
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

body {
  background: #f0f7f4;
  color: #1a3b2f;
  line-height: 1.5;
}

#app {
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  min-height: 100vh;
  overflow-x: hidden;
}

.container main {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
}

.container main > section {
  padding: 3rem 2rem;
}

.section-title {
  display: inline-block;
  width: auto;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #2c9b82;
  color: #0e5e4f;
  font-size: 2rem;
  text-align: center;
}

.container button {
  border: none;
  border-radius: 40px;
  padding: 0.6rem 1.2rem;
  background: #2c9b82;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
}

.container button:hover {
  background: #1c6b5a;
}

@media (max-width: 780px) {
  .container main > section {
    padding: 2.5rem 1.5rem;
  }

  .section-title {
    font-size: 1.6rem;
  }
}

@media (max-width: 500px) {
  .container main > section {
    padding: 2rem 1rem;
  }
}
</style>
