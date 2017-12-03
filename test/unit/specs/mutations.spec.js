import { mutations } from '@/store/mutations'

describe('Mutations', () => {

  it('should set userID', () => {
    const { setUserID } = mutations
    const state = { userID: null }

    setUserID(state, 1)
    expect(state.userID).toBe(1)
  })

  it('should set token to null if it is not available', () => {
    const { setToken } = mutations
    const state = { token: 123 }

    setToken(state)
    expect(state.token).toBe(null)
  })

  it('should set playlists', () => {
    const { setUserPlayLists } = mutations
    const state = { playlists: [] }
    const playlists = [
      {id: 1, name: 'Biggest hits'},
      {id: 2, name: 'Feeling good'}
    ]

    setUserPlayLists(state, playlists)
    expect(state.playlists).toEqual(playlists)
  })

  it('should set songs', () => {
    const { setSongs } = mutations
    const state = { songs: [] }
    const songs = [
      {artist: 'Linkin park', track: 'Battle symphony'},
      {artist: 'Queen', track: 'We are the champions'}
    ]

    setSongs(state, songs)
    expect(state.songs).toEqual(songs)
  })

  it('should set selected playlist', () => {
    const { setSelectedPlaylist } = mutations
    const state = { selectedPlaylist: null }

    setSelectedPlaylist(state, 42)
    expect(state.selectedPlaylist).toEqual(42)
  })

  it('should set canModifyPlaylist property', () => {
    const { setCanModifyPlaylist } = mutations
    const state = { canModifyPlaylist: false }

    setCanModifyPlaylist(state, true)
    expect(state.canModifyPlaylist).toEqual(true)
  })

  it('should set error', () => {
    const { setError } = mutations
    const state = { error: '' }

    setError(state, {message: 'Internal server error'})
    expect(state.error).toEqual('Internal server error')
  })

})
