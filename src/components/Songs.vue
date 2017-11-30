<template>
  <div class="songs">
    <p v-if="displayedSongs && displayedSongs.length === 0">Click on a playlist to display songs</p>

    <div v-if="displayedSongs && displayedSongs.length > 0">
      <form v-if="canModifyPlaylist" class="add-song" v-on:submit.prevent="addSong()" action="">
        <input v-model="query" type="text" placeholder="song name" />
        <button type="submit">Add to playlist</button>
      </form>

      <ul class="song-list">
        <li class="song-item" v-for="song in displayedSongs" :key="song.track.id">
            <span>{{getArtist(song.track.artists)}} - {{song.track.name}}</span>
            <button v-if="canModifyPlaylist" class="remove-song" v-on:click="removeFromPlaylist(song.track.uri)">x</button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

import API from '../api/api'

export default {
  name: 'Songs',
  props: ['displayedSongs', 'selectedPlaylist', 'canModifyPlaylist'],
  data () {
    return {
      query: ''
    }
  },
  computed: {
    playListLink () {
      return `https://api.spotify.com/v1/users/${this.$store.state.userID}/playlists/${this.selectedPlaylist}/tracks`
    }
  },
  methods: {
    getArtist: function (artists) {
      return artists.map(artist => artist.name).join(', ')
    },
    addSong: function () {
      if (!this.selectedPlaylist || !this.query) {
        return
      }

      API.searchForSong(this.query, this.$store.state.token)
        .then(res => res.json())
        .then(song => {
          console.log(song)

          if (song.tracks.items.length === 0) {
            console.log('song not found')

            // show error

            return
          }

          console.log(song.tracks.items[0].id)
          return API.addSongToPlaylist(this.$store.state.userID, this.selectedPlaylist, song.tracks.items[0].id, this.$store.state.token)
        })
        .then(res => res.json())
        .then(snapshot => {
          console.log('added', snapshot)
          return API.getSongsFromPlaylist(this.playListLink, this.$store.state.token)
        })
        .then(res => res.json())
        .then(songs => {
          this.query = ''
          this.displayedSongs = [...songs.items]
        })
        .catch(console.error)
    },
    removeFromPlaylist: function (trackURI) {
      API.removeSongFromPlaylist(this.$store.state.userID, this.selectedPlaylist, trackURI, this.$store.state.token)
        .then(res => res.json())
        .then(snapshot => {
          console.log('removed', snapshot)
          return API.getSongsFromPlaylist(this.playListLink, this.$store.state.token)
        })
        .then(res => res.json())
        .then(songs => {
          this.displayedSongs = [...songs.items]
        })
        .catch(console.error)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Style the tab content */
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
