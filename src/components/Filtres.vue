<template>
    <div>
      <h2 class="text-white mb-4">Filtres</h2>
      <div class="flex flex-wrap gap-2">
        <select class="bg-gray-700 text-white rounded py-2 px-4" v-model="selectedCategory" @change="sortByCategory">
          <option value="">Toutes les catégories</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <input type="button" class="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-white" value="Ordre alphabétique" @click="sortByAlphabeticalOrder" />
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Filtres',
    data() {
      return {
        categories: [],
        selectedCategory: ''
      };
    },
    mounted() {
      // Récupérer la liste des catégories de films depuis l'API de TMDB
      axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=75e981bcdd819c45eea5057ee60c7c36&language=fr-FR`)
        .then(response => {
          this.categories = response.data.genres;
        })
        .catch(error => {
          console.error(error);
        });
    },
    methods: {
        sortByCategory() {
  this.$emit('sort-by-category', this.selectedCategory);
},

sortByAlphabeticalOrder() {
  this.$emit('sort-by-alphabetical-order');
}
    }
  };
  </script>
  
  <style scoped>
  select option {
    background-color: #4B5563;
  }
  </style>
  