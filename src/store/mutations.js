export const mutations = {
  setToken (state) {
    try {
      state.token = window.location.hash.split('=')[1].split('&token')[0]
    } catch (e) {
      state.token = null
    }
  },
  setUserID (state, id) {
    state.userID = id
  },
  setUserPlayLists (state, playlists) {
    state.playlists = [...playlists]
  },
  setSongs (state, songs) {
    state.songs = [...songs]
  },
  setSelectedPlaylist (state, id) {
    state.selectedPlaylist = id
  },
  setCanModifyPlaylist (state, canModify) {
    state.canModifyPlaylist = canModify
  },
  setError (state, error) {
    state.error = error && error.message ? error.message : error
  }
}
