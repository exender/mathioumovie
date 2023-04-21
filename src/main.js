import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importez votre instance de Vue Router
import './assets/main.css';

// Créez votre application Vue
const app = createApp(App);

// Utilisez l'instance de Vue Router dans votre application
app.use(router);

// Montez votre application Vue
app.mount('#app');
