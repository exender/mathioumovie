<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <h1 class="text-4xl font-bold mb-4">Page non trouvée</h1>
    <p class="text-gray-600 mb-8">
      La page que vous recherchez est introuvable.
    </p>
    <router-link to="/" class="text-blue-500 hover:text-blue-700"
      >Retourner à la page d'accueil</router-link
    >
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style>
/* Ajoutez vos styles personnalisés ici */
</style>
