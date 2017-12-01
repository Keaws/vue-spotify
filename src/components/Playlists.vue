<template>
  <div class="playlists">
    <h1>Greetings, {{userID}}!</h1>
    <h2>Welcome to playlist manager</h2>

    <div class="playlists">
      <div class="tab">
        <ul>
          <li v-for="playlist in playlists" :key="playlist.id">
            <button v-bind:class="{ active: selectedPlaylist === playlist.id }" v-on:click="showSongs(playlist)">{{playlist.name}}</button>
          </li>
        </ul>
      </div>

      <Songs />

    </div>

  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

import Songs from './Songs.vue'

export default {
  name: 'Playlists',
  components: {
    Songs
  },
  computed: {
    ...mapGetters([
      'playlists',
      'userID',
      'selectedPlaylist'
    ])
  },
  created: function () {
    this.$store.dispatch('getUserID')
      .then(() => this.$store.dispatch('getUserPlayLists'))
  },
  methods: {
    ...mapActions([
      'getSongsFromPlaylist'
    ]),
    showSongs: function (playlist) {
      this.getSongsFromPlaylist(playlist)
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

.playlists {
  width: 80%;
  margin: 0 auto;
}

div.tab {
    float: left;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    width: 30%;
    height: 60vh;
    overflow: auto;
}

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

div.tab button:hover {
    background-color: #ddd;
}

div.tab button.active {
    background-color: #ccc;
}

</style>
