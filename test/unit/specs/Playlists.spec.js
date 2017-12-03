import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Playlists from '@/components/Playlists'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Playlists', () => {
  let actions
  let store
  let getters
  let state

  beforeEach(() => {
    state = {},
    actions = {
      getSongsFromPlaylist: jest.fn(),
      getUserID: jest.fn(),
      getUserPlayLists: jest.fn()
    },
    getters = {
      playlists: () => [],
      userID: () => 'Kappa',
      selectedPlaylist: () => null
    }
  })

  it('should greet user', () => {
    store = new Vuex.Store({
      state,
      actions,
      getters
    })

    const wrapper = shallow(Playlists, { store, localVue })
    const heading = wrapper.find('h1')
    expect(heading.text()).toEqual('Greetings, Kappa!')
  })

  it('should render playlists', () => {
    store = new Vuex.Store({
      state,
      actions,
      getters: {
        ...getters,
        playlists: () => [{id: 1, name: 'Good morning'}, {id: 2, name: 'Workout'}]
      },
    })

    const wrapper = shallow(Playlists, { store, localVue })

    const playlists = wrapper.findAll('button')
    expect(playlists.length).toEqual(2)
    
    const goodMorning = playlists.at(0)
    expect(goodMorning.text()).toEqual('Good morning')

    const workout = playlists.at(1)
    expect(workout.text()).toEqual('Workout')
  })
  
})
