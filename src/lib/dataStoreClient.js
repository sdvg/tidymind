import hoodie from './hoodie'

const TYPE_DOCUMENT = `document`
const TYPE_CATEGORY = `category`

export const documentStore = hoodie.store.withIdPrefix(TYPE_DOCUMENT)
export const categoryStore = hoodie.store.withIdPrefix(TYPE_CATEGORY)

export const addDocument = document => documentStore.add(document)

export const updateDocument = document => documentStore.update(document)

export const removeDocument = document => documentStore.remove(document)

export const getDocument = documentId => documentStore.find(documentId)

export const getAllDocuments = () => documentStore.findAll()

export const getAllCategories = () => categoryStore.findAll()
