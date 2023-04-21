<template>
    <div class="bg-white shadow-md rounded-md overflow-hidden">
      <!-- Afficher l'image du film -->
      <img :src="getMoviePosterUrl(movie.poster_path)" :alt="movie.title" class="w-full h-64 object-cover" />
  
      <!-- Contenu de la carte -->
      <div class="p-4">
        <!-- Titre du film -->
        <h2 class="text-xl font-semibold mb-2">{{ movie.title }}</h2>
  
        <!-- Description du film -->
        <p class="text-gray-500">{{ movie.overview }}</p>
      </div>
    </div>
</template>

<script>
export default {
    name: 'MovieCard',
    props: {
        movie: {
            type: Object,
            required: true
        }
    },
    methods: {
        getMoviePosterUrl(posterPath) {
            // Retourne l'URL complète de l'image du film en utilisant l'API de TMDB
            return `https://image.tmdb.org/t/p/w500/${posterPath}`;
        }
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
