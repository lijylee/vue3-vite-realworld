<template>
  <div>
    <Header />
    <suspense>
      <router-view />
    </suspense>
    <Footer />
  </div>
</template>

<script setup>
import Header from './Header.vue';
import Footer from './Footer.vue';
</script>

<style scoped>
</style>