<template>
  <div id="app">

    <button v-if="!token" v-on:click="openLogin">Click to login with your Spotify account</button>

    <Playlists v-if="token" />
  </div>
</template>

<script>

import Playlists from './components/Playlists.vue'
import Songs from './components/Songs.vue'

import {mapActions} from 'vuex'

export default {
  name: 'app',
  computed: {
    token () {
      return this.$store.state.token
    }
  },
  components: {
    Playlists,
    Songs
  },
  methods: {
    ...mapActions([
      'setToken'
    ]),
    openLogin: function (e) {
      const url = 'https://accounts.spotify.com/authorize/'
      const clientId = '?client_id=4e95c274294946ecad7b116680b1de44'
      const responseType = '&response_type=token'
      const redirectURI = '&redirect_uri=http://localhost:8080/'
      const scope = '&scope=playlist-read-private playlist-modify-private playlist-modify-public'

      const loginURL = `${url}${clientId}${responseType}${redirectURI}${scope}`

      window.location.href = loginURL
    }
  },
  mounted: function () {
    this.setToken()
  }
}
</script>

<style>
* {box-sizing: border-box}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
