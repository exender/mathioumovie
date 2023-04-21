<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { RouterView } from 'vue-router'

</script>

<template>
  <div><Header /></div>
  <RouterView />
  <div><Footer /></div>
</template>

<style scoped></style>