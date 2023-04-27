<template>
  <div class="bg-gray-900">
    <!-- En-tête -->

    <!-- Filtres -->
    <Filtres @sort-by-category="sortByCategory" @sort-by-alphabetical-order="sortByAlphabeticalOrder" />

    <!-- Contenu de la page -->
    <div class="container mx-auto py-8">
      <h1 class="text-4xl font-bold text-white mb-8">Les films populaires</h1>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <!-- Afficher la liste des films -->
        <MovieCard v-for="movie in sortedMovies" :key="movie.id" :movie="movie" class="mb-4" @click="viewMovieDetails(movie.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MovieCard from '../components/MovieCard.vue';
import Filtres from '../components/Filtres.vue';

export default {
  name: 'Home',
  components: {
    MovieCard,
    Filtres
  },
  data() {
    return {
      movies: [],
      sortBy: null
    };
  },
  mounted() {
    // Appeler l'API de TMDB pour récupérer les 100 films les plus populaires
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=75e981bcdd819c45eea5057ee60c7c36&language=fr-FR&page=1`)
      .then(response => {
        this.movies = response.data.results;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    viewMovieDetails(movieId) {
      this.$router.push(`/movie/${movieId}`);
    },
    sortByCategory(category) {
      this.sortBy = category;
    },
    sortByAlphabeticalOrder() {
      this.sortBy = 'alphabetical-order';
    }
  },
  computed: {
  sortedMovies: function() {
    if (this.sortBy === 'alphabetical-order') {
      // trier les films par ordre alphabétique
    } else if (this.sortBy) {
      // trier les films en fonction de la catégorie sélectionnée
      return this.movies.filter(movie => movie.genre_ids.includes(parseInt(this.sortBy)));
    } else {
      // afficher tous les films
      return this.movies;
    }
  }
}
};
</script>

