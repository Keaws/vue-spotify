import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import App from '@/App'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('App', () => {
  let actions
  let store
  let getters
  let mutations

  beforeEach(() => {
    actions = {
      setToken: jest.fn()
    },
    getters = {
      token: () => null,
      error: () => null
    },
    mutations = {
      setError: jest.fn()
    }
  })

  it('has login button if store has no token', () => {
    store = new Vuex.Store({
      state: {},
      actions,
      getters,
      mutations
    })

    const wrapper = shallow(App, { store, localVue })
    const button = wrapper.find('button')
    expect(button.text()).toEqual('Click to login with your Spotify account')
  })

  it('has error message if store has an error', () => {
    store = new Vuex.Store({
      state: {},
      actions,
      getters: {
        token: () => null,
        error: () => 'Sarcasm module error'
      },
      mutations
    })

    const wrapper = shallow(App, { store, localVue })
    const errParagraph = wrapper.find('p')
    expect(errParagraph.text()).toEqual('Oops! Error occured: Sarcasm module error x')
  })

  it('cross button should close error message', () => {
    store = new Vuex.Store({
      state: {},
      actions,
      getters: {
        token: () => null,
        error: () => 'Sarcasm module error'
      },
      mutations
    })

    const wrapper = shallow(App, { store, localVue })
    const closeBtn = wrapper.find('.btn')
    closeBtn.trigger('click')
    expect(mutations.setError).toHaveBeenCalled()
  })
})
