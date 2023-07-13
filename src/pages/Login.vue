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
            <template v-for="(messages,objKey) in errors" :key="objKey">
              <li v-for="(msg,index) in messages" :key="index">{{objKey+': ' + msg }}</li>
            </template>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="form.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="form.password"
                required
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
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/api/user';
import { saveUserToStorage } from '@/utils/storage';
const router = useRouter();

const form = reactive({
  email: '',
  password: '',
});
let errors = ref(null);
const handleLogin = async (form) => {
  try {
    const { data } = await login(form);
    saveUserToStorage(data.user);
    router.push('/');
  } catch (error) {
    errors.value = error.response.data.errors;
  }
};
</script>

<style scoped>
</style>