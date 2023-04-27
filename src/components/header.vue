<template>
  <header class="bg-black text-white py-6">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-3xl font-bold">
        <router-link to="/">
          <span class="text-red-600">MathiouMovie</span>
        </router-link>
      </h1>
      <nav class="flex items-center">
        <input
          v-model="searchTerm"
          @input="search"
          class="bg-gray-800 rounded-full px-6 py-3 mr-4 w-72 focus:outline-none"
          type="text"
          placeholder="Rechercher"
          ref="searchInput"
        />
        <button
          @click="search"
          class="bg-red-600 text-white px-6 py-3 rounded-full font-bold"
        >
          Rechercher
        </button>
      </nav>
    </div>
    <!-- Afficher les propositions de recherche sous forme de liste -->
    <ul
      v-if="searchResults.length > 0"
      class="absolute z-10 w-72 mt-2 bg-gray-800 text-white rounded-lg"
      ref="searchResultsList"
    >
      <li
        v-for="result in searchResults"
        :key="result.id"
        class="px-4 py-2 cursor-pointer hover:bg-gray-700"
        @click="goToMovieDetails(result.id)"
      >
        {{ result.title }}
      </li>
    </ul>
  </header>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  name: "Header",
  data() {
    return {
      searchTerm: "",
      searchResults: [], // Tableau pour stocker les résultats de recherche
    };
  },
  mounted() {
    // Ajouter un écouteur d'événements pour effacer la liste de propositions de résultats
    document.addEventListener("click", this.handleClickOutside);
    document.addEventListener("keydown", this.handleEscapeKey);
  },
  beforeUnmount() {
    // Retirer les écouteurs d'événements pour nettoyer
    document.removeEventListener("click", this.handleClickOutside);
    document.removeEventListener("keydown", this.handleEscapeKey);
  },
  methods: {
    search() {
      // Effectuer la recherche avec l'API de TMDB ici
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=75e981bcdd819c45eea5057ee60c7c36&query=${this.searchTerm}`
        )
        .then((response) => {
          this.searchResults = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleClickOutside(event) {
      // Fermer la liste de propositions de résultats si l'utilisateur clique en dehors
      if (
        this.$refs.searchResultsList &&
        !this.$refs.searchResultsList.contains(event.target) &&
        this.$refs.searchInput !== event.target
      ) {
        this.searchResults = [];
      }
    },
    handleEscapeKey(event) {
      // Fermer la liste de propositions de résultats si l'utilisateur appuie sur la touche "Escape"
      if (event.key === "Escape") {
        this.searchResults = [];
      }
    },
    goToMovieDetails(id) {
      // Aller à la page des détails du film sélectionné
      this.searchResults = []; // Effacer la liste de propositions de résultats
      router.push(`/movie/${id}`);
    },
  },
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
