<template>
  <footer class="bg-black text-white py-6">
    <div class="container mx-auto flex justify-between items-center">
      <ul class="flex space-x-4">
        <router-link to="/">
          <li><a href="#" class="hover:text-gray-400">Accueil</a></li>
        </router-link>
      </ul>
    </div>
  </footer>
</template>
  
<script>
export default {
  name: 'Footer',
};
</script>
  
<style scoped>
/* Style personnalisé pour le footer */
footer {
  background-color: #000;
  color: #fff;
}
</style>
  