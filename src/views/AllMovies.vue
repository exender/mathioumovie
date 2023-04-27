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
        this.page = 1;
        this.loadPage(this.page);
      },
      sortByAlphabeticalOrder() {
        this.sortBy = "alphabetical-order";
        this.page = 1;
        this.loadPage(this.page);
      },
      loadPage(page) {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=75e981bcdd819c45eea5057ee60c7c36&language=fr-FR&page=${page}`
    )
    .then((response) => {
      this.movies = response.data.results;
      this.total_pages = response.data.total_pages;
      this.filteredMovies = this.movies;
    })
    .catch((error) => {
      console.log(error);
    });
},

      loadPreviousPage() {
        if (this.page > 1) {
          this.page--;
          this.loadPage(this.page);
        }
      },
      loadNextPage() {
        if (this.page < this.total_pages) {
          this.page++;
          this.loadPage(this.page);
        }
      },
    },
    computed: {
      sortedMovies: function ()
  
  {
  if (this.sortBy === "alphabetical-order") {
  return this.movies.sort((a, b) =>
  a.title.localeCompare(b.title, "fr")
  );
  } else if (this.sortBy === "release-date") {
  return this.movies.sort(
  (a, b) =>
  new Date(b.release_date) - new Date(a.release_date)
  );
  } else if (this.sortBy === "rating") {
  return this.movies.sort((a, b) => b.vote_average - a.vote_average);
  } else {
  return this.movies;
  }
  },
  },
  };
  </script>