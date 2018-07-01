/* eslint-env jest */

import documentsModule from './documents'
import { putDocument } from '@/lib/dataStoreClient';

jest.mock(`@/lib/dataStoreClient`, () => ({
  putDocument: jest.fn(document => ({ ...document, _id: `1` }))
}))

const { actions } = documentsModule

describe(`documents store module`, () => {
  beforeEach(() => {
    putDocument.mockClear()
  })

  describe(`actions`, () => {
    describe(`createDocument`, () => {
      it(`calls putDocument`, async () => {
        actions.createDocument({ commit: jest.fn() }, `1`)

        expect(putDocument).toHaveBeenCalledWith({
          title: ``,
          content: ``,
          category: `1`
        })
      })

      it(`commits addDocument`, async () => {
        const commit = jest.fn()

        await actions.createDocument({ commit }, `1`)

        expect(commit).toHaveBeenCalledWith(`addDocument`, {
          _id: `1`,
          title: ``,
          content: ``,
          category: `1`
        })
      })

      it(`returns the new document`, async () => {
        const newDocument = await actions.createDocument({ commit: jest.fn() }, `1`)

        expect(newDocument).toEqual({
          _id: `1`,
          category: `1`,
          title: ``,
          content: ``
        })
      })
    })
  })
})
