<template>
  <div class="songs">
    <p v-if="songs.length === 0">Click on a playlist to display songs</p>

    <div v-if="songs.length > 0">
      <form v-if="canModifyPlaylist" class="add-song" v-on:submit.prevent="addSong()" action="">
        <input v-model="query" type="text" placeholder="song name" />
        <button type="submit">Add to playlist</button>
      </form>

      <ul class="song-list">
        <li class="song-item" v-for="song in songs" :key="song.track.id">
            <span>{{getArtist(song.track.artists)}} - {{song.track.name}}</span>
            <button v-if="canModifyPlaylist" class="remove-song" v-on:click="remove(song.track.uri)">x</button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Songs',
  data () {
    return {
      query: ''
    }
  },
  computed: {
    ...mapGetters([
      'songs',
      'selectedPlaylist',
      'canModifyPlaylist'
    ])
  },
  methods: {
    ...mapActions([
      'addSongToPlaylist',
      'removeFromPlaylist'
    ]),
    getArtist: function (artists) {
      return artists.map(artist => artist.name).join(', ')
    },
    addSong: function () {
      if (!this.selectedPlaylist || !this.query) {
        return
      }

      this.addSongToPlaylist(this.query)
      this.query = ''
    },
    remove: function (trackURI) {
      this.removeFromPlaylist(trackURI)
    }
  }
}
</script>

<style scoped>

.songs {
    float: left;
    padding: 0px 12px;
    border: 1px solid #ccc;
    width: 70%;
    border-left: none;
    height: 60vh;
    overflow: auto;
}

.song-list {
  margin: 1rem 0;
}

.song-item {
  padding: 0.5rem 0;
}

.add-song {
  padding: 1rem 0;
}

.remove-song {
  cursor: pointer;
  border-radius: 10px;
}

</style>
