<template>
    <div class="bg-gray-100 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div v-if="selectedActor">
          <h1 class="text-2xl font-bold mb-4">Filmographie de {{ selectedActor.name }}</h1>
          <div class="flex items-center mb-4">
            <img v-if="selectedActor.profile_path" :src="'https://image.tmdb.org/t/p/w200/' + selectedActor.profile_path" :alt="selectedActor.name" class="w-16 h-16 rounded-full mr-4">
            <svg v-else class="w-16 h-16 rounded-full mr-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21c-5.238 0-9-3.762-9-9s3.762-9 9-9 9 3.762 9 9-3.762 9-9 9z"/></svg>
            <div>
              <p class="text-lg font-bold">{{ selectedActor.name }}</p>
              <p class="text-gray-500">{{ selectedActor.birthday }}</p>
            </div>
          </div>
          <div v-if="actorMovies" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="movie in actorMovies" :key="movie.id" class="bg-white rounded-lg shadow-lg overflow-hidden">
              <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="movie.title" class="w-full h-48 object-cover">
              <div class="p-4">
                <p class="text-lg font-bold">{{ movie.title }}</p>
                <p class="text-gray-500">{{ movie.release_date }}</p>
                <p class="text-gray-600 mt-2">{{ movie.overview }}</p>
                <p class="text-gray-600 mt-2">Note moyenne : {{ movie.vote_average }}</p>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="text-center mt-4">Chargement en cours...</p>
          </div>
        </div>
        <div v-else>
          <p class="text-center mt-4">Chargement en cours...</p>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ActorView',
    data() {
      return {
        selectedActor: null,
        actorMovies: null
      };
    },
    mounted() {
      // Récupérer les détails de l'acteur en utilisant l'API de TMDB et l'id passé en paramètre
      axios.get(`https://api.themoviedb.org/3/person/${this.$route.params.id}?api_key=75e981bcdd819c45eea5057ee60c7c36`)
        .then(response => {
          this.selectedActor = response.data;
          // Récupérer les films dans lesquels l'acteur a joué en utilisant l'API de TMDB et l'id de l'acteur
          axios.get(`https://api.themoviedb.org/3/person/${this.selectedActor.id}/movie_credits?api_key=75e981bcdd819c45eea5057ee60c7c36`)
            .then(response => {
              this.actorMovies = response.data.cast;
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  </script>
  
  
  <style scoped>
  /* Style Tailwind CSS pour ActorsView */
  
  /* Classe pour le titre */
  .text-2xl {
    font-size: 1.5rem;
  }
  
  .font-bold {
    font-weight: bold;
  }
  
  .mb-4 {
    margin-bottom: 1rem;
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
  
  /* Classe pour les films */
  .text-xl {
    font-size: 1.25rem;
  }
  
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
  
  /* Classe pour le conteneur de chargement */
  .text-center {
    text-align: center;
  }
  
  .mt-4 {
    margin-top: 1rem;
  }
  
  </style>
  