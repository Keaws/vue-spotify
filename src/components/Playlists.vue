<template>
  <div class="playlists">
    <h1>Greetings, {{userID}}!</h1>
    <h2>Welcome to playlist manager</h2>

    <!-- <ul>
        <li v-for="playlist in playlists" :key="playlist.id">
          <p v-on:click="showSongs(playlist.tracks.href)">{{playlist.name}}</p>
        </li>
    </ul> -->

    <div class="playlists">
      <div class="tab">
        <ul>
          <li v-for="playlist in playlists" :key="playlist.id">
            <button class="tablinks" v-on:click="showSongs(playlist)">{{playlist.name}}</button>
          </li>
        </ul>
      </div>

      <Songs 
        v-bind:displayedSongs="displayedSongs"
        v-bind:selectedPlaylist="selectedPlaylist"
        v-bind:canModifyPlaylist="canModifyPlaylist" />

    </div>

  </div>
</template>

<script>

import {mapActions} from 'vuex'

import API from '../api/api'
import Songs from './Songs.vue'

export default {
  name: 'Playlists',
  components: {
    Songs
  },
  data () {
    return {
      playlists: [],
      displayedSongs: [],
      selectedPlaylist: null,
      canModifyPlaylist: true
    }
  },
  computed: {
    userID () {
      return this.$store.state.userID
    }
  },
  created: function () {
    API.getUserID(this.$store.state.token)
      .then(res => res.json())
      .then(user => {
        this.setUserID(user.id)
        console.log(user)
        return API.getUserPlaylists(this.$store.state.userID, this.$store.state.token)
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
    showSongs: function (playlist) {
      const link = playlist.tracks.href
      const {id} = playlist

      console.log(link)

      API.getSongsFromPlaylist(link, this.$store.state.token)
        .then(res => res.json())
        .then(songs => {
          console.log(songs)
          this.displayedSongs = [...songs.items]
          this.selectedPlaylist = id

          // user may have references to other users' playlists, but he can modify only his own
          this.canModifyPlaylist = songs.href.includes(this.$store.state.userID)
        })
        .catch(console.error)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.playlists {
  width: 80%;
  margin: 0 auto;
}

/* Style the tab */
div.tab {
    float: left;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    width: 30%;
    height: 60vh;
    overflow: auto;
}

/* Style the buttons inside the tab */
div.tab button {
    display: block;
    background-color: inherit;
    color: black;
    padding: 22px 16px;
    width: 100%;
    border: none;
    outline: none;
    text-align: left;
    cursor: pointer;
    transition: 0.3s;
    font-size: 17px;
}

/* Change background color of buttons on hover */
div.tab button:hover {
    background-color: #ddd;
}

/* Create an active/current "tab button" class */
div.tab button.active {
    background-color: #ccc;
}

</style>
