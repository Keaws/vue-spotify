export const getters = {
  token: state => {
    return state.token
  },
  userID: state => {
    return state.userID
  },
  playlists: state => {
    return state.playlists
  },
  selectedPlaylist: state => {
    return state.selectedPlaylist
  },
  canModifyPlaylist: state => {
    return state.canModifyPlaylist
  },
  songs: state => {
    return state.songs
  },
  playlistLink: state => {
    return `https://api.spotify.com/v1/users/${state.userID}/playlists/${state.selectedPlaylist}/tracks`
  },
  error: state => {
    return state.error
  }
}
