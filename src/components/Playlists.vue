<template>
  <div class="playlists">
    <h1>Your playlists:</h1>

    <ul>
        <li v-for="playlist in playlists" :key="playlist.id">
          <p>{{playlist.name}}</p>
        </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'Playlists',
  data () {
    return {
      playlists: [
        { id: 1, name: '1' },
        { id: 2, name: '2' }
      ]
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
