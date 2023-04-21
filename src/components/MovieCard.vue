<template>
  <div class="bg-gray-800 rounded-md overflow-hidden shadow-md cursor-pointer" @click="viewMovieDetails(movie.id)">
    <!-- Afficher l'affiche du film -->
    <img :src="getImageUrl(movie.poster_path)" alt="Affiche du film" class="w-full h-40 object-cover" />
    <div class="px-4 py-3">
      <!-- Afficher le titre du film -->
      <h2 class="text-lg font-semibold text-white">{{ movie.title }}</h2>
      <!-- Afficher la date de sortie du film -->
      <p class="text-gray-300">{{ formatDate(movie.release_date) }}</p>
    </div>
  </div>
</template>

<script>
import router from '../router';

export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  methods: {
    // Formater l'URL de l'image de l'affiche du film
    getImageUrl(posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    },
    // Formater la date de sortie du film en format court (mois/année)
    formatDate(date) {
      if (date) {
        const [year, month] = date.split('-');
        return `${month}/${year}`;
      }
      return '';
    },
    // Naviguer vers la page MovieDetails.vue en utilisant Vue Router
    viewMovieDetails(id) {
      router.push({ name: 'MovieDetails', params: { id }});
    },
  }
};
</script>

<style scoped>
/* Style personnalisé pour la carte de film */
.bg-white {
  background-color: #fff;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-md {
  border-radius: 0.375rem;
}

.overflow-hidden {
  overflow: hidden;
}

.w-full {
  width: 100%;
}

.h-64 {
  height: 16rem;
}

.object-cover {
  object-fit: cover;
}

.p-4 {
  padding: 1rem;
}

.text-xl {
  font-size: 1.25rem;
}

.font-semibold {
  font-weight: 600;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.text-gray-500 {
  color: #6b7280;
}
</style>
