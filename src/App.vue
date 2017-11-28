<template>
  <div id="app">

    <button v-show="!token" v-on:click="openLogin">Click to login with your Spotify account</button>

    <Playlists v-show="token" />
  </div>
</template>

<script>

import Playlists from './components/Playlists'

export default {
  name: 'app',
  data: function () {
    return {
      token: ''
    }
  },
  // store,
  // computed: {
  //   accessToken () {
  //     return this.$store.getToken();
  //   }
  // },
  components: {
    Playlists
  },
  methods: {
    openLogin: function (e) {
      window.location.href = 'https://accounts.spotify.com/authorize/?client_id=4e95c274294946ecad7b116680b1de44&response_type=token&redirect_uri=http://localhost:8080/'
    },
    getAccessTokenFromURL: function () {
      try {
        return window.location.hash.split('=')[1].split('&token')[0]
      } catch (e) {
        return null
      }
    },
    saveAccessToken: function (token) {
      this.token = token
      localStorage.setItem('accessToken', token)
    },
    removeAccessToken: function () {
      localStorage.removeItem('accessToken')
    }
  },
  mounted: function () {
    const token = this.getAccessTokenFromURL()

    if (token) {
      console.log('token present!')
      this.saveAccessToken(token)
    }
  },

  destroyed: function () {
    this.removeAccessToken()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
