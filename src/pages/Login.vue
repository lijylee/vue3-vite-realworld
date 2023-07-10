<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link to="register">Need an account?</router-link>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="form.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="form.password"
              />
            </fieldset>
            <button
              type="button"
              class="btn btn-lg btn-primary pull-xs-right"
              @click="handleLogin(form)"
            >Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../controller/user';
import { saveUserToStorage } from '../utils/storage';
const router = useRouter();

const form = reactive({
  email: '',
  password: '',
});
const handleLogin = async (form) => {
  const { successLogin, user } = await login(form);
  if (successLogin) {
    saveUserToStorage(user);
    router.push('/');
  }
};
</script>

<style scoped>
</style>