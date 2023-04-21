<template>
  <div v-if="movie" class="flex flex-wrap">
    <div class="w-full md:w-1/2 lg:w-1/3 flex items-center justify-center">
  <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="movie.title" class="w-1/4 h-auto shadow-lg">
</div>

    <div class="w-full md:w-1/2 lg:w-2/3 p-6">
      <h1 class="text-2xl font-bold">{{ movie.title }}</h1>
      <p class="text-gray-500 text-sm mt-2">{{ movie.release_date }}</p>
      <p class="text-gray-600 mt-4">{{ movie.overview }}</p>
      <p class="text-gray-600 mt-4">Note moyenne : {{ movie.vote_average }}</p>
    </div>
  </div>
  <div v-else>
    <p class="text-center mt-4">Chargement en cours...</p>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'MovieDetails',
  data() {
    return {
      movie: null
    };
  },
  mounted() {
    // Récupérer les détails du film en utilisant l'API de TMDB et l'id passé en paramètre
    axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=75e981bcdd819c45eea5057ee60c7c36&language=fr-FR`)
      .then(response => {
        this.movie = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>
<style scoped>
/* Style Tailwind CSS pour MovieDetails */

/* Classe pour le conteneur d'image */
.w-full {
  width: 100%;
}

/* Classe pour la hauteur de l'image */
.h-auto {
  height: auto;
}

/* Classe pour l'ombre de boîte */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Classe pour le conteneur principal */
.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

/* Classe pour le titre */
.text-2xl {
  font-size: 1.5rem;
}

.font-bold {
  font-weight: bold;
}

/* Classe pour la date de sortie */
.text-gray-500 {
  color: #6B7280;
}

.text-sm {
  font-size: 0.875rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

/* Classe pour le résumé */
.text-gray-600 {
  color: #4B5563;
}

.mt-4 {
  margin-top: 1rem;
}

/* Classe pour la note moyenne */
.text-gray-600 {
  color: #4B5563;
}
</style>
