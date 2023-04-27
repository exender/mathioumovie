<template>
  <div class="bg-gray-900">
    <!-- En-tête -->

    <!-- Contenu de la page -->
    <div class="container mx-auto py-8">
      <h1 class="text-4xl font-bold text-white mb-8">Les films populaires</h1>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <!-- Afficher la liste des films -->
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" class="mb-4" @click="viewMovieDetails(movie.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MovieCard from '../components/MovieCard.vue';

export default {
  name: 'Home',
  components: {
    MovieCard
  },
  data() {
    return {
      movies: []
    };
  },
  mounted() {
    // Appeler l'API de TMDB pour récupérer les 100 films les plus populaires
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=75e981bcdd819c45eea5057ee60c7c36&language=fr-FR&page=1`)
      .then(response => {
        this.movies = response.data.results;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    viewMovieDetails(movieId) {
      // Naviguer vers la page MovieDetails.vue en utilisant Vue Router
      this.$router.push({ name: 'MovieDetails', params: { id: movieId } });
    }
  }
};
</script>

<style scoped>
/* Style personnalisé pour le contenu de la page */
.container {
  /* Utiliser toute la largeur disponible */
  width: 100%;
  /* Définir une marge intérieure */
  padding-left: 1rem;
  padding-right: 1rem;
}

.text-white {
  color: #fff;
}
</style>
