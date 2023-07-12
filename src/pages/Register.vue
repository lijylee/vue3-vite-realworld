<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link to="/login">Have an account?</router-link>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="form.username"
                required
              />
            </fieldset>
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
              @click="handleRegister(form)"
            >Sign up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../api/user';
const router = useRouter();

const form = reactive({
  username: '',
  email: '',
  password: '',
});
const handleRegister = async (form) => {
  const { successRegister } = await register(form);
  if (successRegister) {
    alert('注册成功！');
    router.push('/login');
  }
};
</script>

<style scoped>
</style>