const API_URL = 'https://api.spotify.com/v1'

const getAuthHeaders = token => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${token}`)

  return { headers }
}

class API {
  static getUserID (token) {
    return fetch(`${API_URL}/me`, getAuthHeaders(token))
  }

  static getUserPlaylists (userID, token) {
    return fetch(`${API_URL}/users/${userID}/playlists`, getAuthHeaders(token))
  }

  static getSongsFromPlaylist (link, token) {
    return fetch(link, getAuthHeaders(token))
  }

  // simplified song search: returns first item found by query
  static searchForSong (query, token) {
    return fetch(`${API_URL}/search?q=${query}&type=track&limit=1`, getAuthHeaders(token))
  }

  static addSongToPlaylist (userID, playlistID, trackID, token) {
    return fetch(`${API_URL}/users/${userID}/playlists/${playlistID}/tracks?uris=spotify:track:${trackID}&position=0`, Object.assign({}, getAuthHeaders(token), {'method': 'POST'}))
  }

  static removeSongFromPlaylist (userID, playlistID, trackURI, token) {
    return fetch(`${API_URL}/users/${userID}/playlists/${playlistID}/tracks`, Object.assign({}, getAuthHeaders(token),
      {
        'method': 'DELETE',
        'Content-Type': 'application/json',
        'body': JSON.stringify({tracks: [{ uri: `${trackURI}` }]})
      })
    )
  }
}

export default API
