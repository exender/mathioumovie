<template>
    <header class="bg-black text-white py-6">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-3xl font-bold">
          <span class="text-red-600">MathiouMovie</span>
        </h1>
        <nav class="flex items-center">
          <input v-model="searchTerm" @input="search" class="bg-gray-800 rounded-full px-6 py-3 mr-4 w-72 focus:outline-none" type="text" placeholder="Rechercher">
          <button @click="search" class="bg-red-600 text-white px-6 py-3 rounded-full font-bold">Rechercher</button>
        </nav>
      </div>
      <!-- Afficher les propositions de recherche sous forme de liste -->
      <ul v-if="searchResults.length > 0" class="absolute z-10 w-72 mt-2 bg-gray-800 text-white rounded-lg">
        <li v-for="result in searchResults" :key="result.id" class="px-4 py-2 cursor-pointer hover:bg-gray-700">{{ result.title }}</li>
      </ul>
    </header>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Header',
    data() {
      return {
        searchTerm: '',
        searchResults: [] // Tableau pour stocker les résultats de recherche
      };
    },
    methods: {
      search() {
        // Effectuer la recherche avec l'API de TMDB ici
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=75e981bcdd819c45eea5057ee60c7c36&query=${this.searchTerm}`)
          .then(response => {
            // Mettre à jour les résultats de recherche avec les données de l'API
            this.searchResults = response.data.results.map(movie => {
              return {
                id: movie.id,
                title: movie.title
              };
            });
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Style personnalisé pour l'en-tête */
  header {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  input:focus {
    box-shadow: 0px 0px 5px rgba(255, 0, 0, 0.5);
  }
  
  /* Style pour la liste de propositions de recherche */
  ul {
    max-height: 200px;
    overflow-y: auto;
  }
  </style>
  