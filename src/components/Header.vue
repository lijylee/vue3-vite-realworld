<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="index.html">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link to="/" class="nav-link active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login" v-show="!isLogin">Sign in</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register" v-show="!isLogin">Sign up</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/editor">
            <i class="ion-compose"></i>&nbsp;New Article
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/settings">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'Profile',params:{username:user.username}}">
            <img :src="user.image" class="user-pic" />
            {{ user.username}}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { getUserFromStorage } from '../utils/storage';
let isLogin = ref(false);
const user = ref(getUserFromStorage());

if (user) {
  isLogin = true;
}
</script>

<style scoped>
</style>