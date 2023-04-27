<template>
    <div class="bg-gray-100 min-h-screen">
      <div class="container mx-auto py-8">
        <h1 class="text-4xl font-bold mb-4 text-center">Tous les films</h1>
        <Filtres
          @sortByCategory="sortByCategory"
          @sortByAlphabeticalOrder="sortByAlphabeticalOrder"
          class="mb-8"
        />
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <MovieCard
  v-for="movie in filteredMovies"
  :key="movie.id"
  :movie="movie"
  @viewMovieDetails="viewMovieDetails"
/>
        </div>
        <div class="flex justify-center mt-8">
          <button
            class="bg-gray-800 text-white px-4 py-2 rounded mr-2"
            @click="loadPreviousPage"
            :disabled="page <= 1"
          >
            Page précédente
          </button>
          <button
            class="bg-gray-800 text-white px-4 py-2 rounded"
            @click="loadNextPage"
            :disabled="page >= total_pages"
          >
            Page suivante
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from "axios";
import MovieCard from "@/components/MovieCard.vue";
import Filtres from "@/components/Filtres.vue";

export default {
  name: "AllMovies",
  components: {
    MovieCard,
    Filtres,
  },
  data() {
    return {
      movies: [],
      sortBy: null,
      page: 1,
      total_pages: 1,
      filteredMovies: [],
    };
  },
  mounted() {
    this.loadPage(this.page);
  },
  methods: {
    viewMovieDetails(movieId) {
      this.$router.push(`/movie/${movieId}`);
    },
    sortByCategory(category) {
      this.sortBy = category;
      this.filterMovies();
    },
    sortByAlphabeticalOrder() {
      this.sortBy = "alphabetical-order";
      this.filterMovies();
    },
    filterByCategory() {
      if (this.sortBy) {
        // filtrer les films en fonction de la catégorie sélectionnée
        this.filteredMovies = this.movies.filter((movie) =>
          movie.genre_ids.includes(parseInt(this.sortBy))
        );
      } else {
        this.filteredMovies = this.movies;
      }
    },
    filterMovies() {
      if (this.sortBy === "alphabetical-order") {
        // trier les films par ordre alphabétique
        this.filteredMovies = this.movies.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
      } else {
        this.filterByCategory();
      }
    },
    loadPage(page) {
      // Appeler l'API de TMDB pour récupérer les films de la page spécifiée
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=75e981bcdd819c45eea5057ee60c7c36&language=fr-FR&page=${page}`
        )
        .then((response) => {
          this.movies = response.data.results;
          this.total_pages = response.data.total_pages;
          this.filterMovies();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadNextPage() {
      if (this.page < this.total_pages) {
        this.page++;
        this.loadPage(this.page);
      }
    },
    loadPreviousPage() {
      if (this.page > 1) {
        this.page--;
        this.loadPage(this.page);
      }
    },
  },
};
</script>
