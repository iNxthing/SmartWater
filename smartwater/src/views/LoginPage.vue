<template>
    <div class="pagina-login">
        <LoginForm />
    </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
};
</script>

<style>
.pagina-login {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: #f4f9fe;
}
</style>