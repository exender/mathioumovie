// Importez Vue Router
import { createRouter, createWebHistory } from 'vue-router';

// Importez les composants de vos pages
import MovieDetails from '@/views/MovieDetails.vue';

// Importez le composant correspondant pour la page d'accueil
import Home from '@/views/Home.vue';

import NotFound from '@/views/NotFound.vue';

import ActorView from '@/views/ActorView.vue';


// Créez une instance de Vue Router avec les routes définies
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Route pour la page MovieDetails.vue
    {
      path: '/movie/:id',
      name: 'MovieDetails',
      component: MovieDetails
    },
    // Route pour la racine de l'application
    {
      path: '/',
      name: 'Home',
      component: Home // Utilisez le composant correspondant pour la page d'accueil
    },
    // Route pour la page 404 
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    },
    // ActorView
    {
      path: '/actor/:id',
      name: 'ActorView',
      component: ActorView 
    },
  ]
});

// Exportez l'instance de Vue Router pour qu'elle puisse être utilisée dans votre application
export default router;
