import Hoodie from '@hoodie/client'
import PouchDB from 'pouchdb-browser'

const hoodie = new Hoodie({
  url: `localfornow`,
  PouchDB,
})

const documentStore = hoodie.store.withIdPrefix(`document`)
const categoryStore = hoodie.store.withIdPrefix(`category`)

if (process.env.NODE_ENV === `development`) {
  window.hoodie = hoodie
}

export const TYPE_DOCUMENT = `document`
export const TYPE_CATEGORY = `category`

export const addDocument = document => documentStore.add(document)

export const updateDocument = document => documentStore.update(document)

export const removeDocument = document => documentStore.remove(document)

export const getDocument = documentId => documentStore.find(documentId)

export const getAllDocuments = () => documentStore.findAll()

export const getAllCategories = () => categoryStore.findAll()
