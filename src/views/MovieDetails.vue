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
      
      <div class="mt-4">
        <h2 class="text-xl font-bold mb-2">Acteurs :</h2>
        <div class="flex flex-wrap">
          <div v-for="actor in movie.credits.cast" :key="actor.id" class="w-1/4 flex flex-col items-center mb-4">
  <img v-if="actor.profile_path" :src="'https://image.tmdb.org/t/p/w200/' + actor.profile_path" :alt="actor.name" class="w-16 h-16 rounded-full mb-2">
  <svg v-else class="w-16 h-16 rounded-full mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="gray" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21c-5.238 0-9-3.762-9-9s3.762-9 9-9 9 3.762 9 9-3.762 9-9 9z"/></svg>
  <p class="text-gray-800 text-center">{{ actor.name }}</p>
  <p class="text-gray-600 text-center">{{ actor.character }}</p>
</div>

        </div>
      </div>
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
    axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=75e981bcdd819c45eea5057ee60c7c36&language=fr-FR&append_to_response=credits`)
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
.text-sm {
  font-size: 0.875rem;
}

/* Classe pour la description */
.text-gray-600 {
  color: #718096;
}

/* Classe pour la note moyenne */

/* Classe pour les acteurs */
.text-xl {
  font-size: 1.25rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

/* Classe pour le conteneur d'acteur */


.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

/* Classe pour le nom de l'acteur */
.text-gray-800 {
  color: #2d3748;
}

/* Classe pour le rôle de l'acteur */

/* Classe pour le conteneur de chargement */
.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 1rem;
}

</style>

