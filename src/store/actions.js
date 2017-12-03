import API from '../api/api'

export const actions = {
  setToken ({ commit }) {
    commit('setToken')
  },
  getUserID ({ commit, state }) {
    return new Promise((resolve, reject) => {
      API.getUserID(state.token)
        .then(res => res.json())
        .then(user => {
          commit('setUserID', user.id)
          console.log(user)
          resolve()
        })
        .catch(e => commit('setError', e))
    })
  },
  getUserPlayLists ({ commit, state }) {
    if (!state.userID) {
      return commit('setError', 'No user found, please relogin')
    }

    API.getUserPlaylists(state.userID, state.token)
      .then(res => res.json())
      .then(playlists => {
        console.log(playlists)
        commit('setUserPlayLists', playlists.items)
      })
      .catch(e => commit('setError', e))
  },
  getSongsFromPlaylist ({ commit, state }, playlist) {
    API.getSongsFromPlaylist(playlist.tracks.href, state.token)
      .then(res => res.json())
      .then(songs => {
        commit('setSongs', songs.items)
        commit('setSelectedPlaylist', playlist.id)
        // user may have references to other users' playlists, but he can modify only his own
        commit('setCanModifyPlaylist', songs.href.includes(state.userID))

        console.log(songs)
      })
      .catch(e => commit('setError', e))
  },
  addSongToPlaylist ({ commit, state, getters }, query) {
    API.searchForSong(query, state.token)
      .then(res => res.json())
      .then(song => {
        console.log(song)

        if (song.tracks.items.length === 0) {
          throw new Error(`Song ${query} not found`)
        }

        console.log(song.tracks.items[0].id)
        return API.addSongToPlaylist(state.userID, state.selectedPlaylist, song.tracks.items[0].id, state.token)
      })
      .then(res => res.json())
      .then(snapshot => {
        console.log('added', snapshot)
        return API.getSongsFromPlaylist(getters.playlistLink, state.token)
      })
      .then(res => res.json())
      .then(songs => {
        commit('setSongs', songs.items)
      })
      .catch(e => commit('setError', e))
  },
  removeFromPlaylist ({ commit, state, getters }, uri) {
    API.removeSongFromPlaylist(state.userID, state.selectedPlaylist, uri, state.token)
      .then(res => res.json())
      .then(snapshot => {
        console.log('removed', snapshot)
        return API.getSongsFromPlaylist(getters.playlistLink, state.token)
      })
      .then(res => res.json())
      .then(songs => {
        commit('setSongs', songs.items)
      })
      .catch(e => commit('setError', e))
  }
}
