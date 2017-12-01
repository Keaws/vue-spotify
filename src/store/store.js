import Vue from 'vue'
import Vuex from 'vuex'

import API from '../api/api'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    token: null,
    userID: null,
    playlists: [],
    selectedPlaylist: null,
    canModifyPlaylist: true,
    songs: [],
    error: ''
  },
  getters: {
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
  },
  mutations: {
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
      state.error = error
    }
  },
  actions: {
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
        commit('setError', 'No user found, please relogin')
        return
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
            throw `Song ${query} not found`
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
})
