/* eslint-env jest, jasmine */

import categoriesModule from './categories'

jest.mock(`@/lib/dataStoreClient`, () => ({}))

const { actions, getters } = categoriesModule

describe(`categories store module`, () => {
  describe(`mutations`, () => {
    it(`setCategories`, () => {
      const state = { categories: null }

      categoriesModule.mutations.setCategories(state, [1, 2])

      expect(state.categories).toEqual([1, 2])
    })

    it(`expandCategory`, () => {
      const state = { expandedCategories: [] }

      categoriesModule.mutations.expandCategory(state, 1)

      expect(state.expandedCategories).toEqual([1])
    })

    it(`expands a category only once`, () => {
      const state = { expandedCategories: [] }

      categoriesModule.mutations.expandCategory(state, 1)
      categoriesModule.mutations.expandCategory(state, 1)

      expect(state.expandedCategories).toEqual([1])
    })

    it(`collapseCategory`, () => {
      const state = { expandedCategories: [1] }

      categoriesModule.mutations.collapseCategory(state, 1)

      expect(state.expandedCategories).toEqual([])
    })
  })

  describe(`actions`, () => {
    it(`expandCategoriesRecursively`, () => {
      const state = {
        categories: [
          {
            _id: `1`,
            parent: null,
          },
          {
            _id: `2`,
            parent: `1`,
          },
        ],
      }

      const commit = jest.fn()

      actions.expandCategoriesRecursively({ commit, state }, {
        _id: `2`,
        parent: `1`,
      })

      expect(commit).toHaveBeenCalledWith(`expandCategory`, `2`)
      expect(commit).toHaveBeenCalledWith(`expandCategory`, `1`)
    })

    it(`expandCategoriesForDocumentId`, () => {
      const state = {
        categories: [
          {
            _id: `1`,
            parent: null,
          },
          {
            _id: `2`,
            parent: `1`,
          },
        ],
      }

      const rootGetters = {
        'documents/getDocumentsForCategory': categoryId => {
          return categoryId === `2` ? [{ _id: `1` }] : null
        },
      }

      const documentId = `1`

      const dispatch = jasmine.createSpy()

      actions.expandCategoriesForDocumentId({ dispatch, state, rootGetters }, documentId)

      expect(dispatch).toHaveBeenCalledWith(`expandCategoriesRecursively`, {
        _id: `2`,
        parent: `1`,
      })
    })
  })

  describe(`getters`, () => {
    it(`categoriesLoaded is true when categories are not null`, () => {
      const state = { categories: [] }
      const result = getters.categoriesLoaded(state)

      expect(result).toBe(true)
    })

    it(`categoriesLoaded is false when categories are null`, () => {
      const state = { categories: null }
      const result = getters.categoriesLoaded(state)

      expect(result).toBe(false)
    })

    it(`formats categories as categoryTree`, () => {
      const state = {
        categories: [
          { _id: `2`, parent: `1` },
          { _id: `1`, parent: null },
          { _id: `3`, parent: `2` },
        ],
      }
      const result = getters.categoryTree(state)

      const expectedResult = [
        {
          _id: `1`,
          parent: null,
          children: [
            {
              _id: `2`,
              parent: `1`,
              children: [
                {
                  _id: `3`,
                  parent: `2`,
                },
              ],
            },
          ],
        },
      ]

      expect(result).toEqual(expectedResult)
    })

    it(`doesn't mutate the categories in categoryTree`, () => {
      const state = {
        categories: [
          { _id: `1`, parent: null },
          { _id: `2`, parent: `1` },
        ],
      }
      getters.categoryTree(state)

      expect(state.categories[0]).toEqual({ _id: `1`, parent: null })
    })

    it(`returns true for isCategoryExpanded only when the category is expanded`, () => {
      const state = {
        categories: [
          { _id: `1` },
          { _id: `2` },
        ],
        expandedCategories: [`1`],
      }

      expect(getters.isCategoryExpanded(state)(`1`)).toBe(true)
      expect(getters.isCategoryExpanded(state)(`2`)).toBe(false)
    })

    it(`returns the first category when there are categories`, () => {
      const state = { categories: [1] }
      const result = getters.firstCategory(state)

      expect(result).toBe(1)
    })

    it(`returns null for firstCategory when there are no categories`, () => {
      const state = { categories: [] }
      const result = getters.firstCategory(state)

      expect(result).toBe(null)
    })
  })
})
