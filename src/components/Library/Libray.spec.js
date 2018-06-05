/* eslint-env jest */

import Vuex from 'vuex'
import { shallow, createLocalVue } from '@vue/test-utils'
import Library from './Library.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe(`Library`, () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      fetchAndSubscribe: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        documents: {
          namespaced: true,
          state: { documents: null },
          actions
        }
      }
    })
  })

  it(`sets loading to true initially`, () => {
    const wrapper = shallow(Library, {
      stubs: [`router-link`],
      store,
      localVue
    })
    expect(wrapper.find(`p`).text()).toEqual(`Loading...`)
  })

  it(`fetches documents initially`, () => {
    shallow(Library, {
      stubs: [`router-link`],
      store,
      localVue
    })

    expect(actions.fetchAndSubscribe).toHaveBeenCalled()
  })

  it(`renders a list of documents`, () => {

  })
})
