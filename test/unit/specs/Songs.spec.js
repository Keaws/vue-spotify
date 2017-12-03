import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Songs from '@/components/Songs'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Songs', () => {
  let state  
  let actions
  let getters
  let store
  let displyedSongs = [
    {
      track: {
        id: 1,
        artists: [ {name: 'Linkin Park'} ],
        name: 'Numb',
        uri: 'uri1'
      }
    },
    {
      track: {
        id: 1,
        artists: [ {name: 'Queen'} ],
        name: 'Bohemian rhapsody',
        uri: 'uri2'
      }
    }
  ]

  beforeEach(() => {
    state = {},
    actions = {
      addSongToPlaylist: jest.fn(),
      removeFromPlaylist: jest.fn()
    },
    getters = {
      songs: () => [],
      canModifyPlaylist: () => true,
      selectedPlaylist: () => null
    }
  })

  it('should inform user to click on a playlist if none selected', () => {
    store = new Vuex.Store({
      state,
      actions,
      getters
    })

    const wrapper = shallow(Songs, { store, localVue })

    const message = wrapper.find('p')
    expect(message.text()).toEqual('Click on a playlist to display songs')
  })

  it('should render songs', () => {
    store = new Vuex.Store({
      state,
      actions,
      getters: {
        ...getters,
        songs: () => displyedSongs
      },
    })

    const wrapper = shallow(Songs, { store, localVue })

    const songs = wrapper.findAll('.song-item')
    expect(songs.length).toEqual(2)
  })

  it('should allow user to modify his playist', () => {
    store = new Vuex.Store({
      state,
      actions,
      getters: {
        ...getters,
        songs: () => displyedSongs
      },
    })

    const wrapper = shallow(Songs, { store, localVue })

    const songs = wrapper.findAll('.song-item')
    expect(songs.contains('.btn')).toBe(true)

    const newSongForm = wrapper.find('.add-song')
    expect(newSongForm.is('form')).toBe(true)
  })

  it('should not allow user to modify other users playlist', () => {
    store = new Vuex.Store({
      state,
      actions,
      getters: {
        ...getters,
        songs: () => displyedSongs,
        canModifyPlaylist: () => false,
      },
    })

    const wrapper = shallow(Songs, { store, localVue })
    const songs = wrapper.findAll('.song-item')

    expect(songs.contains('.btn')).toBe(false)
    expect(wrapper.contains('.add-song')).toBe(false)
  })

  it('should add song to playlist', () => {
    store = new Vuex.Store({
      state,
      actions,
      getters: {
        ...getters,
        songs: () => displyedSongs
      },
    })

    const wrapper = shallow(Songs, { store, localVue })
    const form = wrapper.find('.add-song')
    const input = form.find('input')

    wrapper.setData({ query: 'sweet dreams' })
    form.trigger('submit')
    
    expect(actions.addSongToPlaylist).toHaveBeenCalled()
  })

  it('should remove song from playlist', () => {
    store = new Vuex.Store({
      state,
      actions,
      getters: {
        ...getters,
        songs: () => displyedSongs
      },
    })

    const wrapper = shallow(Songs, { store, localVue })
    const removeBtn = wrapper.find('.btn')

    removeBtn.trigger('click');
    
    expect(actions.removeFromPlaylist).toHaveBeenCalled()
  })
  
})
