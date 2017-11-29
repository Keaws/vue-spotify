<template>
  <div class="playlists">
    <h1>Greetings, {{userID}}!</h1>
    <h2>Your playlists:</h2>

    <ul>
        <li v-for="playlist in playlists" :key="playlist.id">
          <p v-on:click="getSongs(playlist.tracks.href)">{{playlist.name}}</p>
        </li>
    </ul>

  </div>
</template>

<script>

import {mapActions} from 'vuex'

export default {
  name: 'Playlists',
  data () {
    return {
      playlists: []
    }
  },
  computed: {
    userID () {
      return this.$store.state.userID
    }
  },
  created: function () {
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${this.$store.state.token}`)

    fetch('https://api.spotify.com/v1/me', {headers})
      .then(res => res.json())
      .then(user => {
        this.setUserID(user.id)
        console.log(user)
        return fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {headers})
      })
      .then(res => res.json())
      .then(playlists => {
        console.log(playlists)
        this.playlists = playlists.items
      })
      .catch(console.error)
  },
  methods: {
    ...mapActions([
      'setUserID'
    ]),
    getSongs: function (link) {
      const headers = new Headers()
      headers.append('Authorization', `Bearer ${this.$store.state.token}`)

      fetch(link, {headers})
        .then(res => res.json())
        .then(songs => {
          console.log(songs)
          songs.items.forEach(song => {
            // create getArtist function
            console.log(`${song.track.artists[0].name} - ${song.track.name}`)
          })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
