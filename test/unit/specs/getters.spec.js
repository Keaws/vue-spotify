import { getters } from '@/store/getters'

describe('getters', () => {

  const state = {
    token: 1,
    userID: 2,
    playlists: [{id: 1, name: 'Morning Excercises'}],
    selectedPlaylist: 1,
    canModifyPlaylist: true,
    songs: [{artist: 'Stone Sour', track: 'Through glass'}],
    error: ''
  }

  it('should get token', () => {
    const token = getters.token(state)

    expect(token).toEqual(1)
  })

  it('should get playlist link', () => {
    const link = getters.playlistLink(state)

    expect(link).toEqual(`https://api.spotify.com/v1/users/2/playlists/1/tracks`)
  })

  it('should get userID', () => {
    const userID = getters.userID(state)

    expect(userID).toEqual(2)
  })

  it('should get playlists', () => {
    const playlists = getters.playlists(state)

    expect(playlists).toEqual([{id: 1, name: 'Morning Excercises'}])
  })

  it('should get selected playlist', () => {
    const selected = getters.selectedPlaylist(state)

    expect(selected).toEqual(1)
  })

  it('should get canModifyPlaylist property', () => {
    const canModify = getters.canModifyPlaylist(state)

    expect(canModify).toEqual(true)
  })

  it('should get songs', () => {
    const songs = getters.songs(state)

    expect(songs).toEqual([{artist: 'Stone Sour', track: 'Through glass'}])
  })

  it('should get error', () => {
    const error = getters.error(state)

    expect(error).toEqual('')
  })

})
