/* eslint-env jest, jasmine */

import categoriesModule from './categories'

jest.mock(`@/lib/dataStoreClient`, () => ({
}))

const { actions } = categoriesModule

describe(`categories store module`, () => {
  it(`expandCategoriesForDocumentId`, () => {
    const state = {
      categories: [
        {
          _id: `1`,
          parent: null
        },
        {
          _id: `2`,
          parent: `1`
        }
      ]
    }

    const rootGetters = {
      'documents/getDocumentsForCategory': categoryId => {
        return categoryId === `2` ? [{ _id: `1` }] : null
      }
    }

    const documentId = `1`

    const commit = jasmine.createSpy()

    actions.expandCategoriesForDocumentId({ commit, state, rootGetters }, documentId)

    expect(commit).toHaveBeenCalledWith(`expandCategory`, `1`)
    expect(commit).toHaveBeenCalledWith(`expandCategory`, `2`)
  })
})
