/* eslint-env jest */

import { shallowMount } from '@vue/test-utils'
import CreateDocumentButton from './CreateDocumentButton'

describe(`CreateDocumentButton`, () => {
  it(`redirects to the new document`, async () => {
    const wrapper = shallowMount(CreateDocumentButton, {
      mocks: {
        $router: { push: jest.fn() },
      },
    })

    wrapper.setMethods({
      createDocument: jest.fn(() => ({ _id: `1` })),
      getCategoryId: () => `1`,
      expandCategory: () => {},
    })

    await wrapper.vm.handleCreateDocument()

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: `library.document`,
      params: { documentId: `1` },
    })
  })

  describe(`getCategoryId`, () => {
    it(`returns the current documents category id`, () => {
      const wrapper = shallowMount(CreateDocumentButton, {
        computed: {
          getDocument: () => () => ({ _id: `d1`, category: `c1` }),
        },
        mocks: {
          $route: {
            name: `library.document`,
            params: { documentId: `d1` },
          },
        },
      })

      expect(wrapper.vm.getCategoryId()).toBe(`c1`)
    })

    it(`returns the first category id when no document is open`, () => {
      const wrapper = shallowMount(CreateDocumentButton, {
        computed: {
          getDocument: () => () => null,
          firstCategory: () => ({ _id: `1` }),
        },
        mocks: {
          $route: {
            name: `library`,
            params: {},
          },
        },
      })

      expect(wrapper.vm.getCategoryId()).toBe(`1`)
    })
  })
})
