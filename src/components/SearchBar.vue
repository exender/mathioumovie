<template>
    <div class="search-bar">
        <input type="text" v-model="searchTerm" @input="handleInput" placeholder="Rechercher des films...">
        <button @click="search" class="bg-red-600 text-white px-6 py-3 rounded-full font-bold">Rechercher</button>
        <ul v-if="searchResults.length > 0" class="search-results">
            <li v-for="result in searchResults" :key="result.id" @click="selectMovie(result)">
                {{ result.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SearchBar',
    data() {
        return {
            searchTerm: '',
            searchResults: [],
        };
    },
    methods: {
        handleInput() {
            if (this.searchTerm.length > 0) {
                axios
                    .get(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${this.searchTerm}`)
                    .then((response) => {
                        this.searchResults = response.data.results;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                this.searchResults = [];
            }
        },
        selectMovie(movie) {
            this.$emit('movie-selected', movie);
            this.searchResults = [];
            this.searchTerm = '';
        },
    },
};
</script>

<style scoped>
.search-bar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}

.search-bar input {
    width: 70%;
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    background-color: #f1f1f1;
    color: black;
    outline: none;
}

.search-bar button {
    margin-left: 10px;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    background-color: #dc2626;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.search-bar button:hover {
    background-color: #c53030;
}

.search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 0.5rem;
    background-color: white;
    border-radius: 0.25rem;
    overflow-y: auto;
    max-height: 10rem;
    border: 1px solid #ccc;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.search-results li {
    cursor: pointer;
    margin: 0.5rem 0;
    padding: 0.25rem;
    font-size: 1rem;
    color: #444;
    transition: background-color 0.2s ease;
}

.search-results li:hover {
    background-color: #f1f1f1;
}
</style>
