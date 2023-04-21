<template>
  <div>
    <h1>{{ movie.title }}</h1>
    <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="movie.title">
    <p>{{ movie.overview }}</p>
    <p>Année de sortie : {{ movie.release_date }}</p>
    <p>Note moyenne : {{ movie.vote_average }}</p>
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
  