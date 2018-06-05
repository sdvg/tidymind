import PouchDB from 'pouchdb-browser'
import uuid from 'uuid/v4'

const db = new PouchDB(`localfornow`)

if (process.env.NODE_ENV === `development`) {
  window.db = db
}

export const TYPE_DOCUMENT = `document`

export const putDocument = async document => {
  const currentDateString = new Date().toJSON()
  const updatedDocument = {
    ...document,
    _id: document._id || uuid(),
    type: TYPE_DOCUMENT,
    createdAt: document.createdAt || currentDateString,
    updatedAt: currentDateString
  }

  const update = await db.put(updatedDocument)

  return {
    ...updatedDocument,
    _rev: update.rev
  }
}

export const getDocument = documentId => db.get(documentId)

export const getAllDocuments = async () => {
  const allDocuments = await db.allDocs({ include_docs: true })

  return allDocuments.rows.map(row => row.doc).filter(document => document.type === TYPE_DOCUMENT)
}
