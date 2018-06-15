/* eslint-env jest */

import Vuex from 'vuex'
import { shallow, createLocalVue } from '@vue/test-utils'
import Library from './Library.vue'

xdescribe(`Library`, () => {
  let actions

  beforeEach(() => {
    actions = {
      fetchAndSubscribe: jest.fn()
    }
    store = new Vuex.Store({
      // modules: {
      //   documents: {
      //     namespaced: true,
      //     state: { documents: null },
      //     actions
      //   }
      // }
    })
  })

  it(`fetches documents and categories initially`, () => {
    shallow(Library, {
      stubs: [`router-view`],
      // store,
      localVue
    })

    expect(actions.fetchAndSubscribeDocuments).toHaveBeenCalled()
    expect(actions.fetchAndSubscribeCategories).toHaveBeenCalled()
  })
})
